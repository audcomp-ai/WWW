#!/bin/bash
# Deploys Finn to AWS Bedrock AgentCore.
#
# Finn is the website's content editor: it reads this repo's app/**/page.tsx,
# scores the copy against the Audcomp voice spec, and queues field-level
# rewrites for human review. Approved changes come back as a pull request
# against this repo. Finn never writes to a branch you have not reviewed.
#
# The agent runs on AgentCore, not in the Next.js app, so its spend and safety
# controls (daily USD cap, circuit breaker, token accounting, Bedrock guardrail)
# live with the rest of the Wilfred platform. Review happens in AIOS.
#
# Two environment traps this handles, both of which fail confusingly:
#   1. ESBUILD_BINARY_PATH — the AgentCore CLI's bundled darwin-arm64 esbuild is
#      missing, so it must be pointed at a real one.
#   2. `agentcore` not on PATH — this script runs in a NON-interactive bash,
#      which never sources the shell profile that initialises nvm. It is also
#      selected by CLI version, not node version: node v24 here carries
#      agentcore 0.21.1 while node v22 carries 0.25.0.
set -euo pipefail

HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HERE/app/Finn"

ESBUILD="$HOME/.esbuild-agentcore/node_modules/@esbuild/darwin-arm64/bin/esbuild"
if [ ! -x "$ESBUILD" ]; then
  echo "ERROR: no esbuild at $ESBUILD"
  echo "  mkdir -p ~/.esbuild-agentcore && cd ~/.esbuild-agentcore && npm i @esbuild/darwin-arm64"
  exit 1
fi
export ESBUILD_BINARY_PATH="$ESBUILD"
echo "==> esbuild: $($ESBUILD --version)"

AGENTCORE="$(command -v agentcore || true)"
if [ -z "$AGENTCORE" ]; then
  BEST_V=""
  for cand in "$HOME"/.nvm/versions/node/*/bin; do
    [ -x "$cand/agentcore" ] || continue
    v="$(PATH="$cand:$PATH" "$cand/agentcore" --version 2>/dev/null | head -1)"
    [ -n "$v" ] || continue
    if [ -z "$BEST_V" ] || [ "$(printf '%s\n%s\n' "$BEST_V" "$v" | sort -V | tail -1)" = "$v" ]; then
      BEST_V="$v"; AGENTCORE="$cand/agentcore"
    fi
  done
fi
[ -n "$AGENTCORE" ] || { echo "ERROR: agentcore CLI not found. Install: npm i -g @aws/agentcore"; exit 1; }
export PATH="$(dirname "$AGENTCORE"):$PATH"
echo "==> agentcore: v$("$AGENTCORE" --version 2>/dev/null | head -1), node $(node --version)"

cd "$APP"
if [ ! -d node_modules ] || [ ! -x node_modules/.bin/tsc ]; then
  # Dev deps included on purpose: tsc and esbuild are needed to gate and build.
  # They never reach the artifact — CodeZip bundles from the entrypoint, so only
  # what src actually imports is packaged.
  echo "==> Installing agent dependencies"
  npm install --no-audit --no-fund --silent
fi

echo "==> Typecheck (gate: never ship a bundle that does not compile)"
./node_modules/.bin/tsc --noEmit

echo "==> Build"
npm run build

# CodeZip bundles the agent with esbuild, which must resolve the whole dependency
# graph. npm's tree is flat and real, so this should always be 0 here — the check
# exists because a symlinked tree (e.g. if someone runs pnpm in this directory)
# produces a bundle that deploys fine and then dies at runtime with
# "Cannot find module @fastify/sse".
LINKS=$(find node_modules -maxdepth 2 -type l -not -path '*/.bin/*' | wc -l | tr -d ' ')
echo "==> node_modules symlinks: $LINKS (must be 0)"
[ "$LINKS" = "0" ] || { echo "ERROR: symlinked deps present. Remove node_modules and run 'npm install'."; exit 1; }

echo "==> agentcore deploy ${*:-(interactive)}"
cd "$HERE"
if "$AGENTCORE" deploy "$@"; then
  echo
  echo "==> Deploy finished. Runtime ARN:"
  python3 -c "
import json
d=json.load(open('$HERE/agentcore/.cli/deployed-state.json'))
def walk(o):
    if isinstance(o,dict):
        for k,v in o.items():
            if 'runtime' in k.lower() and isinstance(v,str) and v.startswith('arn:'): print('   ',v)
            else: walk(v)
    elif isinstance(o,list):
        for i in o: walk(i)
walk(d)
" 2>/dev/null || echo "    (see agentcore/.cli/deployed-state.json)"
else
  echo
  echo "==> DEPLOY FAILED. Newest log:"
  ls -t "$HERE"/agentcore/.cli/logs/deploy/*.log 2>/dev/null | head -1 | sed 's/^/    /'
  exit 1
fi
