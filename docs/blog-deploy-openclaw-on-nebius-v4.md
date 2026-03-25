# The complete guide to deploying OpenClaw AI agents on Nebius Cloud

*Your agent demo works perfectly on localhost. Then you ship it — and everything breaks. Here's how to go from prototype to production with OpenClaw on Nebius, using Token Factory for inference, without managing a single GPU.*

**Reading time:** ~18 minutes
**Author:** Colin Lowenberg
**Tags:** OpenClaw, NemoClaw, AI Agents, Nebius Cloud, Serverless, Token Factory, Production Deployment

---

## The production problem

Agent demo apps work great on your laptop. You pick a model, wire up some tools, test a few prompts, and everything works. Then you try to ship it to real users, and a different set of problems shows up: GPU provisioning, container orchestration, model weight management, WebSocket networking, secret rotation, and health monitoring. And then there's keeping the whole thing running at 3 AM when a user in another timezone sends a message.

Most teams hit the same wall. The agent logic is maybe 20% of the work. The other 80% is infrastructure — and it's the part nobody planned for. (Nebius covers this gap well in their guide to [launching production-grade agents at scale](https://nebius.com/blog/posts/launch-production-agents-at-scale).)

This guide covers how to eliminate most of that infrastructure burden. We'll deploy [OpenClaw](https://openclaw.ai) agents on [Nebius AI Cloud](https://nebius.com/ai-cloud) serverless endpoints, walk through four deployment methods (console UI, install scripts, CLI, and a web-based Deploy UI), cover the NemoClaw NVIDIA variant, and document every failure mode we encountered along the way.

## What is OpenClaw?

OpenClaw is an open-source AI agent platform with a distinctive architecture: it separates agent orchestration from model inference.

The OpenClaw Gateway handles everything except thinking. That includes WebSocket communication, channel integrations (Telegram, WhatsApp, Discord, Signal, iMessage), session management, cron scheduling, tool execution, and a web-based Control UI dashboard.

The inference — the LLM "thinking" part — is delegated to a configurable backend. This is the key insight that makes serverless CPU deployment possible. The agent runtime runs on a lightweight CPU instance. The heavy computation happens elsewhere, on [purpose-built GPU infrastructure](https://nebius.com/blog/posts/what-is-ai-cloud) — on purpose.

For teams evaluating agent frameworks, this matters because it decouples your infrastructure decisions from your framework choice. You can start with OpenClaw on the cheapest CPU instance available and scale the inference backend independently.

> **Prefer natural language over CLI?** The [Nebius Skill for Claude Code](https://github.com/colygon/nebius-skill) lets you deploy and manage OpenClaw endpoints conversationally — "deploy an OpenClaw agent in EU North with GLM-5" translates to the right `nebius` CLI commands automatically.

## Three ways to run OpenClaw on Nebius

OpenClaw's separation of agent orchestration from model inference gives you flexibility in how you deploy. Nebius supports all three patterns:

### Option 1: OpenClaw + Token Factory (anywhere)

**Best for:** Getting started, development, evaluation

Run OpenClaw on any machine — your laptop, a VM, a Raspberry Pi — and point it at [Token Factory](https://tokenfactory.nebius.com) for inference. No container, no cloud endpoint. Just install OpenClaw, configure a Token Factory API key, and start chatting.

This is the simplest path. You pay only for Token Factory inference tokens. The agent runs wherever Node.js runs.

### Option 2: OpenClaw on Nebius Serverless CPU + Token Factory

**Best for:** Production deployments, always-on agents, multi-channel bots

Deploy OpenClaw as a containerized serverless endpoint on Nebius using a lightweight CPU instance (2 vCPUs, 8 GiB RAM). The agent handles orchestration, sessions, and channel integrations. Token Factory provides the inference. You pay per-second for the CPU instance plus per-token for inference.

This is the pattern this guide focuses on. It gives you a production-grade, always-available agent with WebSocket connectivity, a Control UI dashboard, health monitoring, and channel integrations — all running on the cheapest instance Nebius offers. The heavy lifting (GPU inference) is handled by Token Factory's managed infrastructure.

### Option 3: OpenClaw on Nebius Serverless GPU — self-contained

**Best for:** Custom-trained models, data privacy requirements, maximum control

Deploy OpenClaw alongside a local LLM (via llama.cpp, vLLM, or similar) in a single GPU-powered container. Everything runs inside one endpoint — no external API calls for inference. This is ideal when you need to run a custom fine-tuned model, keep data within a single security boundary, or require deterministic inference behavior.

A key benefit of this approach is **predictable cost**. Instead of variable per-token pricing, you get a fixed hourly rate for the GPU instance — and since it's a serverless endpoint, Nebius can automatically pause it when it's not in use. You only pay for the time the agent is actually running.

For this option, we recommend a GPU preset with sufficient VRAM for your model, or for CPU-only quantized inference, at least 32 vCPUs and 128 GiB RAM. [NemoClaw](https://github.com/NVIDIA/NemoClaw) by NVIDIA is specifically designed for this pattern — bundling agent orchestration with local LLM inference on local GPUs.

### Comparison

| | Option 1 | Option 2 | Option 3 |
|---|---|---|---|
| **Runs on** | BYO CPU — run OpenClaw anywhere | Nebius CPU endpoint | Nebius GPU endpoint |
| **Inference** | Token Factory for inference | Token Factory for inference | Local model running on a cloud-hosted GPU |
| **GPU needed** | No | No | Yes |
| **Cost model** | Token Factory tokens only | CPU time + tokens | Predictable hourly GPU rate, auto-pauses when idle |
| **Setup complexity** | Low | Medium | Low |
| **Best for** | Dev/eval | Production agents | Custom models, air-gapped |
| **Container image** | N/A (local install) | `openclaw-serverless` | `nemoclaw-serverless` |

---

## Architecture: Option 2 in detail

The rest of this guide covers **Option 2** — the CPU serverless endpoint with Token Factory inference. Here's what the deployment looks like:

| Component | Runs on | Port | Purpose |
|-----------|---------|------|---------|
| **OpenClaw Gateway** | Nebius CPU endpoint (2 vCPUs, 8 GiB) | 18789 | Agent orchestration, sessions, channels, Control UI |
| **Health Check** | Same CPU endpoint | 8080 | Readiness probe for Nebius platform |
| **Token Factory** | Nebius GPU cluster | — | LLM inference via API (GLM-5, DeepSeek-R1, MiniMax-M2.5) |

```
┌─────────────────────────────────────────────────┐
│  Nebius Serverless Endpoint (cpu-e2, 2vCPU/8GB) │
│                                                  │
│  ┌────────────────┐  ┌───────────────────────┐  │
│  │ Health Check    │  │ OpenClaw Gateway       │  │
│  │ :8080           │  │ :18789                 │  │
│  │ (Python HTTP)   │  │ (WebSocket + Dashboard)│  │
│  └────────────────┘  └──────────┬────────────┘  │
│                                  │               │
└──────────────────────────────────┼───────────────┘
                                   │ API calls
                          ┌────────▼────────┐
                          │  Token Factory   │
                          │  (GPU inference) │
                          │  zai-org/GLM-5   │
                          └─────────────────┘
```

The container has two processes:

1. **The Gateway** (port 18789) — a WebSocket server that manages agent sessions, routes messages, and hosts the Control UI dashboard. Clients connect here via the TUI, a web browser, or channel integrations.

2. **The Health Check** (port 8080) — a lightweight Python HTTP server that responds to Nebius readiness probes. Nebius polls this endpoint and restarts the container if it stops responding.

Even the smallest CPU preset (2 vCPUs, 8 GiB RAM) handles OpenClaw comfortably because all inference is offloaded to Token Factory.

### Why Token Factory for inference

[Token Factory](https://tokenfactory.nebius.com) provides an [OpenAI-compatible API](https://nebius.com/blog/posts/launch-production-agents-at-scale) backed by Nebius GPU clusters, with access to more than 30 open-source models. Instead of provisioning GPU instances, you make API calls. Token Factory handles model loading, batching, scaling, and the underlying hardware — you pay per token.

For agent workloads, this is a natural fit. Agent orchestration is CPU-bound (routing messages, managing sessions, executing tools). Inference is GPU-bound but bursty — you need it when the agent "thinks," not continuously, where bursts of inference are separated by idle periods. Paying per token instead of reserving GPU instances can reduce costs significantly for this traffic pattern.

Available models include:

| Model ID | Description |
|----------|-------------|
| `zai-org/GLM-5` | Latest GLM model from Zhipu AI — strong general-purpose reasoning |
| `deepseek-ai/DeepSeek-R1-0528` | DeepSeek's reasoning model — good for complex tasks |
| `zai-org/GLM-4.5` | Lighter GLM variant — faster responses |
| `MiniMaxAI/MiniMax-M2.5` | MiniMax model — fast, powerful open-source |

> **Model ID format matters.** Token Factory uses its own model IDs (e.g., `zai-org/GLM-5`), not HuggingFace IDs (e.g., `THUDM/GLM-4-9B-0414`). Using the wrong format results in a silent `404` error when the agent tries to respond. [See failure modes below.](#wrong-model-id-format)

## Region and CPU platform mapping

Nebius operates in three regions, each with a different CPU platform. Using the wrong platform for a region is a silent deployment failure — the endpoint will be created but fail to start:

| Region | Location | CPU Platform | Notes |
|--------|----------|-------------|-------|
| `eu-north1` | Finland | `cpu-e2` (Intel Ice Lake) | Lowest latency to Northern Europe |
| `eu-west1` | Paris | `cpu-d3` (AMD EPYC) | Different CPU architecture |
| `us-central1` | United States | `cpu-e2` (Intel Ice Lake) | US-based workloads |

Our install scripts detect the region and select the correct platform automatically. If deploying manually via the console or CLI, make sure the platform matches your region.

## Prerequisites

All deployment methods require:

- A [Nebius AI Cloud](https://console.nebius.com) account
- A [Token Factory](https://tokenfactory.nebius.com) API key

For CLI-based methods, you'll also need:

- The [Nebius CLI](https://docs.nebius.com/cli/install) (install script and manual CLI)
- [Docker](https://docs.docker.com/get-docker/) (install script only — not needed if using the pre-built public image)

Install the Nebius CLI:

```bash
curl -sSL https://storage.ai.nebius.cloud/nebius/install.sh | bash
nebius iam login
```

## Storing secrets with MysteryBox

Before deploying, store your API key in [MysteryBox](https://console.nebius.com/mysterybox), Nebius's managed secrets service — rather than hardcoding it in scripts or environment variables.

```bash
nebius mysterybox secret create \
  --name token-factory-key \
  --parent-id <project-id> \
  --secret-version-payload \
    '[{"key":"TOKEN_FACTORY_API_KEY","string_value":"v1.xxx..."}]'
```

Find your `<project-id>` with `nebius iam project list`. Retrieve a secret later with `nebius mysterybox payload get --secret-id <secret-id>`.

You can also manage secrets through the [Nebius console](https://console.nebius.com/mysterybox) — navigate to MysteryBox in the sidebar, create a secret, and add your key as a payload entry. The Deploy UI integrates with MysteryBox directly — secrets load automatically and you can save new keys from the browser.

---

## Deploying OpenClaw: four methods

We provide four deployment methods, from zero-install to fully automated.

### Method 1: Nebius AI Cloud console (no CLI required)

The lowest barrier to entry. No Docker, no CLI, no local tooling — just a browser.

**Step 1.** Navigate to [console.nebius.com](https://console.nebius.com) → **Serverless AI** → **Endpoints** → **Create endpoint**.

**Step 2.** Configure the endpoint:

| Field | Value |
|-------|-------|
| **Name** | `openclaw-agent` |
| **Image** | `ghcr.io/colygon/openclaw-serverless:latest` |
| **Platform** | `cpu-e2` (or `cpu-d3` for EU West) |
| **Preset** | `2vcpu-8gb` |
| **Container ports** | `8080`, `18789` |
| **Public IP** | Enabled |
| **Disk size** | `250Gi` |

**Step 3.** Add environment variables:

| Variable | Value |
|----------|-------|
| `TOKEN_FACTORY_API_KEY` | `v1.xxx...` (your Token Factory key) |
| `TOKEN_FACTORY_URL` | `https://api.tokenfactory.nebius.com/v1` |
| `INFERENCE_MODEL` | `zai-org/GLM-5` |
| `OPENCLAW_WEB_PASSWORD` | A random string (e.g., `openssl rand -hex 16`) |

**Step 4.** Optionally paste your SSH public key for debugging access.

**Step 5.** Click **Create**. Wait 1-3 minutes for **Provisioning** → **Starting** → **Running**.

> **Important:** Both container ports (8080 and 18789) must be explicitly added. The Dockerfile's `EXPOSE` directive alone doesn't map ports externally. If port 18789 is missing, the health check will work but the gateway will be unreachable.

### Method 2: One-command install script

The fastest CLI approach. A single script handles registry, Docker build, push, and deployment:

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-openclaw-serverless.sh
```

> Review the script first if you prefer: `curl -sL https://raw.githubusercontent.com/colygon/openclaw-deploy/main/install-openclaw-serverless.sh`

The script performs five steps:

1. **Registry** — creates a Nebius Container Registry if one doesn't exist
2. **Build** — builds a `linux/amd64` Docker image based on `node:22-slim` with OpenClaw installed globally. If you're building on an ARM Mac, Docker handles cross-compilation automatically.
3. **Push** — authenticates with the Nebius registry using a short-lived IAM token
4. **Deploy** — creates a serverless endpoint with the correct CPU platform, exposed ports (8080 + 18789), environment variables, and SSH key
5. **Wait** — polls every 10 seconds until `RUNNING`, then prints connection details

### Method 3: Manual CLI with pre-built image

Skip the Docker build entirely using our public images from GitHub Container Registry:

```bash
nebius ai endpoint create \
  --name my-agent \
  --image ghcr.io/colygon/openclaw-serverless:latest \
  --platform cpu-e2 \
  --preset 2vcpu-8gb \
  --container-port 8080 \
  --container-port 18789 \
  --disk-size 250Gi \
  --env "TOKEN_FACTORY_API_KEY={insert your Token Factory API key}" \
  --env "TOKEN_FACTORY_URL=https://api.tokenfactory.nebius.com/v1" \
  --env "INFERENCE_MODEL=zai-org/GLM-5" \
  --env "OPENCLAW_WEB_PASSWORD={insert your password}" \
  --public \
  --ssh-key "$(cat ~/.ssh/id_ed25519.pub)"
```

Key flags: `--public` assigns a public IP. `--container-port` must be specified for each port. `--ssh-key` enables terminal access for debugging — useful but optional.

### Method 4: Self-hosted Deploy UI

For teams that prefer a visual workflow, we built a self-hosted Deploy UI — a Node.js app that wraps the Nebius CLI in a browser-friendly wizard:

1. **Choose Agent** — OpenClaw or NemoClaw (with NVIDIA plugin)
2. **Choose Model** — GLM-5, MiniMax-M2.5, or browse all Token Factory models
3. **Choose Region** — EU North, EU West, or US Central
4. **Choose API Provider** — Token Factory, OpenRouter, or HuggingFace (all routed through Nebius)
5. **Configure** — Endpoint name, API key (auto-loaded from MysteryBox), deploy

The Deploy UI also provides endpoint management: health status badges, start/stop controls, expandable endpoint details, and a dashboard proxy for the OpenClaw Control UI.

```bash
git clone https://github.com/colygon/openclaw-deploy.git
cd openclaw-deploy
./setup-vm.sh
```

This installs Node.js, the Nebius CLI, nginx with HTTPS, and configures a systemd service on a Nebius VM. The UI is then accessible at `https://<vm-ip>`.

### Method 5: Nebius Skill for Claude Code

If you use [Claude Code](https://claude.ai/claude-code), the [Nebius Skill](https://github.com/colygon/nebius-skill) lets you deploy and manage endpoints entirely through natural language:

```
> Deploy an OpenClaw agent in EU North with GLM-5
```

Claude Code translates this into the correct `nebius` CLI commands — creating the endpoint with the right platform, ports, environment variables, and SSH key. No need to remember flags or look up region-to-platform mappings.

You can also manage running endpoints conversationally:

```
> List my running endpoints
> Stop the openclaw-agent endpoint
> Show me the gateway logs for nemoclaw-serverless
```

Install the skill by cloning [github.com/colygon/nebius-skill](https://github.com/colygon/nebius-skill) and adding it to your Claude Code configuration. The Nebius CLI must be installed and authenticated on the same machine.

---

## Connecting to your agent

Once the endpoint shows **Running**, find its public IP and verify the deployment.

### Test the health check

```bash
curl http://<public-ip>:8080
```

Expected response:
```json
{
  "status": "healthy",
  "service": "openclaw-serverless",
  "model": "zai-org/GLM-5",
  "inference": "token-factory",
  "gateway_port": 18789
}
```

### OpenClaw TUI (terminal interface)

The TUI connects via WebSocket. For security, OpenClaw blocks plaintext `ws://` connections to non-localhost addresses. Use an SSH tunnel:

```bash
# Create a background tunnel: forwards local port 28789 to
# the endpoint's gateway port (18789)
ssh -f -N -L 28789:<endpoint-ip>:18789 nebius@<endpoint-ip>

# Connect to the agent
openclaw tui --url ws://localhost:28789 --token <your-OPENCLAW_WEB_PASSWORD>
```

On first connection, the gateway requests **device pairing** — a security feature where new devices must be approved from the gateway host:

```bash
# Approve the pairing request from inside the container
ssh nebius@<endpoint-ip> "sudo docker exec \$(sudo docker ps -q | head -1) \
  openclaw devices approve --latest"
```

### Control UI dashboard

Open the web dashboard for session management, usage, cron jobs, and chat:

```
http://<endpoint-ip>:18789/#token=<your-OPENCLAW_WEB_PASSWORD>
```

> **Secure context note:** The Control UI uses browser crypto APIs that require HTTPS or localhost. If accessing via HTTP from a remote IP, you'll see "control UI requires device identity." Use the Deploy UI's HTTPS proxy, an SSH tunnel (`ssh -f -N -L 28789:<ip>:18789 nebius@<ip>`, then open `http://localhost:28789`), or [Tailscale Serve](https://tailscale.com/kb/1312/serve).

### Channel integrations

OpenClaw supports connecting to messaging platforms. Configure channels in `openclaw.json`:

- **Telegram** — Bot token via BotFather
- **WhatsApp** — Via WhatsApp Web bridge
- **Discord** — Bot application token
- **Signal** — Via signal-cli

See the [OpenClaw documentation](https://docs.openclaw.ai/channels) for setup guides.

---

## OpenClaw and NemoClaw: understanding the relationship

[NemoClaw](https://github.com/NVIDIA/NemoClaw) is an NVIDIA-built plugin that **wraps** OpenClaw — it installs on top of OpenClaw and extends it with additional capabilities. Every NemoClaw deployment is an OpenClaw deployment with NVIDIA's plugin layer added.

Think of it this way: OpenClaw is the agent runtime. NemoClaw adds NVIDIA-specific enhancements — sandbox execution for safe code running, enhanced tool orchestration, and advanced agent planning. If OpenClaw is the engine, NemoClaw is the turbocharger.

### When to use which

| | OpenClaw | NemoClaw |
|---|---|---|
| **What it is** | The core agent platform | NVIDIA plugin that wraps OpenClaw |
| **Relationship** | Standalone | Requires OpenClaw (installed automatically) |
| **Ideal deployment** | **Option 2** — CPU endpoint + Token Factory | **Option 3** — GPU endpoint with local model |
| **GPU needed** | No | Designed for NVIDIA GPUs |
| **Use case** | General-purpose agents, chat bots, multi-channel automation | GPU-accelerated agents, local LLM inference, sandbox execution |
| **Base image** | `node:22-slim` (~400 MB) | `node:22` full (~1.1 GB) |
| **Public image** | `ghcr.io/colygon/openclaw-serverless` | `ghcr.io/colygon/nemoclaw-serverless` |

**OpenClaw alone is the right choice** when you're using Token Factory or any external inference API. It's lightweight, deploys on CPU, and handles production agent workloads with minimal resources.

**NemoClaw is the right choice** when you want to run a local model on NVIDIA GPUs — whether that's a custom fine-tuned model, a model you need to keep within a single security boundary, or a deployment where you want the full stack (agent + inference) in one container. NemoClaw is ideally suited for Option 3: deploying on Nebius GPU endpoints with a local model bundled inside the container.

### Deploy NemoClaw

**Via install script:**
```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-nemoclaw-serverless.sh
```

**Via console or CLI** — use the public image:
```
ghcr.io/colygon/nemoclaw-serverless:latest
```

All other settings (platform, ports, env vars) are identical to OpenClaw.

### NemoClaw configuration gotchas

**Do not add a `plugins` key to `openclaw.json`.** This crashes the gateway on startup with "Config invalid — plugins: Unrecognized key." NemoClaw is loaded automatically when installed globally via npm — no config needed.

**Set the gateway token in both the config file and environment variable.** The config file (`gateway.auth.token` field in `openclaw.json`) is the source of truth that survives gateway restarts. The env var alone is unreliable after manual restarts inside the container.

**Set `allowedOrigins` to include your proxy domain.** Without this, the Control UI displays "origin not allowed" when accessed through any proxy. For development, `["*"]` works. For production, specify your proxy domain.

---

## Managing endpoints

### Health monitoring

Every endpoint exposes a health check on port 8080 that returns JSON status including the model name and inference provider. The Deploy UI displays this as health badges in the endpoint list.

### Start, stop, and delete

**Via CLI:**
```bash
nebius ai endpoint list
nebius ai endpoint stop <endpoint-id>    # Stops billing for compute
nebius ai endpoint start <endpoint-id>
nebius ai endpoint delete <endpoint-id>
```

**Via console:** Use the endpoint actions in the Serverless AI section.

**Via Deploy UI:** Start/Stop buttons and delete option on each endpoint row.

> **Cost note:** Computing resources of stopped endpoints aren't charged, but attached volumes remain billable.

### Debugging

If something goes wrong, SSH into the endpoint and check the gateway log:

```bash
ssh nebius@<endpoint-ip> \
  "sudo docker exec \$(sudo docker ps -q | head -1) cat /tmp/gateway.log"
```

---

## Common failure modes and fixes

Through building and testing this deployment pipeline, we encountered every failure mode listed below. Each one cost us time. Documenting them here so they don't cost you time.

### Gateway crashes silently

**Symptom:** Health check on port 8080 returns `healthy`, but port 18789 is unresponsive.

**Cause:** The gateway process crashed but the health check (PID 1) keeps running. Common triggers: invalid `openclaw.json` (e.g., adding a `plugins` key), or model ID not found on Token Factory.

**Fix:** SSH in and check the gateway log:
```bash
sudo docker exec $(sudo docker ps -q | head -1) cat /tmp/gateway.log
```

### Token mismatch after gateway restart

**Symptom:** "unauthorized: gateway token mismatch" when connecting via TUI or dashboard.

**Cause:** The gateway token was only set as an environment variable. When manually restarted inside the container, the env var scope changes and the token is lost.

**Fix:** Set the token in `openclaw.json`:
```json
{
  "gateway": {
    "auth": {
      "mode": "token",
      "token": "your-token-here"
    }
  }
}
```
Our entrypoint scripts now set it in both places.

### Invalid Token Factory API key

**Symptom:** "401 Unauthorized" or no response when the agent tries to think.

**Fix:** Verify your key:
```bash
curl -s https://api.tokenfactory.nebius.com/v1/models \
  -H "Authorization: Bearer $TOKEN_FACTORY_API_KEY" | head -1
```

### Wrong model ID format

**Symptom:** "404 status code (no body)" when the agent tries to respond.

**Cause:** Token Factory uses its own model IDs (`zai-org/GLM-5`), not HuggingFace IDs (`THUDM/GLM-4-9B-0414`).

**Fix:** List available models:
```bash
curl -s https://api.tokenfactory.nebius.com/v1/models \
  -H "Authorization: Bearer $TOKEN_FACTORY_API_KEY" \
  | python3 -c "import json,sys; [print(m['id']) for m in json.load(sys.stdin)['data']]"
```

### Docker push fails with "repository name not known"

**Symptom:** `docker push` fails after successful build and login.

**Cause:** The registry ID from `nebius registry list` includes a `registry-` prefix (e.g., `registry-u00wtpem36bva2zhc8`) that must be stripped for the Docker image URL (use `u00wtpem36bva2zhc8`).

**Fix:** `REGISTRY_ID="${REGISTRY_ID#registry-}"`

### "Origin not allowed" on dashboard

**Symptom:** Control UI displays "origin not allowed" error.

**Fix:** Add your domain or use a wildcard for development:
```bash
openclaw config set gateway.controlUi.allowedOrigins '["*"]'
```

### Port 18789 not accessible

**Symptom:** Health check works (port 8080), but gateway is unreachable.

**Cause:** The Dockerfile's `EXPOSE` doesn't map ports externally.

**Fix:** Include both ports: `--container-port 8080 --container-port 18789`

### Device pairing required

**Symptom:** "pairing required" when connecting via TUI or dashboard.

**Fix:** Approve from the gateway host:
```bash
ssh nebius@<ip> "sudo docker exec \$(sudo docker ps -q | head -1) \
  openclaw devices approve --latest"
```

---

## Production deployment checklist

Before going live, review the [OpenClaw security architecture and hardening guide](https://nebius.com/blog/posts/openclaw-security) for a thorough threat model. Then work through this checklist:

- [ ] **Token Factory API key** stored in MysteryBox (not hardcoded)
- [ ] **Gateway token** set in both config file and `OPENCLAW_WEB_PASSWORD` env var
- [ ] **Both ports exposed** — 8080 (health) and 18789 (gateway)
- [ ] **Correct CPU platform** for your region (cpu-e2 for Finland/US, cpu-d3 for Paris)
- [ ] **SSH key authorized** on the endpoint for debugging
- [ ] **Model ID** matches Token Factory format (verify with the models API)
- [ ] **`allowedOrigins`** configured for your proxy domain
- [ ] **HTTPS configured** for the Control UI (reverse proxy, Tailscale, or SSH tunnel)
- [ ] **Health check tested** — `curl http://<ip>:8080` returns `{"status":"healthy"}`
- [ ] **Gateway tested** — TUI connects and the agent responds
- [ ] **No `plugins` key** in `openclaw.json` (NemoClaw only)
- [ ] **Monitoring** — uptime check on health endpoint

---

## What's next

Five minutes from now, you could have a production AI agent responding to users across Telegram, Discord, and the web — running entirely on CPU with cloud-powered inference.

**Get started:**

1. [Create a Token Factory API key](https://tokenfactory.nebius.com)
2. [Open the Nebius console](https://console.nebius.com) and deploy using `ghcr.io/colygon/openclaw-serverless:latest`
3. Or run `./install-openclaw-serverless.sh` for the automated path

**Go further:**

- **Try different models** — switch `INFERENCE_MODEL` to `deepseek-ai/DeepSeek-R1-0528` or `MiniMaxAI/MiniMax-M2.5`
- **Deploy NemoClaw** — use `ghcr.io/colygon/nemoclaw-serverless:latest` for NVIDIA's enhanced agent capabilities
- **Add human-in-the-loop verification** — use [Tendem](https://nebius.com/blog/posts/nebius-and-toloka-to-introduce-integration-to-bring-human-experts-on-demand-to-ai-agents) to add human expert verification for high-stakes agent decisions via MCP
- **Add channel integrations** — connect Telegram, WhatsApp, Discord, or Signal
- **Manage with natural language** — use the [Nebius Skill for Claude Code](https://github.com/colygon/nebius-skill) to deploy and manage endpoints via chat — "list my endpoints," "stop openclaw-v4," "show me the logs"
- **Go multi-region** — deploy across Finland, Paris, and US for global low-latency coverage

All scripts, Docker images, and the Deploy UI are open source: [github.com/colygon/openclaw-deploy](https://github.com/colygon/openclaw-deploy).

---

*[Nebius AI Cloud](https://nebius.com/ai-cloud) provides purpose-built infrastructure for AI workloads. [Token Factory](https://tokenfactory.nebius.com) offers GPU-backed inference without hardware management. Together with [Tendem for human verification](https://nebius.com/blog/posts/nebius-and-toloka-to-introduce-integration-to-bring-human-experts-on-demand-to-ai-agents) and ecosystem integrations, they form a complete stack for production agent deployment.*
