# Finn — website content editor

Finn is the AI agent that maintains the copy on this site. It reads the pages in
this repo, scores them against the Audcomp voice spec, and proposes rewrites.
Nothing it suggests reaches the site without two human decisions.

## How it works

1. **Audit** — reads every `app/**/page.tsx` on the base branch and scores it on
   voice, SEO, AEO, content and technical quality. It reads the TSX **source**,
   not the rendered page, so what it scores is exactly what it would edit.
2. **Propose** — emits field-level rewrites. Each one is a single exact string
   swap that must match the source **exactly once**, or it is discarded. Finn
   never regenerates a whole file, so it cannot restructure or break your JSX.
3. **Review** — proposals queue up in AIOS as before/after diffs. A human
   approves or rejects each one.
4. **Pull request** — approved changes are committed to a new branch and opened
   as a PR against this repo. You review the diff and merge. Finn never writes
   to the base branch.

## Where things live

| Thing | Where |
|---|---|
| Agent source | `app/Finn/src/` |
| Deployment config | `agentcore/agentcore.json` |
| Deploy | `./deploy.sh` (add `-y` for non-interactive) |
| Review UI | AIOS, `/?view=website` |
| Voice spec, page scores, review queue | Supabase, `wilfred.site_*` tables |

The agent runs on AWS Bedrock AgentCore rather than inside this Next.js app, so
its daily spend cap, circuit breaker, token accounting and content guardrail sit
with the rest of the Wilfred agent platform alongside Sam and Scout.

## Configuration

Set in `agentcore/agentcore.json`:

- `FINN_SITE_REPO` — the repo Finn reads and opens PRs against
- `FINN_SITE_BASE_BRANCH` — the branch it treats as current
- `FINN_DAILY_CAP_USD` — hard spend ceiling; Finn blocks itself when reached
- `FINN_SITE_URL` — only used by `mode: "live"`, which crawls the deployed site
  instead of the source. Requires the site to actually be deployed.

`learn_voice` takes `source: "repo" | "live"` (default `repo`). With `"live"` it
Firecrawls rendered pages instead of reading TSX, and an optional `siteUrl`
overrides `FINN_SITE_URL` for that call only — so voice can be learned from an
established marketing site without repointing the site Finn audits and edits.
Without `sampleRoutes` it samples the six shallowest routes, so the homepage and
top-level pages define the voice rather than whichever deep page sorts first.

Credentials come from the AWS Secrets Manager secret `wilfred/agent-credentials`
(`SUPABASE_DB_URL`, `FIRECRAWL_API_KEY`, `FINN_GITHUB_TOKEN`). None are stored in
this repo.

## Not to be confused with Claire

`app/claire/**` is a separate, earlier content agent that lives inside the Next.js
app. Finn does not modify it, and deliberately excludes `app/claire/**` from every
audit and proposal.

---

# AgentCore Project

This project was created with the [AgentCore CLI](https://github.com/aws/agentcore-cli).

## Project Structure

```
my-project/
├── AGENTS.md               # AI coding assistant context
├── agentcore/
│   ├── agentcore.json      # Project config (agents, memories, credentials, gateways, evaluators)
│   ├── aws-targets.json    # Deployment targets (account + region)
│   ├── .env.local          # Secrets — API keys (gitignored)
│   ├── .llm-context/       # TypeScript type definitions for AI assistants
│   │   ├── agentcore.ts    # AgentCoreProjectSpec types
│   │   ├── aws-targets.ts  # Deployment target types
│   │   └── mcp.ts          # Gateway and MCP tool types
│   └── cdk/                # CDK infrastructure (@aws/agentcore-cdk)
├── app/                    # Agent application code
└── evaluators/             # Custom evaluator code (if any)
```

## Getting Started

### Prerequisites

- **Node.js** 20.x or later
- **Python 3.10+** and **uv** for Python agents ([install uv](https://docs.astral.sh/uv/getting-started/installation/))
- **AWS credentials** configured (`aws configure` or environment variables)
- **Docker** (only for Container build agents)

### Development

Run your agent locally:

```bash
agentcore dev
```

### Deployment

Deploy to AWS:

```bash
agentcore deploy
```

## Commands

| Command | Description |
| --- | --- |
| `agentcore create` | Create a new AgentCore project |
| `agentcore add` | Add resources (agent, memory, credential, gateway, evaluator, policy) |
| `agentcore remove` | Remove resources |
| `agentcore dev` | Run agent locally with hot-reload |
| `agentcore deploy` | Deploy to AWS via CDK |
| `agentcore status` | Show deployment status |
| `agentcore invoke` | Invoke agent (local or deployed) |
| `agentcore logs` | View agent logs |
| `agentcore traces` | View agent traces |
| `agentcore eval` | Run evaluations |
| `agentcore package` | Package agent artifacts |
| `agentcore validate` | Validate configuration |
| `agentcore pause` | Pause a deployed agent |
| `agentcore resume` | Resume a paused agent |
| `agentcore fetch` | Fetch remote resource definitions |
| `agentcore import` | Import existing resources |
| `agentcore update` | Check for CLI updates |

## Configuration

Edit the JSON files in `agentcore/` to configure your project. See `agentcore/.llm-context/` for type definitions and validation constraints.

The project uses a **flat resource model** — agents, memories, credentials, gateways, evaluators, and policies are top-level arrays in `agentcore.json`. Resources are independent; agents discover memories and credentials at runtime via environment variables or SDK calls.

## Resources

| Resource | Purpose |
| --- | --- |
| Agent (runtime) | HTTP, MCP, or A2A agent deployed to AgentCore Runtime |
| Memory | Persistent context storage with configurable strategies |
| Credential | API key or OAuth credential providers |
| Gateway | MCP gateway that routes tool calls to targets |
| Gateway Target | Tool implementation (Lambda, MCP server, OpenAPI, Smithy, API Gateway) |
| Evaluator | Custom LLM-as-a-Judge or code-based evaluation |
| Online Eval Config | Continuous evaluation pipeline for deployed agents |
| Policy | Cedar authorization policies for gateway tools |

### Agent Types

- **Template agents**: Created from framework templates (Strands, LangChain/LangGraph, GoogleADK, OpenAI Agents, Autogen)
- **BYO agents**: Bring your own code with `agentcore add agent --type byo`
- **Import agents**: Import existing Bedrock agents with `agentcore import`

### Build Types

- **CodeZip**: Python source packaged as a zip and deployed directly to AgentCore Runtime
- **Container**: Docker image built via CodeBuild (ARM64), pushed to ECR, and deployed to AgentCore Runtime

## Documentation

- [AgentCore CLI](https://github.com/aws/agentcore-cli)
- [AgentCore CDK Constructs](https://github.com/aws/agentcore-l3-cdk-constructs)
- [Amazon Bedrock AgentCore](https://aws.amazon.com/bedrock/agentcore/)
