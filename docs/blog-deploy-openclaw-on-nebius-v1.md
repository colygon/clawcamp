# Deploy OpenClaw AI Agents on Nebius Cloud — No GPU Required

*Deploy production AI agents on Nebius serverless endpoints with a single command — no GPU management required.*

**Reading time:** ~10 minutes
**Author:** Colin Lowenberg
**Tags:** OpenClaw, AI Agents, Serverless, Token Factory, Deployment

---

## Five minutes to a production AI agent

You can deploy a production AI agent to the cloud in under five minutes — without a GPU, without managing model files, and without touching Kubernetes.

This guide shows you how. We'll deploy [OpenClaw](https://openclaw.ai), an open-source AI agent framework, on [Nebius AI Cloud](https://nebius.com/ai-cloud) serverless endpoints. The agent runs on a lightweight CPU instance. [Token Factory](https://tokenfactory.nebius.com) handles all GPU-accelerated inference in the background.

Why does this work? Because agent orchestration and LLM inference have very different hardware needs — and separating them changes the deployment economics entirely.

## What is OpenClaw?

OpenClaw is an open-source AI agent platform. It includes a WebSocket gateway for real-time communication, channel integrations (Telegram, WhatsApp, Discord, Signal, iMessage), a web-based Control UI dashboard, cron scheduling, tool execution, and multi-agent session management.

The key architectural insight: all of that runs on CPU. The agent orchestration, message routing, and session management don't need GPU power. Only the LLM inference — the "thinking" part — requires a GPU. OpenClaw delegates inference to a configurable backend, which in our case is Token Factory.

## Architecture: CPU agent + cloud inference

| Component | Where it runs | What it does |
|-----------|--------------|--------------|
| **OpenClaw Gateway** | Nebius CPU endpoint (2 vCPUs, 8 GiB) | Agent orchestration, sessions, channels, Control UI |
| **Token Factory** | Nebius GPU cluster | LLM inference (GLM-5, DeepSeek-R1, MiniMax-M2.5) |
| **Health Check** | Same CPU endpoint (port 8080) | Readiness probe for Nebius platform |

The OpenClaw container exposes two ports:
- **Port 8080** — A lightweight Python HTTP server that Nebius polls to verify the container is alive
- **Port 18789** — The OpenClaw Gateway WebSocket server, which hosts the Control UI dashboard and accepts client connections

## Region and CPU platform mapping

Nebius operates in multiple regions, each with a different CPU platform. Using the wrong platform for a region will cause deployment to fail silently:

| Region | Location | CPU Platform |
|--------|----------|-------------|
| `eu-north1` | Finland | `cpu-e2` (Intel Ice Lake) |
| `eu-west1` | Paris | `cpu-d3` (AMD EPYC) |
| `us-central1` | United States | `cpu-e2` (Intel Ice Lake) |

The install scripts handle this mapping automatically. If deploying manually, make sure the `--platform` flag matches your region.

## Prerequisites

Before deploying, you'll need:

1. **Nebius CLI** — installed and authenticated
   ```bash
   curl -sSL https://storage.ai.nebius.cloud/nebius/install.sh | bash
   nebius iam login
   ```

2. **Docker** — for building the container image (skip this if using a pre-built image)

3. **Token Factory API key** — create one at [tokenfactory.nebius.com](https://tokenfactory.nebius.com)

4. **SSH key** (optional) — for terminal access and debugging. The install script auto-generates one if needed.

## Storing secrets with MysteryBox

Before deploying, consider storing your API key in [MysteryBox](https://console.nebius.com/mysterybox), Nebius's managed secrets service — rather than pasting it directly into scripts.

```bash
nebius mysterybox secret create \
  --name token-factory-key \
  --parent-id <project-id> \
  --secret-version-payload \
    '[{"key":"TOKEN_FACTORY_API_KEY","string_value":"v1.xxx..."}]'
```

The `--secret-version-payload` takes a JSON array of key-value pairs. You can find your `<project-id>` by running `nebius iam project list`.

The Deploy UI (covered below) integrates with MysteryBox directly — secrets load automatically in the Configure step, and you can save new keys from the UI.

## Option A: Deploy with the install script

The simplest approach. A single script handles registry creation, Docker build, image push, and endpoint deployment:

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-openclaw-serverless.sh
```

> You can also pipe the script directly: `curl -sL https://raw.githubusercontent.com/colygon/openclaw-deploy/main/install-openclaw-serverless.sh | bash`. Review the script first if you prefer to inspect before running.

The script performs five steps:

**Step 1: Create a container registry.** Nebius requires a container registry to store Docker images. The script checks for an existing registry and creates one if needed.

**Step 2: Build the Docker image.** The image is based on `node:22-slim` with OpenClaw installed via npm. It targets the `linux/amd64` architecture, which matches the Intel Ice Lake and AMD EPYC CPUs that Nebius uses. If you're building on an ARM Mac, Docker handles the cross-compilation automatically.

**Step 3: Push to the registry.** Authenticates with the Nebius registry using a short-lived IAM token and pushes the image.

**Step 4: Create the endpoint.** Provisions a serverless endpoint with the correct CPU platform, exposed ports (8080 + 18789), environment variables, and SSH key.

**Step 5: Wait for RUNNING.** Polls the endpoint state every 10 seconds, then prints connection details — including the endpoint IP, gateway URL, and authentication token.

### Using a pre-built public image

If you'd rather skip the Docker build, we publish pre-built images to GitHub Container Registry:

```bash
docker pull ghcr.io/colygon/openclaw-serverless:latest
```

Deploy it directly to Nebius without building anything locally.

## Option B: Deploy with the web UI

If you prefer a GUI over the command line, we built a self-hosted Deploy UI that walks you through the process visually.

The Deploy UI is a Node.js application that wraps the Nebius CLI in a browser-friendly interface:

- **5-step wizard**: Choose Agent > Choose Model > Choose Region > Choose API Provider > Configure
- **MysteryBox integration**: API keys load automatically from Nebius MysteryBox — no pasting
- **Endpoint management**: Health status badges, start/stop controls, built-in SSH terminal
- **Dashboard proxy**: Access the OpenClaw Control UI through an HTTPS reverse proxy

### Setting up the Deploy UI

The Deploy UI runs on a Nebius VM (it needs the `nebius` CLI and SSH access to endpoints):

```bash
git clone https://github.com/colygon/openclaw-deploy.git
cd openclaw-deploy
./setup-vm.sh
```

This installs Node.js, the Nebius CLI, nginx with HTTPS, and configures a systemd service. The UI is then accessible at `https://<vm-ip>`.

## Connecting to your agent

Once the endpoint is running, you have three connection options. For first-time users, the **TUI via SSH tunnel** is the quickest way to verify everything works.

### OpenClaw TUI (terminal interface)

The TUI connects via WebSocket. For security, OpenClaw blocks plaintext connections to non-localhost addresses, so you'll need an SSH tunnel:

```bash
# Create a background SSH tunnel that forwards local port 28789
# to the endpoint's gateway port (18789) through your VM
ssh -f -N -L 28789:<endpoint-ip>:18789 nebius@<vm-ip>

# Connect to the agent
openclaw tui --url ws://localhost:28789 --token <your-token>
```

The `<endpoint-ip>` is printed by the install script when deployment completes. The `<vm-ip>` is the address of your Deploy UI host (or any machine with SSH access to the endpoint).

### Control UI dashboard

Open the dashboard in your browser for a web interface with session management, usage statistics, cron jobs, and chat:

```
http://<endpoint-ip>:18789/#token=<your-token>
```

> **Note:** The Control UI uses browser crypto APIs that require HTTPS or localhost. If accessing over HTTP from a remote IP, you'll see a "device identity required" error. Use the Deploy UI's HTTPS proxy, an SSH tunnel, or [Tailscale Serve](https://tailscale.com/kb/1312/serve) for remote access.

### Via the Deploy UI

Click the **Dashboard** button next to any running endpoint. It opens the Control UI through the HTTPS reverse proxy, which provides the secure context the browser needs.

## Deploying NemoClaw (with NVIDIA plugin)

Once you have OpenClaw running, you may want enhanced agent capabilities. [NemoClaw](https://github.com/NVIDIA/NemoClaw) is an NVIDIA plugin that extends OpenClaw with sandbox execution, enhanced tool orchestration, and agent planning.

### Build differences

NemoClaw's Docker image requires `node:22` (the full image, not `slim`). NemoClaw depends on `@whiskeysockets/baileys`, which requires native build tools (`python3`, `make`, `gcc`) that aren't in the slim image. The install also needs `--ignore-scripts` to skip a post-install script that fails inside Docker BuildKit.

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-nemoclaw-serverless.sh
```

Or use the pre-built public image: `ghcr.io/colygon/nemoclaw-serverless:latest`

### Configuration gotchas

Through extensive testing, we encountered several issues worth noting:

**Model IDs must match Token Factory's format.** Use `zai-org/GLM-5`, not the HuggingFace format `THUDM/GLM-4-9B-0414`. The wrong format returns a `404` from Token Factory with no helpful error message.

**Do not add a `plugins` key to `openclaw.json`.** This crashes the gateway on startup with "Config invalid — plugins: Unrecognized key." NemoClaw is loaded automatically when installed globally via npm — no config needed.

**Set the gateway token in both the config file and environment variable.** The config file (`auth.token` field) is the source of truth that survives gateway restarts. The env var alone is unreliable after manual restarts.

**Set `allowedOrigins` to `["*"]` for reverse proxy access.** Without this, the Control UI displays "origin not allowed" when accessed through any proxy or non-localhost URL.

## Managing endpoints

### Health monitoring

Every endpoint exposes a health check on port 8080:

```json
{
  "status": "healthy",
  "service": "openclaw-serverless",
  "model": "zai-org/GLM-5",
  "inference": "token-factory",
  "gateway_port": 18789
}
```

### Start, stop, and delete

```bash
nebius ai endpoint stop <endpoint-id>
nebius ai endpoint start <endpoint-id>
nebius ai endpoint delete <endpoint-id>
```

The Deploy UI provides the same controls visually — Start/Stop buttons and a delete option for each endpoint.

### Debugging

If something goes wrong, SSH into the endpoint and check the gateway log:

```bash
ssh nebius@<endpoint-ip> \
  "sudo docker exec \$(sudo docker ps -q | head -1) cat /tmp/gateway.log"
```

Common issues: invalid `openclaw.json` (check for typos or unsupported keys), Token Factory auth failures (verify your API key), or model not found (check the model ID format).

## Get started

Five minutes from now, you could have a production AI agent responding to users across Telegram, Discord, and the web — running entirely on CPU with cloud-powered inference.

1. [Create a Token Factory API key](https://tokenfactory.nebius.com)
2. [Install the Nebius CLI](https://docs.nebius.com/cli/install)
3. Run `./install-openclaw-serverless.sh`

All scripts, Docker images, and the Deploy UI are open source at [github.com/colygon/openclaw-deploy](https://github.com/colygon/openclaw-deploy). For deeper dives, check out the [ClawCamp workshop series](https://github.com/colygon/clawcamp) covering multi-region deployments on Nebius, NemoClaw, the Nebius Skill for Claude Code, and physical robotics.

---

*[Nebius AI Cloud](https://nebius.com/ai-cloud) provides scalable infrastructure for AI workloads. [Token Factory](https://tokenfactory.nebius.com) offers GPU-backed inference without hardware management.*
