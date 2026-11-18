export interface L1WorkflowStep {
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

export interface L1FeatureItem {
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

export interface L1Edition {
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

export const L1_AGENT_CONFIG = {
  name: 'VTAB Enterprise L1 IT Automation Suite',
  shortName: 'L1 Automation Agent',
  topBadge: 'VTAB ENTERPRISE L1 IT AUTOMATION SUITE · V1.0.0 PRODUCTION READY',
  tagline: 'Autonomous zero-touch IT ticket resolution in seconds.',
  description: 'An intelligent autonomous digital IT technician that integrates directly with Jira, ServiceNow, and Microsoft Graph. It troubleshoots VPN issues, resets credentials, provisions software access, and resolves Tier-1 IT requests around the clock with zero human agent wait time.',
  version: 'Enterprise Cloud · v1.0.0 PRODUCTION READY',
  categoryLabel: 'ENTERPRISE TELEMETRY · ENTERPRISE AUTOMATION',
  impactMetric: '75% L1 Tickets Auto-Resolved',
  techStack: ['FastAPI', 'Python 3.12', 'React 18', 'Google Gemini 3.1 Flash-Lite', 'Microsoft Graph API', 'Jira Cloud REST v3', 'ServiceNow Table API', 'Supabase pgvector']
};

export const L1_WORKFLOW_STEPS: L1WorkflowStep[] = [
  {
    step: '01',
    title: 'Ingest & Normalize',
    subtitle: 'Universal ITSM Webhook Federation',
    description: 'Instant webhook ingestion, cryptographic HMAC-SHA256 signature verification, input sanitization, and source-agnostic normalization across enterprise Jira and ServiceNow instances.',
    bullets: [
      'Native Jira Cloud (REST API v3) and ServiceNow Table API webhook listeners',
      'Cryptographic HMAC signature validation with prompt injection and replay defense',
      'Automated payload normalization into unified schema with PII and credential masking'
    ],
    icon: 'Radio',
    terminalTitle: 'Pipeline Flow State — Universal ITSM Ingestion Gateway',
    terminalLines: [
      { label: 'Jira Cloud Webhook Stream', status: 'LIVE', mode: 'Project: KAN' },
      { label: 'ServiceNow Incident Stream', status: 'LIVE', mode: 'Table API Ingestion' },
      { label: 'HMAC Signature Verifier', status: 'ENFORCED', mode: 'SHA-256 Digest Validation' },
      { label: 'Rate Limiting & DoS Defense', status: 'ACTIVE', mode: 'SlowApi / 60/min' }
    ],
    terminalSummary: 'Ingestion Health: 100% of malicious and malformed webhook payloads intercepted at the edge.',
    bottomBadges: ['HMAC-SHA256 Verified', 'Zero-Trust Sanitized', '60 Req/Min Rate-Limited']
  },
  {
    step: '02',
    title: 'Classify & Ground',
    subtitle: 'Few-shot Gemini intent & SOP knowledge retrieval',
    description: 'Few-shot semantic classification extracts intent, urgency, and entities while pgvector indexes official enterprise IT standard operating procedures.',
    bullets: [
      'Multi-class incident categorization across IAM, VPN, hardware, and software provisioning',
      'Context-injected RAG retrieval binding remediation steps directly to approved IT SOP runbooks',
      'Confidence score thresholding with automatic escalation triggers below 85% certainty'
    ],
    icon: 'Bot',
    terminalTitle: 'Intent & SOP Retrieval Engine',
    terminalLines: [
      { label: 'Gemini 3.1 Semantic Reasoner', status: 'ACTIVE', mode: 'Intent & Target Entity Extraction' },
      { label: 'SOP pgvector Search', status: 'ACTIVE', mode: 'Top-k Runbook Retrieval' },
      { label: 'Confidence Evaluator', status: 'ACTIVE', mode: 'Score Threshold: 85% Enforced' },
      { label: 'Zero-Hallucination Buffer', status: 'LOCKED', mode: 'Restricted to Explicit SOP Steps' }
    ],
    terminalSummary: 'Intent classified in 420ms with 96.4% confidence score. Matching SOP Runbook #IAM-04 retrieved.',
    bottomBadges: ['Gemini 3.1 Flash-Lite', 'pgvector Semantic Search', 'Runbook Grounded']
  },
  {
    step: '03',
    title: 'Guard & Validate',
    subtitle: 'Deterministic policy rules & approval gate',
    description: 'Strict deterministic code-level guardrails evaluate user permissions, blast radius, and security policies before any execution authority is granted.',
    bullets: [
      'Code-level deterministic policy evaluation separating AI planning from execution authority',
      'Strict boundary enforcement preventing unauthorized privilege escalation or elevated group additions',
      'Granular human-in-the-loop review queues for flagged or high-risk operational requests'
    ],
    icon: 'ShieldCheck',
    terminalTitle: 'Deterministic Policy Enforcement Gate',
    terminalLines: [
      { label: 'Caller IAM Identity Check', status: 'PASS', mode: 'Entra ID Posture & Token Verified' },
      { label: 'Action Blast Radius', status: 'PASS', mode: 'Zero-Impact User-Level Scope' },
      { label: 'Privilege Escalation Guard', status: 'ENFORCED', mode: 'Admin Grants Blocked Deterministically' },
      { label: 'Human-in-the-Loop Queue', status: 'STANDBY', mode: 'Zero High-Risk Flags Triggered' }
    ],
    terminalSummary: 'Policy Approved: Operation strictly adheres to enterprise IT security boundaries.',
    bottomBadges: ['Deterministic Policies', 'Zero Rogue Executions', 'Human Approval Gate']
  },
  {
    step: '04',
    title: 'Remediate & Sync',
    subtitle: 'Microsoft Graph execution & bi-directional ITSM sync',
    description: 'Automated direct execution in Microsoft Graph and tenant directory systems paired with instant status transitions and resolution summaries in Jira and ServiceNow.',
    bullets: [
      'Microsoft Graph API client executing tenant-scoped user unlocks, password resets, and access grants',
      'Automated status transitions in Jira/ServiceNow with rich structured ADF resolution comments',
      'Immutable audit logging to PostgreSQL capturing timestamp, agent name, payload, and result'
    ],
    icon: 'Share2',
    terminalTitle: 'Enterprise Tool Execution & ITSM Sync Mesh',
    terminalLines: [
      { label: 'Microsoft Graph (Entra ID)', status: 'EXECUTED', mode: 'User Account Unlocked' },
      { label: 'Jira Cloud Status Transition', status: 'SYNCED', mode: 'Status: In Progress ➔ Resolved' },
      { label: 'ADF Comment Dispatcher', status: 'POSTED', mode: 'Resolution Summary & Audit Tag' },
      { label: 'PostgreSQL Audit Ledger', status: 'COMMITTED', mode: 'Cryptographic Event Hash Logged' }
    ],
    terminalSummary: 'Ticket #4920 resolved in 2.8s total cycle time. Incident closed and employee notified in Slack.',
    bottomBadges: ['Microsoft Graph API', 'Jira & ServiceNow Synced', 'Immutable Audit Log']
  }
];

export const L1_FEATURE_ITEMS: L1FeatureItem[] = [
  {
    id: 'intent-classification',
    category: 'Intent Classification',
    shortTag: 'CLASSIFY',
    title: 'Few-Shot Semantic Incident Classification',
    description: 'Categorize incoming IT issues with high-precision Google Gemini reasoning, extracting target entities, urgency levels, and user intent without brittle keyword heuristics.',
    highlightPoints: [
      'Sub-second categorization across IAM, hardware, VPN, software access, and network outages',
      'Confidence score thresholding (escalates low-confidence tickets under 85% automatically)',
      'Automatic entity extraction (User UPN, application name, machine hostname, and error codes)'
    ],
    specs: [
      { label: 'MODEL', value: 'Google Gemini 3.1 Flash-Lite' },
      { label: 'LATENCY', value: '< 450ms Classification' },
      { label: 'ACCURACY', value: '98.2% Intent Precision' }
    ],
    terminalTitle: 'Connector Catalog — ITSM & Identity Connectors',
    terminalLines: [
      { label: 'Jira Cloud REST API v3', status: 'LIVE', mode: 'Kanban & Service Desk' },
      { label: 'ServiceNow IT Service Mgmt', status: 'LIVE', mode: 'Incident & Change' },
      { label: 'Microsoft Graph API (Entra ID)', status: 'LIVE', mode: 'Active Directory & M365' },
      { label: 'Supabase Real-Time DB', status: 'LIVE', mode: 'pgvector & State Machine' }
    ],
    securityNotice: 'Least-privilege OAuth 2.0 app-only scopes and zero hardcoded credentials.'
  },
  {
    id: 'sop-knowledge-rag',
    category: 'SOP Knowledge RAG',
    shortTag: 'GROUND',
    title: 'Enterprise SOP Knowledge Base & Retrieval (RAG)',
    description: 'Anchor LLM remediation steps in official IT standard operating procedures (SOPs), knowledge base articles, and runbooks. Every generated action is strictly bound to approved enterprise troubleshooting procedures.',
    highlightPoints: [
      'Native pgvector semantic search retrieving top-k verified resolution runbooks',
      'Context-injected few-shot prompts constraining Gemini models to explicit SOP steps',
      'Automatic drift rejection: tickets outside documented SOPs trigger immediate escalation to human staff'
    ],
    specs: [
      { label: 'VECTOR DB', value: 'Supabase PostgreSQL pgvector' },
      { label: 'EMBEDDINGS', value: 'text-embedding-004 (768-dim)' },
      { label: 'GROUNDING', value: 'Zero Synthetic Hallucinations' }
    ],
    terminalTitle: 'Active Knowledge Ingestion Mesh',
    terminalLines: [
      { label: 'Identity & AD SOPs', status: 'INDEXED', mode: 'pgvector Active' },
      { label: 'VPN & Network Troubleshooting', status: 'INDEXED', mode: '768-dim Embeddings' },
      { label: 'M365 & Software Provisioning', status: 'INDEXED', mode: 'Live Vectors' },
      { label: 'Escalation & P1 Protocols', status: 'INDEXED', mode: 'Zero-Tolerance Rules' }
    ],
    securityNotice: 'Zero-hallucination buffer active. 100% of remediation actions verified against approved runbooks.'
  },
  {
    id: 'deterministic-policy-guard',
    category: 'Deterministic Policy Guard',
    shortTag: 'GUARD',
    title: 'Deterministic Policy Guardrails & Blast Radius Limiter',
    description: 'Before any remediation action touches production infrastructure, our deterministic policy engine evaluates permissions, user risk, and action blast radius. High-risk operations are automatically routed to human administrators.',
    highlightPoints: [
      'Code-level deterministic policy evaluation separating AI planning from execution authority',
      'Strict boundary enforcement preventing unauthorized password resets or elevated group grants',
      'Automatic Jira/ServiceNow escalation with enriched AI diagnostic context for L2/L3 engineers'
    ],
    specs: [
      { label: 'GUARD ENGINE', value: 'Deterministic Python Policy' },
      { label: 'SAFETY GATE', value: '100% Action Evaluation' },
      { label: 'ESCALATION', value: 'Zero-Delay Human Handoff' }
    ],
    terminalTitle: 'Deterministic Policy Validation State',
    terminalLines: [
      { label: 'IAM Boundary Evaluator', status: 'ENFORCED', mode: 'Restricts Privileged Group Membership' },
      { label: 'Credential Reset Policy', status: 'ENFORCED', mode: 'Requires MFA & Manager Context' },
      { label: 'Repetitive Request Guard', status: 'ACTIVE', mode: 'Anti-Abuse Threshold Triggered' },
      { label: 'Escalation Dispatcher', status: 'READY', mode: 'Enriches Ticket with Trace Logs' }
    ],
    securityNotice: '100% of destructive operations gated by deterministic policy rules.'
  },
  {
    id: 'active-directory-remediation',
    category: 'Active Directory Remediation',
    shortTag: 'REMEDIATE',
    title: 'Direct Microsoft Graph & Active Directory Remediation',
    description: 'Execute remediation directly in enterprise directory and cloud systems without intermediate manual intervention. Unlocks AD accounts, resets passwords, provisions group memberships, and synchronizes resolution notes in real time.',
    highlightPoints: [
      'Microsoft Graph API client executing tenant-scoped user unlocks and security group updates',
      'Automated status transitions in Jira (\'In Progress\' ➔ \'Resolved\') with rich ADF resolution comments',
      'Immutable audit logging to PostgreSQL capturing timestamp, agent name, payload, and result'
    ],
    specs: [
      { label: 'DIRECTORY', value: 'Microsoft Entra ID / Active Directory' },
      { label: 'SCOPES', value: 'Directory.ReadWrite.All (Tenant Scoped)' },
      { label: 'EXECUTION', value: 'Sub-Second Async Dispatch' }
    ],
    terminalTitle: 'Microsoft Graph Direct Remediation Channel',
    terminalLines: [
      { label: 'Account Unlock Service', status: 'READY', mode: 'Graph PATCH /users/{id}' },
      { label: 'Temporary Password Issuer', status: 'READY', mode: 'Secure Vault Ephemeral Link' },
      { label: 'M365 License Assignment', status: 'READY', mode: 'Graph assignLicenses Endpoint' },
      { label: 'Security Group Membership', status: 'READY', mode: 'Scoped RBAC Grant' }
    ],
    securityNotice: 'Cryptographic audit ledger tracks every Graph API invocation with tenant admin lineage.'
  },
  {
    id: 'itsm-bidirectional-sync',
    category: 'ITSM Bi-Directional Sync',
    shortTag: 'SYNC',
    title: 'Bi-Directional ITSM Mesh (Jira & ServiceNow)',
    description: 'Maintain perfect synchronization between AI actions and your enterprise ticketing system. Updates statuses, writes formatted resolution runbook summaries, and syncs timestamps automatically.',
    highlightPoints: [
      'Native Jira Cloud REST API v3 transitions with full Atlassian Document Format (ADF) output',
      'ServiceNow Table API incident resolution with sys_id tracking and state changes',
      'Bi-directional synchronization preventing conflicting human and agent modifications'
    ],
    specs: [
      { label: 'ITSM PLATFORMS', value: 'Jira Service Management, ServiceNow' },
      { label: 'SYNC LATENCY', value: '< 200ms Webhook Dispatch' },
      { label: 'FORMAT', value: 'Atlassian Document Format (ADF)' }
    ],
    terminalTitle: 'ITSM Bidirectional Gateway Feed',
    terminalLines: [
      { label: 'Jira Cloud Webhook Ingestion', status: 'SYNCHRONIZED', mode: 'REST API v3 Payload Received' },
      { label: 'ServiceNow SysId Mapper', status: 'SYNCHRONIZED', mode: 'Bi-directional State Tracking' },
      { label: 'ADF Formatted Resolution', status: 'POSTED', mode: 'Rich Text, Badges, & Logs' },
      { label: 'Resolution Timestamp Tag', status: 'LOCKED', mode: 'SLA Elapsed: 2.8s' }
    ],
    securityNotice: 'Full compliance with enterprise ITIL service management workflows and change governance.'
  },
  {
    id: 'audit-human-in-the-loop',
    category: 'Audit & Human-in-the-Loop',
    shortTag: 'AUDIT',
    title: 'Immutable Audit Trail & Human-in-the-Loop Oversight',
    description: 'Ensure 100% forensic transparency with immutable PostgreSQL logging. Helpdesk managers can inspect agent reasoning trees, override actions, or resume tickets with one click.',
    highlightPoints: [
      'Every thought, prompt, SOP match, and API payload committed to tamper-resistant database',
      'Real-time supervisor dashboard showing live ticket velocity, MTTR, and agent health',
      'One-click human takeover and re-assignment without losing previously gathered diagnostic context'
    ],
    specs: [
      { label: 'AUDIT LEDGER', value: 'PostgreSQL Relational DB' },
      { label: 'SUPERVISION', value: 'Live WebSocket Control Center' },
      { label: 'RETENTION', value: 'SOC-2 Compliant Long-Term' }
    ],
    terminalTitle: 'Forensic Audit & Supervisor Stream',
    terminalLines: [
      { label: 'Execution Log Hash', status: 'COMMITTED', mode: 'SHA-256 Ledger Record #89412' },
      { label: 'Supervisor Live Stream', status: 'STREAMING', mode: 'Supabase Realtime Channel' },
      { label: 'Manual Override Trigger', status: 'AVAILABLE', mode: 'One-Click Admin Intercept' },
      { label: 'SLA Compliance Monitor', status: 'HEALTHY', mode: '100% Within 5-Minute Window' }
    ],
    securityNotice: 'Compliant with SOC-2 Type II, ISO 27001, and enterprise change management audits.'
  }
];

export const L1_EDITIONS_INFO: { backend: L1Edition; dashboard: L1Edition } = {
  backend: {
    badge: 'BACKEND ORCHESTRATION & AGENT RUNTIME',
    name: 'FastAPI & Gemini Agentic Core',
    subtitle: 'High-performance asynchronous Python runtime',
    description: 'High-performance asynchronous Python runtime orchestrating few-shot Gemini models, deterministic policy rules, and Microsoft Graph integrations. Built for IT Operations, Security Engineers, and Enterprise Architects.',
    targetAudience: 'Built for IT Operations, Security Engineers, and Enterprise Infrastructure Architects',
    highlights: [
      'Multi-agent pipeline (Intake, Classifier, Planner, Policy, Executor, Reporter)',
      'Asynchronous webhook processing with sub-second background task dispatch',
      'Strict environment configuration with cryptographic secret validation',
      'Full REST API with rate-limiting, CORS security, and comprehensive health telemetry'
    ],
    actionLabel: 'Launch Backend API Docs →',
    consoleTitle: 'Backend Service Runtime — Container Cluster',
    consoleLines: [
      { label: 'Active Service:', value: 'Enterprise-L1-ticket-resolving (Render Cloud / Docker)', highlight: false },
      { label: 'AI Model Engine:', value: 'Google Gemini 3.1 Flash-Lite + Embedding-001', highlight: true },
      { label: 'Database & Vector Store:', value: 'Supabase PostgreSQL (pgvector + RLS)', highlight: false },
      { label: 'Health Status:', value: 'All Systems Operational (HTTP 200)', highlight: true }
    ]
  },
  dashboard: {
    badge: 'OPERATIONAL DASHBOARD & HUMAN SUPERVISION',
    name: 'React Real-Time Control Center',
    subtitle: 'Operational Dashboard & Human Supervision',
    description: 'Monitor autonomous resolutions, inspect live ticket streams, review policy decision trees, and override agent actions with complete audit visibility. Built for Helpdesk Managers and Service Delivery Leads.',
    targetAudience: 'Built for Helpdesk Managers, IT Support Leads, and Service Delivery Directors',
    highlights: [
      'Real-time ticket monitoring feed updating dynamically without page refreshes',
      'Detailed agent trace inspector showing thought process, SOP matches, and API responses',
      'Interactive policy decision breakdown for escalated tickets',
      'One-click manual intervention and ticket reassignment controls'
    ],
    actionLabel: 'Open Operations Dashboard ↗',
    consoleTitle: 'Operations Dashboard — Real-Time Monitor',
    consoleLines: [
      { label: 'Connected Endpoint:', value: 'https://enterprise-l1-ticket-resolving.onrender.com', highlight: false },
      { label: 'Real-Time Stream:', value: 'Supabase Realtime WebSocket Connection', highlight: true },
      { label: 'Monitored Metrics:', value: 'Resolution Rate · MTTR · SLA Compliance · Policy Rejections', highlight: false },
      { label: 'Forensic Retention:', value: '100% of agent events captured with forensic replay capability', highlight: true }
    ]
  }
};
