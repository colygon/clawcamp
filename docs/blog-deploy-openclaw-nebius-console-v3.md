# Deploy OpenClaw from the Nebius AI Cloud Console — No CLI Required

*A visual walkthrough for deploying OpenClaw AI agents using the Nebius web console. No command line, no Docker builds — just point, click, and deploy.*

**Reading time:** ~8 minutes
**Author:** Colin Lowenberg
**Tags:** OpenClaw, Nebius Console, AI Agents, Serverless, Token Factory, No-Code Deployment

---

## Who this guide is for

The previous guides in this series covered deploying OpenClaw via [install scripts](blog-deploy-openclaw-on-nebius-v1.md) and a [production-focused CLI workflow](blog-deploy-openclaw-on-nebius-v2.md). Both require Docker, the Nebius CLI, and comfort with the terminal.

This guide takes a different approach. If you prefer a graphical interface — or if you're evaluating OpenClaw before committing to a CLI-based workflow — the Nebius AI Cloud console lets you deploy a pre-built OpenClaw container without installing anything locally.

You'll need:
- A [Nebius AI Cloud](https://console.nebius.com) account
- A [Token Factory](https://tokenfactory.nebius.com) API key

That's it. No Docker, no CLI, no local tooling.

## Step 1: Open the Nebius AI Cloud console

Navigate to [console.nebius.com](https://console.nebius.com) and sign in. If you don't have an account, click **Sign up** — Nebius offers a free trial with credits for new users.

Once logged in, you'll land on the project dashboard. Make note of your **project ID** — you'll need it if you want to use MysteryBox for secrets later.

## Step 2: Navigate to Serverless AI

From the left sidebar, find **Serverless AI** (under the AI section). This is where Nebius manages containerized AI workloads — both interactive endpoints and batch jobs.

Click **Endpoints** to see your existing endpoints (if any), then click **Create endpoint** to start the deployment wizard.

## Step 3: Configure the endpoint

The endpoint creation form has several sections. Here's how to fill them in for OpenClaw:

### Basic settings

| Field | Value | Notes |
|-------|-------|-------|
| **Name** | `openclaw-agent` | Any descriptive name |
| **Image** | `ghcr.io/colygon/openclaw-serverless:latest` | Pre-built public image — no registry setup needed |

We're using the public image from GitHub Container Registry, which means you don't need to create a Nebius Container Registry or build anything locally.

> **NemoClaw alternative:** To deploy the NVIDIA NemoClaw variant instead, use `ghcr.io/colygon/nemoclaw-serverless:latest`. It's larger (~1.1 GB vs ~400 MB) but includes sandbox execution and enhanced agent planning.

### Platform and resources

| Field | Value | Notes |
|-------|-------|-------|
| **Platform** | `cpu-e2` (Intel Ice Lake) | Use `cpu-d3` for EU West (Paris) |
| **Preset** | `2vcpu-8gb` | 2 vCPUs, 8 GiB RAM — the smallest option |

OpenClaw doesn't need a GPU. All inference is routed to Token Factory, so a CPU-only instance is sufficient. The `2vcpu-8gb` preset is the cheapest option and handles typical agent workloads well.

> **Region matters for platform selection.** EU North (Finland) and US Central use `cpu-e2` (Intel Ice Lake). EU West (Paris) uses `cpu-d3` (AMD EPYC). Selecting the wrong platform for your region will cause the endpoint to fail on startup.

### Container ports

Add **two** container ports:

| Port | Purpose |
|------|---------|
| `8080` | Health check — Nebius polls this to verify the container is alive |
| `18789` | OpenClaw Gateway — WebSocket server for the Control UI and client connections |

Both ports are required. Port 8080 serves a lightweight health check that returns JSON status. Port 18789 is the OpenClaw Gateway where you'll connect the TUI, browser dashboard, and channel integrations.

> **Important:** The `EXPOSE` directive in the Dockerfile does not automatically map ports to the host. You must explicitly add both ports in the console. If port 18789 is missing, the health check will work but the gateway will be unreachable from outside the container.

### Environment variables

Add the following environment variables:

| Variable | Value | Purpose |
|----------|-------|---------|
| `TOKEN_FACTORY_API_KEY` | Your Token Factory key (`v1.xxx...`) | Authenticates with Token Factory for LLM inference |
| `TOKEN_FACTORY_URL` | `https://api.tokenfactory.nebius.com/v1` | Token Factory API endpoint |
| `INFERENCE_MODEL` | `zai-org/GLM-5` | Which model to use for inference |
| `OPENCLAW_WEB_PASSWORD` | A random string (e.g., generate with `openssl rand -hex 16`) | Gateway authentication token |

**Choosing a model:** Token Factory provides several models. Common choices:

| Model ID | Description |
|----------|-------------|
| `zai-org/GLM-5` | Latest GLM model from Zhipu AI — strong general-purpose reasoning |
| `deepseek-ai/DeepSeek-R1-0528` | DeepSeek's reasoning model — good for complex tasks |
| `zai-org/GLM-4.5` | Lighter GLM variant — faster responses |
| `MiniMaxAI/MiniMax-M2.5` | MiniMax model — fast, powerful open-source |

> **Model ID format matters.** Token Factory uses its own model IDs (e.g., `zai-org/GLM-5`), not HuggingFace IDs (e.g., `THUDM/GLM-4-9B-0414`). Using the wrong format results in a silent `404` error when the agent tries to respond.

### Storage

| Field | Value | Notes |
|-------|-------|-------|
| **Disk size** | `250Gi` | Default is sufficient for OpenClaw |

The disk stores the container filesystem, logs, and any cached data. The default 250Gi is more than enough for OpenClaw.

### Networking

| Field | Value | Notes |
|-------|-------|-------|
| **Public IP** | Enabled (checked) | Required for direct access to the agent |

Enable public IP so you can access the gateway and dashboard from your browser. Without it, the endpoint is only reachable from within the Nebius VPC.

### SSH access (optional)

If you want terminal access for debugging:

| Field | Value |
|-------|-------|
| **SSH key** | Paste your public key (`ssh-ed25519 AAAA...`) |

SSH access lets you inspect container logs, restart the gateway, and troubleshoot issues. It's optional but recommended for initial deployments.

## Step 4: Create the endpoint

Review your settings, then click **Create**. Nebius will:

1. Pull the container image from GHCR
2. Provision a CPU instance in your selected region
3. Start the container with your environment variables
4. Begin health check polling on port 8080

The endpoint will transition through several states: **Provisioning** → **Starting** → **Running**. This typically takes 1-3 minutes.

## Step 5: Verify the deployment

Once the endpoint shows **Running**, find its **public IP** in the endpoint details page.

### Test the health check

Open a browser or use curl:

```
http://<public-ip>:8080
```

You should see:

```json
{
  "status": "healthy",
  "service": "openclaw-serverless",
  "model": "zai-org/GLM-5",
  "inference": "token-factory",
  "gateway_port": 18789
}
```

If you see this response, the container is running and configured correctly.

### Open the Control UI dashboard

Navigate to:

```
http://<public-ip>:18789/#token=<your-OPENCLAW_WEB_PASSWORD>
```

This opens the OpenClaw Control UI — a web dashboard for managing agent sessions, viewing usage, configuring cron jobs, and chatting with the agent.

> **Secure context note:** If you see "control UI requires device identity," the browser needs HTTPS or localhost. Either use an SSH tunnel (`ssh -f -N -L 28789:<ip>:18789 user@host`, then open `http://localhost:28789`) or set up a reverse proxy with HTTPS.

### Connect via the TUI

For terminal users, connect with the OpenClaw TUI:

```bash
# SSH tunnel for secure WebSocket access
ssh -f -N -L 28789:<public-ip>:18789 nebius@<any-ssh-host>

# Connect
openclaw tui --url ws://localhost:28789 --token <your-OPENCLAW_WEB_PASSWORD>
```

On first connection, you'll need to approve device pairing from the gateway host. If you have SSH access to the endpoint:

```bash
ssh nebius@<public-ip> "sudo docker exec \$(sudo docker ps -q | head -1) \
  openclaw devices approve --latest"
```

## Step 6: Manage your endpoint

Back in the Nebius console, you can:

- **Stop** the endpoint to save costs (computing resources aren't charged while stopped)
- **Start** it again when needed
- **Delete** it when you're done
- **View logs** for debugging

You can also manage endpoints via the CLI if you install it later:

```bash
nebius ai endpoint list
nebius ai endpoint stop <endpoint-id>
nebius ai endpoint start <endpoint-id>
```

## Storing secrets securely

For production use, avoid pasting API keys directly into the console's environment variable fields. Instead, store them in [MysteryBox](https://console.nebius.com/mysterybox), Nebius's managed secrets service.

Navigate to **MysteryBox** in the console sidebar, create a new secret, and add your Token Factory key as a payload entry. The key is encrypted at rest and access-controlled through Nebius IAM.

You can then reference the secret when creating endpoints, or use our [Deploy UI](https://github.com/colygon/openclaw-deploy) which integrates with MysteryBox automatically.

## What you just deployed

Let's recap what's running:

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

- **OpenClaw Gateway** handles agent orchestration, sessions, and the Control UI — all on CPU
- **Token Factory** provides GPU-powered inference via API — you pay per token, no GPU management
- **Health Check** keeps the endpoint alive and provides status information

The entire setup costs only the CPU instance time plus Token Factory inference tokens. No GPU reservation, no model weight downloads, no infrastructure management.

## Next steps

Now that your agent is running:

- **Add channel integrations** — connect Telegram, WhatsApp, Discord, or Signal so users can interact with your agent through messaging apps
- **Try different models** — change `INFERENCE_MODEL` to `deepseek-ai/DeepSeek-R1-0528` or `MiniMaxAI/MiniMax-M2.5` and restart the endpoint
- **Upgrade to NemoClaw** — switch the image to `ghcr.io/colygon/nemoclaw-serverless:latest` for NVIDIA's enhanced agent capabilities
- **Automate with CLI** — when you're ready for CI/CD, [install the Nebius CLI](https://docs.nebius.com/cli/install) and use our [install scripts](https://github.com/colygon/openclaw-deploy) for repeatable deployments
- **Join the community** — check out the [ClawCamp workshop series](https://github.com/colygon/clawcamp) for live demos, deeper dives, and office hours

---

*[Nebius AI Cloud](https://nebius.com/ai-cloud) makes it easy to deploy AI workloads at any scale. [Token Factory](https://tokenfactory.nebius.com) provides instant access to GPU-powered inference. Start deploying at [console.nebius.com](https://console.nebius.com).*
