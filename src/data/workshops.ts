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
    slug: "agent-inference",
    badge: "Workshop",
    badgeColor: "badge-lime",
    title: "OpenClaw + Token Factory — Agent-Grade Inference",
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
          "curl -sSL https://storage.ai.nebius.cloud/cli/install.sh | bash",
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
          "curl -sSL https://storage.ai.nebius.cloud/cli/install.sh | bash",
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
          "curl -sSL https://storage.ai.nebius.cloud/cli/install.sh | bash",
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
];
