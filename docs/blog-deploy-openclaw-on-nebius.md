# From prototype to production: Deploying OpenClaw agents on Nebius Cloud

*Your agent demo works perfectly on localhost. Then you ship it — and everything breaks. Here's how to deploy production-grade OpenClaw agents on Nebius serverless endpoints, using Token Factory for inference, without managing a single GPU.*

**Reading time:** ~12 minutes
**Author:** Colin Lowenberg
**Tags:** OpenClaw, AI Agents, Serverless, Token Factory, NemoClaw, Production Deployment

---

## The production problem

Agent demo apps work great on your laptop. You pick a model, wire up some tools, test a few prompts, and everything feels magical. Then you try to ship it to real users, and a different set of problems shows up: GPU provisioning, container orchestration, model weight management, WebSocket networking, secret rotation, health monitoring, and keeping the whole thing running at 3 AM when a user in another timezone sends a message.

Most teams hit the same wall. The agent logic is maybe 20% of the work. The other 80% is infrastructure — and it's the part nobody planned for.

This guide walks through a deployment approach that eliminates most of that infrastructure burden. We'll deploy [OpenClaw](https://openclaw.ai) agents on [Nebius AI Cloud](https://nebius.com/ai-cloud) serverless endpoints, separating the agent runtime (CPU) from inference (GPU), and automating the deployment pipeline with scripts, a web UI, and managed secrets.

## What is OpenClaw?

OpenClaw is an open-source AI agent platform with a distinctive architecture: it separates agent orchestration from model inference. The OpenClaw Gateway handles everything except thinking — WebSocket communication, channel integrations (Telegram, WhatsApp, Discord, Signal, iMessage), session management, cron scheduling, tool execution, and a web-based Control UI dashboard.

The inference — the LLM "thinking" part — is delegated to a configurable backend. This is the key insight that makes serverless CPU deployment possible. The agent runtime runs on a lightweight CPU instance. The heavy computation happens elsewhere, on purpose-built GPU infrastructure.

For teams evaluating agent frameworks, this matters because it decouples your infrastructure decisions from your framework choice. You can start with OpenClaw on the cheapest CPU instance available and scale the inference backend independently.

## Architecture: separating agent from inference

The deployment pattern we use looks like this:

| Component | Runs on | Port | Purpose |
|-----------|---------|------|---------|
| **OpenClaw Gateway** | Nebius CPU endpoint (2 vCPUs, 8 GiB) | 18789 | Agent orchestration, sessions, channels, Control UI |
| **Health Check** | Same CPU endpoint | 8080 | Readiness probe for Nebius platform |
| **Token Factory** | Nebius GPU cluster | — | LLM inference via API (GLM-5, DeepSeek-R1, MiniMax-M2.5) |

The OpenClaw container is a Node.js application with two processes:

1. **The Gateway** (port 18789) — a WebSocket server that manages agent sessions, routes messages, and hosts the Control UI dashboard. This is where clients connect, whether through the TUI, a web browser, or channel integrations.

2. **The Health Check** (port 8080) — a lightweight Python HTTP server that responds to Nebius readiness probes. Nebius polls this endpoint periodically and restarts the container if it stops responding.

The entire container runs on `cpu-e2` (Intel Ice Lake) with 2 vCPUs and 8 GiB RAM — the smallest preset Nebius offers. No GPU allocation needed.

### Why Token Factory for inference?

[Token Factory](https://tokenfactory.nebius.com) provides an OpenAI-compatible API backed by Nebius GPU clusters. Instead of provisioning and managing GPU instances, you make API calls. Token Factory handles model loading, batching, scaling, and hardware — you pay per token.

Available models include `zai-org/GLM-5`, `deepseek-ai/DeepSeek-R1-0528`, `zai-org/GLM-4.5`, and `MiniMaxAI/MiniMax-M2.5`, among others. New models are added regularly.

For agent workloads, this is a natural fit. Agent orchestration is CPU-bound (routing messages, managing sessions, executing tools). Inference is GPU-bound but bursty — you need it when the agent "thinks," not continuously. Paying per token instead of reserving GPU instances can reduce costs significantly for typical agent traffic patterns.

## Deploying OpenClaw: three paths

We provide three deployment methods, depending on your preference for automation vs. control.

### Path 1: One-command script

The fastest option. A single script handles registry creation, Docker build, image push, and endpoint creation:

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-openclaw-serverless.sh
```

The script performs five steps automatically:

**Step 1 — Registry.** Creates a Nebius Container Registry if one doesn't exist. The registry stores your Docker images in the same region as your endpoints.

**Step 2 — Build.** Builds a `linux/amd64` Docker image based on `node:22-slim` with OpenClaw installed globally. The entrypoint script reads configuration from environment variables at startup, so the same image works across different models and API keys.

**Step 3 — Push.** Authenticates with the Nebius registry using a short-lived IAM token and pushes the image.

**Step 4 — Deploy.** Creates a serverless endpoint with the correct CPU platform for the target region, exposed ports (8080 + 18789), environment variables, and an SSH key for terminal access.

**Step 5 — Wait.** Polls the endpoint state every 10 seconds until it reaches `RUNNING`, then prints connection details.

> **A note on registry IDs:** The Nebius CLI returns registry IDs prefixed with `registry-` (e.g., `registry-u00wtpem36bva2zhc8`), but Docker image URLs use only the bare ID (`u00wtpem36bva2zhc8`). Our scripts strip this prefix automatically. If you're building your own deployment tooling, this is an easy mistake that produces a confusing "repository name not known to registry" error during `docker push`.

### Path 2: Pre-built public image

If you want to skip the Docker build entirely, we publish images to GitHub Container Registry:

```bash
docker pull ghcr.io/colygon/openclaw-serverless:latest
docker pull ghcr.io/colygon/nemoclaw-serverless:latest
```

Deploy the pre-built image directly:

```bash
nebius ai endpoint create \
  --name my-agent \
  --image ghcr.io/colygon/openclaw-serverless:latest \
  --platform cpu-e2 \
  --preset 2vcpu-8gb \
  --container-port 8080 \
  --container-port 18789 \
  --env "TOKEN_FACTORY_API_KEY=v1.xxx..." \
  --env "INFERENCE_MODEL=zai-org/GLM-5" \
  --env "OPENCLAW_WEB_PASSWORD=$(openssl rand -hex 16)" \
  --public \
  --ssh-key "$(cat ~/.ssh/id_ed25519.pub)"
```

### Path 3: Web Deploy UI

For teams that prefer a visual interface, we built a web-based Deploy UI — a Node.js application that wraps the Nebius CLI in a browser-friendly wizard:

1. **Choose Agent** — OpenClaw (lightweight) or NemoClaw (with NVIDIA plugin)
2. **Choose Model** — GLM-5, MiniMax-M2.5, or browse all Token Factory models
3. **Choose Region** — EU North (Finland), EU West (Paris), or US Central
4. **Choose API Provider** — Token Factory, OpenRouter, or HuggingFace (all routed through Nebius)
5. **Configure** — Endpoint name, API key (auto-loaded from MysteryBox), deploy

The Deploy UI also provides endpoint management: health status badges, start/stop controls, a built-in SSH terminal, and a dashboard proxy for the OpenClaw Control UI.

The UI runs on a Nebius VM with the `nebius` CLI installed:

```bash
git clone https://github.com/colygon/openclaw-deploy.git
cd openclaw-deploy
./setup-vm.sh
```

## Region and platform mapping

Nebius operates in three regions, each with a different CPU platform. Using the wrong platform for a region is a silent deployment failure — the endpoint will be created but fail to start:

| Region | Location | CPU Platform | Notes |
|--------|----------|-------------|-------|
| `eu-north1` | Finland | `cpu-e2` (Intel Ice Lake) | Lowest latency to Northern Europe |
| `eu-west1` | Paris | `cpu-d3` (AMD EPYC) | Different CPU architecture |
| `us-central1` | United States | `cpu-e2` (Intel Ice Lake) | US-based workloads |

Our install scripts detect the region and select the correct platform automatically. If you're deploying manually, make sure the `--platform` flag matches.

## Connecting to your agent

Once the endpoint is running, there are three ways to interact with it.

### OpenClaw TUI

The terminal interface connects via WebSocket. For security, OpenClaw blocks plaintext `ws://` connections to non-localhost addresses. Use an SSH tunnel:

```bash
ssh -f -N -L 28789:<endpoint-ip>:18789 nebius@<your-vm-ip>
openclaw tui --url ws://localhost:28789 --token <your-token>
```

On first connection, the gateway will request **device pairing** — a security feature where new devices must be approved. Approve it from the gateway host:

```bash
ssh nebius@<endpoint-ip> "sudo docker exec \$(sudo docker ps -q | head -1) \
  openclaw devices approve --latest"
```

### Control UI dashboard

The web dashboard provides session management, usage statistics, cron job configuration, and a chat interface:

```
http://<endpoint-ip>:18789/#token=<your-token>
```

> **Secure context requirement:** The Control UI uses browser crypto APIs that require HTTPS or localhost. When accessing via HTTP from a remote IP, you'll see "control UI requires device identity." Use the Deploy UI's HTTPS proxy, an SSH tunnel, or Tailscale Serve for remote access.

### Channel integrations

OpenClaw supports connecting to messaging platforms. Configure channels in `openclaw.json`:

- **Telegram** — Bot token via BotFather
- **WhatsApp** — Via WhatsApp Web bridge
- **Discord** — Bot application token
- **Signal** — Via signal-cli

## Secrets management with MysteryBox

Hardcoding API keys in environment variables works for testing. For production, Nebius provides [MysteryBox](https://console.nebius.com/mysterybox), a managed secrets service.

Store a secret:

```bash
nebius mysterybox secret create \
  --name token-factory-key \
  --parent-id <project-id> \
  --secret-version-payload \
    '[{"key":"TOKEN_FACTORY_API_KEY","string_value":"v1.xxx..."}]'
```

Retrieve it:

```bash
nebius mysterybox payload get --secret-id <secret-id>
```

The Deploy UI integrates with MysteryBox directly. Secrets load automatically in the Configure step — no button click needed. You can also save new API keys to MysteryBox from the UI, and they're available for future deployments.

## NemoClaw: adding the NVIDIA plugin

[NemoClaw](https://github.com/NVIDIA/NemoClaw) extends OpenClaw with NVIDIA's agent capabilities: sandbox execution, enhanced tool orchestration, and planning. The deployment follows the same pattern with specific build requirements.

### Build differences

| | OpenClaw | NemoClaw |
|---|---|---|
| **Base image** | `node:22-slim` | `node:22` (full — needs build tools) |
| **npm install** | Standard | `--ignore-scripts` required |
| **Image size** | ~400 MB | ~1.1 GB |
| **Plugin config** | None needed | Loaded automatically via npm global |

The `--ignore-scripts` flag is needed because `@whiskeysockets/baileys` (a NemoClaw dependency) has a post-install script that fails inside Docker BuildKit. The plugin still works correctly without it.

### Deploy NemoClaw

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-nemoclaw-serverless.sh
```

Or use the public image: `ghcr.io/colygon/nemoclaw-serverless:latest`

## Common failure modes and fixes

Through building and testing this deployment pipeline, we encountered every failure mode listed below. Each one cost us time. Documenting them here so they don't cost you time.

### Gateway crashes silently

**Symptom:** Health check on port 8080 returns `healthy`, but port 18789 is unresponsive.

**Cause:** The gateway process crashed but the health check (PID 1) keeps running. Common triggers:
- Invalid `openclaw.json` (e.g., adding a `plugins` key — not a valid config key)
- Model ID not found on Token Factory (404 error from inference)

**Fix:** SSH into the endpoint and check the gateway log:
```bash
sudo docker exec $(sudo docker ps -q | head -1) cat /tmp/gateway.log
```

### Token mismatch after gateway restart

**Symptom:** "unauthorized: gateway token mismatch" when connecting.

**Cause:** The gateway token was set only as an environment variable. When the gateway is manually restarted inside the container, the env var scope changes and the token is lost.

**Fix:** Set the token in the `openclaw.json` config file (the `auth.token` field). The config file is the source of truth that survives process restarts. Our entrypoint scripts now set it in both places.

### Wrong model ID format

**Symptom:** "404 status code (no body)" when the agent tries to respond.

**Cause:** Token Factory uses its own model IDs (e.g., `zai-org/GLM-5`), not HuggingFace IDs (e.g., `THUDM/GLM-4-9B-0414`). The naming convention differs.

**Fix:** List available models:
```bash
curl -s https://api.tokenfactory.nebius.com/v1/models \
  -H "Authorization: Bearer $TOKEN_FACTORY_API_KEY" | python3 -c \
  "import json,sys; [print(m['id']) for m in json.load(sys.stdin)['data']]"
```

### Docker push fails with "repository name not known"

**Symptom:** `docker push` fails after successful build and login.

**Cause:** The registry ID from `nebius registry list` includes a `registry-` prefix that must be stripped from the Docker image URL.

**Fix:** Strip the prefix: `REGISTRY_ID="${REGISTRY_ID#registry-}"`

### "Origin not allowed" on dashboard

**Symptom:** Control UI displays "origin not allowed" error.

**Cause:** The gateway's `controlUi.allowedOrigins` only permits localhost by default. Any proxy, port forward, or non-localhost access is blocked.

**Fix:** Set `allowedOrigins` to `["*"]` in the gateway config or via:
```bash
openclaw config set gateway.controlUi.allowedOrigins '["*"]'
```

### Port 18789 not accessible

**Symptom:** Health check works (port 8080), but gateway port 18789 is unreachable from outside.

**Cause:** Port 18789 is exposed inside the Docker container but not mapped to the host. The `EXPOSE` directive in a Dockerfile doesn't map ports — you need `--container-port 18789` in the `nebius ai endpoint create` command.

**Fix:** Include both ports: `--container-port 8080 --container-port 18789`

## Production deployment checklist

Before going live, verify:

- [ ] **Token Factory API key** is stored in MysteryBox (not hardcoded in scripts)
- [ ] **Gateway token** is set in both the config file and `OPENCLAW_WEB_PASSWORD` env var
- [ ] **Both ports exposed** — 8080 (health) and 18789 (gateway) via `--container-port`
- [ ] **Correct CPU platform** for your target region (cpu-e2 for Finland/US, cpu-d3 for Paris)
- [ ] **SSH key authorized** on the endpoint for terminal access and debugging
- [ ] **Model ID** matches Token Factory format (check with the models API)
- [ ] **`allowedOrigins`** includes `"*"` if accessing the dashboard through a proxy
- [ ] **Health check tested** — `curl http://<ip>:8080` returns `{"status":"healthy"}`
- [ ] **Gateway tested** — TUI connects and receives a response from the model
- [ ] **No `plugins` key** in `openclaw.json` (crashes the gateway)

## What's next

This deployment pattern — CPU agent with cloud inference — is a starting point. From here, teams can:

- **Add channel integrations** to connect the agent to Telegram, WhatsApp, Discord, or Signal for real-time user interaction
- **Deploy across regions** (Finland, Paris, US) for low-latency global coverage with the same Docker image
- **Use the Nebius Skill for Claude Code** ([github.com/colygon/nebius-skill](https://github.com/colygon/nebius-skill)) to manage cloud infrastructure via natural language — deploy endpoints, rotate secrets, monitor health, all from a chat interface
- **Connect to physical robotics** like the LaRobot SO-101 robot arms, using cloud-powered inference for real-time decision making

All the deployment scripts, Docker images, and the Deploy UI are open source: [github.com/colygon/openclaw-deploy](https://github.com/colygon/openclaw-deploy).

## Getting started

1. [Create a Token Factory API key](https://tokenfactory.nebius.com)
2. [Install the Nebius CLI](https://docs.nebius.com/cli/install)
3. Run the install script — your agent will be live in under five minutes

For deeper dives into specific topics, check out the [ClawCamp workshop series](https://github.com/colygon/clawcamp) covering multi-region deployments, NemoClaw, the Nebius Skill, and physical robotics.

---

*[Nebius AI Cloud](https://nebius.com/ai-cloud) provides scalable infrastructure for AI workloads. [Token Factory](https://tokenfactory.nebius.com) offers GPU-backed inference without hardware management. Together, they handle the 80% of agent deployment that isn't agent logic.*
