import { createHash } from 'node:crypto';
import { z } from 'zod';
import { BedrockAgentCoreApp } from 'bedrock-agentcore/runtime';
import {
  getActiveVoiceSpec, insertProposedVoiceSpec,
  getPageByRoute, upsertPage, insertDrafts,
  getApprovedDrafts, markDraftsShipped, markDraftsFailed,
  getChatThread, appendChatMessage, getStagedEdits, supersedeDrafts,
} from './db.js';
import { runChat } from './chat.js';
import { scrapePage, mapSite, hashContent, urlToRoute, routeToFilePath, filePathToRoute } from './crawl.js';
import { auditPage, auditSource, extractCopy, extractMetadata } from './audit.js';
import { learnVoiceSpec } from './voice-spec.js';
import { proposeEdits, applyEdits } from './rewrite.js';
import { draftPage, newPageDraft } from './new-page.js';
import { getFileContent, listPageFiles, createBranch, commitFile, openPullRequest, repoSlug } from './github.js';
import { logActivity } from './activity-log.js';

const SITE_URL = process.env.FINN_SITE_URL ?? 'https://aud-new-website.vercel.app';

const RequestSchema = z.discriminatedUnion('action', [
  // Crawl + score. Omitting routes audits the whole site; force re-audits pages
  // whose content hash has not changed.
  z.object({
    action: z.literal('audit_site'),
    routes: z.array(z.string()).optional(),
    force: z.boolean().optional(),
    limit: z.number().int().min(1).max(60).optional(),
    // 'repo' reads the TSX source on the base branch (the default, and the only
    // mode that works while the site has no deployment). 'live' Firecrawls the
    // rendered pages — switch to it once FINN_SITE_URL actually serves the site.
    mode: z.enum(['repo', 'live']).optional(),
  }),
  // Field-level copy proposals for one page, queued for human review.
  z.object({ action: z.literal('propose_edits'), route: z.string() }),
  // Proposes a NEW voice spec version. Always lands inactive.
  z.object({ action: z.literal('learn_voice'), sampleRoutes: z.array(z.string()).optional() }),
  // Drafts a brand-new page from a brief.
  z.object({ action: z.literal('draft_page'), route: z.string(), brief: z.string() }),
  // Turns approved drafts into a pull request. Never touches the base branch.
  z.object({ action: z.literal('open_pr'), draftIds: z.array(z.string()).min(1), title: z.string().optional() }),
  // Instruction-led editing. The human says what to change; Finn does exactly
  // that. Resulting edits are auto-approved (they were asked for) — the pull
  // request stays the gate.
  z.object({
    action: z.literal('chat'),
    route: z.string(),
    message: z.string().min(1),
    imageUrl: z.string().url().optional(),
  }),
  // The page's editable strings, for the "pick a section from a list" targeting
  // mode. Pure source parse, no model call.
  z.object({ action: z.literal('list_fields'), route: z.string() }),
]);

const app = new BedrockAgentCoreApp({
  invocationHandler: {
    // requestSchema omitted intentionally — parse manually so the raw body can
    // be logged when validation fails.
    process: async (rawBody: unknown, context) => {
      let body = rawBody;
      if (rawBody && typeof rawBody === 'object' && 'prompt' in (rawBody as Record<string, unknown>)) {
        const promptStr = (rawBody as Record<string, unknown>).prompt;
        if (typeof promptStr === 'string') {
          try { body = JSON.parse(promptStr); } catch { /* use raw */ }
        }
      }
      context.log.info({ body }, 'Finn invocation received');
      const parsed = RequestSchema.safeParse(body);
      if (!parsed.success) {
        context.log.error({ issues: parsed.error.issues, rawBody }, 'Request schema validation failed');
        return JSON.stringify({ error: 'Invalid request', issues: parsed.error.issues });
      }
      const request = parsed.data;

      switch (request.action) {
        case 'audit_site': {
          const spec = await getActiveVoiceSpec();
          const mode = request.mode ?? 'repo';
          const summary = { mode, read: 0, audited: 0, skipped: 0, failed: [] as string[], pages: [] as unknown[] };

          if (mode === 'repo') {
            let files = await listPageFiles();
            if (request.routes?.length) {
              const wanted = new Set(request.routes);
              files = files.filter((f) => {
                const r = filePathToRoute(f);
                return r !== null && wanted.has(r);
              });
            }
            if (request.limit) files = files.slice(0, request.limit);

            for (const filePath of files) {
              try {
                const route = filePathToRoute(filePath);
                if (!route) continue;
                const source = await getFileContent(filePath);
                summary.read += 1;

                // Hash the source, not the rendered page: that is what actually
                // has to change before a re-audit is worth paying for.
                const hash = createHash('sha256').update(source).digest('hex');
                const existing = await getPageByRoute(route);
                if (existing && existing.contentHash === hash && !request.force) {
                  summary.skipped += 1;
                  continue;
                }

                const audit = await auditSource(route, filePath, source, spec);
                const meta = extractMetadata(source);
                await upsertPage({
                  route,
                  url: `https://github.com/${repoSlug()}/blob/${encodeURIComponent(process.env.FINN_SITE_BASE_BRANCH ?? 'main')}/${filePath}`,
                  filePath,
                  contentHash: hash,
                  markdown: extractCopy(source).slice(0, 20_000),
                  metadata: { title: meta.title, description: meta.description, source: 'repo' },
                  scores: audit.scores,
                  issues: audit.issues,
                });
                summary.audited += 1;
                summary.pages.push({ route, filePath, scores: audit.scores, issues: audit.issues.length });
              } catch (err) {
                summary.failed.push(`${filePath}: ${err instanceof Error ? err.message : String(err)}`);
              }
            }
          } else {
            let routes = request.routes;
            if (!routes?.length) {
              const links = await mapSite(SITE_URL);
              routes = Array.from(new Set(
                links.map((l) => urlToRoute(l, SITE_URL)).filter((r): r is string => r !== null)
              )).sort();
            }
            if (request.limit) routes = routes.slice(0, request.limit);

            for (const route of routes) {
              try {
                const url = new URL(route, SITE_URL).toString();
                const page = await scrapePage(url);
                summary.read += 1;

                const hash = hashContent(page.markdown, page.metadata);
                const existing = await getPageByRoute(route);
                if (existing && existing.contentHash === hash && !request.force) {
                  summary.skipped += 1;
                  continue;
                }

                const audit = await auditPage(route, page.markdown, page.metadata, spec);
                await upsertPage({
                  route,
                  url,
                  filePath: routeToFilePath(route),
                  contentHash: hash,
                  markdown: page.markdown,
                  metadata: { ...page.metadata, source: 'live' },
                  scores: audit.scores,
                  issues: audit.issues,
                });
                summary.audited += 1;
                summary.pages.push({ route, scores: audit.scores, issues: audit.issues.length });
              } catch (err) {
                summary.failed.push(`${route}: ${err instanceof Error ? err.message : String(err)}`);
              }
            }
          }

          await logActivity('site_audited', `Audited ${summary.audited} page(s) from ${mode}, skipped ${summary.skipped} unchanged`, {
            read: summary.read, failed: summary.failed.length, mode,
          }).catch(() => {});
          return JSON.stringify(summary);
        }

        case 'propose_edits': {
          const spec = await getActiveVoiceSpec();
          const page = await getPageByRoute(request.route);
          if (!page) {
            return JSON.stringify({ error: `No crawl record for ${request.route}. Run audit_site first.` });
          }
          const filePath = page.filePath ?? routeToFilePath(request.route);
          if (!filePath) {
            return JSON.stringify({ error: `No source file maps to ${request.route} (dynamic route?).` });
          }

          const source = await getFileContent(filePath);
          const issues = [] as never[]; // scores drive the prompt; per-issue detail is optional
          const outcome = await proposeEdits(request.route, filePath, source, page.id, spec, issues);
          const inserted = await insertDrafts(outcome.accepted);

          await logActivity('edits_proposed', `${inserted} proposal(s) for ${request.route}`, {
            route: request.route, rejected: outcome.rejected.length,
          }).catch(() => {});

          return JSON.stringify({
            route: request.route,
            filePath,
            proposed: inserted,
            rejected: outcome.rejected,
          });
        }

        case 'learn_voice': {
          const current = await getActiveVoiceSpec();

          // Sampled from the repo for the same reason audit_site is: there is no
          // deployment to crawl, and the source is what actually gets edited.
          let files = await listPageFiles();
          if (request.sampleRoutes?.length) {
            const wanted = new Set(request.sampleRoutes);
            files = files.filter((f) => {
              const r = filePathToRoute(f);
              return r !== null && wanted.has(r);
            });
          } else {
            files = files.slice(0, 6);
          }

          const samples: Array<{ route: string; markdown: string }> = [];
          for (const filePath of files) {
            try {
              const route = filePathToRoute(filePath);
              if (!route) continue;
              const source = await getFileContent(filePath);
              samples.push({ route, markdown: extractCopy(source) });
            } catch (err) {
              context.log.warn(`learn_voice: ${filePath} failed, skipping: ${err instanceof Error ? err.message : err}`);
            }
          }
          if (!samples.length) return JSON.stringify({ error: 'Could not read any page source' });

          const learned = await learnVoiceSpec(samples, current);
          const created = await insertProposedVoiceSpec(learned.positioning, learned.bannedWords, learned.rules, learned.notes);

          await logActivity('voice_spec_proposed', `Proposed voice spec v${created.version} (inactive)`, {
            sampledRoutes: samples.map((s) => s.route),
          }).catch(() => {});

          return JSON.stringify({
            ...created,
            isActive: false,
            note: 'Written inactive. Activate it in AIOS to make it the operating spec.',
            positioning: learned.positioning,
            bannedWords: learned.bannedWords,
            rules: learned.rules,
            notes: learned.notes,
          });
        }

        case 'draft_page': {
          const spec = await getActiveVoiceSpec();
          const filePath = routeToFilePath(request.route);
          if (!filePath) return JSON.stringify({ error: `Route ${request.route} does not map to a static page file.` });

          const page = await draftPage(request.route, filePath, request.brief, spec);
          const inserted = await insertDrafts([newPageDraft(request.route, filePath, page)]);

          await logActivity('page_drafted', `Drafted new page ${request.route}`, {
            route: request.route, warnings: page.warnings,
          }).catch(() => {});

          return JSON.stringify({ route: request.route, filePath, drafts: inserted, warnings: page.warnings, summary: page.summary });
        }

        case 'list_fields': {
          const filePath = routeToFilePath(request.route);
          if (!filePath) return JSON.stringify({ error: `Route ${request.route} does not map to a static page file.` });
          const source = await getFileContent(filePath);
          const meta = extractMetadata(source);
          // Only strings that occur exactly once are offered: anything ambiguous
          // would be rejected by the validator anyway, so showing it as a target
          // would just waste a turn. Metadata is listed separately, so it is
          // excluded from the body copy to avoid offering the same string twice.
          const seen = new Set([meta.title, meta.description].filter(Boolean));
          const body = extractCopy(source)
            .split('\n')
            .map((t) => t.trim())
            .filter((t) => t.length > 0 && !seen.has(t) && source.split(t).length - 1 === 1)
            // Longest first: the substantial paragraphs are what someone
            // actually wants to point at, not stray two-word labels.
            .sort((a, b) => b.length - a.length)
            .slice(0, 60);

          const fields = [
            ...(meta.title ? [{ field: 'metadata.title', text: meta.title }] : []),
            ...(meta.description ? [{ field: 'metadata.description', text: meta.description }] : []),
            ...body.map((text, i) => ({ field: `copy[${i}]`, text })),
          ];
          return JSON.stringify({ route: request.route, filePath, fields, truncated: body.length === 60 });
        }

        case 'chat': {
          try {
          const spec = await getActiveVoiceSpec();
          const filePath = routeToFilePath(request.route);
          if (!filePath) return JSON.stringify({ error: `Route ${request.route} does not map to a static page file.` });

          const page = await getPageByRoute(request.route);
          const source = await getFileContent(filePath);
          const history = await getChatThread(request.route);
          const staged = await getStagedEdits(request.route);

          // The user's message is persisted BEFORE the model runs, so a failed
          // or slow turn never loses what they typed.
          const userMessageId = await appendChatMessage(
            request.route, 'user', request.message, request.imageUrl ?? null
          );

          const outcome = await runChat({
            route: request.route,
            filePath,
            source,
            pageId: page?.id ?? null,
            spec,
            history,
            message: request.message,
            imageUrl: request.imageUrl,
            chatMessageId: userMessageId,
            staged,
          });

          // A refinement targets the same span as the edit it replaces, so the
          // older one is retired first — otherwise open_pr would try to apply
          // two edits to the same text and the second would fail.
          const superseded = await supersedeDrafts(
            request.route,
            outcome.accepted.map((e) => e.currentText).filter((t): t is string => Boolean(t))
          );
          const inserted = await insertDrafts(outcome.accepted);
          await appendChatMessage(request.route, 'assistant', outcome.reply);

          await logActivity('chat_edit', `${inserted} change(s) requested on ${request.route}`, {
            route: request.route, rejected: outcome.rejected.length, hadImage: Boolean(request.imageUrl),
          }).catch(() => {});

          return JSON.stringify({
            route: request.route,
            filePath,
            reply: outcome.reply,
            applied: inserted,
            superseded,
            rejected: outcome.rejected,
          });
          } catch (err) {
            // An exception escaping the handler makes bedrock-agentcore try to
            // send the Error object itself, which Fastify rejects with an opaque
            // FST_ERR_REP_INVALID_PAYLOAD_TYPE 500 that hides the real cause.
            // Always come back as a JSON string.
            const detail = err instanceof Error ? err.message : String(err);
            context.log.error({ err }, 'chat failed');
            return JSON.stringify({ error: detail, route: request.route });
          }
        }

        case 'open_pr': {
          const drafts = await getApprovedDrafts(request.draftIds);
          if (!drafts.length) {
            return JSON.stringify({ error: 'None of those draft ids are approved. Approve them in AIOS first.' });
          }

          // Group by file so each file is committed once with all its swaps.
          const byFile = new Map<string, typeof drafts>();
          for (const d of drafts) {
            const list = byFile.get(d.filePath) ?? [];
            list.push(d);
            byFile.set(d.filePath, list);
          }

          const branch = `finn/copy-${Date.now().toString(36)}`;
          const applied: string[] = [];
          const shippedIds: string[] = [];
          const failedIds: string[] = [];
          const failures: string[] = [];

          await createBranch(branch);

          for (const [filePath, fileDrafts] of byFile) {
            try {
              const first = fileDrafts[0];
              if (!first) continue;
              const isNewFile = fileDrafts.every((d) => d.category === 'new_page');
              let content: string;

              if (isNewFile) {
                content = first.proposedText;
              } else {
                const source = await getFileContent(filePath);
                const result = applyEdits(source, fileDrafts);
                if (result.failures.length) {
                  // Stale or ambiguous swaps: skip the whole file rather than
                  // commit a partially applied change.
                  failures.push(`${filePath}: ${result.failures.join(' | ')}`);
                  failedIds.push(...fileDrafts.map((d) => d.id));
                  continue;
                }
                content = result.content;
              }

              await commitFile(branch, filePath, content, `Finn: update copy in ${filePath}`);
              applied.push(filePath);
              shippedIds.push(...fileDrafts.map((d) => d.id));
            } catch (err) {
              failures.push(`${filePath}: ${err instanceof Error ? err.message : String(err)}`);
              failedIds.push(...fileDrafts.map((d) => d.id));
            }
          }

          if (!applied.length) {
            if (failedIds.length) await markDraftsFailed(failedIds, failures.join(' | ')).catch(() => {});
            return JSON.stringify({ error: 'No file could be updated; no pull request opened.', failures });
          }

          const bodyLines = [
            'Drafted by Finn and approved by a human in AIOS.',
            '',
            `Files changed: ${applied.length}`,
            '',
            ...drafts
              .filter((d) => shippedIds.includes(d.id))
              .map((d) => `- \`${d.filePath}\` (${d.field}): ${d.category}`),
            '',
            failures.length ? `Skipped:\n${failures.map((f) => `- ${f}`).join('\n')}` : '',
            '',
            'Finn cannot run the build, so the preview deployment on this PR is the build gate. Review the diff and the preview before merging.',
          ].filter(Boolean).join('\n');

          const prUrl = await openPullRequest(branch, request.title ?? `Finn: website copy updates (${applied.length} file${applied.length === 1 ? '' : 's'})`, bodyLines);

          await markDraftsShipped(shippedIds, prUrl);
          if (failedIds.length) await markDraftsFailed(failedIds, failures.join(' | ')).catch(() => {});

          await logActivity('pr_opened', `Opened ${prUrl} against ${repoSlug()}`, {
            branch, files: applied.length, shipped: shippedIds.length, failed: failedIds.length,
          }).catch(() => {});

          return JSON.stringify({ prUrl, branch, files: applied, shipped: shippedIds.length, failed: failedIds.length, failures });
        }
      }
    },
  },
});

// Dual-stack bind — '0.0.0.0' breaks agentcore dev's local Inspector, which
// tries IPv6 loopback first. Same as Sam and LeadPipeline.
app.run({ host: '::', port: 8080 });
