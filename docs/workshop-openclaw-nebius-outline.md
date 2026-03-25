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

- A **local OpenClaw agent** running in Docker on your own machine — connected to Token Factory for inference in under 2 minutes
- A **production cloud agent** on a Nebius CPU serverless endpoint — always-on, public IP, health monitoring, pay per second
- A **self-contained GPU deployment** with a local model running inside the container — predictable cost, auto-pauses when idle
- The **scripts, Docker images, and configuration** to replicate all three approaches in your own projects

> *"I deployed an agent with tool calling in under 30 minutes — and it costs pennies per run"*

---

## Why This Workshop

Your agent works perfectly on localhost. Shipping it to production is a different story.

GPU provisioning. Container orchestration. WebSocket networking. Secret management. Health monitoring. Keeping everything alive at 3 AM when a user in another timezone sends a message. The agent logic is maybe 20% of the work. The other 80% is infrastructure — and it's the part nobody planned for.

This workshop eliminates that 80%. You'll see three ways to deploy OpenClaw AI agents — from running locally on your laptop to a fully self-contained GPU deployment in the cloud — and walk away knowing exactly which one fits your use case.

---

## Three Deployment Paths

### Path 1: OpenClaw Locally + Token Factory
*Fastest to start. Zero cloud setup. Run OpenClaw anywhere.*

Run OpenClaw in Docker on your own machine (laptop, VPS, Raspberry Pi — anything with a CPU). All inference is handled by Token Factory, so you don't need a GPU locally. This is the quickest way to get an agent running and experiment with models.

```bash
docker run -e TOKEN_FACTORY_API_KEY=your-key \
  -e INFERENCE_MODEL=zai-org/GLM-5 \
  -p 8080:8080 -p 18789:18789 \
  ghcr.io/colygon/openclaw-serverless:latest
```

**Use when:** You're prototyping, developing locally, or want to run an agent on your own hardware without any cloud infrastructure.

### Path 2: Nebius CPU Serverless + Token Factory
*Production-ready. Always-on. Cheapest cloud deployment.*

Deploy the same OpenClaw container on a Nebius serverless endpoint (2 vCPUs, 8 GiB RAM). Token Factory handles inference. You get a public IP, health monitoring, SSH access, start/stop lifecycle, and per-second billing. The endpoint stays running so your agent is always reachable.

**Use when:** You want a production agent accessible 24/7 without managing servers, GPUs, or model weights.

### Path 3: Nebius GPU Serverless + Local Model
*Self-contained. Private. Predictable cost.*

Deploy NemoClaw (NVIDIA's OpenClaw plugin) with a local LLM running on a cloud-hosted GPU. Everything runs in one container — no external API calls. The serverless endpoint auto-pauses when idle, so you only pay for active time. Ideal for custom fine-tuned models or when data must stay within a single security boundary.

**Use when:** You need a custom-trained model, want all inference to stay inside your container, or prefer a predictable hourly rate over per-token pricing.

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
- **Local Docker** — run OpenClaw on your laptop with `docker run` + Token Factory
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
| 0:00 | **The Production Problem** | Colin | Why agent demos break when you ship them. Three deployment paths explained. |
| 0:05 | **Path 1: Run Locally + Token Factory** | Colin | Live demo: `docker run` on your laptop with Token Factory for inference. Fastest way to start. |
| 0:15 | **Path 2: Nebius CPU Serverless** | Colin | Live demo: Console deploy → CLI deploy → connect via TUI and dashboard. Switch models live. |
| 0:30 | **Path 3: GPU Serverless + Custom Model** | Mikhail | Live demo: NemoClaw + GPU endpoint. Local inference, auto-pause, serverless billing. |
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
