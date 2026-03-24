# Deploy OpenClaw AI Agents on Nebius Cloud — No GPU Required

*How to run production AI agents on Nebius serverless endpoints using Token Factory for inference, with a one-command deploy script and a visual web UI.*

**Reading time:** ~10 minutes
**Author:** Colin Lowenberg
**Tags:** OpenClaw, AI Agents, Serverless, Token Factory, Deployment

---

## Why run AI agents in the cloud?

AI agents are moving beyond local development environments into production. Teams need agents that run 24/7, respond to users across channels (Telegram, WhatsApp, Discord), and scale without babysitting hardware. But deploying an agent to the cloud typically means provisioning GPUs, managing model weights, configuring networking, and wrestling with container orchestration.

What if you could deploy a fully functional AI agent to the cloud in under five minutes — without a GPU, without managing model files, and without touching Kubernetes?

That's what this guide covers. We'll deploy [OpenClaw](https://openclaw.ai), an open-source AI agent framework, on [Nebius AI Cloud](https://nebius.com/ai-cloud) serverless endpoints, using [Token Factory](https://tokenfactory.nebius.com) for inference. The agent runs on a lightweight CPU instance while Token Factory handles all GPU-accelerated inference in the background.

## What is OpenClaw?

OpenClaw is an open-source AI agent platform that bundles everything you need to run a capable AI assistant: a WebSocket gateway for real-time communication, channel integrations (Telegram, WhatsApp, Discord, Signal, iMessage), a web-based Control UI dashboard, cron scheduling, tool execution, and multi-agent session management.

It's designed to run on minimal hardware. The agent orchestration, message routing, and session management happen on CPU. Only the LLM inference — the "thinking" part — needs GPU power. This separation is key to our deployment strategy.

## Architecture: CPU agent + cloud inference

The deployment architecture separates the agent runtime from inference:

| Component | Where it runs | What it does |
|-----------|--------------|--------------|
| **OpenClaw Gateway** | Nebius CPU endpoint (2 vCPUs, 8 GiB) | Agent orchestration, sessions, channels, Control UI |
| **Token Factory** | Nebius GPU cluster | LLM inference (GLM-5, DeepSeek-R1, MiniMax-M2.5) |
| **Health Check** | Same CPU endpoint (port 8080) | Readiness probe for Nebius platform |

The OpenClaw container exposes two ports:
- **Port 8080** — A lightweight Python HTTP health check server that Nebius polls to verify the container is alive
- **Port 18789** — The OpenClaw Gateway WebSocket server, which hosts the Control UI dashboard and accepts client connections (TUI, web apps, channel integrations)

This means you can run a production AI agent on the cheapest CPU instance Nebius offers — no GPU allocation needed.

## Prerequisites

Before deploying, you'll need:

1. **Nebius CLI** — installed and authenticated
   ```bash
   curl -sSL https://storage.ai.nebius.cloud/nebius/install.sh | bash
   nebius iam login
   ```

2. **Docker** — for building the container image

3. **Token Factory API key** — for LLM inference
   Create one at [tokenfactory.nebius.com](https://tokenfactory.nebius.com)

## Option A: Deploy with the install script

The fastest path is our install script, which handles everything: registry creation, Docker build, image push, and endpoint deployment.

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
curl -sL https://raw.githubusercontent.com/colygon/openclaw-deploy/main/install-openclaw-serverless.sh | bash
```

Or clone the repo and run it directly:

```bash
git clone https://github.com/colygon/openclaw-deploy.git
cd openclaw-deploy
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-openclaw-serverless.sh
```

The script performs five steps:

**Step 1: Create a container registry.** Nebius requires a container registry to store Docker images. The script checks for an existing registry and creates one if needed.

**Step 2: Build the Docker image.** The image is based on `node:22-slim` and includes OpenClaw installed globally via npm, plus a custom entrypoint script that configures the agent at startup. The image is built for `linux/amd64` (required for Nebius Intel Ice Lake CPUs).

**Step 3: Push to the registry.** The script authenticates Docker with the Nebius registry using an IAM access token and pushes the image.

**Step 4: Create the endpoint.** The `nebius ai endpoint create` command provisions a serverless endpoint with the specified CPU platform, preset, exposed ports, environment variables, and SSH key.

**Step 5: Wait for RUNNING.** The script polls the endpoint state until it reaches `RUNNING` or `ERROR`, then prints connection details including the gateway URL and authentication token.

### Region and CPU platform mapping

Nebius operates in multiple regions, each with different CPU platforms. Using the wrong platform for a region will cause deployment to fail:

| Region | Location | CPU Platform |
|--------|----------|-------------|
| `eu-north1` | Finland | `cpu-e2` (Intel Ice Lake) |
| `eu-west1` | Paris | `cpu-d3` (AMD EPYC) |
| `us-central1` | United States | `cpu-e2` (Intel Ice Lake) |

The install script handles this mapping automatically.

### Using a pre-built public image

If you'd rather skip the Docker build entirely, we publish pre-built images to GitHub Container Registry:

```bash
docker pull ghcr.io/colygon/openclaw-serverless:latest
```

You can deploy this image directly to Nebius without building anything locally.

## Option B: Deploy with the web UI

For a visual deployment experience, we built a web-based Deploy UI that walks you through the process step by step.

The Deploy UI is a Node.js application that wraps the Nebius CLI in a browser-friendly interface. It provides:

- **5-step wizard**: Choose Agent (OpenClaw or NemoClaw) > Choose Model > Choose Region > Choose API Provider > Configure
- **MysteryBox integration**: API keys are loaded automatically from Nebius MysteryBox secrets — no need to paste keys manually
- **Endpoint management**: View running endpoints with health status badges, start/stop controls, and a built-in SSH terminal
- **Dashboard proxy**: Access the OpenClaw Control UI dashboard through an HTTPS reverse proxy

### Setting up the Deploy UI

The Deploy UI runs on a Nebius VM (it needs the `nebius` CLI and SSH access to endpoints):

```bash
git clone https://github.com/colygon/openclaw-deploy.git
cd openclaw-deploy
./setup-vm.sh
```

This installs Node.js, the Nebius CLI, nginx with HTTPS, and configures a systemd service. The UI is then accessible at `https://<vm-ip>`.

## Connecting to your agent

Once the endpoint is running, you can connect in several ways:

### Via the OpenClaw TUI (terminal interface)

```bash
# Create an SSH tunnel for secure access
ssh -f -N -L 28789:<endpoint-ip>:18789 nebius@<vm-ip>

# Connect
openclaw tui --url ws://localhost:28789 --token <your-token>
```

### Via the Control UI dashboard

Open the dashboard URL in your browser:
```
http://<endpoint-ip>:18789/#token=<your-token>
```

The dashboard provides a web interface for managing agent sessions, viewing usage statistics, configuring cron jobs, and chatting with the agent directly.

### Via the Deploy UI

Click the **Dashboard** button next to any running endpoint in the Deploy UI. It opens the Control UI through an HTTPS reverse proxy, which satisfies the browser's secure context requirement for device identity.

## Storing secrets with MysteryBox

Hardcoding API keys in environment variables works, but Nebius offers a better approach: [MysteryBox](https://console.nebius.com/mysterybox), a managed secrets service.

You can store your Token Factory API key in MysteryBox once:

```bash
nebius mysterybox secret create \
  --name token-factory-key \
  --parent-id <project-id> \
  --secret-version-payload '[{"key":"TOKEN_FACTORY_API_KEY","string_value":"v1.xxx..."}]'
```

The Deploy UI integrates with MysteryBox directly — secrets load automatically in the Configure step, and you can save new keys to MysteryBox from the UI without touching the CLI.

## Deploying NemoClaw (with NVIDIA plugin)

[NemoClaw](https://github.com/NVIDIA/NemoClaw) is an NVIDIA plugin that extends OpenClaw with sandbox execution, enhanced tool orchestration, and agent planning capabilities. Deploying it follows the same pattern with a few important differences.

### Build considerations for NemoClaw

The NemoClaw Docker image requires `node:22` (the full image, not `slim`), because NemoClaw's dependencies — specifically `@whiskeysockets/baileys` — need build tools (python3, make, gcc) that aren't available in the slim variant. The install also requires the `--ignore-scripts` flag to skip a post-install script that fails inside Docker BuildKit.

```bash
export TOKEN_FACTORY_API_KEY="v1.xxx..."
./install-nemoclaw-serverless.sh
```

Or use the pre-built public image:

```bash
docker pull ghcr.io/colygon/nemoclaw-serverless:latest
```

### Configuration gotchas we discovered

Through extensive testing, we encountered several configuration issues worth noting:

**Model IDs must match Token Factory's format.** Token Factory uses model IDs like `zai-org/GLM-5`, not the HuggingFace format like `THUDM/GLM-4-9B-0414`. Using the wrong format results in a `404` error from Token Factory.

**Do not add a `plugins` key to `openclaw.json`.** This is not a valid OpenClaw configuration key and will crash the gateway on startup with "Config invalid — plugins: Unrecognized key." NemoClaw is loaded automatically when installed globally via npm.

**Set the gateway token in both the config file and environment variable.** The config file is the source of truth that survives gateway restarts. Setting only the environment variable is unreliable when the gateway is manually restarted inside the container.

**Set `allowedOrigins` to `["*"]` for reverse proxy access.** Without this, the Control UI will display "origin not allowed" when accessed through any proxy or non-localhost URL.

## Managing endpoints

### Health monitoring

Every deployed endpoint exposes a health check on port 8080 that returns:

```json
{
  "status": "healthy",
  "service": "openclaw-serverless",
  "model": "zai-org/GLM-5",
  "inference": "token-factory",
  "gateway_port": 18789
}
```

The Deploy UI polls these health endpoints and displays status badges for each running endpoint.

### Start, stop, and delete

Endpoints can be managed via the CLI:

```bash
nebius ai endpoint stop <endpoint-id>
nebius ai endpoint start <endpoint-id>
nebius ai endpoint delete <endpoint-id>
```

Or through the Deploy UI, which provides Start/Stop buttons and a delete option in the kebab menu for each endpoint.

## What's next

This deployment pattern — CPU agent with cloud inference — opens up several possibilities:

- **Multi-region deployments** spanning Finland, Paris, and the US for low-latency global coverage
- **Channel integrations** connecting the agent to Telegram, WhatsApp, Discord, and Signal
- **Physical robotics** using OpenClaw on Nebius to control robot arms (like the LaRobot SO-101) with cloud-powered decision making
- **Autonomous operations** using the [Nebius Skill for Claude Code](https://github.com/colygon/nebius-skill) to manage cloud infrastructure via natural language

All the scripts, Docker images, and the Deploy UI are open source at [github.com/colygon/openclaw-deploy](https://github.com/colygon/openclaw-deploy).

To get started, create a [Token Factory API key](https://tokenfactory.nebius.com), install the [Nebius CLI](https://docs.nebius.com/cli/install), and run the install script. You'll have a production AI agent running in the cloud in under five minutes.

---

*Explore [Nebius AI Cloud](https://nebius.com/ai-cloud) for scalable AI infrastructure, and [Token Factory](https://tokenfactory.nebius.com) for GPU-backed inference without managing hardware.*
