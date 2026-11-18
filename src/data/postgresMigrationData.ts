export interface PostgresWorkflowStep {
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

export interface PostgresFeatureItem {
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

export interface PostgresEdition {
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

export const POSTGRES_MIGRATION_CONFIG = {
  name: 'Database Migration & Replatforming Suite',
  shortName: 'PostgreSQL to SQL Server Migration',
  topBadge: 'DATABASE MIGRATION & REPLATFORMING SUITE · V2.4.1 STABLE',
  tagline: 'Engineered for the complete database modernization journey.',
  description: 'From raw multi-dialect DDL ingestion and AST parsing to rule-driven T-SQL translation, Gemini AI procedural conversion, and automated live SQL Server dry-run validation, every step is optimized for zero-downtime database modernization.',
  version: 'Enterprise Cloud · v2.4.1 STABLE',
  categoryLabel: 'DATABASE & MIGRATION REPLATFORMING',
  impactMetric: 'Zero Data Loss · 120K DDL Lines/sec Parsing',
  techStack: ['Python AST Engine', 'Node.js', 'Google Gemini 2.5 Flash / Pro', 'ODBC Driver 17', 'msnodesqlv8', 'T-SQL Transpiler', 'React 18']
};

export const POSTGRES_WORKFLOW_STEPS: PostgresWorkflowStep[] = [
  {
    step: '01',
    title: 'Ingest & Parse',
    subtitle: 'Multi-dialect DDL & AST extraction',
    description: 'High-throughput ingestion of multi-megabyte schema dumps across PostgreSQL, MySQL, and Oracle with deterministic DDL statement splitting and AST object categorization.',
    bullets: [
      'Full support for PostgreSQL (pg_dump), MySQL (mysqldump), and Oracle DDL exports',
      'Granular object segmentation across Schemas, Tables, Views, Stored Procedures, Functions, Triggers, Indexes, and Sequences',
      'Pre-flight syntax parsing and dialect detection with automated multi-statement boundary resolution'
    ],
    icon: 'Database',
    terminalTitle: 'Pipeline Flow State — Multi-Dialect Schema Harvesters',
    terminalLines: [
      { label: 'PostgreSQL Ingestion Stream', status: 'LIVE', mode: 'pg_dump v16 Parser Active' },
      { label: 'MySQL Schema Stream', status: 'LIVE', mode: 'MySQL 8.0 DDL Lexer' },
      { label: 'Oracle DDL Stream', status: 'LIVE', mode: 'PL/SQL Block Extractor' },
      { label: 'DDL Parser & AST Categorizer', status: 'LIVE', mode: 'AST Object Tree Generation' }
    ],
    terminalSummary: 'Pre-flight filter enabled: 100% of non-standard dialect constructs cataloged before translation.',
    bottomBadges: ['Enterprise Schema Compliant', 'Zero-Data-Leak AST Parsing', 'Multi-Dialect Ready']
  },
  {
    step: '02',
    title: 'Translate & Adapt',
    subtitle: 'Rule-based & AI procedural conversion',
    description: 'Deterministic type and function mapping combined with deep Gemini AI procedural re-engineering for complex PL/pgSQL, MySQL Stored Programs, and Oracle packages.',
    bullets: [
      'Hundreds of verified dialect mapping rules covering data types, default values, and system functions',
      'AI contextual rewriting converting nested CURSOR loops, exceptions, and triggers into T-SQL TRY...CATCH & THROW',
      'Automated dependency resolution orchestrating object creation order to eliminate foreign key errors'
    ],
    icon: 'Cpu',
    terminalTitle: 'Hybrid Rule & AI Translation Mesh',
    terminalLines: [
      { label: 'Deterministic Type Mapper', status: 'TRANSLATING', mode: 'SERIAL ➔ IDENTITY, VARCHAR2 ➔ NVARCHAR' },
      { label: 'System Function Normalizer', status: 'ACTIVE', mode: 'NOW() ➔ GETDATE(), NVL() ➔ ISNULL()' },
      { label: 'Gemini Procedural Refactorer', status: 'ENGAGED', mode: 'PL/pgSQL Exception Blocks ➔ TRY...CATCH' },
      { label: 'Dependency Graph Sorter', status: 'ORDERED', mode: 'Sequences ➔ Tables ➔ Views ➔ SPs' }
    ],
    terminalSummary: 'Translation Engine: 100% of standard DDL mappings verified against Microsoft official T-SQL specifications.',
    bottomBadges: ['600+ Validated Rules', 'Hybrid AI Refactoring', 'Deterministic Core']
  },
  {
    step: '03',
    title: 'Inspect & Validate',
    subtitle: 'Side-by-side AST diff & SQL Server sandbox dry-run',
    description: 'Inspect converted T-SQL queries inside an inline Monaco diff editor and execute automated dry-runs against local or remote SQL Server sandboxes.',
    bullets: [
      'Interactive side-by-side Monaco code diffing comparing source dialect with generated T-SQL',
      'Pre-flight execution against isolated SQL Server Developer/Express instances via ODBC 17',
      'Comprehensive validation audit detailing execution successes, warnings, and syntax collisions'
    ],
    icon: 'ShieldCheck',
    terminalTitle: 'Pre-Flight Sandbox Validation State',
    terminalLines: [
      { label: 'Monaco Diff Verification', status: 'REVIEWED', mode: 'Side-by-Side Syntax Highlights' },
      { label: 'Dry-Run Sandbox Engine', status: 'EXECUTING', mode: 'ODBC 17 / msnodesqlv8 Connection' },
      { label: 'Syntax Collision Detector', status: 'PASS', mode: 'Zero Keyword Collisions' },
      { label: 'FK Constraint Order Validator', status: 'PASS', mode: '100% Referential Paths Resolved' }
    ],
    terminalSummary: 'Validation Approved: Zero unverified procedures or invalid syntax permitted into live targets.',
    bottomBadges: ['Monaco Diff Inspection', 'ODBC 17 Sandbox', 'Zero Syntax Collisions']
  },
  {
    step: '04',
    title: 'Deploy & Export',
    subtitle: 'Live SQL Server instance execution & .BAK archive',
    description: 'Deploy sanitized schema and data objects directly into production SQL Server instances with native authentication and one-click .BAK backup exports.',
    bullets: [
      'Direct execution against SQL Server instances using Windows Integrated Auth or SQL Server Credentials',
      'Automated transaction wrapping with rollback guarantees upon unforeseen migration errors',
      'Native full-database backup generation producing ready-to-mount .BAK files'
    ],
    icon: 'Server',
    terminalTitle: 'Direct Instance Deployment & Backup Pipeline',
    terminalLines: [
      { label: 'Target SQL Server Instance', status: 'CONNECTED', mode: 'TCP 1433 / localhost\\SQLEXPRESS' },
      { label: 'Transactional Migration DDL', status: 'COMMITTED', mode: '148 Database Objects Deployed' },
      { label: 'Database Backup Generator', status: 'ARCHIVED', mode: 'Native SQL Server .BAK Created' },
      { label: 'Export Centre Ready', status: 'COMPLETED', mode: 'Direct Download Available' }
    ],
    terminalSummary: 'Deployment Complete: Database modernization finished with zero data loss and automated .BAK archive created.',
    bottomBadges: ['Native SQL Server .BAK', 'Transactional Rollbacks', 'Windows & SQL Auth']
  }
];

export const POSTGRES_FEATURE_ITEMS: PostgresFeatureItem[] = [
  {
    id: 'multi-dialect-ingestion',
    category: 'Multi-Dialect Ingestion',
    shortTag: 'INGEST',
    title: 'High-Throughput Schema Parsing',
    description: 'Ingest complex legacy database scripts and automatically categorize every DDL artifact into structured, inspectable migration units without syntax truncation.',
    highlightPoints: [
      'Multi-dialect ingestion supporting PostgreSQL, MySQL 5.7/8.0+, and Oracle 11g–23c',
      'Automatic extraction and isolation of Tables, Foreign Keys, Sequences, Triggers, and Stored Procedures',
      'Dialect-aware delimiter handling ($$, DELIMITER //, /, END;) with zero statement mangling'
    ],
    specs: [
      { label: 'THROUGHPUT', value: '120K Lines / sec' },
      { label: 'DIALECTS', value: 'PostgreSQL, MySQL, Oracle' },
      { label: 'DELIMITERS', value: 'Dialect-Aware Lexer' }
    ],
    terminalTitle: 'Multi-Dialect DDL Parsing Telemetry',
    terminalLines: [
      { label: 'PostgreSQL to T-SQL Transformer', status: 'LIVE', mode: '99.4% Accuracy' },
      { label: 'MySQL to T-SQL Transformer', status: 'LIVE', mode: '98.9% Accuracy' },
      { label: 'Oracle PL/SQL to T-SQL Engine', status: 'LIVE', mode: '96.7% Accuracy' },
      { label: 'Gemini AI Fallback Synthesizer', status: 'LIVE', mode: 'Deep Context Enabled' }
    ],
    securityNotice: 'Automatic TLS 1.3 encryption, local sandbox execution, and zero-retention code residency active.'
  },
  {
    id: 'rule-based-tsql-translation',
    category: 'Rule-Based T-SQL Translation',
    shortTag: 'RULES',
    title: 'Deterministic Rule-Based Translation Core',
    description: 'Run DDL and schema definitions through hundreds of hardened dialect mapping rules. Every type definition, constraint, sequence, and system function is strictly mapped to optimal T-SQL equivalents.',
    highlightPoints: [
      'Complete data type mapping (SERIAL/AUTO_INCREMENT ➔ IDENTITY, VARCHAR2 ➔ NVARCHAR, TIMESTAMPTZ ➔ DATETIMEOFFSET, JSONB ➔ NVARCHAR(MAX))',
      'System function normalization (NOW()/SYSDATE ➔ GETDATE(), NVL()/IFNULL() ➔ ISNULL(), TO_CHAR() ➔ FORMAT()/CONVERT())',
      'Automated constraint dependency resolution preserving foreign key hierarchies and custom index options'
    ],
    specs: [
      { label: 'RULE REPO', value: '600+ Validated Rules' },
      { label: 'TARGET', value: 'SQL Server 2016-2022 / Azure' },
      { label: 'TYPE RIGOR', value: 'Strict T-SQL Standard' }
    ],
    terminalTitle: 'Grammar Mapping Engine State',
    terminalLines: [
      { label: 'PostgreSQL Rule Catalog', status: 'ACTIVE', mode: '240+ Deterministic AST Rules' },
      { label: 'MySQL 8.0 Grammar Library', status: 'ACTIVE', mode: '180+ Dialect Mappers' },
      { label: 'Oracle PL/SQL Pattern Dictionary', status: 'ACTIVE', mode: '210+ Procedural Handlers' },
      { label: 'T-SQL Output Compiler', status: 'LOCKED', mode: 'Optimized Columnstore & Clustered' }
    ],
    securityNotice: '100% of standard DDL mappings verified against Microsoft official T-SQL specifications.'
  },
  {
    id: 'ai-procedural-refactoring',
    category: 'AI Procedural Refactoring',
    shortTag: 'AI REFACTOR',
    title: 'Generative AI Procedural Logic Conversion',
    description: 'Transform complex procedural logic that static regex rules cannot solve. Rewrites nested cursor loops, dynamic exception handlers, and custom triggers into clean, readable T-SQL code.',
    highlightPoints: [
      'Context-aware PL/SQL & PL/pgSQL procedural refactoring rewriting CURSOR FOR LOOPS, PRAGMA AUTONOMOUS_TRANSACTION, and RAISE EXCEPTION into T-SQL TRY...CATCH & THROW',
      'Dual execution modes prioritizing deterministic rules first before delegating complex logic to Gemini AI',
      'Structured AST prompts feeding Gemini the entire schema context to prevent synthetic hallucinated object names'
    ],
    specs: [
      { label: 'AI MODEL', value: 'Google Gemini 2.5 Flash / Pro' },
      { label: 'PROCEDURAL FIDELITY', value: '100% Context-Bound' },
      { label: 'ERROR HANDLERS', value: 'T-SQL TRY...CATCH & THROW' }
    ],
    terminalTitle: 'AI Procedural Translation Engine',
    terminalLines: [
      { label: 'Procedure AST Ingestion', status: 'PARSED', mode: 'sp_process_order(id, amount)' },
      { label: 'Cursor Loop Decompiler', status: 'REWRITTEN', mode: 'Set-based / Fast-Forward Cursor' },
      { label: 'Exception Block Adapter', status: 'ADAPTED', mode: 'BEGIN TRY ... BEGIN CATCH' },
      { label: 'Output Code Inspection', status: 'VERIFIED', mode: 'Zero Syntax Drift' }
    ],
    securityNotice: 'Prompts strictly bound to client DDL schema without external data leakage.'
  },
  {
    id: 'live-sqlserver-dryrun',
    category: 'Live SQL Server Dry-Run',
    shortTag: 'DRY RUN',
    title: 'Pre-Flight Sandbox Execution & Validation',
    description: 'Validate migrated DDL against real database engines before touching production. Connect to local or remote SQL Server instances via ODBC 17 / msnodesqlv8 to perform automated dry-runs.',
    highlightPoints: [
      'Isolated dry-run execution creating temporary migration sandboxes on local Express or Developer instances',
      'Comprehensive migration summary reports detailing successful executions, warnings, and syntax errors',
      'Catch runtime syntax collisions, foreign key circular references, and missing schema dependencies'
    ],
    specs: [
      { label: 'DRIVER', value: 'ODBC Driver 17 / msnodesqlv8' },
      { label: 'SANDBOX', value: 'Disposable Target Schema' },
      { label: 'COLLISION CHECK', value: 'Pre-Flight Engine Active' }
    ],
    terminalTitle: 'Dry-Run Engine Telemetry',
    terminalLines: [
      { label: 'ODBC 17 Driver Connection', status: 'ESTABLISHED', mode: 'msnodesqlv8 Pool Active' },
      { label: 'Sandbox DB Provisioning', status: 'MOUNTED', mode: 'Temp_Migration_Sandbox_01' },
      { label: 'DDL Statement Execution', status: 'EXECUTING', mode: '148 of 148 Statements' },
      { label: 'Error & Warning Collector', status: 'PASS', mode: '0 Errors, 0 Warnings' }
    ],
    securityNotice: 'Dry-run transactions executed in isolated sandboxes with zero impact on production data.'
  },
  {
    id: 'interactive-diff-inspection',
    category: 'Interactive Diff & Inspection',
    shortTag: 'DIFF',
    title: 'Monaco Side-by-Side Diff & Inspection Editor',
    description: 'Empower database engineers with an intuitive visual comparison workbench. Inspect every transformed table, view, and stored procedure side-by-side with original source code.',
    highlightPoints: [
      'Rich side-by-side Monaco diff editor with live T-SQL syntax highlighting and line numbers',
      'Granular human-in-the-loop review with inline manual edit overrides before database commit',
      'Interactive category filtering across Tables, Views, Procedures, Functions, Triggers, and Sequences'
    ],
    specs: [
      { label: 'EDITOR', value: 'Monaco Code Diff Engine' },
      { label: 'HIGHLIGHTING', value: 'PL/pgSQL & T-SQL Native' },
      { label: 'OVERRIDE', value: 'Inline Real-Time Editing' }
    ],
    terminalTitle: 'Monaco Code Diffing Console',
    terminalLines: [
      { label: 'Source Dialect Buffer', status: 'MOUNTED', mode: 'PostgreSQL 16 Script' },
      { label: 'Target T-SQL Buffer', status: 'MOUNTED', mode: 'Microsoft SQL Server 2022' },
      { label: 'AST Token Alignment', status: 'SYNCHRONIZED', mode: 'Line-by-Line Semantic Diff' },
      { label: 'Manual Overrides Bus', status: 'ACTIVE', mode: 'Developer Hot-Patching Ready' }
    ],
    securityNotice: 'Client-side editor runs entirely inside local memory without external telemetry.'
  },
  {
    id: 'automated-deployment-backup',
    category: 'Automated Deployment & Backup',
    shortTag: 'DEPLOY',
    title: 'Direct Deployment & Native .BAK Export',
    description: 'Execute converted T-SQL scripts directly against Microsoft SQL Server instances with native authentication, transactional rollbacks, and instant .BAK archive creation.',
    highlightPoints: [
      'Direct connectivity via official ODBC Driver 17 and msnodesqlv8 connection pooling',
      'Support for local SQL Server Express, Developer Edition, Standard, Enterprise, and Azure SQL',
      'Native full-database backup generation (.BAK) with instant download via the Export Centre'
    ],
    specs: [
      { label: 'TARGETS', value: 'SQL Server Express to Azure SQL' },
      { label: 'AUTH', value: 'Windows Integrated / SQL Auth' },
      { label: 'BACKUP FORMAT', value: 'Native Microsoft .BAK' }
    ],
    terminalTitle: 'Production Deployment & Backup Hub',
    terminalLines: [
      { label: 'SQL Server Target Host', status: 'AUTHENTICATED', mode: 'Windows Integrated (NTLM)' },
      { label: 'DDL Deployment Batch', status: 'EXECUTED', mode: '100% Clean Transaction' },
      { label: 'Backup Engine Command', status: 'EXECUTING', mode: 'BACKUP DATABASE TO DISK' },
      { label: '.BAK Export Archive', status: 'GENERATED', mode: 'Ready for Mounting' }
    ],
    securityNotice: 'Enterprise authentication uses Windows Integrated / SQL Server Auth over TLS 1.3.'
  }
];

export const POSTGRES_EDITIONS_INFO: { studio: PostgresEdition; deploy: PostgresEdition } = {
  studio: {
    badge: 'INTERACTIVE MIGRATION WORKSPACE',
    name: 'Database Modernization Studio',
    subtitle: 'Interactive Migration Workspace',
    description: 'Upload legacy DDL dumps, inspect parsed database objects, review side-by-side syntax diffs, and fine-tune converted T-SQL queries in a browser-based developer workspace. Built for Database Administrators, Migration Engineers, and Data Architects.',
    targetAudience: 'Built for Database Administrators, Migration Engineers, and Data Architects',
    highlights: [
      'Drag-and-drop multi-file SQL dump upload with automatic dialect detection',
      'Rich side-by-side Monaco diff editor with live T-SQL syntax highlighting',
      'Interactive category filtering (Tables, Views, Procedures, Functions, Triggers, Sequences)',
      'One-click export to consolidated .sql scripts or modular migration files'
    ],
    actionLabel: 'Launch Migration Studio →',
    consoleTitle: 'Local Workstation Execution — Active Session',
    consoleLines: [
      { label: 'Active Session:', value: 'PostgreSQL to T-SQL Production Migration', highlight: false },
      { label: 'Parsed DDL Objects:', value: '148 Objects (Tables, Views, SPs, Triggers)', highlight: true },
      { label: 'Translation Engine:', value: 'Deterministic AST Parser + Gemini 2.5 Flash / Pro', highlight: false },
      { label: 'Mode:', value: 'Full offline authoring, editing, and diff-inspection capable', highlight: true }
    ]
  },
  deploy: {
    badge: 'SECURE BACKEND & SQL SERVER DEPLOYMENT',
    name: 'SQL Server Direct Engine & Backup Pipeline',
    subtitle: 'Secure Backend & SQL Server Deployment',
    description: 'Execute converted T-SQL scripts directly against Microsoft SQL Server instances with native authentication, transactional rollbacks, and instant .BAK archive creation. Built for Lead DBAs, DevOps Engineers, and Cloud Infrastructure Teams.',
    targetAudience: 'Built for Lead DBAs, DevOps Engineers, and Cloud Infrastructure Teams',
    highlights: [
      'Direct connectivity via official ODBC Driver 17 and msnodesqlv8 connection pooling',
      'Support for local SQL Server Express, Developer Edition, Standard, Enterprise, and Azure SQL',
      'Pre-flight dry-run execution with automatic dependency-ordered object creation',
      'Native full-database backup generation (.BAK) with instant download via the Export Centre'
    ],
    actionLabel: 'Configure SQL Server Connection ↗',
    consoleTitle: 'Local/Enterprise Backend Endpoint — Instance Health',
    consoleLines: [
      { label: 'Connected Instance:', value: 'localhost\\SQLEXPRESS (TCP 1433)', highlight: false },
      { label: 'Authentication Mode:', value: 'Windows Integrated (Trusted) / SQL Auth (sa)', highlight: true },
      { label: 'Target Database:', value: 'Disposable migration sandbox / target schema', highlight: false },
      { label: 'Backup Status:', value: 'Automated native .BAK export ready on disk', highlight: true }
    ]
  }
};
