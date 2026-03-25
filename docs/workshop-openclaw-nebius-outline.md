# Workshop: Deploy OpenClaw AI Agents on Nebius Cloud

**Date:** April 6–8, 2026 (dry run: Monday April 6)
**Speakers:** Colin Lowenberg & Mikhail Rozhkov (Nebius, serverless part)
**Format:** Live online workshop (Zoom / StreamYard)
**Duration:** ~60 minutes + Q&A

---

## Registration Page Copy

### Title
**Deploy OpenClaw AI Agents on Nebius Cloud — No GPU Required**

### Subtitle
Learn how to deploy production-ready AI agents using OpenClaw and Nebius serverless endpoints, with Token Factory for inference and NemoClaw for custom model deployments.

### Description

Your agent works perfectly on localhost. Shipping it to production is a different story — GPU provisioning, container orchestration, WebSocket networking, secret management, and keeping it running 24/7.

In this hands-on workshop, Colin Lowenberg and Mikhail Rozhkov will show you how to deploy OpenClaw AI agents on Nebius Cloud in minutes, using two approaches:

1. **CPU serverless + Token Factory** — Deploy a lightweight agent on the cheapest CPU instance with cloud-powered GPU inference via Token Factory. No GPU management, pay per token.

2. **GPU serverless with a custom model** — Deploy NemoClaw with a local LLM on a Nebius GPU endpoint for fully self-contained inference. Predictable hourly cost, auto-pauses when idle.

You'll walk away with a running AI agent accessible via terminal, web dashboard, and messaging channels — plus the scripts and Docker images to replicate it.

### What you'll learn

- How OpenClaw separates agent orchestration from model inference
- Deploying to Nebius serverless endpoints (console UI, CLI, and install scripts)
- Configuring Token Factory for GPU-powered inference without managing hardware
- Deploying NemoClaw with a custom model on GPU endpoints
- Managing secrets with Nebius MysteryBox
- Connecting via the OpenClaw TUI, Control UI dashboard, and messaging channels
- Production gotchas: gateway tokens, device pairing, model ID formats, port mapping

### Prerequisites

- A [Nebius AI Cloud](https://console.nebius.com) account (free trial available)
- A [Token Factory](https://tokenfactory.nebius.com) API key
- [Nebius CLI](https://docs.nebius.com/cli/install) installed (for hands-on sections)
- Docker installed (optional — pre-built images available)

### Who should attend

- Developers building AI agents or chatbots
- DevOps/platform engineers evaluating agent deployment options
- Anyone interested in running AI workloads on Nebius Cloud

---

## Workshop Outline

### Part 1: Introduction (10 min) — Colin

- **The production problem** — why agent demos break when you ship them
- **What is OpenClaw** — open-source agent platform, separates orchestration from inference
- **Three deployment options:**
  - Option 1: OpenClaw anywhere + Token Factory (BYO CPU)
  - Option 2: Nebius CPU serverless + Token Factory (production)
  - Option 3: Nebius GPU serverless + local model (custom/self-contained)

### Part 2: Deploy with Token Factory (20 min) — Colin

- **Live demo: Console deployment**
  - Navigate Nebius console → Serverless AI → Create endpoint
  - Use pre-built image: `ghcr.io/colygon/openclaw-serverless:latest`
  - Configure: cpu-e2, 2vcpu-8gb, ports 8080 + 18789
  - Set env vars: TOKEN_FACTORY_API_KEY, INFERENCE_MODEL (zai-org/GLM-5)
  - Deploy and wait for RUNNING

- **Live demo: CLI deployment**
  - `./install-openclaw-serverless.sh` one-command deploy
  - Walk through what the script does (registry, build, push, deploy)

- **Connect to the agent**
  - Health check: `curl http://<ip>:8080`
  - TUI via SSH tunnel: `openclaw tui --url ws://localhost:28789 --token <password>`
  - Dashboard: `http://<ip>:18789/#token=<password>`
  - Device pairing approval

- **Token Factory models**
  - Available models: GLM-5, DeepSeek-R1, MiniMax-M2.5
  - Model ID format (zai-org/GLM-5, NOT THUDM/...)
  - Switching models live

### Part 3: Deploy with Custom Model on GPU (20 min) — Mikhail

- **Why GPU serverless?**
  - Custom fine-tuned models
  - Data privacy / single security boundary
  - Predictable hourly cost, auto-pause when idle

- **NemoClaw overview**
  - NVIDIA plugin that wraps OpenClaw
  - Sandbox execution, enhanced planning
  - `ghcr.io/colygon/nemoclaw-serverless:latest`

- **Live demo: GPU endpoint deployment**
  - Nebius GPU presets and platforms
  - Deploying with a local model (vLLM / llama.cpp)
  - Configuring inference within the container
  - Monitoring and resource usage

- **Nebius serverless features**
  - Auto-pause and resume
  - Per-second billing
  - Health monitoring and readiness probes
  - Start/stop/delete lifecycle

### Part 4: Production Tips & Secrets Management (5 min) — Colin

- **MysteryBox** — store API keys securely
  - CLI: `nebius mysterybox secret create`
  - Console: Nebius MysteryBox UI
- **Gateway token configuration** — set in config file AND env var
- **Region → platform mapping** — cpu-e2 vs cpu-d3
- **Common failure modes** — top 3 gotchas and fixes:
  1. Wrong model ID format → 404
  2. Missing --container-port 18789 → gateway unreachable
  3. Token mismatch after restart → set in openclaw.json

### Part 5: Q&A & Next Steps (5 min) — Both

- **Resources:**
  - Scripts & Deploy UI: [github.com/colygon/openclaw-deploy](https://github.com/colygon/openclaw-deploy)
  - Nebius Skill for Claude Code: [github.com/colygon/nebius-skill](https://github.com/colygon/nebius-skill)
  - Blog post: "The complete guide to deploying OpenClaw on Nebius Cloud"
  - OpenClaw docs: [docs.openclaw.ai](https://docs.openclaw.ai)
  - Token Factory: [tokenfactory.nebius.com](https://tokenfactory.nebius.com)

- **Open Q&A**

---

## Dry Run Checklist (Monday April 6)

- [ ] Both speakers have Nebius accounts with active endpoints
- [ ] Token Factory API key working (test with curl)
- [ ] Pre-built images pulled and tested
- [ ] Console deployment flow rehearsed (screen share ready)
- [ ] CLI deployment tested end-to-end
- [ ] GPU endpoint with custom model running (Mikhail)
- [ ] TUI + dashboard connection working
- [ ] Zoom/StreamYard setup tested (screen sharing, audio)
- [ ] Backup slides/screenshots in case of live demo failure
- [ ] Registration page live with correct date/time/links
