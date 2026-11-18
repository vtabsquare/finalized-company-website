export interface MarketingWorkflowStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  icon: string;
  terminalTitle: string;
  terminalLines: { label: string; status: string; mode: string }[];
  terminalSummary: string;
  bottomBadges: string[];
}

export interface MarketingFeatureItem {
  id: string;
  category: string;
  shortTag: string;
  title: string;
  description: string;
  highlightPoints: string[];
  specs: { label: string; value: string }[];
  terminalTitle: string;
  terminalLines: { label: string; status: string; mode: string }[];
  securityNotice: string;
}

export interface MarketingEdition {
  badge: string;
  name: string;
  subtitle: string;
  description: string;
  targetAudience: string;
  highlights: string[];
  actionLabel: string;
  consoleTitle: string;
  consoleLines: { label: string; value: string; highlight?: boolean }[];
}

export const MARKETING_AGENT_CONFIG = {
  name: 'VTAB Marketing & Lead Suite',
  shortName: 'VTAB Marketing Agent',
  topBadge: 'VTAB REVENUE INTELLIGENCE SUITE · V2.4.1 STABLE',
  tagline: 'Smarter campaigns. Bigger reach. Real results.',
  description: 'An autonomous marketing intelligence engine that crawls high-intent enterprise accounts, crafts personalized marketing narratives, synchronizes automated CRM nurture sequences, and optimizes conversion rates with continuous telemetry.',
  version: 'Enterprise Cloud · v2.4.1 STABLE',
  categoryLabel: 'REVENUE INTELLIGENCE & AUTONOMOUS GROWTH',
  impactMetric: '4.8x Lead Velocity & Pipeline Output',
  techStack: ['FastAPI', 'Python 3.12', 'React 18', 'Google Gemini 2.5', 'Meta Graph API v21.0', 'WhatsApp Cloud API', 'FLUX.1 Schnell']
};

export const MARKETING_WORKFLOW_STEPS: MarketingWorkflowStep[] = [
  {
    step: '01',
    title: 'Ingest & Detect',
    subtitle: 'Universal buyer signal federation',
    description: 'Direct social listening, high-accuracy intent classification, and native executive discovery mesh across 100+ public and private communities.',
    bullets: [
      'LinkedIn, Reddit (r/startups, r/dataengineering), X/Twitter, and Hacker News',
      'Real-time buying intent scoring from 1 to 100 with verbatim post excerpts',
      'Automated executive lead profiling with verified company and job titles'
    ],
    icon: 'Radio',
    terminalTitle: 'Pipeline Flow State — Federated Signal Harvesters',
    terminalLines: [
      { label: 'LinkedIn Signal Stream', status: 'LIVE', mode: 'Real-time WebSocket' },
      { label: 'Reddit Communities', status: 'LIVE', mode: 'r/startups & r/dataengineering' },
      { label: 'X / Twitter Executive Stream', status: 'LIVE', mode: 'Keyword & ICP Filter' },
      { label: 'GitHub & Tech Forums', status: 'LIVE', mode: 'Tech Discussion Harvester' }
    ],
    terminalSummary: 'Semantic filter enabled: 98% of low-intent noise dropped before human review.',
    bottomBadges: ['Enterprise Privacy Certified', 'Real-Time Vector Scored']
  },
  {
    step: '02',
    title: 'Ground & Synthesize',
    subtitle: 'Multi-agent campaign orchestration',
    description: 'Multi-agent collaboration coordinating research, copywriting, creative visual prompts, and target ICP narrative framing.',
    bullets: [
      'Autonomous bot council: Research, Strategy, Copywriter, and Creative Director',
      'Multi-format generation: social posts, email nurture cascades, and landing copy',
      'Zero-hallucination ground truth enforcement against enterprise docs and whitepapers'
    ],
    icon: 'Bot',
    terminalTitle: 'Multi-Agent Synthesis Engine',
    terminalLines: [
      { label: 'Research Bot', status: 'ACTIVE', mode: 'Extracts buyer pain points & industry angles' },
      { label: 'Strategy Bot', status: 'ACTIVE', mode: 'Structures multi-touch campaign cadence' },
      { label: 'Copywriter Bot', status: 'ACTIVE', mode: 'Channel-native copy & hook drafting' },
      { label: 'Creative Director', status: 'ACTIVE', mode: 'Composes visual prompt topologies' }
    ],
    terminalSummary: 'Multi-agent council consensus reached in 1.4s with 100% adherence to style guidelines.',
    bottomBadges: ['Multi-Agent Consensus', 'Zero-Hallucination Grounding']
  },
  {
    step: '03',
    title: 'Inspect & Verify',
    subtitle: 'Automated vision OCR & legibility engine',
    description: 'Every claim, statistic, date, and visual asset is scrutinized by automated vision OCR checks and brand compliance guardrails.',
    bullets: [
      'Gemini Vision OCR inspection catching stray watermarks, blur, and text defects',
      'Fact-checking engine cross-referencing metrics against verified source documents',
      'Strict brand governance: logo safe areas, typography standards, and tone audits'
    ],
    icon: 'ShieldCheck',
    terminalTitle: 'Inspection & Vision Guardrail Engine',
    terminalLines: [
      { label: 'OCR Text Fidelity', status: 'PASS', mode: 'Crisp typography & zero blur detected' },
      { label: 'Metric Integrity', status: 'PASS', mode: 'All claims traceable to verified source' },
      { label: 'Brand Compliance', status: 'PASS', mode: 'Colors, logo safety & contrast validated' },
      { label: 'Human-in-the-Loop', status: 'GATE', mode: 'Pre-flight executive approval active' }
    ],
    terminalSummary: 'Visual and factual integrity confirmed. 0 unverified claims or anatomical flaws permitted.',
    bottomBadges: ['Vision OCR Verified', 'Human Gate Enforcement']
  },
  {
    step: '04',
    title: 'Publish & Sync',
    subtitle: 'Social channels to CRM webhook distribution',
    description: 'Instant automated broadcasting to Meta Graph APIs, LinkedIn, X, and direct webhook ingestion into your enterprise CRM.',
    bullets: [
      'Native Meta Graph API v21.0, LinkedIn Pages, and X Enterprise API broadcasting',
      'Direct CRM synchronization with HubSpot, Salesforce, and custom webhooks',
      'Continuous conversion telemetry tracking engagement, CTR, and inbound leads'
    ],
    icon: 'Share2',
    terminalTitle: 'Distribution & CRM Synchronization Mesh',
    terminalLines: [
      { label: 'LinkedIn Business Page', status: 'READY', mode: 'API v2 Scheduled Broadcast' },
      { label: 'Meta Graph API v21.0', status: 'READY', mode: 'Facebook & Instagram Dispatch' },
      { label: 'HubSpot / Salesforce', status: 'SYNCED', mode: 'Real-time Lead Webhook Active' },
      { label: 'WhatsApp Cloud API', status: 'READY', mode: 'Interactive 2-Way Engagement' }
    ],
    terminalSummary: 'Multi-channel distribution pipeline active. Audit-ready logging enabled for all outbound assets.',
    bottomBadges: ['Official Meta & LinkedIn APIs', 'Real-Time CRM Webhooks']
  }
];

export const MARKETING_FEATURE_ITEMS: MarketingFeatureItem[] = [
  {
    id: 'intent-discovery',
    category: 'Intent Discovery',
    shortTag: 'DETECT',
    title: 'High-Throughput Lead Discovery',
    description: 'Surface qualified enterprise buyers at the exact moment they express technical pain points, evaluate vendors, or ask for recommendations online.',
    highlightPoints: [
      'Over 50+ monitored B2B communities and public technical forums',
      'Real-time buying intent classification with verbatim quote extraction',
      'Automatic lead deduplication and CRM account matching'
    ],
    specs: [
      { label: 'PROTOCOLS', value: 'REST, WebSocket, Webhook, RSS' },
      { label: 'VELOCITY', value: 'Up to 1.8M tokens/sec' },
      { label: 'SECURITY', value: 'SOC-2 Type II · OAuth 2.0' }
    ],
    terminalTitle: 'Connector Catalog — Active Signal Channels',
    terminalLines: [
      { label: 'Data Warehouses & Lakehouses', status: 'LIVE', mode: '94% Intent' },
      { label: 'Executive Reporting Queries', status: 'LIVE', mode: '91% Intent' },
      { label: 'Enterprise AI Automation', status: 'LIVE', mode: '89% Intent' },
      { label: 'Cloud & DB Migrations', status: 'LIVE', mode: '86% Intent' }
    ],
    securityNotice: 'Automatic TLS 1.3 encryption and zero-retention data residency active.'
  },
  {
    id: 'multi-agent-synthesis',
    category: 'Multi-Agent Synthesis',
    shortTag: 'SYNTHESIZE',
    title: 'Autonomous Multi-Agent Council',
    description: 'Orchestrate 10 specialized AI agents working synchronously to transform raw market intent into multi-channel marketing campaigns.',
    highlightPoints: [
      'Autonomous division of labor: research, copywriting, creative design, and QA',
      'Channel-native narrative adaptations for LinkedIn, X, email, and blog content',
      'Built-in A/B test variant generation with predicted conversion scoring'
    ],
    specs: [
      { label: 'AGENTS', value: '10 Synchronous Bot Workers' },
      { label: 'LATENCY', value: '1.2s Council Decision Time' },
      { label: 'MODELS', value: 'Gemini 2.5 Pro + Claude 3.5' }
    ],
    terminalTitle: 'Multi-Agent Council Topology',
    terminalLines: [
      { label: 'Market Researcher Agent', status: 'ONLINE', mode: 'Competitive intelligence feed' },
      { label: 'Persona Copywriter Agent', status: 'ONLINE', mode: 'Tailored executive messaging' },
      { label: 'Design Prompt Engineer', status: 'ONLINE', mode: 'Diffusion parameter tuning' },
      { label: 'Brand Guardian Agent', status: 'ONLINE', mode: 'Zero-hallucination validation' }
    ],
    securityNotice: 'Strict role-based isolation between agent workers with automated audit trail.'
  },
  {
    id: 'knowledge-grounding',
    category: 'Knowledge Grounding',
    shortTag: 'GROUND',
    title: 'Universal Enterprise Knowledge Base',
    description: 'Ground all marketing copy and creative claims against your proprietary company whitepapers, product documentation, and verified case studies.',
    highlightPoints: [
      'Vector chunk indexing over PDFs, websites, Notion, and Google Drive',
      'Strict source attribution with clickable proof footnotes on every claim',
      'Instant content drift detection when product specifications update'
    ],
    specs: [
      { label: 'RETRIEVAL', value: 'Hybrid Dense + Sparse RAG' },
      { label: 'CHUNKS', value: 'Sub-second Vector Search' },
      { label: 'SOURCES', value: 'Docs, URLs, Whitepapers' }
    ],
    terminalTitle: 'Enterprise Knowledge Grounding Mesh',
    terminalLines: [
      { label: 'Snowflake & Databricks Docs', status: 'INDEXED', mode: 'DirectQuery Active' },
      { label: 'Company Website (vtabsquare.com)', status: 'INDEXED', mode: 'Live Vector Embeddings' },
      { label: 'Product Whitepapers & Specs', status: 'INDEXED', mode: 'In-Memory Chunk Store' },
      { label: 'Customer Case Studies & ROI', status: 'INDEXED', mode: 'Verified Fact Database' }
    ],
    securityNotice: 'Zero customer training guarantee: enterprise data remains isolated in private tenant.'
  },
  {
    id: 'vision-verification',
    category: 'Vision Verification',
    shortTag: 'INSPECT',
    title: 'Automated Vision OCR & Brand QA',
    description: 'Eliminate AI rendering blurs, mangled text, and distorted anatomical artifacts before visual creatives ever reach your audience.',
    highlightPoints: [
      'Sub-millisecond multimodal vision inspection for text sharpness and layout',
      'Automatic detection of illegal watermarks, logo distortions, or poor contrast',
      'Enforces strict typography scales, padding, and brand color palette hex codes'
    ],
    specs: [
      { label: 'INSPECTION', value: 'Multimodal Vision OCR' },
      { label: 'FIDELITY', value: '4K Ultra-Crisp Rendering' },
      { label: 'ACCURACY', value: '99.8% Defect Prevention' }
    ],
    terminalTitle: 'Vision Defect & Compliance Inspector',
    terminalLines: [
      { label: 'Text Crispness & OCR Read', status: 'PASS', mode: 'Zero garbled letterforms' },
      { label: 'Brand Palette Conformance', status: 'PASS', mode: 'Hex accuracy within Delta-E < 1.0' },
      { label: 'Logo Safe-Zone Integrity', status: 'PASS', mode: 'Padding & aspect ratio locked' },
      { label: 'Resolution & Aspect Ratio', status: 'PASS', mode: '1080x1080 / 1920x1080 crisp' }
    ],
    securityNotice: 'Compliant with enterprise advertising governance and FTC/EU AI disclosure rules.'
  },
  {
    id: 'creative-compositor',
    category: '3D Creative Compositor',
    shortTag: 'COMPOSE',
    title: 'Code-Rendered Hybrid Compositor',
    description: 'VTAB pairs generative diffusion backdrops with pixel-perfect Chromium HTML/CSS DOM layers for razor-sharp typography and glowing UI widgets.',
    highlightPoints: [
      'Hybrid rendering: Diffusion for ambient 3D scene + Headless Chromium for crisp UI',
      'Flawless vector icons, badges, charts, and glowing CTA buttons in true CSS',
      'Sub-second dynamic banner generation with dynamic token substitution'
    ],
    specs: [
      { label: 'COMPOSITOR', value: 'Playwright Chromium Engine' },
      { label: 'BACKDROP', value: 'FLUX.1 Schnell + SDXL' },
      { label: 'EXPORT', value: 'PNG, SVG, WebP, MP4' }
    ],
    terminalTitle: 'Hybrid DOM & Diffusion Compositor',
    terminalLines: [
      { label: 'Ambient 3D Scene Layer', status: 'RENDERED', mode: 'Diffusion Latent Space' },
      { label: 'Typography DOM Layer', status: 'COMPOSED', mode: 'Zero Blur Chromium Font Engine' },
      { label: 'Data Widget & Chart Layer', status: 'COMPOSED', mode: 'Dynamic SVG & Canvas' },
      { label: 'Master Asset Synthesis', status: 'READY', mode: 'High-Res Lossless Export' }
    ],
    securityNotice: 'All rendering executed in isolated sandbox containers with zero external leakage.'
  },
  {
    id: 'omni-channel-publishing',
    category: 'Omni-Channel Publishing',
    shortTag: 'PUBLISH',
    title: 'Omni-Channel Publishing & CRM',
    description: 'Dispatch approved campaigns across social networks, advertising managers, and lead management platforms with one-click automation.',
    highlightPoints: [
      'Official Meta Graph API v21.0 and LinkedIn Marketing API integration',
      'Two-way WhatsApp Cloud API engagement agent for inbound prospect qualification',
      'Bi-directional synchronization with HubSpot, Salesforce, and Marketo'
    ],
    specs: [
      { label: 'CHANNELS', value: 'LinkedIn, Meta, X, WhatsApp' },
      { label: 'CRM SYNC', value: 'HubSpot, Salesforce, Zapier' },
      { label: 'AUDIT', value: 'Complete Dispatch Lineage' }
    ],
    terminalTitle: 'Omni-Channel Broadcast Dispatcher',
    terminalLines: [
      { label: 'Meta Business Suite', status: 'CONNECTED', mode: 'Graph API v21.0 Token Active' },
      { label: 'LinkedIn Marketing Solutions', status: 'CONNECTED', mode: 'OAuth 2.0 Organization Admin' },
      { label: 'CRM Webhook Pipeline', status: 'CONNECTED', mode: 'Mutual TLS Handshake Verified' },
      { label: 'Outbound Compliance Guard', status: 'ENFORCED', mode: 'Human-in-the-Loop Approved' }
    ],
    securityNotice: 'Multi-layer OAuth token encryption with automatic hourly token refresh.'
  }
];

export const MARKETING_EDITIONS_INFO: { desktop: MarketingEdition; services: MarketingEdition } = {
  desktop: {
    badge: 'AUTHORING & QUALIFICATION ENVIRONMENT',
    name: 'VTAB Marketing Studio Workspace',
    subtitle: 'Authoring & Qualification Environment',
    description: 'Discover high-intent buyer leads, upload company knowledge bases, and create verified multi-agent marketing campaigns in an intuitive workspace. Built for Demand Gen teams, Growth Marketers, and Founders.',
    targetAudience: 'Built for Growth Marketers, Demand Gen Specialists, and AI Agency Teams',
    highlights: [
      'Real-time buyer signal engine analyzing intent discussions across social communities',
      'Drag-and-drop website and document knowledge training',
      'Multi-agent campaign drafting with custom templates, palettes, and tone',
      'One-click export to CSV, JSON, and CRM webhooks'
    ],
    actionLabel: 'Open Studio Workspace →',
    consoleTitle: 'Local Workstation Execution — Active Workspace',
    consoleLines: [
      { label: 'Active Workspace:', value: 'Northstar Labs (Enterprise)', highlight: false },
      { label: 'Knowledge Chunks:', value: '20 Searchable Vectors', highlight: true },
      { label: 'AI Model Engine:', value: 'Gemini 2.5 Pro + Cloudflare FLUX', highlight: false },
      { label: 'Mode:', value: 'Full authoring and lead discovery capable', highlight: true }
    ]
  },
  services: {
    badge: 'COLLABORATIVE CLOUD & DISTRIBUTION',
    name: 'VTAB Omni-Channel Publishing Services',
    subtitle: 'Collaborative Cloud & Distribution',
    description: 'Publish approved marketing creatives, post copy, and lead sequences directly to social networks and outreach channels with audit-ready compliance. Built for Revenue Leaders, Marketing Executives, and Social Managers.',
    targetAudience: 'Built for Revenue Leaders, Marketing Executives, and Social Community Managers',
    highlights: [
      'Direct one-click publishing via official Meta Graph APIs and LinkedIn APIs',
      'Automated AI disclosure tagging compliant with regulatory standards',
      'Team approval workflows with review notices and edit tracking',
      'Real-time post telemetry, engagement analytics, and lead capture hooks'
    ],
    actionLabel: 'Schedule Enterprise Demo ↗',
    consoleTitle: 'Cloud Services Endpoint — Production Cluster',
    consoleLines: [
      { label: 'Connected Endpoint:', value: 'https://services.vtab.internal/campaigns', highlight: false },
      { label: 'Active Channels:', value: 'Facebook Page · Instagram Business · LinkedIn', highlight: true },
      { label: 'Publishing Mode:', value: 'Automated API Dispatch with Human Approval Gate', highlight: false },
      { label: 'Compliance Status:', value: 'Enforced for 100% of outbound campaigns', highlight: true }
    ]
  }
};
