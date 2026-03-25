export interface WorkshopStep {
  time: string;
  title: string;
  description: string;
  details: string[];
}

export interface Workshop {
  slug: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  audience: string;
  level: string;
  levelColor: string;
  keyValue: string;
  wowFactor: string;
  icon: string;
  hidden?: boolean;
  whatYouBuild: string[];
  whatWeCover: string[];
  whoIsThisFor: string;
  prerequisites: string[];
  youLeaveWith: string[];
  schedule: WorkshopStep[];
  guideSteps: GuideStep[];
}

export interface GuideStep {
  stepNumber: number;
  title: string;
  duration: string;
  overview: string;
  instructions: string[];
  commands?: string[];
  tips?: string[];
  checkpoint: string;
}

export const workshops: Workshop[] = [
  {
    slug: "local-install",
    badge: "Workshop",
    badgeColor: "badge-lime",
    title: "Install OpenClaw + Token Factory — Your First AI Agent",
    subtitle: "From Zero to Running Agent in 5 Minutes. No Cloud, No GPU, No Docker.",
    tagline:
      "Install OpenClaw with npm, connect to Token Factory for inference, and have a working AI agent in under 5 minutes.",
    description:
      "Install OpenClaw directly on your machine — no Docker, no cloud accounts, no infrastructure. Connect it to Token Factory for GPU-powered inference and have a running AI agent in minutes. This is the fastest path from zero to a working agent, and the foundation for every other deployment path.",
    audience: "Anyone curious about AI agents — developers, founders, students",
    level: "Beginner",
    levelColor: "level-green",
    keyValue:
      "A running AI agent on your machine in under 5 minutes",
    wowFactor:
      '"I went from nothing to chatting with my own AI agent in 5 minutes — and it can use tools"',
    icon: "shield",
    whatYouBuild: [
      "An OpenClaw agent running locally on your machine",
      "Connected to Token Factory for GPU-powered inference (no local GPU needed)",
      "Access via the Control UI dashboard and terminal TUI",
    ],
    whatWeCover: [
      "What is OpenClaw: open-source AI agent platform with WebSocket gateway, channels, sessions, and tools",
      "What is Token Factory: Nebius managed inference API with 30+ open-source models",
      "Installing OpenClaw via npm — one command, no containers",
      "Configuring Token Factory: API key, model selection, and the OpenAI-compatible API",
      "Connecting via the dashboard (http://localhost:18789) and the TUI",
      "Choosing models: GLM-5, DeepSeek-R1, MiniMax-M2.5 — tradeoffs explained",
    ],
    whoIsThisFor:
      "Anyone who wants to try OpenClaw for the first time. No cloud experience needed, no GPU needed, no Docker needed — just a laptop with Node.js. This is the recommended starting point before moving to Docker or cloud deployments.",
    prerequisites: [
      "Laptop with Node.js 18+ installed",
      "A Token Factory API key (sign up at tokenfactory.nebius.com)",
      "Basic comfort with the terminal",
    ],
    youLeaveWith: [
      "OpenClaw installed and running on your machine",
      "A Token Factory API key configured for inference",
      "The Control UI dashboard open in your browser",
      "An understanding of how OpenClaw separates orchestration from inference",
      "Confidence to move to Docker (Path 2) or Nebius Cloud (Paths 3–4)",
    ],
    schedule: [
      {
        time: "0:00 – 0:10",
        title: "What is OpenClaw?",
        description:
          "Introduction to OpenClaw and how it separates agent orchestration from model inference",
        details: [
          "The agent platform: gateway, sessions, channels, tools, cron, Control UI",
          "Why you don't need a GPU: Token Factory handles inference",
          "The four deployment paths — this workshop covers Path 1 (local install)",
        ],
      },
      {
        time: "0:10 – 0:25",
        title: "Install & Configure",
        description:
          "Install OpenClaw, get a Token Factory key, and start the gateway",
        details: [
          "npm install -g openclaw",
          "Get a Token Factory API key at tokenfactory.nebius.com",
          "Set environment variables: TOKEN_FACTORY_API_KEY, TOKEN_FACTORY_URL, INFERENCE_MODEL",
          "openclaw init → openclaw gateway --bind loopback --auth token",
          "Verify: open http://localhost:18789 in your browser",
        ],
      },
      {
        time: "0:25 – 0:40",
        title: "Talk to Your Agent",
        description:
          "Connect via dashboard and TUI, try different models, explore the Control UI",
        details: [
          "Send your first message via the Control UI dashboard",
          "Connect via the TUI: openclaw tui",
          "Switch models live: GLM-5 → DeepSeek-R1 → MiniMax-M2.5",
          "Explore sessions, usage stats, and cron jobs in the dashboard",
        ],
      },
      {
        time: "0:40 – 0:55",
        title: "Connect Channels & Next Steps",
        description:
          "Add Telegram/Discord/WhatsApp and preview the other deployment paths",
        details: [
          "Connect a Telegram bot to your agent",
          "Preview: Path 2 (Docker), Path 3 (GPU serverless), Path 4 (CPU serverless)",
          "When to upgrade: production needs, always-on, custom models",
          "Q&A",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Get a Token Factory API Key",
        duration: "2 min",
        overview:
          "Sign up for Token Factory and create an API key for GPU-powered inference.",
        instructions: [
          "Go to tokenfactory.nebius.com and sign up (or log in)",
          "Navigate to API Keys and create a new key",
          "Copy the key — you'll need it in the next step",
        ],
        commands: [
          "# No commands needed — this is done in the browser",
          "# Save your key somewhere safe (you'll export it as an env var next)",
        ],
        tips: [
          "Token Factory offers 30+ open-source models including GLM-5, DeepSeek-R1, and MiniMax-M2.5",
          "You pay per token — no GPU reservation needed",
        ],
        checkpoint: "You have a Token Factory API key starting with 'v1.'",
      },
      {
        stepNumber: 2,
        title: "Install OpenClaw",
        duration: "1 min",
        overview:
          "Install OpenClaw globally via npm.",
        instructions: [
          "Open your terminal",
          "Run npm install -g openclaw",
          "Verify the install with openclaw --version",
        ],
        commands: [
          "npm install -g openclaw",
          "",
          "# Verify",
          "openclaw --version",
        ],
        tips: [
          "Requires Node.js 18 or higher",
          "If you get a permissions error, try: sudo npm install -g openclaw",
        ],
        checkpoint: "Running 'openclaw --version' prints the version number",
      },
      {
        stepNumber: 3,
        title: "Configure & Start the Gateway",
        duration: "2 min",
        overview:
          "Set your Token Factory credentials, initialize OpenClaw, and start the gateway.",
        instructions: [
          "Export your Token Factory API key and URL as environment variables",
          "Set the inference model (we'll use GLM-5)",
          "Set a gateway password for authentication",
          "Initialize OpenClaw and start the gateway",
        ],
        commands: [
          "export TOKEN_FACTORY_API_KEY={your-token-factory-key}",
          "export TOKEN_FACTORY_URL=https://api.tokenfactory.nebius.com/v1",
          "export INFERENCE_MODEL=zai-org/GLM-5",
          "export OPENCLAW_GATEWAY_TOKEN={your-password}",
          "",
          "openclaw init",
          "openclaw gateway --bind loopback --auth token --token $OPENCLAW_GATEWAY_TOKEN",
        ],
        tips: [
          "Model IDs use Token Factory format: zai-org/GLM-5 (not HuggingFace format like THUDM/GLM-4-9B-0414)",
          "The --bind loopback flag keeps the gateway accessible only from your machine",
        ],
        checkpoint: "Terminal shows 'listening on ws://127.0.0.1:18789'",
      },
      {
        stepNumber: 4,
        title: "Connect to Your Agent",
        duration: "2 min",
        overview:
          "Open the Control UI dashboard and send your first message.",
        instructions: [
          "Open http://localhost:18789/#token={your-password} in your browser",
          "You should see the OpenClaw Control UI dashboard",
          "Type a message and press Enter — the agent will respond using GLM-5 via Token Factory",
          "Or connect via TUI: openclaw tui --url ws://localhost:18789 --token {your-password}",
        ],
        commands: [
          "# Open in browser",
          "open http://localhost:18789",
          "",
          "# Or connect via TUI (in a new terminal)",
          "openclaw tui --url ws://localhost:18789 --token {your-password}",
        ],
        tips: [
          "The dashboard shows sessions, usage, cron jobs, and agent settings",
          "Try switching models: change INFERENCE_MODEL to deepseek-ai/DeepSeek-R1-0528 and restart the gateway",
        ],
        checkpoint: "You received a response from your agent",
      },
    ],
  },
  {
    slug: "agent-inference",
    badge: "Workshop",
    badgeColor: "badge-lime",
    title: "Nebius Serverless + Token Factory — Production Agent Deployment",
    subtitle: "Open Models. Structured Outputs. Production-Ready Tool Calling.",
    tagline:
      "Deploy OpenClaw on Nebius Serverless, connect to Token Factory, and build agents that actually work.",
    description:
      "Deploy OpenClaw on Nebius Serverless (CPU-only) and connect it to Token Factory for inference. No Mac Minis, no local installs, no security headaches — a single serverless endpoint replaces $1,000 in hardware, and you can run 100 agents for the same cost. You'll choose the right open model, configure structured outputs for reliable tool calling, and optimize cost and latency.",
    audience: "Developers, founders, AI engineers getting started with agents",
    level: "Beginner",
    levelColor: "level-green",
    keyValue:
      "Production agent running on serverless infra with optimized inference",
    wowFactor:
      '"I deployed an agent with tool calling in under 30 minutes — and it costs pennies per run"',
    icon: "shield",
    whatYouBuild: [
      "An OpenClaw agent deployed on Nebius Serverless (CPU-only, no GPU needed)",
      "Connected to Token Factory endpoints for fast, cheap open-model inference",
      "A working tool-calling workflow with structured outputs (JSON mode)",
    ],
    whatWeCover: [
      "Why serverless beats local: a Mac Mini costs $1,000, exposes your network, and runs one agent — a serverless endpoint costs pennies and scales to hundreds",
      "How Nebius Serverless works: deploy containers without managing VMs or clusters",
      "Token Factory basics: OpenAI-compatible API, model catalog, per-token pricing",
      "Choosing the right model: Llama 3.1, Mistral, DeepSeek — tradeoffs for agents",
      "Structured outputs and JSON mode for reliable tool calling",
      "Cost and latency optimization: batching, model selection, endpoint configuration",
    ],
    whoIsThisFor:
      "Developers and founders who want to deploy AI agents without managing infrastructure. No GPU knowledge needed — just bring a laptop and a use case. Great for anyone evaluating open models vs. closed APIs.",
    prerequisites: [
      "Laptop with a browser and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Basic comfort with command-line tools",
    ],
    youLeaveWith: [
      "A live OpenClaw agent running on Nebius Serverless",
      "Token Factory API keys and configured endpoints",
      "A tool-calling workflow with structured JSON outputs",
      "Cost estimates for running agents 24/7 on open models",
      "CLI commands to redeploy, update, and monitor your agent",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "Architecture Overview: Serverless + Token Factory",
        description:
          "How Nebius Serverless and Token Factory fit together for agent workloads",
        details: [
          "Why not local? Mac Minis cost $1,000+, expose your home network, and run a single agent. Serverless scales to hundreds for less.",
          "Serverless CPU-only containers for hosting OpenClaw (no GPU needed for the orchestrator)",
          "Token Factory for inference: OpenAI-compatible API, open models, per-token billing",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Hands-On: Deploy OpenClaw on Serverless",
        description:
          "Set up the Nebius CLI, create a serverless endpoint, and deploy OpenClaw",
        details: [
          "Install and configure the Nebius CLI",
          "Create a serverless endpoint with the OpenClaw container image",
          "Verify the endpoint is live and accepting requests",
          "Connect to Token Factory for inference with your API key",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Build a Tool-Calling Workflow",
        description:
          "Configure structured outputs and build a real agent workflow",
        details: [
          "Choose your model: compare Llama 3.1, Mistral, DeepSeek for tool calling",
          "Set up JSON mode and structured outputs for reliable function calls",
          "Build a business workflow: email triage, lead scoring, or data extraction",
          "Test end-to-end and iterate on prompts",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Optimization & Cost Analysis",
        description:
          "Tune latency, compare model costs, and plan for production",
        details: [
          "Benchmark latency across different models and presets",
          "Cost breakdown: per-token pricing vs. closed API alternatives",
          "When to use dedicated endpoints vs. shared Token Factory",
          "Q&A and next steps for production deployment",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install the Nebius CLI",
        duration: "5 min",
        overview:
          "Install and configure the Nebius AI Cloud CLI, which is the primary way to manage serverless endpoints.",
        instructions: [
          "Download and install the Nebius CLI from the official docs",
          "Run the login flow to authenticate with your Nebius account",
          "Verify your project ID is set correctly",
        ],
        commands: [
          "# Install Nebius CLI (macOS)",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "",
          "# Login to your account",
          "nebius auth login",
          "",
          "# Verify your config",
          "cat ~/.nebius/config.yaml",
        ],
        tips: [
          "If you don't have a Nebius account yet, sign up at nebius.com — mentors can help you get set up",
        ],
        checkpoint:
          "Running 'nebius iam whoami' returns your user info without errors.",
      },
      {
        stepNumber: 2,
        title: "Get Your Network and Subnet IDs",
        duration: "3 min",
        overview:
          "Look up the network and subnet IDs you'll need to deploy your serverless endpoint.",
        instructions: [
          "List your VPC networks to find the network ID",
          "Get the default subnet ID within that network",
          "Save both IDs — you'll use them in the next step",
        ],
        commands: [
          "# List networks",
          "nebius vpc network list",
          "",
          "# Get default subnet ID",
          "nebius vpc subnet get-by-name --name default-subnet \\",
          "  --format jsonpath='{.metadata.id}'",
        ],
        checkpoint:
          "You have a network ID and subnet ID saved for the next step.",
      },
      {
        stepNumber: 3,
        title: "Deploy OpenClaw on Serverless",
        duration: "10 min",
        overview:
          "Create a serverless endpoint running OpenClaw. This is a CPU-only container — no GPU needed for the agent orchestrator.",
        instructions: [
          "Generate an auth token for your endpoint",
          "Create the serverless endpoint using the Nebius CLI",
          "Wait ~30 seconds for the endpoint to become active",
          "Retrieve the public IP to test connectivity",
        ],
        commands: [
          "# Generate auth token",
          "export AUTH_TOKEN=$(openssl rand -hex 32)",
          "",
          "# Deploy OpenClaw on Serverless",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-agent \\",
          "  --container-image openclaw:latest \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$AUTH_TOKEN\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
          "",
          "# Get endpoint ID",
          "export ENDPOINT_ID=$(nebius msp serverless v1alpha1 endpoint get-by-name \\",
          "  --name openclaw-agent --format jsonpath='{.metadata.id}')",
          "",
          "# Get public IP",
          "export ENDPOINT_IP=$(nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID \\",
          "  --format jsonpath='{.status.public_endpoints[0]}')",
        ],
        tips: [
          "CPU-only is intentional — OpenClaw is the orchestrator, not the model. Token Factory handles inference on GPUs.",
          "The 4vcpu-16gb preset is plenty for most agent workloads. Scale up later if needed.",
        ],
        checkpoint:
          "curl http://$ENDPOINT_IP:8080/health returns a 200 response.",
      },
      {
        stepNumber: 4,
        title: "Connect to Token Factory",
        duration: "5 min",
        overview:
          "Get your Token Factory API key and configure OpenClaw to use it for inference.",
        instructions: [
          "Go to Token Factory in the Nebius console and create an API key",
          "Set the API key and endpoint URL in your OpenClaw config",
          "Choose a model from the catalog (we recommend starting with Llama 3.1 70B)",
          "Test a basic completion to verify the connection",
        ],
        commands: [
          "# Set Token Factory credentials in OpenClaw",
          "export TF_API_KEY=<your-token-factory-api-key>",
          "",
          "# Test the connection directly",
          "curl https://api.studio.nebius.com/v1/chat/completions \\",
          '  -H "Authorization: Bearer $TF_API_KEY" \\',
          '  -H "Content-Type: application/json" \\',
          "  -d '{",
          '    "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",',
          '    "messages": [{"role": "user", "content": "Hello, world!"}],',
          '    "max_tokens": 100',
          "  }'",
        ],
        tips: [
          "Token Factory uses an OpenAI-compatible API — if your code works with OpenAI, it works with TF",
          "Start with Llama 3.1 70B for a good balance of quality and cost. Try DeepSeek for coding tasks.",
        ],
        checkpoint:
          "The curl command returns a valid chat completion response from Token Factory.",
      },
      {
        stepNumber: 5,
        title: "Configure Structured Outputs",
        duration: "10 min",
        overview:
          "Set up JSON mode and structured outputs so your agent can reliably call tools and parse responses.",
        instructions: [
          "Enable JSON mode in your Token Factory requests",
          "Define a tool schema for your use case (e.g., email actions, database queries)",
          "Configure OpenClaw to use structured outputs for tool calling",
          "Test that the model returns valid JSON matching your schema",
        ],
        commands: [
          "# Example: structured output for tool calling",
          "curl https://api.studio.nebius.com/v1/chat/completions \\",
          '  -H "Authorization: Bearer $TF_API_KEY" \\',
          '  -H "Content-Type: application/json" \\',
          "  -d '{",
          '    "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",',
          '    "messages": [{"role": "user", "content": "Classify this email: Meeting tomorrow at 3pm"}],',
          '    "response_format": {"type": "json_object"},',
          '    "max_tokens": 200',
          "  }'",
        ],
        tips: [
          "JSON mode forces the model to output valid JSON — no more parsing errors in your agent loop",
          "For complex tool schemas, test with a few examples before wiring into the full workflow",
        ],
        checkpoint:
          "Your agent returns valid JSON that matches your tool schema on 5 consecutive test runs.",
      },
      {
        stepNumber: 6,
        title: "Build Your Agent Workflow",
        duration: "15 min",
        overview:
          "Wire everything together into a real business workflow — email triage, lead scoring, data extraction, or your own use case.",
        instructions: [
          "Pick a use case from the examples or bring your own",
          "Configure the agent loop: receive input → call model → execute tool → return result",
          "Test with real-world data (sample emails, documents, etc.)",
          "Iterate on prompts and tool schemas until results are reliable",
        ],
        tips: [
          "Start with a simple workflow and add complexity. A 3-tool agent beats a 10-tool agent that breaks.",
          "Use the mentor chat for prompt engineering help — we've seen what works across hundreds of use cases.",
        ],
        checkpoint:
          "Your agent handles 3 different inputs correctly end-to-end without manual intervention.",
      },
      {
        stepNumber: 7,
        title: "Cost Analysis & Production Planning",
        duration: "10 min",
        overview:
          "Benchmark costs, compare models, and plan your production deployment.",
        instructions: [
          "Run your workflow 10 times and note the token usage",
          "Calculate monthly cost at your expected volume",
          "Compare with GPT-4 / Claude API pricing for the same workload",
          "Document your configuration for production deployment",
        ],
        commands: [
          "# Check endpoint logs",
          "nebius msp serverless v1alpha1 endpoint logs $ENDPOINT_ID",
          "",
          "# View endpoint status",
          "nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID",
        ],
        tips: [
          "Most agent workflows cost 60-80% less on Token Factory vs. closed APIs",
          "Save your CLI commands in a deploy script for easy redeployment",
        ],
        checkpoint:
          "You have a working agent, a cost estimate, and a deploy script you can run again anytime.",
      },
    ],
  },
  {
    slug: "private-agents",
    badge: "Workshop",
    badgeColor: "badge-blue",
    title: "Private Agents — Zero-Retention + Dedicated Endpoints",
    subtitle:
      "Your Data Never Leaves. Your Endpoints Never Share. Your Agents Stay Private.",
    tagline:
      "Run agents on private documents with zero data retention and dedicated inference endpoints.",
    description:
      "Deploy OpenClaw on Nebius Serverless and connect it to dedicated Token Factory endpoints with zero data retention. Your prompts and documents are never stored at rest. Optional dedicated endpoints give you isolation and stable latency for sensitive workloads — legal, finance, healthcare, HR.",
    audience:
      "Teams handling sensitive data, compliance-focused orgs, regulated industries",
    level: "Intermediate",
    levelColor: "level-blue",
    keyValue:
      "Zero-retention inference with dedicated endpoints for data isolation",
    wowFactor:
      '"Our legal team approved this in one meeting — zero retention plus dedicated endpoints was exactly what they needed"',
    icon: "cloud",
    whatYouBuild: [
      "A private OpenClaw agent on Nebius Serverless processing confidential documents",
      "Dedicated Token Factory endpoints with zero data retention enabled",
      "An end-to-end workflow where no data is stored at rest at any point",
    ],
    whatWeCover: [
      "Zero-retention inference: what it means, how it works, what guarantees you get",
      "Dedicated vs. shared endpoints: isolation, latency stability, and compliance tradeoffs",
      "Deploying OpenClaw on Serverless with private networking",
      "Processing sensitive documents: contracts, medical records, financial reports",
      "Audit logging and compliance documentation for your security team",
      "Cost model for dedicated endpoints vs. shared infrastructure",
    ],
    whoIsThisFor:
      "Engineering leads and architects at companies that handle sensitive data — legal, finance, healthcare, HR. Anyone who needs AI agents but can't send data to a shared API. Also great for consultants building for regulated clients.",
    prerequisites: [
      "Laptop with a browser and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Familiarity with basic CLI tools and REST APIs",
    ],
    youLeaveWith: [
      "A private agent processing documents with zero data retention",
      "Dedicated Token Factory endpoints configured for your project",
      "A compliance-ready architecture diagram for your security team",
      "CLI scripts to deploy and manage private agents",
      "Cost estimates for dedicated vs. shared endpoint configurations",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "Zero-Retention Architecture Deep Dive",
        description:
          "How zero retention works at the infrastructure level and what guarantees you get",
        details: [
          "What 'zero retention' means: prompts and responses are never stored at rest",
          "Dedicated endpoints: your own isolated inference infrastructure",
          "Compliance landscape: HIPAA, SOC 2, GDPR — what this architecture enables",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Hands-On: Deploy a Private Agent Stack",
        description:
          "Deploy OpenClaw on Serverless with dedicated Token Factory endpoints",
        details: [
          "Deploy OpenClaw on Nebius Serverless with private networking",
          "Create a dedicated Token Factory endpoint with zero retention enabled",
          "Configure OpenClaw to route all inference through your dedicated endpoint",
          "Verify data isolation with request tracing",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Process Sensitive Documents",
        description:
          "Build a workflow that processes private documents end-to-end",
        details: [
          "Feed contracts, medical records, or financial reports to your agent",
          "Build extraction and summarization pipelines",
          "Verify zero retention: confirm no data persists after processing",
          "Add audit logging for compliance documentation",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Compliance Review & Production Planning",
        description:
          "Architecture review, cost analysis, and getting your security team on board",
        details: [
          "Walk through the architecture diagram with a security lens",
          "Cost model: dedicated endpoints vs. shared, scaling considerations",
          "Common questions from security and compliance teams (and how to answer them)",
          "Q&A and next steps for production rollout",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install the Nebius CLI",
        duration: "5 min",
        overview:
          "Install and configure the Nebius AI Cloud CLI for managing serverless endpoints and dedicated infrastructure.",
        instructions: [
          "Download and install the Nebius CLI",
          "Authenticate with your Nebius account",
          "Verify your project and tenant configuration",
        ],
        commands: [
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "",
          "# Login",
          "nebius auth login",
          "",
          "# Verify config",
          "cat ~/.nebius/config.yaml",
        ],
        checkpoint:
          "Running 'nebius iam whoami' returns your user info without errors.",
      },
      {
        stepNumber: 2,
        title: "Set Up Private Networking",
        duration: "5 min",
        overview:
          "Configure a VPC network and subnet for your private agent deployment. This keeps your traffic off the public internet.",
        instructions: [
          "List existing networks or create a new one for your private agent",
          "Get the subnet ID for endpoint deployment",
          "Note the network ID for later use",
        ],
        commands: [
          "# List networks",
          "nebius vpc network list",
          "",
          "# Get subnet ID",
          "export SUBNET_ID=$(nebius vpc subnet get-by-name \\",
          "  --name default-subnet --format jsonpath='{.metadata.id}')",
          "",
          "echo $SUBNET_ID",
        ],
        checkpoint: "You have SUBNET_ID exported and ready for deployment.",
      },
      {
        stepNumber: 3,
        title: "Deploy OpenClaw on Serverless",
        duration: "10 min",
        overview:
          "Deploy the OpenClaw agent on a Nebius Serverless endpoint. CPU-only — the agent orchestrator doesn't need a GPU.",
        instructions: [
          "Generate secure credentials for your endpoint",
          "Create the serverless endpoint with the OpenClaw container",
          "Wait for the endpoint to become active (~30 seconds)",
          "Retrieve the endpoint IP",
        ],
        commands: [
          "# Generate credentials",
          "export AUTH_TOKEN=$(openssl rand -hex 32)",
          "",
          "# Deploy OpenClaw",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-private \\",
          "  --container-image openclaw:latest \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$AUTH_TOKEN\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
          "",
          "# Get endpoint info",
          "export ENDPOINT_ID=$(nebius msp serverless v1alpha1 endpoint get-by-name \\",
          "  --name openclaw-private --format jsonpath='{.metadata.id}')",
        ],
        tips: [
          "For production, consider disabling --public and using private networking only",
        ],
        checkpoint: "Your OpenClaw endpoint is active and responding to health checks.",
      },
      {
        stepNumber: 4,
        title: "Create a Dedicated Token Factory Endpoint",
        duration: "10 min",
        overview:
          "Set up a dedicated Token Factory endpoint with zero data retention. This gives you isolated inference — your prompts never touch shared infrastructure.",
        instructions: [
          "Navigate to Token Factory in the Nebius console",
          "Create a dedicated endpoint (not shared) with zero retention enabled",
          "Generate an API key scoped to your dedicated endpoint",
          "Configure OpenClaw to use this endpoint for all inference",
        ],
        commands: [
          "# Set your dedicated TF endpoint",
          "export TF_API_KEY=<your-dedicated-tf-api-key>",
          "export TF_ENDPOINT=https://<your-dedicated-endpoint>.nebius.com",
          "",
          "# Test zero-retention endpoint",
          "curl $TF_ENDPOINT/v1/chat/completions \\",
          '  -H "Authorization: Bearer $TF_API_KEY" \\',
          '  -H "Content-Type: application/json" \\',
          "  -d '{",
          '    "model": "meta-llama/Meta-Llama-3.1-70B-Instruct",',
          '    "messages": [{"role": "user", "content": "Test message - verify zero retention"}],',
          '    "max_tokens": 50',
          "  }'",
        ],
        tips: [
          "Dedicated endpoints have stable latency because you're not sharing capacity with other users",
          "Zero retention means your prompts and responses are never written to disk — they exist only in memory during processing",
        ],
        checkpoint:
          "Your dedicated endpoint returns completions and you've confirmed zero-retention is enabled in the console.",
      },
      {
        stepNumber: 5,
        title: "Build a Private Document Pipeline",
        duration: "15 min",
        overview:
          "Create an agent workflow that processes sensitive documents — contracts, medical records, or financial reports — with full privacy guarantees.",
        instructions: [
          "Choose a document type: legal contracts, medical records, or financial reports",
          "Configure the agent to extract key information from documents",
          "Process sample documents through the pipeline",
          "Verify that no data persists after processing",
        ],
        tips: [
          "Use the sample documents we provide, or bring your own (redacted) examples",
          "The extraction pipeline is the same regardless of document type — the prompts change, not the architecture",
        ],
        checkpoint:
          "Your agent processes 3 sample documents and returns accurate extractions. No data remains on the endpoint after processing.",
      },
      {
        stepNumber: 6,
        title: "Add Audit Logging",
        duration: "10 min",
        overview:
          "Set up audit logging so your security team can verify what happened without seeing the actual data.",
        instructions: [
          "Enable structured logging on your OpenClaw endpoint",
          "Configure log entries to include request IDs, timestamps, and operations — but not document contents",
          "View logs through the Nebius CLI",
          "Export a sample audit log for your compliance team",
        ],
        commands: [
          "# View endpoint logs",
          "nebius msp serverless v1alpha1 endpoint logs $ENDPOINT_ID",
          "",
          "# Check endpoint status and uptime",
          "nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID",
        ],
        tips: [
          "Good audit logs answer 'who did what when' without revealing 'what was in the document'",
        ],
        checkpoint:
          "You can pull audit logs that show processing activity without exposing document contents.",
      },
      {
        stepNumber: 7,
        title: "Architecture Review & Compliance Prep",
        duration: "10 min",
        overview:
          "Document your architecture for your security team and plan the production rollout.",
        instructions: [
          "Review the architecture: Serverless (CPU) → Dedicated TF Endpoint (zero retention) → no persistent storage",
          "Document the data flow for your compliance team",
          "Calculate costs for dedicated endpoints at your expected volume",
          "Save your deployment scripts for repeatable production deployments",
        ],
        tips: [
          "The key selling point for compliance: data is never stored at rest, inference happens on dedicated hardware, and you have full audit logs",
          "Most compliance teams approve this architecture quickly because the guarantees are infrastructure-level, not policy-level",
        ],
        checkpoint:
          "You have a compliance-ready architecture doc, cost estimates, and a deploy script for production.",
      },
    ],
  },
  {
    slug: "agent-lifecycle",
    badge: "Workshop",
    badgeColor: "badge-cyan",
    title: "Improving Agents Over Time — Data → Fine-Tune → Redeploy",
    subtitle:
      "Capture Runs. Curate Data. Fine-Tune Models. Ship Better Agents.",
    tagline:
      "Your agents get better every week — not just when the base model updates.",
    description:
      "Learn the full agent improvement lifecycle: capture good and bad agent runs, curate a training dataset, fine-tune or distill a model on Nebius, and redeploy behind the same workflow. All running on Nebius Serverless + Token Factory — no infrastructure changes needed to go from prototype to fine-tuned production model.",
    audience:
      "AI engineers, ML-adjacent developers, teams with agents already in production",
    level: "Advanced",
    levelColor: "level-orange",
    keyValue:
      "Continuous agent improvement loop from data capture to fine-tuned deployment",
    wowFactor:
      '"We fine-tuned a 7B model that outperforms GPT-4 on our specific workflow — and it runs 10x cheaper"',
    icon: "lifecycle",
    whatYouBuild: [
      "A data capture pipeline that logs agent runs with quality labels",
      "A curated fine-tuning dataset from real agent interactions",
      "A fine-tuned model deployed on Token Factory behind your existing workflow",
    ],
    whatWeCover: [
      "Logging agent runs: what to capture, how to label good vs. bad outputs",
      "Dataset curation: filtering, formatting, and quality control for fine-tuning",
      "Fine-tuning on Nebius: model selection, training configuration, evaluation",
      "Distillation: using a large model's outputs to train a smaller, cheaper model",
      "Redeployment: swap the fine-tuned model into your workflow without changing code",
      "Monitoring: tracking whether the fine-tuned model actually improves outcomes",
    ],
    whoIsThisFor:
      "AI engineers and developers who already have agents running and want to make them better. You should be comfortable with APIs and have a basic understanding of how language models work. ML experience is helpful but not required — we focus on practical workflows, not research.",
    prerequisites: [
      "Laptop with a browser and terminal access",
      "A Nebius AI Cloud account with Token Factory access",
      "An existing agent workflow (or complete Workshop 1 first)",
    ],
    youLeaveWith: [
      "A data capture pipeline for agent runs",
      "A curated fine-tuning dataset",
      "A fine-tuned model running on Token Factory",
      "A redeployment workflow that swaps models without downtime",
      "Monitoring queries to track improvement over time",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "The Agent Improvement Lifecycle",
        description:
          "Why fine-tuning matters and how the data → train → deploy loop works",
        details: [
          "Why base models plateau on specific tasks — and how fine-tuning breaks through",
          "The lifecycle: capture runs → label quality → curate dataset → fine-tune → redeploy → monitor",
          "When to fine-tune vs. when to improve prompts (and how to tell the difference)",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Hands-On: Data Capture & Dataset Curation",
        description:
          "Set up run logging, label outputs, and build a training dataset",
        details: [
          "Add structured logging to your agent to capture inputs, outputs, and tool calls",
          "Label runs as good/bad/needs-improvement using a simple scoring system",
          "Filter and format data into fine-tuning format (chat completion format)",
          "Quality control: remove PII, deduplicate, balance positive/negative examples",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Fine-Tune & Deploy",
        description:
          "Fine-tune a model on Nebius and deploy it behind your existing workflow",
        details: [
          "Choose a base model for fine-tuning (Llama 3.1 8B or 70B)",
          "Configure and launch a fine-tuning job on Nebius",
          "Evaluate the fine-tuned model against the base model",
          "Deploy the fine-tuned model on Token Factory",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Distillation, Monitoring & Next Steps",
        description:
          "Advanced patterns: model distillation, A/B testing, and continuous improvement",
        details: [
          "Distillation: use GPT-4 or Llama 70B outputs to train a fast 7B model",
          "A/B testing: route traffic between base and fine-tuned models",
          "Monitoring: track accuracy, latency, and cost over time",
          "Q&A and production deployment patterns",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Set Up Your Agent Stack",
        duration: "10 min",
        overview:
          "Deploy OpenClaw on Nebius Serverless with Token Factory — or use your existing setup from Workshop 1.",
        instructions: [
          "If you completed Workshop 1, verify your agent is still running",
          "If starting fresh, deploy OpenClaw on Serverless and connect to Token Factory",
          "Ensure you have a working agent workflow to capture data from",
        ],
        commands: [
          "# Verify existing endpoint (if you have one)",
          "nebius msp serverless v1alpha1 endpoint get-by-name --name openclaw-agent",
          "",
          "# Or deploy fresh (see Workshop 1 for full setup)",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-lifecycle \\",
          "  --container-image openclaw:latest \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$(openssl rand -hex 32)\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
        ],
        checkpoint:
          "Your OpenClaw agent is running and processing requests on Nebius Serverless.",
      },
      {
        stepNumber: 2,
        title: "Add Run Logging",
        duration: "10 min",
        overview:
          "Instrument your agent to log every run — inputs, outputs, tool calls, and timing — in a structured format.",
        instructions: [
          "Add a logging middleware to your agent that captures each interaction",
          "Log the full message history, tool calls, and final output",
          "Include timing data (latency per step) and token counts",
          "Store logs in JSONL format for easy processing later",
        ],
        tips: [
          "Log everything at first — you can filter later. It's much harder to add logging retroactively.",
          "Use JSONL (one JSON object per line) — it's the easiest format to process and filter",
        ],
        checkpoint:
          "Running your agent produces a JSONL log file with full interaction details for each run.",
      },
      {
        stepNumber: 3,
        title: "Label and Score Runs",
        duration: "10 min",
        overview:
          "Go through captured runs and label them as good, bad, or needs-improvement. This is your training signal.",
        instructions: [
          "Review 20-30 agent runs from your logs",
          "Score each run: 1 (bad), 2 (acceptable), 3 (good)",
          "For bad runs, note what went wrong (wrong tool call, bad extraction, hallucination)",
          "For good runs, note what made them good (correct output, efficient tool use)",
        ],
        tips: [
          "You don't need thousands of examples. 50-100 high-quality labeled runs can dramatically improve a model.",
          "Focus on runs where the model almost got it right — those are the most valuable for fine-tuning.",
        ],
        checkpoint:
          "You have 30+ labeled runs with quality scores and notes on what went right/wrong.",
      },
      {
        stepNumber: 4,
        title: "Curate the Fine-Tuning Dataset",
        duration: "15 min",
        overview:
          "Transform your labeled runs into a fine-tuning dataset in chat completion format.",
        instructions: [
          "Filter to only good runs (score 3) and corrected versions of bad runs",
          "Format each example as a chat completion (system + user + assistant messages)",
          "Remove any PII or sensitive data from the training examples",
          "Split into training (90%) and evaluation (10%) sets",
        ],
        tips: [
          "Quality over quantity — 50 perfect examples beat 500 noisy ones",
          "Include the tool call format in your training data so the model learns your specific tool schema",
        ],
        checkpoint:
          "You have a training JSONL file and an eval JSONL file, both in chat completion format.",
      },
      {
        stepNumber: 5,
        title: "Fine-Tune on Nebius",
        duration: "15 min",
        overview:
          "Launch a fine-tuning job on Nebius using your curated dataset. We'll fine-tune a Llama model to specialize on your workflow.",
        instructions: [
          "Upload your training and eval datasets to Nebius",
          "Configure the fine-tuning job: base model, learning rate, epochs",
          "Launch the job and monitor progress",
          "Evaluate the fine-tuned model against the base model on your eval set",
        ],
        tips: [
          "Start with Llama 3.1 8B for fast iteration. Move to 70B once you've validated the approach.",
          "2-3 epochs is usually enough. More epochs can lead to overfitting on small datasets.",
        ],
        checkpoint:
          "Your fine-tuning job completes and the eval shows improvement over the base model.",
      },
      {
        stepNumber: 6,
        title: "Deploy the Fine-Tuned Model",
        duration: "10 min",
        overview:
          "Deploy your fine-tuned model on Token Factory and swap it into your existing agent workflow — no code changes needed.",
        instructions: [
          "Deploy the fine-tuned model to a Token Factory endpoint",
          "Update your OpenClaw configuration to point at the new model",
          "Run the same test cases through both models to compare",
          "Switch traffic to the fine-tuned model",
        ],
        tips: [
          "The beauty of this architecture: swap model names in your config, everything else stays the same",
          "Keep the base model endpoint active for A/B testing and fallback",
        ],
        checkpoint:
          "Your agent is running on the fine-tuned model and producing better results than the base model.",
      },
      {
        stepNumber: 7,
        title: "Monitor and Iterate",
        duration: "10 min",
        overview:
          "Set up monitoring to track whether your fine-tuned model actually improves outcomes over time, and plan the next iteration.",
        instructions: [
          "Set up automated quality checks on agent outputs",
          "Track key metrics: accuracy, latency, cost per run, error rate",
          "Plan a schedule for the next data capture → fine-tune cycle (weekly or monthly)",
          "Document the process so your team can run it independently",
        ],
        commands: [
          "# Check endpoint metrics",
          "nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID",
          "",
          "# View recent logs",
          "nebius msp serverless v1alpha1 endpoint logs $ENDPOINT_ID",
        ],
        tips: [
          "The first fine-tune is the biggest improvement. Each subsequent cycle gives smaller but compounding gains.",
          "Distillation shortcut: use a large model (70B or GPT-4) to generate 'perfect' outputs, then fine-tune a small model (7B or 8B) on those outputs. Same quality, 10x cheaper inference.",
        ],
        checkpoint:
          "You have monitoring in place, a documented process, and a plan for the next fine-tuning cycle.",
      },
    ],
  },
  {
    slug: "robotics",
    badge: "Workshop",
    badgeColor: "badge-pink",
    title: "OpenClaw + Robotics with Solo CLI",
    subtitle:
      "Calibrate. Teleoperate. Train. Infer. All From One CLI.",
    tagline:
      "Use Solo CLI to control robotic arms, record datasets, train VLA models on Nebius GPUs, and run inference — all wired through Nebius Serverless + Token Factory.",
    description:
      "Use Solo CLI to work with real robotic hardware — SO-101, Koch, LeKiwi, OpenDroid (Realman R1D2), Unitree G1, and Booster. Calibrate arms, teleoperate, record training datasets, and train vision-language-action (VLA) models like ACT, Pi0, SmolVLA, and GROOT N1.5 on Nebius GPUs. Then deploy your trained policy behind Nebius Serverless + Token Factory for cloud-based inference. Motors are already set up — you start with calibration and go. Full Solo CLI docs at github.com/GetSoloTech/solo-cli.",
    audience:
      "Robotics-curious developers, hardware hackers, AI engineers who want to bridge digital and physical",
    level: "Intermediate",
    levelColor: "level-pink",
    keyValue:
      "End-to-end robotics pipeline: calibrate → teleoperate → record → train VLA → deploy inference",
    wowFactor:
      '"I trained a VLA model on my own teleop data and watched the arm replay the task autonomously — in one session"',
    icon: "robot",
    whatYouBuild: [
      "A calibrated and teleoperated robotic arm (SO-101 or Koch) using Solo CLI",
      "A recorded training dataset from your own teleoperation sessions",
      "A trained VLA policy (ACT, Pi0, or SmolVLA) deployed on Nebius for inference",
    ],
    whatWeCover: [
      "Solo CLI: one tool for calibration, teleoperation, recording, training, and inference — github.com/GetSoloTech/solo-cli (docs: github.com/GetSoloTech/solo-cli/blob/main/solo/commands/robots/lerobot/README.md)",
      "Supported robots: SO-101, Koch, LeKiwi, OpenDroid (Realman R1D2), Unitree G1, Booster — each with official docs and LeRobot integration",
      "VLA models: ACT, Pi0, Pi0Fast, Pi05, SmolVLA, GROOT N1.5, X-VLA — what they are, when to use each, and how to train them",
      "Recording imitation learning datasets with 'solo robo --record' and the LeRobot framework (github.com/huggingface/lerobot)",
      "Training VLA policies on Nebius GPUs via Token Factory",
      "Deploying trained models on Nebius Serverless for cloud-based robotic inference",
    ],
    whoIsThisFor:
      "Developers who want to see AI agents interact with the physical world. You don't need robotics experience — motors are pre-configured and Solo CLI walks you through everything. Great for anyone who wants to go beyond text-only agents and train models that control real hardware.",
    prerequisites: [
      "Laptop with Python 3.12+ and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Basic comfort with Python and CLI tools",
    ],
    youLeaveWith: [
      "A calibrated robotic arm you can teleoperate from Solo CLI",
      "A recorded dataset of teleoperation episodes",
      "A trained VLA model (ACT or SmolVLA) that can replay tasks autonomously",
      "Inference running on Nebius Serverless + Token Factory",
      "Video of your robot performing a learned task to show your team",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "Solo CLI Setup & Robot Calibration",
        description:
          "Install Solo CLI, meet the hardware, calibrate, and test teleoperation",
        details: [
          "Install Solo CLI from source or PyPI (Python 3.12+, uv package manager)",
          "Available robots: SO-101, Koch, LeKiwi, OpenDroid, Unitree G1, Booster — pick your station",
          "Calibrate with 'solo robo --calibrate all' and test with 'solo robo --teleop'",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Record Data & Understand VLA Models",
        description:
          "Teleoperate your robot, record training datasets, and learn about VLA model architectures",
        details: [
          "Record teleoperation episodes with 'solo robo --record' — guided prompts for each episode",
          "VLA model landscape: ACT (fast, simple), Pi0/Pi0Fast (foundation model), SmolVLA (lightweight), GROOT N1.5 (NVIDIA)",
          "What makes a good training dataset: episode count, task variety, and data quality",
          "Replay recorded episodes with 'solo robo --replay' to verify data quality",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Train & Deploy Your VLA Model",
        description:
          "Train a policy on Nebius GPUs and deploy it for autonomous inference",
        details: [
          "Launch training with 'solo robo --train' — choose ACT or SmolVLA as your policy",
          "Training runs on Nebius GPUs via Token Factory for fast iteration",
          "Deploy trained model on Nebius Serverless for cloud-based inference",
          "Run inference with 'solo robo --inference' — watch the arm execute the learned task autonomously",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Advanced Patterns & Show-and-Tell",
        description:
          "Multi-task learning, model comparison, and demoing what you built",
        details: [
          "Compare VLA models: run the same task with ACT vs. SmolVLA and see the difference",
          "Multi-task training: combine multiple recorded tasks into one model",
          "Record a video of your robot performing autonomously",
          "Show-and-tell: demo your workflow to the group",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install Solo CLI & Nebius CLI",
        duration: "5 min",
        overview:
          "Install Solo CLI for robotics operations and the Nebius CLI for cloud deployment. Solo CLI handles everything from calibration to training.",
        instructions: [
          "Clone and install Solo CLI (requires Python 3.12+ and uv)",
          "Install the Nebius CLI for cloud deployment",
          "Verify both are working",
        ],
        commands: [
          "# Install Solo CLI from source (recommended for hackathons)",
          "git clone https://github.com/GetSoloTech/solo-cli.git",
          "cd solo-cli",
          "uv pip install -e .",
          "",
          "# Or install from PyPI",
          "uv pip install solo-cli",
          "",
          "# Run interactive setup",
          "solo setup",
          "",
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "nebius auth login",
        ],
        tips: [
          "Solo CLI requires Python 3.12+. If you're on an older version, use 'uv python install 3.12' first.",
          "The 'solo setup' command saves your config to ~/.solo/config.json — it remembers your hardware and preferences.",
          "Full Solo CLI docs: https://github.com/GetSoloTech/solo-cli/blob/main/solo/commands/robots/lerobot/README.md",
          "LeRobot framework (used under the hood): https://github.com/huggingface/lerobot",
        ],
        checkpoint:
          "Running 'solo status' shows your system info and 'nebius iam whoami' returns your user info.",
      },
      {
        stepNumber: 2,
        title: "Calibrate Your Robot",
        duration: "10 min",
        overview:
          "Connect to your robotic arm and run calibration. Motors are already set up — you just need to calibrate the coordinate system. Available robots: SO-101, Koch, LeKiwi, and more.",
        instructions: [
          "Connect the robotic arm via USB (motors are pre-configured)",
          "Run Solo CLI calibration for all joints",
          "Follow the on-screen prompts to set joint limits",
          "Verify calibration by testing teleoperation",
        ],
        commands: [
          "# Calibrate all joints (motors are already set up)",
          "solo robo --calibrate all",
          "",
          "# Test teleoperation — move the arm with the leader arm",
          "solo robo --teleop",
        ],
        tips: [
          "Motors are already set up — skip motor setup and go straight to calibration.",
          "During calibration, move each joint to its limit when prompted. This sets the workspace boundaries.",
          "SO-101 official docs: https://huggingface.co/docs/lerobot/en/so101",
          "Koch official docs: https://huggingface.co/docs/lerobot/en/koch",
          "LeKiwi official docs: https://huggingface.co/docs/lerobot/en/lekiwi (assembly guide: https://wiki.seeedstudio.com/lerobot_lekiwi/)",
          "OpenDroid (Realman R1D2) quick start: https://develop.realman-robotics.com/en/robot/quickUseManual/",
        ],
        checkpoint:
          "Calibration completes without errors and you can teleoperate the arm smoothly.",
      },
      {
        stepNumber: 3,
        title: "Record Training Data",
        duration: "15 min",
        overview:
          "Teleoperate the arm to perform a task (pick and place, stacking, sorting) and record episodes as training data for your VLA model.",
        instructions: [
          "Choose a task: pick-and-place, stacking blocks, or sorting by color",
          "Start recording with Solo CLI — it prompts you for task descriptions",
          "Perform the task 10-20 times via teleoperation (more episodes = better model)",
          "Replay episodes to verify data quality",
        ],
        commands: [
          "# Record teleoperation episodes (with guided prompts)",
          "solo robo --record",
          "",
          "# Skip prompts and use saved settings",
          "solo robo --record -y",
          "",
          "# Replay a recorded episode to check data quality",
          "solo robo --replay",
        ],
        tips: [
          "Aim for 10-20 episodes for a basic task. Consistency matters more than volume — try to perform the task the same way each time.",
          "Include slight variations (object positions, angles) so the model generalizes rather than memorizing one trajectory.",
          "LeRobot GitHub (dataset format & tools): https://github.com/huggingface/lerobot",
        ],
        checkpoint:
          "You have 10+ recorded episodes and replay shows clean, consistent trajectories.",
      },
      {
        stepNumber: 4,
        title: "Deploy Inference Infrastructure on Nebius",
        duration: "10 min",
        overview:
          "Set up Nebius Serverless and Token Factory for training and deploying your VLA model. The agent orchestrator runs on serverless CPU, while training and inference use Nebius GPUs.",
        instructions: [
          "Get your network and subnet IDs from Nebius",
          "Deploy the OpenClaw orchestrator on Nebius Serverless",
          "Configure Token Factory for GPU-backed model serving",
        ],
        commands: [
          "# Get subnet",
          "export SUBNET_ID=$(nebius vpc subnet get-by-name \\",
          "  --name default-subnet --format jsonpath='{.metadata.id}')",
          "",
          "# Deploy orchestrator on Serverless",
          "export AUTH_TOKEN=$(openssl rand -hex 32)",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-robotics \\",
          "  --container-image openclaw:robotics \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$AUTH_TOKEN\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
          "",
          "# Set Token Factory key for GPU inference",
          "export TF_API_KEY=<your-token-factory-api-key>",
        ],
        checkpoint:
          "Your serverless endpoint is active and Token Factory API key is configured.",
      },
      {
        stepNumber: 5,
        title: "Train Your VLA Model",
        duration: "15 min",
        overview:
          "Train a vision-language-action model on your recorded dataset. Choose ACT for fast training or SmolVLA for a more capable policy. Training runs on Nebius GPUs.",
        instructions: [
          "Choose your VLA model: ACT (fast, simple) or SmolVLA (vision-language-action)",
          "Launch training with Solo CLI — it handles data formatting and training config",
          "Monitor training progress",
          "Evaluate the trained model on held-out episodes",
        ],
        commands: [
          "# Train a VLA policy (Solo CLI handles the config)",
          "solo robo --train",
          "",
          "# Skip prompts with saved settings",
          "solo robo --train -y",
        ],
        tips: [
          "ACT trains in minutes and works great for single-task policies. Start here. Paper: https://tonyzhaozh.github.io/aloha/ | Code: https://github.com/tonyzhaozh/act | LeRobot: https://huggingface.co/docs/lerobot/en/act",
          "SmolVLA is more capable but takes longer to train — good for multi-task learning. Docs: https://huggingface.co/blog/smolvla",
          "Pi0 / Pi0Fast / Pi05 — Physical Intelligence foundation models. Paper: https://www.pi.website/blog/pi0 | Code: https://github.com/Physical-Intelligence/openpi | LeRobot: https://huggingface.co/docs/lerobot/en/pi0",
          "GROOT N1.5 — NVIDIA's VLA model. Paper: https://research.nvidia.com/labs/gear/gr00t-n1_5/ | Code: https://github.com/NVIDIA/Isaac-GR00T | LeRobot: https://huggingface.co/docs/lerobot/en/groot",
          "X-VLA — Paper: https://arxiv.org/pdf/2510.10274 | LeRobot: https://huggingface.co/docs/lerobot/en/xvla",
        ],
        checkpoint:
          "Training completes and the loss curve shows convergence. Your model checkpoint is saved.",
      },
      {
        stepNumber: 6,
        title: "Run Autonomous Inference",
        duration: "10 min",
        overview:
          "Deploy your trained model and watch the arm execute the learned task autonomously — no teleoperation, just the model driving the robot.",
        instructions: [
          "Load your trained model checkpoint",
          "Run inference with Solo CLI — the robot executes autonomously",
          "Compare the autonomous behavior to your original teleoperation",
          "Try variations: move objects to different positions and see if the model generalizes",
        ],
        commands: [
          "# Run inference with your trained model",
          "solo robo --inference",
          "",
          "# Skip prompts",
          "solo robo --inference -y",
        ],
        tips: [
          "The first autonomous run is the magic moment — watch the arm do what you taught it without any human input.",
          "If the model doesn't generalize well, record 10 more episodes with more position variety and retrain.",
        ],
        checkpoint:
          "Your robot arm executes the learned task autonomously from your trained VLA model.",
      },
      {
        stepNumber: 7,
        title: "Record Your Demo & Explore More Robots",
        duration: "10 min",
        overview:
          "Record a video of your robot performing autonomously, then explore other available platforms if time permits.",
        instructions: [
          "Record a video of autonomous inference — show the robot completing the task",
          "Try a different robot if available: LeKiwi (mobile), OpenDroid, or Unitree G1",
          "Save your model checkpoint and deployment config for future use",
          "Share your video in the group chat",
        ],
        commands: [
          "# Check Solo CLI status and model info",
          "solo status",
          "",
          "# List downloaded models",
          "solo list",
          "",
          "# Save your Nebius deployment config",
          "nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID --format yaml > robotics-deploy.yaml",
        ],
        tips: [
          "The best demos show the full loop: teleoperation → training → autonomous execution.",
          "Other robots to explore: LeKiwi (https://huggingface.co/docs/lerobot/en/lekiwi), OpenDroid R1D2 (https://develop.realman-robotics.com/en/robot/quickUseManual/), Unitree G1 (https://huggingface.co/docs/lerobot/en/unitree_g1), Booster (https://www.booster.tech/open-source/). Each works with Solo CLI.",
          "Unitree G1 extras: SDK (https://github.com/unitreerobotics/unitree_sdk2_python), Replay (https://github.com/GetSoloTech/unitree-g1-replay), IsaacLab Sim (https://github.com/unitreerobotics/unitree_sim_isaaclab), GROOT Wholebody Control (https://github.com/NVlabs/GR00T-WholeBodyControl)",
          "OpenDroid programming guide (teach pendant, ROS, APIs): https://develop.realman-robotics.com/en/robot/teachingPendant/armTeching/",
          "All VLA model LeRobot implementations: ACT (https://huggingface.co/docs/lerobot/en/act), Pi0 (https://huggingface.co/docs/lerobot/en/pi0), Pi0Fast (https://huggingface.co/docs/lerobot/en/pi0fast), Pi05 (https://huggingface.co/docs/lerobot/en/pi05), GROOT (https://huggingface.co/docs/lerobot/en/groot), X-VLA (https://huggingface.co/docs/lerobot/en/xvla), SmolVLA (https://huggingface.co/blog/smolvla)",
        ],
        checkpoint:
          "You have a video of autonomous execution and your model + config saved for future use.",
      },
    ],
  },
  {
    slug: "lekiwi",
    hidden: true,
    badge: "Workshop",
    badgeColor: "badge-green",
    title: "LeKiwi — Mobile Robot Imitation Learning",
    subtitle:
      "Wheels + Arms. Navigate. Grasp. Train. Deploy.",
    tagline:
      "Build a mobile manipulation robot that navigates, grasps, and learns — all from Solo CLI + Nebius.",
    description:
      "LeKiwi combines a wheeled mobile base with an SO-101 robotic arm, creating a platform for mobile manipulation. Use Solo CLI to calibrate, teleoperate, record imitation learning datasets, and train VLA models that handle navigation + grasping. Deploy your trained policy on Nebius Serverless + Token Factory for cloud inference. Assembly docs at wiki.seeedstudio.com/lerobot_lekiwi/ and official docs at huggingface.co/docs/lerobot/en/lekiwi.",
    audience:
      "Developers interested in mobile robotics, navigation + manipulation, and imitation learning",
    level: "Intermediate",
    levelColor: "level-green",
    keyValue:
      "Mobile manipulation pipeline: navigate + grasp with a single trained VLA model",
    wowFactor:
      '"The robot drove to the block, picked it up, and brought it back — all from one model I trained in this session"',
    icon: "lekiwi",
    whatYouBuild: [
      "A calibrated LeKiwi mobile robot with teleoperation via Solo CLI",
      "A recorded dataset of mobile manipulation episodes (navigate + grasp)",
      "A trained VLA policy deployed on Nebius for autonomous mobile manipulation",
    ],
    whatWeCover: [
      "LeKiwi hardware: SO-101 arm on a wheeled base — calibration and teleoperation (https://huggingface.co/docs/lerobot/en/lekiwi)",
      "Assembly & setup with 3D printing files and guides (https://wiki.seeedstudio.com/lerobot_lekiwi/)",
      "Solo CLI for mobile robots: calibration, teleop, recording, and training with LeKiwi-specific configs",
      "Recording mobile manipulation datasets — navigation + grasping in single episodes",
      "Training VLA models (ACT, SmolVLA) for mobile manipulation on Nebius GPUs",
      "LeRobot framework integration for dataset management and model training (https://github.com/huggingface/lerobot)",
    ],
    whoIsThisFor:
      "Developers who want to go beyond stationary arms and build robots that move AND manipulate. Great for anyone interested in home robotics, warehouse automation, or mobile AI agents. LeKiwi is beginner-friendly but the mobile manipulation challenge adds real depth.",
    prerequisites: [
      "Laptop with Python 3.12+ and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Basic comfort with Python and CLI tools",
    ],
    youLeaveWith: [
      "A calibrated LeKiwi you can teleoperate from Solo CLI",
      "A recorded dataset of mobile manipulation episodes",
      "A trained VLA model for autonomous navigation + grasping",
      "Inference running on Nebius Serverless + Token Factory",
      "Video of your LeKiwi performing a mobile manipulation task autonomously",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "LeKiwi Setup & Calibration",
        description:
          "Meet the LeKiwi, calibrate the arm and base, and test teleoperation",
        details: [
          "LeKiwi hardware overview: SO-101 arm + wheeled mobile base",
          "Install Solo CLI and run calibration for both arm and wheels",
          "Test teleoperation — drive the base and control the arm simultaneously",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Record Mobile Manipulation Data",
        description:
          "Teleoperate LeKiwi through navigate-and-grasp tasks, recording training episodes",
        details: [
          "Design a mobile manipulation task: drive to object → pick up → return",
          "Record 15-20 episodes with Solo CLI, varying start positions and object locations",
          "Replay episodes to verify trajectory quality and consistency",
          "Understand what makes good mobile manipulation data vs. stationary arm data",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Train & Deploy Your Mobile Policy",
        description:
          "Train a VLA model on mobile manipulation data and deploy for autonomous inference",
        details: [
          "Choose ACT or SmolVLA for your mobile manipulation policy",
          "Train on Nebius GPUs via Token Factory",
          "Deploy to Nebius Serverless for cloud-based inference",
          "Run autonomous inference — watch LeKiwi navigate and grasp without teleoperation",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Multi-Task & Show-and-Tell",
        description:
          "Try multi-task learning and demo your autonomous LeKiwi",
        details: [
          "Record a second task and combine both into one multi-task model",
          "Compare model performance on seen vs. unseen object positions",
          "Record a video of autonomous mobile manipulation",
          "Share your demo with the group",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install Solo CLI",
        duration: "5 min",
        overview:
          "Install Solo CLI and configure it for LeKiwi hardware.",
        instructions: [
          "Clone and install Solo CLI (requires Python 3.12+ and uv)",
          "Run interactive setup and select LeKiwi when prompted",
          "Verify Solo CLI detects the connected hardware",
        ],
        commands: [
          "# Install Solo CLI",
          "git clone https://github.com/GetSoloTech/solo-cli.git",
          "cd solo-cli && uv pip install -e .",
          "",
          "# Or from PyPI",
          "uv pip install solo-cli",
          "",
          "# Run setup (select LeKiwi)",
          "solo setup",
        ],
        tips: [
          "Solo CLI docs: https://github.com/GetSoloTech/solo-cli/blob/main/solo/commands/robots/lerobot/README.md",
          "LeKiwi official docs: https://huggingface.co/docs/lerobot/en/lekiwi",
          "Assembly & setup guide with 3D printing files: https://wiki.seeedstudio.com/lerobot_lekiwi/",
        ],
        checkpoint:
          "Running 'solo status' shows your LeKiwi hardware detected.",
      },
      {
        stepNumber: 2,
        title: "Calibrate Arm & Base",
        duration: "10 min",
        overview:
          "Calibrate the SO-101 arm joints and the wheeled base. Motors are already set up — you just need to calibrate the coordinate systems.",
        instructions: [
          "Run full calibration for both arm and mobile base",
          "Follow on-screen prompts to set joint limits for the arm",
          "Calibrate wheel encoders for accurate navigation",
          "Test with a short teleoperation session — drive and grab simultaneously",
        ],
        commands: [
          "# Calibrate all (arm + base)",
          "solo robo --calibrate all",
          "",
          "# Test teleoperation",
          "solo robo --teleop",
        ],
        tips: [
          "Motors are pre-configured — skip motor setup and go straight to calibration.",
          "Test driving in a figure-8 to verify wheel calibration accuracy.",
          "SO-101 arm docs: https://huggingface.co/docs/lerobot/en/so101",
        ],
        checkpoint:
          "Calibration completes and you can teleoperate both arm and base smoothly.",
      },
      {
        stepNumber: 3,
        title: "Record Mobile Manipulation Episodes",
        duration: "15 min",
        overview:
          "Teleoperate LeKiwi to navigate to objects, pick them up, and carry them back. Record 15-20 episodes for training.",
        instructions: [
          "Set up a simple task: drive to a colored block, pick it up, return to start",
          "Start recording with Solo CLI — describe the task when prompted",
          "Perform 15-20 episodes, varying start positions and block locations",
          "Replay episodes to check for smooth, consistent trajectories",
        ],
        commands: [
          "# Record episodes",
          "solo robo --record",
          "",
          "# Skip prompts with saved settings",
          "solo robo --record -y",
          "",
          "# Replay to verify",
          "solo robo --replay",
        ],
        tips: [
          "Mobile manipulation needs more episodes than stationary tasks — aim for 15-20.",
          "Vary starting position and object location between episodes for better generalization.",
          "LeRobot GitHub (dataset format): https://github.com/huggingface/lerobot",
        ],
        checkpoint:
          "You have 15+ recorded episodes with clean navigation + grasping trajectories.",
      },
      {
        stepNumber: 4,
        title: "Set Up Nebius Infrastructure",
        duration: "10 min",
        overview:
          "Deploy the OpenClaw orchestrator on Nebius Serverless and configure Token Factory for GPU training.",
        instructions: [
          "Install and authenticate with the Nebius CLI",
          "Deploy the orchestrator on Nebius Serverless (CPU-only)",
          "Configure Token Factory API key for GPU-backed training",
        ],
        commands: [
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "nebius auth login",
          "",
          "# Deploy orchestrator",
          "export AUTH_TOKEN=$(openssl rand -hex 32)",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-lekiwi \\",
          "  --container-image openclaw:robotics \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$AUTH_TOKEN\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
          "",
          "# Set Token Factory key",
          "export TF_API_KEY=<your-token-factory-api-key>",
        ],
        checkpoint:
          "Serverless endpoint is active and Token Factory API key is configured.",
      },
      {
        stepNumber: 5,
        title: "Train Your Mobile Manipulation Model",
        duration: "15 min",
        overview:
          "Train a VLA model on your LeKiwi episodes. The model learns both navigation and manipulation from your demos.",
        instructions: [
          "Choose ACT (fast) or SmolVLA (more capable) as your policy",
          "Launch training with Solo CLI",
          "Monitor training progress and wait for convergence",
          "Evaluate on held-out episodes",
        ],
        commands: [
          "# Train VLA policy",
          "solo robo --train",
          "",
          "# With saved settings",
          "solo robo --train -y",
        ],
        tips: [
          "ACT is recommended for first mobile manipulation models — trains fast and handles navigation well. Paper: https://tonyzhaozh.github.io/aloha/",
          "SmolVLA handles multi-task better if you plan to combine navigate + grasp + place. Docs: https://huggingface.co/blog/smolvla",
        ],
        checkpoint:
          "Training completes with converged loss. Model checkpoint saved.",
      },
      {
        stepNumber: 6,
        title: "Run Autonomous Mobile Manipulation",
        duration: "10 min",
        overview:
          "Watch LeKiwi autonomously navigate to an object, pick it up, and bring it back — no teleoperation, just your trained model.",
        instructions: [
          "Load your trained model checkpoint",
          "Run inference with Solo CLI",
          "Place objects at new positions and test generalization",
          "Compare autonomous behavior to your original teleoperation",
        ],
        commands: [
          "# Autonomous inference",
          "solo robo --inference",
          "",
          "# Skip prompts",
          "solo robo --inference -y",
        ],
        tips: [
          "The magic moment: watching LeKiwi drive to a block, grab it, and return — all autonomously.",
          "If generalization is poor, record 5-10 more episodes with wider position variety.",
        ],
        checkpoint:
          "LeKiwi autonomously navigates to objects and performs the manipulation task.",
      },
      {
        stepNumber: 7,
        title: "Record Demo & Explore Extensions",
        duration: "10 min",
        overview:
          "Capture video of your autonomous LeKiwi and try multi-task extensions.",
        instructions: [
          "Record a video showing the full autonomous mobile manipulation loop",
          "Try a second task (sorting, stacking) and record additional episodes",
          "Save your model checkpoint and deployment config",
          "Share your video with the group",
        ],
        commands: [
          "# Check status",
          "solo status",
          "",
          "# List models",
          "solo list",
        ],
        tips: [
          "Best demo: side-by-side of teleoperation vs. autonomous execution.",
          "LeKiwi assembly docs: https://wiki.seeedstudio.com/lerobot_lekiwi/",
          "LeRobot GitHub: https://github.com/huggingface/lerobot",
        ],
        checkpoint:
          "You have a video of autonomous mobile manipulation and saved model/config.",
      },
    ],
  },
  {
    slug: "opendroid",
    hidden: true,
    badge: "Workshop",
    badgeColor: "badge-purple",
    title: "OpenDroid R1D2 — Industrial Arm Programming",
    subtitle:
      "Teach Pendant. ROS. Python API. Imitation Learning.",
    tagline:
      "Program a full industrial robotic arm with teach pendant, ROS, Python APIs, and VLA-powered imitation learning.",
    description:
      "The OpenDroid (Realman R1D2) is a production-grade robotic arm with teach pendant, ROS support, and multi-language APIs (C, C++, Python). In this workshop you'll set up the arm, program it via the teach pendant, control it programmatically with the Python API, and then use Solo CLI to record imitation learning datasets and train VLA models. Deploy your trained policy on Nebius Serverless + Token Factory. Full docs at develop.realman-robotics.com.",
    audience:
      "Robotics engineers, ROS developers, developers interested in industrial-grade arms",
    level: "Intermediate",
    levelColor: "level-purple",
    keyValue:
      "Industrial arm with multiple control modes: teach pendant, ROS, Python API, and VLA inference",
    wowFactor:
      '"I programmed an industrial arm with the teach pendant, then trained a VLA model that replicated the task autonomously"',
    icon: "opendroid",
    whatYouBuild: [
      "An operational OpenDroid R1D2 arm controlled via teach pendant and Python API",
      "A recorded imitation learning dataset from teleoperation sessions",
      "A trained VLA model deployed on Nebius for autonomous arm control",
    ],
    whatWeCover: [
      "OpenDroid hardware setup and quick start (https://develop.realman-robotics.com/en/robot/quickUseManual/)",
      "Teach pendant operation: teach positions, create motion sequences, and save programs",
      "Programming guide: ROS support, Python/C/C++ APIs, Gazebo/MoveIt simulation (https://develop.realman-robotics.com/en/robot/teachingPendant/armTeching/)",
      "Solo CLI integration: calibration, teleoperation, and recording with R1D2 (https://github.com/GetSoloTech/solo-cli)",
      "Training VLA models (ACT, SmolVLA) for industrial pick-and-place tasks",
      "Deploying trained models on Nebius Serverless for cloud-based arm control",
    ],
    whoIsThisFor:
      "Robotics engineers who want to work with industrial-grade hardware. Great for ROS developers, manufacturing engineers, or anyone interested in bridging traditional robotics programming with modern imitation learning. The R1D2 supports multiple programming paradigms so you can use the approach that fits your background.",
    prerequisites: [
      "Laptop with Python 3.12+ and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Basic comfort with Python — ROS experience is helpful but not required",
    ],
    youLeaveWith: [
      "An operational OpenDroid R1D2 you can control via teach pendant and Python API",
      "A recorded dataset of teleoperation episodes",
      "A trained VLA model for autonomous pick-and-place",
      "Inference running on Nebius Serverless + Token Factory",
      "Python scripts for programmatic arm control",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "OpenDroid Setup & Teach Pendant",
        description:
          "Set up the R1D2, learn teach pendant basics, and teach your first motion sequence",
        details: [
          "OpenDroid R1D2 hardware overview and safety guidelines",
          "Teach pendant basics: teach positions, waypoints, and motion sequences",
          "Save and replay a teach pendant program",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Python API & Imitation Learning Recording",
        description:
          "Control the arm programmatically and record teleoperation datasets with Solo CLI",
        details: [
          "Python API basics: connect, move to position, read joint states",
          "Switch to Solo CLI for imitation learning: calibrate and teleoperate",
          "Record 10-15 pick-and-place episodes for VLA training",
          "Replay episodes to verify data quality",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Train VLA & Deploy",
        description:
          "Train a VLA model on your recorded data and deploy for autonomous inference",
        details: [
          "Train ACT or SmolVLA on your pick-and-place dataset",
          "Deploy trained model on Nebius Serverless + Token Factory",
          "Run autonomous inference — watch R1D2 execute tasks without teach pendant",
          "Compare teach pendant accuracy vs. VLA model accuracy",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "ROS Integration & Show-and-Tell",
        description:
          "Explore ROS support, simulation, and demo your autonomous arm",
        details: [
          "Overview of ROS integration, Gazebo simulation, and MoveIt planning",
          "Run a Gazebo simulation of your trained policy (optional)",
          "Record a video of autonomous execution",
          "Show-and-tell: demo your workflow to the group",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Set Up the OpenDroid R1D2",
        duration: "5 min",
        overview:
          "Power on the R1D2, connect to the teach pendant, and verify the arm responds to manual commands.",
        instructions: [
          "Follow the quick start guide to power on the R1D2",
          "Connect the teach pendant and verify communication",
          "Test manual joint movement via the teach pendant",
        ],
        commands: [
          "# Install Solo CLI (for later steps)",
          "git clone https://github.com/GetSoloTech/solo-cli.git",
          "cd solo-cli && uv pip install -e .",
          "",
          "# Run setup (select OpenDroid/R1D2)",
          "solo setup",
        ],
        tips: [
          "Quick start guide: https://develop.realman-robotics.com/en/robot/quickUseManual/",
          "Solo CLI docs: https://github.com/GetSoloTech/solo-cli/blob/main/solo/commands/robots/lerobot/README.md",
        ],
        checkpoint:
          "The R1D2 powers on, teach pendant connects, and you can move joints manually.",
      },
      {
        stepNumber: 2,
        title: "Teach Pendant Programming",
        duration: "10 min",
        overview:
          "Use the teach pendant to teach positions, create waypoint sequences, and save reusable programs.",
        instructions: [
          "Teach 3-5 waypoint positions by physically guiding the arm",
          "Create a motion sequence that visits each waypoint in order",
          "Save the program and replay it automatically",
          "Adjust speed and smoothing parameters",
        ],
        tips: [
          "Teaching & programming guide: https://develop.realman-robotics.com/en/robot/teachingPendant/armTeching/",
          "Start with simple point-to-point moves before complex trajectories.",
          "The teach pendant supports online programming, joint/Cartesian moves, and more.",
        ],
        checkpoint:
          "You have a saved teach pendant program that replays a multi-waypoint sequence.",
      },
      {
        stepNumber: 3,
        title: "Python API Control",
        duration: "10 min",
        overview:
          "Control the R1D2 programmatically using the Python API. Connect, read joint states, and command movements.",
        instructions: [
          "Install the Realman Python SDK",
          "Connect to the arm and read current joint positions",
          "Send joint-space and Cartesian-space move commands",
          "Build a simple pick-and-place script",
        ],
        commands: [
          "# Install Realman Python SDK",
          "pip install robotic-arm-package",
          "",
          "# Example: connect and read joints",
          "python -c \"",
          "from robotic_arm.rm_robot_interface import *",
          "robot = RoboticArm(rm_thread_mode_e.RM_TRIPLE_MODE_E)",
          "handle = robot.rm_create_robot_arm('192.168.1.18', 8080)",
          "joints = robot.rm_get_joint_degree()",
          "print(joints)\"",
        ],
        tips: [
          "API docs (C, C++, Python): https://develop.realman-robotics.com/en/robot/teachingPendant/armTeching/",
          "The Python API supports joint-space, Cartesian-space, and trajectory-based control.",
        ],
        checkpoint:
          "You can read joint positions and send move commands from Python.",
      },
      {
        stepNumber: 4,
        title: "Record Imitation Learning Data",
        duration: "15 min",
        overview:
          "Switch to Solo CLI and record teleoperation episodes for VLA training. Perform pick-and-place tasks 10-15 times.",
        instructions: [
          "Calibrate the R1D2 with Solo CLI",
          "Start teleoperation and perform pick-and-place tasks",
          "Record 10-15 episodes, varying object positions",
          "Replay episodes to verify data quality",
        ],
        commands: [
          "# Calibrate (motors already set up)",
          "solo robo --calibrate all",
          "",
          "# Teleoperate",
          "solo robo --teleop",
          "",
          "# Record episodes",
          "solo robo --record",
          "",
          "# Replay to verify",
          "solo robo --replay",
        ],
        tips: [
          "Aim for 10-15 episodes for pick-and-place. Consistency matters more than volume.",
          "LeRobot GitHub: https://github.com/huggingface/lerobot",
        ],
        checkpoint:
          "You have 10+ recorded episodes with clean pick-and-place trajectories.",
      },
      {
        stepNumber: 5,
        title: "Deploy Nebius + Train VLA",
        duration: "15 min",
        overview:
          "Set up Nebius Serverless, deploy the orchestrator, and train a VLA model on your recorded dataset.",
        instructions: [
          "Install Nebius CLI and authenticate",
          "Deploy the OpenClaw orchestrator on Serverless",
          "Train ACT or SmolVLA on your recorded dataset",
          "Evaluate the trained model",
        ],
        commands: [
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "nebius auth login",
          "",
          "# Deploy orchestrator",
          "export AUTH_TOKEN=$(openssl rand -hex 32)",
          "nebius msp serverless v1alpha1 endpoint create \\",
          "  --name openclaw-opendroid \\",
          "  --container-image openclaw:robotics \\",
          "  --container-template-resources-platform cpu-d3 \\",
          "  --container-template-resources-preset 4vcpu-16gb \\",
          "  --port 8080 \\",
          "  --username admin \\",
          "  --password \"$AUTH_TOKEN\" \\",
          "  --network-id <your-network-id> \\",
          "  --parent-id <your-project-id>",
          "",
          "# Train VLA",
          "solo robo --train",
        ],
        tips: [
          "ACT paper: https://tonyzhaozh.github.io/aloha/ | LeRobot: https://huggingface.co/docs/lerobot/en/act",
          "SmolVLA: https://huggingface.co/blog/smolvla",
        ],
        checkpoint:
          "Training completes with converged loss and model checkpoint is saved.",
      },
      {
        stepNumber: 6,
        title: "Run Autonomous Inference",
        duration: "10 min",
        overview:
          "Deploy your trained model and watch the R1D2 execute pick-and-place autonomously.",
        instructions: [
          "Load your trained model checkpoint",
          "Run inference with Solo CLI",
          "Compare VLA accuracy vs. your teach pendant program",
          "Test with objects at new positions",
        ],
        commands: [
          "# Autonomous inference",
          "solo robo --inference",
          "",
          "# Skip prompts",
          "solo robo --inference -y",
        ],
        tips: [
          "Compare teach pendant precision vs. VLA model adaptability — they solve different problems.",
          "Teach pendant is precise but brittle; VLA models generalize to new positions.",
        ],
        checkpoint:
          "R1D2 executes pick-and-place autonomously from your trained VLA model.",
      },
      {
        stepNumber: 7,
        title: "Record Demo & Explore ROS",
        duration: "10 min",
        overview:
          "Capture video, explore ROS/Gazebo integration, and save your configurations.",
        instructions: [
          "Record a video of autonomous pick-and-place",
          "Explore ROS integration and Gazebo/MoveIt simulation (optional)",
          "Save model checkpoint, API scripts, and teach pendant programs",
          "Share your demo with the group",
        ],
        commands: [
          "# Check status",
          "solo status",
          "",
          "# List models",
          "solo list",
        ],
        tips: [
          "Programming guide (ROS, Gazebo, MoveIt): https://develop.realman-robotics.com/en/robot/teachingPendant/armTeching/",
          "The R1D2 supports Gazebo simulation — great for testing policies before running on hardware.",
        ],
        checkpoint:
          "You have a video, saved scripts, and model checkpoint for future use.",
      },
    ],
  },
  {
    slug: "booster",
    hidden: true,
    badge: "Workshop",
    badgeColor: "badge-orange",
    title: "Booster — Quadruped Robot Control & RL",
    subtitle:
      "Walk. Run. Learn. Simulate. Deploy.",
    tagline:
      "Control a quadruped robot, train locomotion policies with RL, and simulate in Isaac Lab — powered by Nebius GPUs.",
    description:
      "The Booster is a quadruped robot platform for locomotion research and reinforcement learning. In this workshop you'll set up the Booster SDK, control the robot with programmatic commands, train RL locomotion policies in Isaac Lab simulation on Nebius GPUs, and deploy trained policies to the physical robot. Full SDK docs at booster.tech/open-source/.",
    audience:
      "RL researchers, robotics engineers, developers interested in legged locomotion",
    level: "Advanced",
    levelColor: "level-orange",
    keyValue:
      "Sim-to-real quadruped locomotion: train in Isaac Lab, deploy to physical hardware",
    wowFactor:
      '"I trained a locomotion policy in simulation and transferred it to a real quadruped — it walked on the first try"',
    icon: "booster",
    whatYouBuild: [
      "A Booster quadruped robot responding to locomotion commands",
      "An RL-trained locomotion policy in Isaac Lab simulation on Nebius GPUs",
      "A sim-to-real transfer pipeline deploying simulation policies to physical hardware",
    ],
    whatWeCover: [
      "Booster SDK setup: robot control, RL training, and Isaac Lab simulation (https://www.booster.tech/open-source/)",
      "Quadruped control basics: gait patterns, velocity commands, and balance",
      "Isaac Lab simulation: setting up environments, training RL policies, and sim-to-real transfer",
      "Reinforcement learning for locomotion: reward design, PPO training, and policy evaluation",
      "Deploying trained policies from simulation to the physical Booster robot",
      "Cloud-based RL training on Nebius GPUs via Token Factory for fast iteration",
    ],
    whoIsThisFor:
      "RL researchers, robotics engineers, and developers fascinated by legged locomotion. You should be comfortable with Python and interested in reinforcement learning. Prior RL experience helps but isn't required — we cover the concepts as we build.",
    prerequisites: [
      "Laptop with Python 3.12+ and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Comfort with Python — RL experience is helpful but not required",
    ],
    youLeaveWith: [
      "A Booster quadruped responding to your locomotion commands",
      "An RL-trained locomotion policy from Isaac Lab simulation",
      "A sim-to-real pipeline for deploying simulation policies",
      "Cloud RL training setup on Nebius GPUs",
      "Video of your quadruped walking with a learned policy",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "Booster SDK Setup & Robot Control",
        description:
          "Install the Booster SDK, connect to the robot, and test basic locomotion commands",
        details: [
          "Booster quadruped hardware overview and safety guidelines",
          "Install the Booster SDK from the open-source repo",
          "Test basic locomotion: walk forward, turn, change gait speed",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "Isaac Lab Simulation & RL Training",
        description:
          "Set up an Isaac Lab environment and train a locomotion policy with RL on Nebius GPUs",
        details: [
          "Isaac Lab overview: physics simulation, environments, and observations",
          "Configure a locomotion task environment for the Booster",
          "Design a reward function: forward velocity, stability, energy efficiency",
          "Launch RL training (PPO) on Nebius GPUs via Token Factory",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Sim-to-Real Transfer",
        description:
          "Transfer your trained policy from simulation to the physical Booster robot",
        details: [
          "Export the trained policy from Isaac Lab",
          "Configure the sim-to-real pipeline for the Booster",
          "Deploy the policy and test on the physical robot",
          "Debug and tune: what changes between sim and real",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Advanced Gaits & Show-and-Tell",
        description:
          "Experiment with advanced gaits, terrain adaptation, and demo your walking robot",
        details: [
          "Try different reward functions for varied gaits (trot, gallop, bound)",
          "Test on different terrain (slopes, bumps) if available",
          "Record a video of your quadruped walking with learned policies",
          "Show-and-tell: demo your workflow to the group",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install Booster SDK",
        duration: "5 min",
        overview:
          "Install the Booster open-source SDK for robot control and RL training.",
        instructions: [
          "Clone the Booster SDK from the open-source repo",
          "Install dependencies",
          "Verify the SDK can connect to the robot",
        ],
        commands: [
          "# Clone Booster SDK",
          "git clone https://github.com/BoosterRobotics/booster_robotics_sdk.git",
          "cd booster_robotics_sdk",
          "pip install -e .",
          "",
          "# Verify connection",
          "python -c \"import booster_robotics_sdk; print('SDK ready')\"",
        ],
        tips: [
          "Full SDK docs: https://www.booster.tech/open-source/",
          "The SDK covers robot control, RL training, and Isaac Lab simulation in one package.",
        ],
        checkpoint:
          "Booster SDK is installed and can detect the connected robot.",
      },
      {
        stepNumber: 2,
        title: "Basic Robot Control",
        duration: "10 min",
        overview:
          "Send locomotion commands to the Booster: walk forward, turn, stop. Understand the control interface.",
        instructions: [
          "Connect to the Booster robot via the SDK",
          "Send velocity commands: forward, backward, turn left/right",
          "Adjust gait speed and observe the robot's behavior",
          "Test emergency stop and safety features",
        ],
        tips: [
          "Start with slow velocities and increase gradually.",
          "The Booster uses velocity commands (vx, vy, vyaw) for locomotion control.",
        ],
        checkpoint:
          "You can command the Booster to walk, turn, and stop reliably.",
      },
      {
        stepNumber: 3,
        title: "Set Up Isaac Lab Simulation",
        duration: "10 min",
        overview:
          "Configure an Isaac Lab simulation environment for the Booster. This is where you'll train RL policies before deploying to the real robot.",
        instructions: [
          "Set up Isaac Lab with the Booster robot model",
          "Configure the locomotion task environment",
          "Run a test simulation to verify physics and rendering",
          "Define observations, actions, and initial conditions",
        ],
        tips: [
          "Isaac Lab provides GPU-accelerated physics simulation for fast RL training.",
          "The Booster model includes accurate joint limits, masses, and friction parameters.",
        ],
        checkpoint:
          "Isaac Lab runs with the Booster model and you can see the simulated robot.",
      },
      {
        stepNumber: 4,
        title: "Deploy Nebius GPUs for RL Training",
        duration: "10 min",
        overview:
          "Set up Nebius cloud infrastructure for GPU-accelerated RL training. Isaac Lab + PPO on H200 GPUs trains orders of magnitude faster than local.",
        instructions: [
          "Install and authenticate with the Nebius CLI",
          "Configure Token Factory for GPU compute",
          "Set up the training environment on Nebius",
        ],
        commands: [
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "nebius auth login",
          "",
          "# Set Token Factory key for GPU training",
          "export TF_API_KEY=<your-token-factory-api-key>",
        ],
        checkpoint:
          "Nebius CLI authenticated and Token Factory API key configured.",
      },
      {
        stepNumber: 5,
        title: "Train RL Locomotion Policy",
        duration: "15 min",
        overview:
          "Design a reward function and train a PPO locomotion policy in Isaac Lab on Nebius GPUs.",
        instructions: [
          "Design the reward function: forward velocity bonus, stability penalty, energy penalty",
          "Configure PPO hyperparameters (learning rate, batch size, epochs)",
          "Launch training on Nebius GPUs",
          "Monitor training curves: reward, episode length, velocity tracking",
        ],
        tips: [
          "A good reward function balances forward progress with energy efficiency and stability.",
          "PPO with ~1000 parallel environments converges in minutes on Nebius GPUs.",
          "Start simple (forward walking) then add complexity (turning, speed variation).",
        ],
        checkpoint:
          "Training converges and the simulated Booster walks stably with your trained policy.",
      },
      {
        stepNumber: 6,
        title: "Sim-to-Real Transfer",
        duration: "10 min",
        overview:
          "Export your trained policy from Isaac Lab and deploy it to the physical Booster robot.",
        instructions: [
          "Export the trained policy checkpoint from Isaac Lab",
          "Load the policy on the Booster SDK",
          "Deploy to the physical robot and test walking",
          "Compare sim performance vs. real performance — tune if needed",
        ],
        tips: [
          "Sim-to-real transfer works best with domain randomization during training.",
          "Expect some tuning — friction and motor dynamics differ between sim and real.",
        ],
        checkpoint:
          "The physical Booster walks using your RL-trained policy from simulation.",
      },
      {
        stepNumber: 7,
        title: "Record Demo & Advanced Gaits",
        duration: "10 min",
        overview:
          "Record video of your walking robot, experiment with different gaits, and save your configurations.",
        instructions: [
          "Record a video of the Booster walking with your trained policy",
          "Try different reward functions for varied gaits (optional)",
          "Save your policy, reward function, and training config",
          "Share your demo with the group",
        ],
        tips: [
          "Best demo: side-by-side of simulation vs. real robot walking.",
          "Booster open-source docs: https://www.booster.tech/open-source/",
        ],
        checkpoint:
          "You have a video of your quadruped walking and all configs saved.",
      },
    ],
  },
  {
    slug: "unitree-g1",
    hidden: true,
    badge: "Workshop",
    badgeColor: "badge-red",
    title: "Unitree G1 — Humanoid Loco-Manipulation",
    subtitle:
      "Walk. Reach. Grasp. Whole-Body Control.",
    tagline:
      "Control a humanoid robot with GROOT whole-body control, joint replay, and Isaac Lab simulation on Nebius GPUs.",
    description:
      "The Unitree G1 is a full humanoid robot capable of walking, reaching, and grasping. In this workshop you'll set up the Unitree SDK, replay recorded joint trajectories, run GROOT whole-body control policies, and train in Isaac Lab simulation on Nebius GPUs. Use LeRobot integration for imitation learning and deploy inference on Nebius Serverless + Token Factory. Full docs at huggingface.co/docs/lerobot/en/unitree_g1.",
    audience:
      "Robotics engineers, humanoid enthusiasts, researchers in whole-body control and loco-manipulation",
    level: "Advanced",
    levelColor: "level-red",
    keyValue:
      "Humanoid whole-body control: walking + manipulation with GROOT policies on Nebius GPUs",
    wowFactor:
      '"I watched a humanoid walk to a table, pick up an object, and carry it — running a policy I deployed in this session"',
    icon: "unitree",
    whatYouBuild: [
      "A Unitree G1 humanoid executing joint trajectory replays",
      "GROOT whole-body control policies for loco-manipulation tasks",
      "An Isaac Lab simulation pipeline for humanoid policy training on Nebius GPUs",
    ],
    whatWeCover: [
      "Unitree G1 setup: LeRobot docs for connection, calibration, and gr00t_wbc locomotion (https://huggingface.co/docs/lerobot/en/unitree_g1)",
      "Unitree SDK: Python API for motor control and sensor reading (https://github.com/unitreerobotics/unitree_sdk2_python)",
      "Joint trajectory recording and replay with the Unitree G1 Replay tool (https://github.com/GetSoloTech/unitree-g1-replay)",
      "GROOT Whole-Body Control: loco-manipulation policies, teleoperation stack, data export (https://github.com/NVlabs/GR00T-WholeBodyControl)",
      "Isaac Lab simulation: train humanoid policies in GPU-accelerated sim (https://github.com/unitreerobotics/unitree_sim_isaaclab)",
      "VLA model training (GROOT N1.5, ACT) for humanoid tasks on Nebius GPUs",
    ],
    whoIsThisFor:
      "Robotics engineers and researchers who want to work with humanoid robots. Great for anyone interested in whole-body control, loco-manipulation, or sim-to-real transfer for bipedal platforms. This is advanced hardware — but the tooling (LeRobot, GROOT, Isaac Lab) makes it approachable.",
    prerequisites: [
      "Laptop with Python 3.12+ and terminal access",
      "A Nebius AI Cloud account (we'll help you set one up if needed)",
      "Comfort with Python and robotics concepts — some RL/ML experience is helpful",
    ],
    youLeaveWith: [
      "A Unitree G1 executing joint trajectory replays",
      "GROOT whole-body control policies running on the humanoid",
      "An Isaac Lab simulation for policy training on Nebius GPUs",
      "VLA-trained policies deployed on Nebius Serverless + Token Factory",
      "Video of the humanoid performing a loco-manipulation task",
    ],
    schedule: [
      {
        time: "12:00 PM – 12:30 PM",
        title: "Unitree G1 Setup & Joint Replay",
        description:
          "Connect to the G1, set up the SDK, and test joint trajectory recording and replay",
        details: [
          "Unitree G1 humanoid hardware overview and safety protocols",
          "Install Unitree SDK and connect to the robot",
          "Record and replay joint trajectories — the foundation for all control methods",
        ],
      },
      {
        time: "12:30 PM – 1:15 PM",
        title: "GROOT Whole-Body Control",
        description:
          "Deploy GROOT whole-body control policies for walking + manipulation",
        details: [
          "GROOT WBC overview: loco-manipulation policies and the teleoperation stack",
          "Deploy a pre-trained GROOT policy on the G1",
          "Test walking, reaching, and grasping with whole-body coordination",
          "Record demonstrations via the GROOT data exporter",
        ],
      },
      {
        time: "1:15 PM – 2:00 PM",
        title: "Isaac Lab Simulation & Training",
        description:
          "Train custom humanoid policies in Isaac Lab simulation on Nebius GPUs",
        details: [
          "Set up the Unitree G1 in Isaac Lab with GPU-accelerated physics",
          "Train a locomotion policy with RL on Nebius GPUs",
          "Train a loco-manipulation policy using GROOT + Isaac Lab data",
          "Evaluate in simulation before deploying to the real robot",
        ],
      },
      {
        time: "2:00 PM – 2:30 PM",
        title: "Sim-to-Real & Show-and-Tell",
        description:
          "Transfer policies to the real G1 and demo your humanoid",
        details: [
          "Deploy trained policies from Isaac Lab to the physical G1",
          "Compare simulation behavior vs. real-world performance",
          "Record a video of the G1 performing a loco-manipulation task",
          "Show-and-tell: demo your workflow to the group",
        ],
      },
    ],
    guideSteps: [
      {
        stepNumber: 1,
        title: "Install Unitree SDK & Tools",
        duration: "5 min",
        overview:
          "Install the Unitree SDK, the G1 Replay tool, and connect to the humanoid.",
        instructions: [
          "Install the Unitree Python SDK",
          "Install the G1 Replay tool for joint trajectory recording",
          "Connect to the G1 and verify communication",
        ],
        commands: [
          "# Install Unitree SDK",
          "pip install unitree-sdk2-python",
          "",
          "# Clone G1 Replay tool",
          "git clone https://github.com/GetSoloTech/unitree-g1-replay.git",
          "cd unitree-g1-replay && pip install -e .",
          "",
          "# Verify connection",
          "python -c \"import unitree_sdk2py; print('SDK ready')\"",
        ],
        tips: [
          "Unitree SDK docs: https://github.com/unitreerobotics/unitree_sdk2_python",
          "G1 Replay tool: https://github.com/GetSoloTech/unitree-g1-replay",
          "LeRobot docs for Unitree: https://huggingface.co/docs/lerobot/en/unitree_g1",
        ],
        checkpoint:
          "SDK installed, G1 Replay tool ready, and you can ping the G1.",
      },
      {
        stepNumber: 2,
        title: "Joint Trajectory Recording & Replay",
        duration: "10 min",
        overview:
          "Record motor joint trajectories by manually guiding the G1, then replay them. This is the simplest form of humanoid programming.",
        instructions: [
          "Put the G1 in teach mode to allow manual joint movement",
          "Record a simple arm movement trajectory",
          "Replay the recorded trajectory autonomously",
          "Record a more complex sequence (reach + grasp)",
        ],
        commands: [
          "# Record trajectory",
          "python record_trajectory.py --robot g1 --output trajectory.json",
          "",
          "# Replay trajectory",
          "python replay_trajectory.py --robot g1 --input trajectory.json",
        ],
        tips: [
          "Joint replay is deterministic — great for repetitive tasks at fixed positions.",
          "For adaptive behavior (varying positions), you'll need GROOT or VLA policies.",
        ],
        checkpoint:
          "You can record and replay joint trajectories on the G1.",
      },
      {
        stepNumber: 3,
        title: "Deploy GROOT Whole-Body Control",
        duration: "15 min",
        overview:
          "Set up NVIDIA's GROOT Whole-Body Control stack for loco-manipulation — walk, reach, and grasp with full-body coordination.",
        instructions: [
          "Clone the GROOT WholeBody Control repository",
          "Install dependencies and configure for the G1",
          "Deploy a pre-trained GROOT policy",
          "Test walking, reaching, and grasping with whole-body control",
        ],
        commands: [
          "# Clone GROOT WBC",
          "git clone https://github.com/NVlabs/GR00T-WholeBodyControl.git",
          "cd GR00T-WholeBodyControl",
          "pip install -e .",
          "",
          "# Deploy pre-trained policy on G1",
          "python deploy.py --robot unitree_g1 --policy pretrained_wbc",
        ],
        tips: [
          "GROOT WBC repo: https://github.com/NVlabs/GR00T-WholeBodyControl",
          "GROOT provides whole-body control policies, a teleoperation stack, and a data exporter.",
          "The teleoperation stack is useful for recording demonstrations for VLA training.",
        ],
        checkpoint:
          "The G1 walks and performs reaching motions with GROOT whole-body control.",
      },
      {
        stepNumber: 4,
        title: "Set Up Isaac Lab Simulation",
        duration: "10 min",
        overview:
          "Configure Isaac Lab with the Unitree G1 model for GPU-accelerated policy training on Nebius.",
        instructions: [
          "Clone the Unitree Isaac Lab simulation repo",
          "Install Isaac Lab and configure for the G1",
          "Set up Nebius GPU access for training",
          "Run a test simulation to verify physics",
        ],
        commands: [
          "# Clone Unitree Isaac Lab sim",
          "git clone https://github.com/unitreerobotics/unitree_sim_isaaclab.git",
          "cd unitree_sim_isaaclab && pip install -e .",
          "",
          "# Install Nebius CLI",
          "curl -sSL https://storage.eu-north1.nebius.cloud/cli/install.sh | bash",
          "nebius auth login",
          "",
          "# Set Token Factory for GPU training",
          "export TF_API_KEY=<your-token-factory-api-key>",
        ],
        tips: [
          "Isaac Lab sim repo: https://github.com/unitreerobotics/unitree_sim_isaaclab",
          "Isaac Lab supports data collection, playback, generation, and model validation.",
        ],
        checkpoint:
          "Isaac Lab runs with the G1 model and you can see the simulated humanoid.",
      },
      {
        stepNumber: 5,
        title: "Train Humanoid Policies",
        duration: "15 min",
        overview:
          "Train locomotion and loco-manipulation policies in Isaac Lab on Nebius GPUs using RL and/or GROOT data.",
        instructions: [
          "Configure a locomotion task in Isaac Lab",
          "Train a walking policy with PPO on Nebius GPUs",
          "Optionally: use GROOT-exported demonstrations for imitation learning",
          "Evaluate the trained policy in simulation",
        ],
        tips: [
          "GROOT N1.5 paper: https://research.nvidia.com/labs/gear/gr00t-n1_5/",
          "GROOT N1.5 code: https://github.com/NVIDIA/Isaac-GR00T",
          "LeRobot GROOT implementation: https://huggingface.co/docs/lerobot/en/groot",
          "Parallel environments in Isaac Lab dramatically speed up RL training.",
        ],
        checkpoint:
          "Your trained policy walks stably in simulation.",
      },
      {
        stepNumber: 6,
        title: "Sim-to-Real Transfer",
        duration: "10 min",
        overview:
          "Export your trained policy from Isaac Lab and deploy it to the physical G1 humanoid.",
        instructions: [
          "Export the policy checkpoint from Isaac Lab",
          "Deploy to the G1 via the Unitree SDK",
          "Test walking and manipulation on the physical robot",
          "Compare sim vs. real performance and tune parameters",
        ],
        tips: [
          "Domain randomization during sim training improves real-world transfer.",
          "Start with locomotion-only before adding manipulation.",
        ],
        checkpoint:
          "The physical G1 executes your trained policy.",
      },
      {
        stepNumber: 7,
        title: "Record Demo & Save Configs",
        duration: "10 min",
        overview:
          "Capture video of your humanoid robot, save all configurations, and share your demo.",
        instructions: [
          "Record a video of the G1 performing with your trained policy",
          "Save policy checkpoints, training configs, and deployment scripts",
          "Document your sim-to-real pipeline for reproducibility",
          "Share your demo with the group",
        ],
        commands: [
          "# Check Solo CLI status (if using)",
          "solo status",
          "",
          "# Save Nebius deployment config",
          "nebius msp serverless v1alpha1 endpoint get $ENDPOINT_ID --format yaml > g1-deploy.yaml",
        ],
        tips: [
          "Best demo: simulation training timelapse → real robot executing the policy.",
          "All Unitree G1 resources: LeRobot (https://huggingface.co/docs/lerobot/en/unitree_g1), SDK (https://github.com/unitreerobotics/unitree_sdk2_python), GROOT WBC (https://github.com/NVlabs/GR00T-WholeBodyControl), Isaac Lab (https://github.com/unitreerobotics/unitree_sim_isaaclab), G1 Replay (https://github.com/GetSoloTech/unitree-g1-replay)",
        ],
        checkpoint:
          "You have a video, saved policy, and documented pipeline for the G1.",
      },
    ],
  },
];

export const visibleWorkshops = workshops.filter((w) => !w.hidden);
