# Deploy OpenClaw AI Agents on Nebius Cloud

## From Prototype to Production in 60 Minutes

**Date:** April 6–8, 2026 (dry run: Monday April 6)
**Speakers:** Colin Lowenberg & Mikhail Rozhkov (Nebius)
**Format:** Live online workshop · Zoom / StreamYard
**Duration:** 60 minutes + live Q&A
**Level:** Beginner–Intermediate · No GPU knowledge required

---

## What You'll Build

By the end of this workshop, you'll have:

- A **production-ready AI agent** running on Nebius Cloud — accessible via terminal, web dashboard, and messaging channels
- A **Token Factory-powered agent** on a CPU serverless endpoint — no GPU management, pay per token
- A **self-contained GPU deployment** with a local model running inside the container — predictable cost, auto-pauses when idle
- The **scripts, Docker images, and configuration** to replicate both approaches in your own projects

> *"I deployed an agent with tool calling in under 30 minutes — and it costs pennies per run"*

---

## Why This Workshop

Your agent works perfectly on localhost. Shipping it to production is a different story.

GPU provisioning. Container orchestration. WebSocket networking. Secret management. Health monitoring. Keeping everything alive at 3 AM when a user in another timezone sends a message. The agent logic is maybe 20% of the work. The other 80% is infrastructure — and it's the part nobody planned for.

This workshop eliminates that 80%. You'll deploy OpenClaw AI agents on Nebius Cloud using two battle-tested approaches, and walk away knowing exactly which one fits your use case.

---

## Two Deployment Paths

### Path 1: CPU Serverless + Token Factory
*Cheapest. Simplest. Best for most agent workloads.*

Deploy a lightweight OpenClaw container on the smallest CPU instance Nebius offers (2 vCPUs, 8 GiB RAM). All inference is handled by Token Factory — Nebius's managed GPU inference API with 30+ open-source models. You pay per token for inference, per second for the CPU instance.

**Use when:** You want a production agent without managing GPUs, model weights, or inference infrastructure.

### Path 2: GPU Serverless + Local Model
*Self-contained. Private. Predictable cost.*

Deploy NemoClaw (NVIDIA's OpenClaw plugin) with a local LLM bundled inside a GPU-powered container. Everything runs in one endpoint — no external API calls. The serverless endpoint auto-pauses when idle, so you only pay for active time.

**Use when:** You need a custom fine-tuned model, want data to stay within a single security boundary, or prefer a fixed hourly rate over per-token pricing.

---

## What We'll Cover

### Agent Architecture
- How OpenClaw separates orchestration from inference — and why that matters
- The CPU agent + cloud inference pattern: why you don't need a GPU for most agent workloads
- OpenClaw vs. NemoClaw: not competing projects — NemoClaw wraps OpenClaw for GPU deployments

### Token Factory Integration
- Connecting to Token Factory's OpenAI-compatible API
- Choosing the right model: GLM-5, DeepSeek-R1, MiniMax-M2.5
- Model ID gotcha: Token Factory uses `zai-org/GLM-5`, not HuggingFace format
- Cost and latency optimization for bursty agent traffic

### Deployment (Live Demos)
- **Console deployment** — point-and-click in the Nebius web UI, no CLI required
- **One-command CLI** — `./install-openclaw-serverless.sh` handles everything
- **Pre-built images** — `ghcr.io/colygon/openclaw-serverless:latest` (no Docker build needed)
- **GPU endpoint** — NemoClaw with a local model on Nebius GPU presets

### Connecting to Your Agent
- OpenClaw TUI (terminal interface) via SSH tunnel
- Control UI dashboard — sessions, usage, cron jobs, live chat
- Device pairing — the security model and how to approve new clients
- Channel integrations — Telegram, WhatsApp, Discord, Signal

### Production Hardening
- Secrets management with Nebius MysteryBox
- Gateway token configuration (the config file vs. env var trap)
- Region → CPU platform mapping (eu-north1 = cpu-e2, eu-west1 = cpu-d3)
- The top 5 failure modes we hit and how to fix them

---

## Schedule

| Time | Section | Speaker | What Happens |
|------|---------|---------|-------------|
| 0:00 | **The Production Problem** | Colin | Why agent demos break when you ship them. Three deployment options explained. |
| 0:10 | **Deploy with Token Factory** | Colin | Live demo: Console deploy → CLI deploy → connect via TUI and dashboard. Switch models live. |
| 0:30 | **Deploy with Custom Model on GPU** | Mikhail | Live demo: NemoClaw + GPU endpoint. Local inference, auto-pause, serverless billing. |
| 0:50 | **Production Tips & Gotchas** | Colin | MysteryBox secrets, gateway tokens, failure modes, and the deployment checklist. |
| 0:55 | **Q&A** | Both | Open questions, debugging, and next steps. |

---

## Prerequisites

Come prepared with these and you'll be able to follow along live:

- **A Nebius AI Cloud account** — [Sign up at console.nebius.com](https://console.nebius.com) (free trial available)
- **A Token Factory API key** — [Get one at tokenfactory.nebius.com](https://tokenfactory.nebius.com)
- **Nebius CLI installed** — `curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash`
- **Docker** (optional) — only needed if you want to build custom images; pre-built images work without it
- **Basic terminal comfort** — you should be able to run commands, SSH into servers, and read JSON

Don't have everything set up? No worries — you can follow along with the live demos and set up afterward using our open-source scripts.

---

## Who Should Attend

- **Developers building AI agents** who want to go from prototype to production
- **DevOps and platform engineers** evaluating serverless options for agent deployment
- **Founders and technical leads** exploring open-source alternatives to hosted agent platforms
- **Anyone curious about running AI workloads on Nebius Cloud** — whether CPU or GPU

---

## Your Speakers

**Colin Lowenberg** — Builder and community organizer behind ClawCamp. Built the OpenClaw Deploy UI, install scripts, and Nebius Skill for Claude Code. Has deployed dozens of OpenClaw agents on Nebius and documented every failure mode along the way.

**Mikhail Rozhkov** — Nebius. Expert on Nebius serverless infrastructure, GPU deployments, and production AI workloads. Will demo deploying NemoClaw with a custom model on GPU endpoints and cover Nebius serverless features.

---

## Resources You'll Get

Everything from this workshop is open source:

- **[openclaw-deploy](https://github.com/colygon/openclaw-deploy)** — Install scripts, Dockerfiles, Deploy UI, and setup guide
- **[nebius-skill](https://github.com/colygon/nebius-skill)** — Claude Code skill for managing Nebius infrastructure via natural language
- **Pre-built Docker images:**
  - `ghcr.io/colygon/openclaw-serverless:latest` — OpenClaw (CPU, ~400 MB)
  - `ghcr.io/colygon/nemoclaw-serverless:latest` — NemoClaw (GPU-ready, ~1.1 GB)
- **Blog post:** "The complete guide to deploying OpenClaw AI agents on Nebius Cloud"
- **OpenClaw docs:** [docs.openclaw.ai](https://docs.openclaw.ai)
- **Token Factory:** [tokenfactory.nebius.com](https://tokenfactory.nebius.com)

---

## Dry Run Checklist (Monday April 6)

- [ ] Both speakers have Nebius accounts with active endpoints
- [ ] Token Factory API key working (test with `curl`)
- [ ] Pre-built images pulled and tested on both CPU and GPU
- [ ] Console deployment flow rehearsed (screen share ready)
- [ ] CLI deployment tested end-to-end (`install-openclaw-serverless.sh`)
- [ ] GPU endpoint with custom model running (Mikhail)
- [ ] TUI + dashboard connection working (SSH tunnel, device pairing)
- [ ] Zoom/StreamYard setup tested (screen sharing, audio, recording)
- [ ] Backup slides/screenshots in case of live demo issues
- [ ] Registration page live with correct date, time, and links
