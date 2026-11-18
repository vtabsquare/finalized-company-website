export const DATABRICKS_MIGRATION_CONFIG = {
  name: 'Databricks Migration AI Studio',
  shortName: 'Migration AI Studio',
  tagline: 'Transform legacy databases into governed Databricks Lakehouses.',
  description: 'Enterprise-grade, metadata-first, prompt-native modernization platform for cataloging relational databases, inferring multi-tier Medallion semantic architectures, repairing procedural SQL routines, generating idempotent SCD Type 2 Delta pipelines, and governing multi-environment promotion.',
  version: 'Windows 64-bit · Build 2.5.0 STABLE (REMEDIATION_1)',
  categoryLabel: '24/7 ENTERPRISE MIGRATION CONTROL PLANE • REMEDIATION 1',
  downloadUrl: 'https://github.com/vtabsquare/Databricks-Migration-Agent-Releases/releases/latest',
  demoUrl: 'https://databricks-migration-factory-9ym2.onrender.com/?embed=true',
  systemRequirements: 'Windows 10/11 x64 / Linux x64 · 8 GB RAM · Outbound Port 443 HTTPS only · Zero Inbound Ports',
  releaseDate: 'November 2026',
};

export const DATABRICKS_WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Connect & Discover',
    subtitle: 'Universal multi-engine cataloging & zero-trust transport',
    description: 'Zero-trust outbound agent communication, high-watermark incremental polling, and native enterprise metadata extraction across heterogeneous RDBMS engines.',
    bullets: [
      'SQL Server, PostgreSQL, MySQL/MariaDB, and Oracle Thin Mode',
      'Automated PK/FK constraint extraction, dependency ordering & cycle detection',
      'Zero-trust outbound HTTPS proxy with SHA-256 schema snapshot drift verification'
    ],
    icon: 'Database',
    terminalTitle: 'Pipeline Flow State — Active Mode',
    terminalLines: [
      { label: 'SQL Server 2019 Enterprise', status: 'LIVE', mode: 'Windows Trusted (ODBC 18)' },
      { label: 'PostgreSQL 15 Aurora', status: 'LIVE', mode: 'Direct Adapter (SSL Strict)' },
      { label: 'Oracle Database 19c RAC', status: 'LIVE', mode: 'Thin SID / Service Name' },
      { label: 'MySQL 8.0 Cloud SQL', status: 'LIVE', mode: 'utf8mb4 Native Protocol' }
    ],
    terminalSummary: 'Metadata Extraction Status: 100% of tables, types, and constraints ingested into canonical repository with zero query blocking.'
  },
  {
    step: '02',
    title: 'Classify & Medallion',
    subtitle: 'Prompt-native semantic lakehouse architecture design',
    description: 'Automatically allocate discovered relational assets into 3-tier Medallion lakehouse tiers with automated relationship and cardinality inference.',
    bullets: [
      'Bronze raw Delta Lake ingest with lineage metadata (_ingest_ts, _source_hash)',
      'Silver conformed layer with automated surrogate key generation & SCD2 flags',
      'Gold analytical star schemas with conformed business facts and dimensions'
    ],
    icon: 'GitFork',
    terminalTitle: 'Medallion Classification Engine',
    terminalLines: [
      { label: 'Bronze Raw Delta', status: 'ALLOCATED', mode: '2,450 Tables (64% of total)' },
      { label: 'Silver SCD2 Merge', status: 'SYNTHESIZED', mode: '1,080 Cleansed Views (28%)' },
      { label: 'Gold Star Schemas', status: 'READY', mode: '311 Curated Marts (8%)' },
      { label: 'Unity Catalog Namespace', status: 'GOVERNED', mode: 'prod_catalog.medallion.*' }
    ],
    terminalSummary: 'Automated fact/dimension inference completed. Zero circular filter pathways. Conforms to Unity Catalog standards.'
  },
  {
    step: '03',
    title: 'Transform & Repair',
    subtitle: 'Deterministic AST transpilation & bounded AI repair',
    description: 'Transpile legacy T-SQL, PL/SQL, and stored procedures into native Databricks Spark SQL with deterministic AST parsing and bounded AI assistance.',
    bullets: [
      'Deterministic transpilation for scalar functions, date arithmetic & control flow',
      'Bounded AI repair loop (max 3 attempts) via local Ollama qwen2.5 or Gemini',
      'Static SQL preflight validation prior to human review and promotion approval'
    ],
    icon: 'Cpu',
    terminalTitle: 'Deterministic AST & AI Repair Canvas',
    terminalLines: [
      { label: 'Source Discovery', status: 'PARSED', mode: 'dbo.usp_CalculateCommission (T-SQL)' },
      { label: 'Deterministic AST', status: 'TRANSPILED', mode: 'ISNULL → COALESCE, GETDATE() → CURRENT_TIMESTAMP' },
      { label: 'AI Remediation', status: 'RESOLVED', mode: 'Cursor resolved to vectorized SUM() OVER()' },
      { label: 'Databricks Preflight', status: 'VALIDATED', mode: 'Syntax checked against target cluster runtime' }
    ],
    terminalSummary: 'Artifact Quality: VALIDATED EXECUTABLE (100% Valid · 0 Syntax Blockers · Zero ARRAY<VOID> errors).'
  },
  {
    step: '04',
    title: 'Deploy & Govern',
    subtitle: 'Governed 4-stage promotion (DEV → TEST → UAT → PROD)',
    description: 'Control-plane release governance with automated preflight validation, technical & business reconciliation, and human review approval gates.',
    bullets: [
      'Four-stage project promotion lifecycle with branch & tag protection',
      'Automated technical checksum reconciliation and row-count audits',
      'Unity Catalog granular Row-Level Security (RLS) and column mask propagation'
    ],
    icon: 'Share2',
    terminalTitle: 'Governed Promotion Gatekeeper',
    terminalLines: [
      { label: 'DEV Stage', status: 'PASSED', mode: 'Local dry-run & syntax verification' },
      { label: 'TEST Stage', status: 'VERIFIED', mode: 'Automated test suite & reconciliation check' },
      { label: 'UAT Stage', status: 'APPROVED', mode: 'Stakeholder sign-off & data parity audit' },
      { label: 'PROD Stage', status: 'READY', mode: 'Zero-downtime cutover & Delta Lake sync' }
    ],
    terminalSummary: 'Quality Gate: APPROVED. Full audit trail recorded with immutable SHA-256 verification hash.'
  }
];

export const DATABRICKS_FEATURE_ITEMS = [
  {
    id: 'connectivity',
    category: 'Multi-Source Connectivity',
    shortTag: 'CONNECT',
    title: 'High-Throughput Enterprise Ingestion & Discovery',
    description: 'Connect seamlessly to on-premise relational databases, cloud instances, and legacy data warehouses with zero cloud credential exposure.',
    highlightPoints: [
      'Polymorphic multi-source adapter registry supporting SQL Server, PostgreSQL, MySQL, and Oracle Thin mode',
      'Outbound-only secure agent architecture eliminating network ingress firewall exceptions and cloud credential leaks',
      'Configurable high-watermark incremental refresh policies and partition slicing for terabyte-scale migration'
    ],
    specs: [
      { label: 'Protocols', value: 'ODBC 18, JDBC, Native Wire, REST' },
      { label: 'Throughput', value: 'Up to 4.2M rows/sec (Hex-Streaming)' },
      { label: 'Security', value: 'AES-256 GCM • PBKDF2 • Windows Auth' }
    ],
    previewType: 'connectors'
  },
  {
    id: 'cataloging',
    category: 'Schema & Lineage Cataloging',
    shortTag: 'DISCOVER',
    title: 'Deep RDBMS Introspection & Dependency Graphing',
    description: 'Perform sub-second cataloging across thousands of tables, views, triggers, and procedures with automated foreign-key cycle detection.',
    highlightPoints: [
      'Extracts table schemas, column types, primary/foreign keys, indices, and check constraints',
      'Topological dependency DAG ordering to ensure correct ingestion and build sequence',
      'Continuous SHA-256 snapshot hashing for automated backward-compatible drift detection'
    ],
    specs: [
      { label: 'Object Types', value: 'Tables, Views, SPs, UDFs, Triggers' },
      { label: 'Extraction', value: 'Non-blocking read metadata queries' },
      { label: 'Audit Trail', value: 'Immutable SHA-256 snapshots' }
    ],
    previewType: 'transform'
  },
  {
    id: 'medallion',
    category: 'Medallion Semantic Engine',
    shortTag: 'MODEL',
    title: '3-Tier Medallion Lakehouse Architecture Synthesis',
    description: 'Design multi-layer Medallion architectures with automated relationship inference. Generate Bronze audit tables, Silver SCD Type 2 MERGE pipelines, and Gold star schemas.',
    highlightPoints: [
      'Multi-stage Medallion graph: Source → Bronze Raw → Silver SCD2 (Active/Expiry) → Gold Facts/Dims',
      'Automated fact/dimension classification based on PK/FK cardinality, indexing, and temporal attributes',
      'Granular Row-Level Security (RLS) and Column Masking rules propagated to Unity Catalog'
    ],
    specs: [
      { label: 'Architecture', value: 'Bronze (Raw) → Silver (SCD2) → Gold (Star)' },
      { label: 'Catalog Standard', value: 'Databricks Unity Catalog Native' },
      { label: 'Merge Engine', value: 'Idempotent Delta Lake MERGE' }
    ],
    previewType: 'model'
  },
  {
    id: 'transport',
    category: 'Deterministic Transport Engine',
    shortTag: 'EXECUTE',
    title: 'Hex-Normalized Binary Streaming Direct to Delta',
    description: 'Eliminate data corruption and connector inference bugs without fragile Python type casting. Binds binary families, timestamps, and rowversions directly via hex normalization.',
    highlightPoints: [
      'Zero-loss transport for binary, varbinary, image, and rowversion avoiding ARRAY<VOID> errors',
      'Sub-millisecond query evaluation on multi-million row in-memory extraction batches',
      'Over 60 native data type conversion profiles covering SQL Server, Oracle, and Postgres to Databricks'
    ],
    specs: [
      { label: 'Binary Engine', value: 'Hex normalization unhex(?)' },
      { label: 'Throughput', value: 'Up to 4.2M rows/sec' },
      { label: 'Type Safety', value: 'Zero ARRAY<VOID> Errors' }
    ],
    previewType: 'engine'
  },
  {
    id: 'ai-repair',
    category: 'Governed AI Repair Studio',
    shortTag: 'REPAIR',
    title: 'Deterministic AST Transpilation & Bounded AI Loop',
    description: 'Transpile legacy T-SQL, PL/SQL, and stored procedures into native Databricks Spark SQL. Deterministic parser runs first, followed by bounded AI remediation under human supervision.',
    highlightPoints: [
      'Deterministic AST parser converts control-flow, conditional logic, and scalar built-ins',
      'Bounded AI repair loop (max 3 attempts) via local Ollama qwen2.5 or Gemini with review gates',
      'Automated Databricks cluster preflight syntax verification before artifact approval'
    ],
    specs: [
      { label: 'Strategy', value: 'Deterministic First → Bounded AI' },
      { label: 'AI Runtimes', value: 'Ollama (Local/Air-Gapped) & Gemini' },
      { label: 'Safety Gates', value: 'Preflight Syntax Validation + Human Sign-off' }
    ],
    previewType: 'dashboard'
  },
  {
    id: 'governance',
    category: 'Continuous Drift & Promotion',
    shortTag: 'GOVERN',
    title: '4-Stage Promotion Control Plane with Reconciliation',
    description: 'Orchestrate, validate, and promote migration workloads through an enterprise web control plane. Manage reviews, enforce quality gates, and automate cutover.',
    highlightPoints: [
      'Four-stage project promotion lifecycle: DEV → TEST → UAT → PROD with review audit logs',
      'Automated technical and business reconciliation comparing row counts, checksums, and aggregate summaries',
      'Complete REST API and OpenAPI 3.0 specification for GitOps and CI/CD automation'
    ],
    specs: [
      { label: 'Promotion Tiers', value: 'DEV → TEST → UAT → PROD' },
      { label: 'Reconciliation', value: 'Dual-Run Checksum & Count Validation' },
      { label: 'Automation', value: 'REST API & OpenAPI 3.0 Webhooks' }
    ],
    previewType: 'paginated'
  }
];

export const DATABRICKS_EDITIONS_INFO = {
  desktop: {
    name: 'Migration Factory Agent (Desktop & CLI)',
    badge: 'AUTHORING & EXTRACTION ENVIRONMENT',
    description: 'Securely inspect and extract legacy database schemas with the standalone Migration Agent. A single compiled executable with zero external dependencies and local Windows/SQL authentication.',
    targetAudience: 'Built for database administrators, security officers, and data engineers',
    highlights: [
      'Single-file standalone executable (migration-agent.exe) requiring zero runtime installation',
      'Native Windows Trusted Authentication and SQL Server authentication support',
      'Local Ollama AI daemon integration for offline, air-gapped code conversion',
      'Offline schema discovery with immutable SHA-256 metadata snapshot generation'
    ],
    actionLabel: 'Download Standalone Agent (EXE)'
  },
  services: {
    name: 'Migration AI Studio Web & Control Plane',
    badge: 'COLLABORATIVE GOVERNANCE CONTROL PLANE',
    description: 'Orchestrate, validate, and promote migration workloads through an enterprise web control plane. Manage reviews, enforce quality gates, and automate cutover.',
    targetAudience: 'Built for migration leads, enterprise architects, and data platform owners',
    highlights: [
      'Interactive reviews with immutable audit logging: Approve, Reject, or Request Changes',
      'Automated Databricks preflight validation and SQL syntax blocker detection',
      'Project-scoped 4-stage promotion lifecycle with automated reconciliation reports',
      'Complete REST API and OpenAPI 3.0 specs for CI/CD pipeline automation'
    ],
    actionLabel: 'Explore Live Control Plane'
  }
};
