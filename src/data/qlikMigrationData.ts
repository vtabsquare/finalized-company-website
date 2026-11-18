export interface QlikWorkflowStep {
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

export interface QlikFeatureItem {
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

export interface QlikEdition {
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

export const QLIK_MIGRATION_CONFIG = {
  name: 'VTAB Qlik to Power BI Migration Suite',
  shortName: 'Qlik to Power BI Migration',
  topBadge: 'VTAB QLIK TO POWER BI MIGRATION SUITE · V3.2.0 PRODUCTION',
  tagline: 'Autonomous Qlik Sense & QView to Power BI Fabric Migration Engine.',
  description: 'Say goodbye to manual, month-long migration projects. Our AI-driven migration engine parses Qlik script files (.qvw, .qvd), interprets complex expressions and set-analysis logic, and automatically synthesizes equivalent Power BI datasets, DAX measures, and star-schema models with 99.4% accuracy.',
  version: 'Enterprise Cloud · v3.2.0 PRODUCTION',
  categoryLabel: 'DATABASE & BI MIGRATION AUTOMATION',
  impactMetric: '80% Reduction in Migration Cost · 99.4% Accuracy',
  techStack: ['Python AST Parser', 'Google Gemini 2.5 Flash', 'Power Query M Compiler', 'DAX Transpiler', 'React 18', 'TypeScript', 'Power BI REST API']
};

export const QLIK_WORKFLOW_STEPS: QlikWorkflowStep[] = [
  {
    step: '01',
    title: 'Ingest & Deconstruct',
    subtitle: 'Automated Qlik Script & Variable Extraction',
    description: 'Parse legacy Qlik scripts (.qvs, .qvw, .qvd), resolving nested variable expansions, hidden script tabs, and mapping load tables into an abstract syntax tree.',
    bullets: [
      'Multi-tab Qlik script parsing with automated sub-routine and include statement expansion',
      'Extraction of inline tables, binary loads, mapping tables, and resident load dependencies',
      'Dynamic variable dictionary reconstruction tracking formula and constant definitions'
    ],
    icon: 'FileCode',
    terminalTitle: 'Pipeline Flow State — Qlik Script Parser & Lexer',
    terminalLines: [
      { label: 'Qlik Script Lexer', status: 'LIVE', mode: 'AST Tokenizer Active' },
      { label: 'Variable Expansion Tree', status: 'RESOLVED', mode: '142 Variables Mapped' },
      { label: 'Mapping Load Resolver', status: 'ACTIVE', mode: 'Resident & Inline Tables' },
      { label: 'Synthetic Key Eliminator', status: 'ENGAGED', mode: 'Circular Reference Guard' }
    ],
    terminalSummary: 'Ingestion Health: 100% of Qlik script statements mapped to structural AST nodes.',
    bottomBadges: ['AST Parser', 'Variable Expansion', 'Circular Ref Guard']
  },
  {
    step: '02',
    title: 'Transpile & Model',
    subtitle: 'ETL to Power Query M & Star-Schema Reconstruction',
    description: 'Translate Qlik procedural data load script into high-performance Power Query M code and synthesize a clean, certified star-schema relationship model.',
    bullets: [
      'Deterministic step-by-step M code synthesis matching Microsoft Power BI standards',
      'Automatic calendar dimension synthesis with fiscal periods and rolling flags',
      'Transformation of associative associative links into explicit N:1 star-schema relationships'
    ],
    icon: 'Layers',
    terminalTitle: 'Power Query M & Schema Synthesis Engine',
    terminalLines: [
      { label: 'Fact Table Extraction', status: 'SYNTHESIZED', mode: 'Sales_Fact (Grain Verified)' },
      { label: 'Dimension Table Builder', status: 'SYNTHESIZED', mode: 'Dim_Customer, Dim_Product' },
      { label: 'Auto Calendar Generator', status: 'GENERATED', mode: 'Date_Master (DAX & M)' },
      { label: 'Power Query M Output', status: 'READY', mode: 'Typed & Buffered Stages' }
    ],
    terminalSummary: 'Data Model Verified: Clean star-schema with zero synthetic keys and 100% referential integrity.',
    bottomBadges: ['Native Power Query M', 'Star-Schema Rebuilt', 'Automated Calendar']
  },
  {
    step: '03',
    title: 'Translate & Optimize',
    subtitle: 'Set Analysis to Native DAX Transpilation',
    description: 'Convert complex Qlik aggregation syntax, set modifiers, and P()/E() element functions into idiomatic, performant DAX CALCULATE statements.',
    bullets: [
      'Conversion of {<Field = {\'Value\'}>} set modifiers into explicit table-filtered boolean predicates',
      'Automatic detection of distinct counters (Count(distinct ...) ➔ DISTINCTCOUNT())',
      'Dual execution modes: Instant local syntax transpiler or deep Gemini reasoning for obscure syntax'
    ],
    icon: 'Cpu',
    terminalTitle: 'Set Analysis to DAX Compiler Mesh',
    terminalLines: [
      { label: 'Expression Classifier', status: 'PARSED', mode: 'Sum, Aggr, Count Distinct' },
      { label: 'Set Modifier Transpiler', status: 'TRANSLATED', mode: 'CALCULATE + KEEPFILTERS' },
      { label: 'Gemini DAX Reasoner', status: 'VERIFIED', mode: '99.4% Syntactic Match' },
      { label: 'DAX Measures Output', status: 'EXPORTED', mode: 'measures.dax File Ready' }
    ],
    terminalSummary: 'Measures Transpiled: 1,420 formulas converted to DAX with zero synthetic measure names.',
    bottomBadges: ['DAX CALCULATE', 'Set Analysis', 'Gemini AI Verified']
  },
  {
    step: '04',
    title: 'Validate & Deploy',
    subtitle: 'Reconciliation Telemetry & Fabric Publishing',
    description: 'Perform automated row-level and KPI-level data reconciliation between Qlik and Power BI, followed by direct export to Power BI Desktop or Fabric Dataflows.',
    bullets: [
      'Automated reconciliation engine comparing Qlik source KPIs with target Power BI DAX results',
      'One-click export package with power-query.m, measures.dax, and migration-rulebook.md',
      'Direct deployment readiness for Power BI Desktop Advanced Editor and Fabric Dataflow Gen2'
    ],
    icon: 'CloudUpload',
    terminalTitle: 'Reconciliation Telemetry & Deployment Channel',
    terminalLines: [
      { label: 'KPI Value Comparison', status: 'PASS', mode: 'Δ = 0.00% Variance' },
      { label: 'Row Count Hash Check', status: 'PASS', mode: '12.8M Rows Match' },
      { label: 'Power BI Desktop Payload', status: 'PACKAGED', mode: '.m & .dax Bundled' },
      { label: 'Fabric Dataflow Export', status: 'READY', mode: 'Direct Gen2 Ingestion' }
    ],
    terminalSummary: 'Validation Complete: 100% blocking error gate passed. Migration bundle ready for production deployment.',
    bottomBadges: ['0.00% KPI Drift', 'Fabric Ready', 'Automated Rulebook']
  }
];

export const QLIK_FEATURE_ITEMS: QlikFeatureItem[] = [
  {
    id: 'set-analysis-translation',
    category: 'Set Analysis Translation',
    shortTag: 'DAX',
    title: 'Set Analysis Translation with Variable Expansion',
    description: 'Convert complex Qlik aggregation syntax into clean, maintainable DAX. Automatically resolve multi-level nested variable definitions and reconstruct Set Analysis filter modifiers into standard DAX CALCULATE statements.',
    highlightPoints: [
      'Translation of {<Field = {\'Value\'}>} set modifiers into explicit table-filtered boolean predicates',
      'Automatic detection of distinct counters (Count(distinct ...) → DISTINCTCOUNT())',
      'Dual execution modes: Instant local syntax transpiler or deep Gemini reasoning for obscure syntax'
    ],
    specs: [
      { label: 'SYNTAX COVERAGE', value: '99.4% Set Modifiers' },
      { label: 'COMPILER', value: 'Hybrid AST + Gemini AI' },
      { label: 'TARGET', value: 'Analysis Services / VertiPaq' }
    ],
    terminalTitle: 'Set Analysis to DAX Transpiler State',
    terminalLines: [
      { label: 'Qlik Expression Input', status: 'PARSED', mode: 'Sum({<Year={$(=Max(Year))}>} Sales)' },
      { label: 'Variable Expansion Pass', status: 'RESOLVED', mode: 'Max(Year) evaluated to 2026' },
      { label: 'DAX Equivalent Output', status: 'COMPILED', mode: 'CALCULATE(SUM(Sales[Amount]), ...)' },
      { label: 'Validation Check', status: 'PASS', mode: 'Exact Semantic Match' }
    ],
    securityNotice: 'No synthetic measure names or untyped measures permitted.'
  },
  {
    id: 'power-query-m-emitter',
    category: 'Power Query M Emitter',
    shortTag: 'ETL',
    title: 'High-Fidelity M Code Generation from Qlik ETL',
    description: 'Eliminate manual script rewriting and guesswork. The M emitter analyzes surviving data branches, maps connector definitions, buffers mapping tables for fast lookup, and builds typed, executable Power Query blocks ready for Power BI Desktop or Fabric Dataflows.',
    highlightPoints: [
      'Step-by-step lineage tracking from raw file/database connection to final model',
      'Deterministic step naming (Added_, Renamed_, Merged_, Typed_) matching Microsoft standards',
      'Automated calendar dimension synthesis when date temporal attributes are detected'
    ],
    specs: [
      { label: 'CODE OUTPUT', value: 'Microsoft Power Query M' },
      { label: 'OPTIMIZATION', value: 'Table.Buffer Mapping Tables' },
      { label: 'SCHEMA', value: 'Strict Type Coercion' }
    ],
    terminalTitle: 'Power Query M Code Generation Pipeline',
    terminalLines: [
      { label: 'Source Connection Block', status: 'GENERATED', mode: 'Sql.Database / OData / Csv' },
      { label: 'Mapping Table Lookup', status: 'OPTIMIZED', mode: 'Table.Buffer applied' },
      { label: 'Resident Load Pipeline', status: 'RECONSTRUCTED', mode: 'Merged Queries with Step Lineage' },
      { label: 'Table Schema Typing', status: 'ENFORCED', mode: 'Explicit Int64, Decimal, Text' }
    ],
    securityNotice: 'Generated M expressions adhere strictly to Power Query engine folding guidelines.'
  },
  {
    id: 'star-schema-reconstructor',
    category: 'Star-Schema Reconstructor',
    shortTag: 'MODEL',
    title: 'Data Model & Relationship Reconstruction',
    description: 'Deconstruct Qlik associative data models with multiple tables, circular loops, and synthetic tables into clean, performant Kimball star-schemas with explicit 1:N relationships.',
    highlightPoints: [
      'Automatic elimination of circular loops and synthetic table keys',
      'Clean segregation between Fact tables, Dimension tables, and Snowflaked hierarchies',
      'Referential integrity validation ensuring zero orphaned child records'
    ],
    specs: [
      { label: 'TOPOLOGY', value: 'Star-Schema (1:N)' },
      { label: 'SYNTHETIC KEYS', value: '100% Eliminated' },
      { label: 'CARDINALITY', value: 'Explicit Single Direction' }
    ],
    terminalTitle: 'Relational Topology Reconstruction State',
    terminalLines: [
      { label: 'Associative Graph Analysis', status: 'ANALYZED', mode: 'Circular loops detected: 0' },
      { label: 'Fact Boundary Classifier', status: 'VERIFIED', mode: 'Identified Grain: Transaction' },
      { label: 'Dimension Hierarchy Builder', status: 'RESOLVED', mode: 'De-normalized into Conformed Dims' },
      { label: 'Relationship Mapping', status: 'LOCKED', mode: 'Active Single Direction 1:N' }
    ],
    securityNotice: 'Eliminates memory spikes and bidirectional relationship ambiguity in Power BI VertiPaq.'
  },
  {
    id: 'variable-resolution-engine',
    category: 'Variable Resolution Engine',
    shortTag: 'VARS',
    title: 'Multi-Level Variable & Expression Decompiler',
    description: 'Traverse and de-reference deep nested Qlik variable chains. Distinguishes between configuration constants, parameterized dollar-sign expansions, and dynamic measure definitions.',
    highlightPoints: [
      'Recursive evaluation of $(=vExpression) dollar-sign expansion strings',
      'Classification of variables into Model Parameters, Base Measures, or DAX Variables',
      'Full dependency graph preventing circular variable definitions and orphan parameters'
    ],
    specs: [
      { label: 'DEPTH', value: 'Infinite Recursive Unrolling' },
      { label: 'DOLLAR EXPANSION', value: 'Full Evaluation Support' },
      { label: 'OUTPUT', value: 'DAX VAR Statements' }
    ],
    terminalTitle: 'Variable Dependency Decompiler State',
    terminalLines: [
      { label: 'Raw Variable Catalog', status: 'LOADED', mode: '142 Variables Cataloged' },
      { label: 'Recursive Expansion Loop', status: 'UNROLLED', mode: 'Depth: 5 Levels Resolved' },
      { label: 'Dynamic vs Static Triage', status: 'CLASSIFIED', mode: '94 Dynamic / 48 Static' },
      { label: 'Target Variable Binding', status: 'MAPPED', mode: 'Direct DAX VAR Context' }
    ],
    securityNotice: 'Prevents runtime calculation errors caused by unresolved macro tokens in DAX.'
  },
  {
    id: 'kpi-reconciliation-telemetry',
    category: 'KPI Reconciliation Telemetry',
    shortTag: 'AUDIT',
    title: 'Automated Accuracy & Reconciliation Benchmarking',
    description: 'Run side-by-side verification comparing Qlik calculations against converted Power BI measures. Validates aggregate values, sub-totals, and edge-case filter contexts.',
    highlightPoints: [
      'Automated sample query generation testing all slicer permutations',
      'Visual delta highlighting indicating exact percentage difference (tolerance < 0.01%)',
      'Audit log report generation documenting calculation parity for business stakeholders'
    ],
    specs: [
      { label: 'ACCURACY TARGET', value: '99.4% KPI Parity' },
      { label: 'TOLERANCE', value: '< 0.01% Numerical Delta' },
      { label: 'AUDIT FORMAT', value: 'Markdown + Excel Verification' }
    ],
    terminalTitle: 'KPI Parity Telemetry Console',
    terminalLines: [
      { label: 'Sales YTD Comparison', status: 'PASS', mode: 'Qlik: $14.2M · PBI: $14.2M (Δ 0.00%)' },
      { label: 'Distinct Customer Count', status: 'PASS', mode: 'Qlik: 12,481 · PBI: 12,481 (Δ 0.00%)' },
      { label: 'Gross Margin %', status: 'PASS', mode: 'Qlik: 32.4% · PBI: 32.4% (Δ 0.00%)' },
      { label: 'Edge-Case Slicer Test', status: 'PASS', mode: '100% Filter Permutations Match' }
    ],
    securityNotice: 'Cryptographically hashed comparison matrices ensure zero data leakage during audit.'
  },
  {
    id: 'fabric-dataflows-deployment',
    category: 'Fabric & Semantic Deployment',
    shortTag: 'FABRIC',
    title: 'Direct Deployment to Power BI Desktop & Fabric',
    description: 'Pack and dispatch verified migration code directly to Microsoft Fabric Lakehouse, Dataflow Gen2, or Power BI Desktop semantic models with one-click export tooling.',
    highlightPoints: [
      'Downloadable Power Query M files ready for Power BI Desktop Advanced Editor copy-paste',
      'Structured DAX measures file formatted with metadata folders and display categories',
      'Automated Rulebook Markdown documentation for enterprise knowledge transfer'
    ],
    specs: [
      { label: 'TARGET WORKSPACE', value: 'Power BI / Fabric Gen2' },
      { label: 'EXPORT BUNDLE', value: '.m, .dax, .md, .bim' },
      { label: 'DEPLOYMENT TIME', value: 'Instant Code Generation' }
    ],
    terminalTitle: 'Enterprise Deployment Hub State',
    terminalLines: [
      { label: 'Power Query M Package', status: 'BUNDLED', mode: 'power-query.m (Ready)' },
      { label: 'DAX Measures Catalog', status: 'BUNDLED', mode: 'measures.dax (Ready)' },
      { label: 'Migration Rulebook', status: 'BUNDLED', mode: 'rule-book.md (Generated)' },
      { label: 'Fabric Connection Check', status: 'ACTIVE', mode: 'Lakehouse & Dataflow Gen2' }
    ],
    securityNotice: 'Code generation complies with Microsoft Fabric security boundaries and tenant RBAC.'
  }
];

export const QLIK_EDITIONS_INFO: { workbench: QlikEdition; semantic: QlikEdition } = {
  workbench: {
    badge: 'AUTHORING & MIGRATION WORKBENCH',
    name: 'VTAB Migration Studio (Web App)',
    subtitle: 'Authoring & Migration Workbench',
    description: 'Capture business requirements, parse QVS ETL scripts, inspect table lineage graphs, and generate migration code in an interactive workbench. Built for BI Architects, Data Engineers, and Power BI Developers.',
    targetAudience: 'Built for BI Architects, Data Engineers, and Power BI Developers',
    highlights: [
      'Six-stage guided workflow (Requirement → Rule Book → AI Analysis → Power Query → DAX → Semantic Model)',
      'Drag-and-drop ingestion for .qvs, .csv, .tsv, and .txt script payloads',
      'Real-time conversion accuracy and stage completeness scoring',
      'Instant export to power-query.m, measures.dax, and rule-book.md'
    ],
    actionLabel: 'Launch Migration Studio →',
    consoleTitle: 'Local Workstation Execution — Active Project',
    consoleLines: [
      { label: 'Active Project:', value: 'Sales Performance Migration (Enterprise)', highlight: false },
      { label: 'Loaded Lineage:', value: '6 Final Tables · 3 Dropped Tables', highlight: true },
      { label: 'AI Engine:', value: 'Google Gemini 2.5 Flash + Local Regex Dual-Core', highlight: false },
      { label: 'Mode:', value: 'Full client-side parsing with secure serverless AI functions', highlight: true }
    ]
  },
  semantic: {
    badge: 'TARGET PLATFORM & SEMANTIC LAYER',
    name: 'Microsoft Power BI & Fabric Semantic Services',
    subtitle: 'Target Platform & Semantic Layer',
    description: 'Deploy verified Power Query M steps and DAX measures directly into star-schema semantic models with guaranteed referential integrity. Built for Analytics Leaders, Enterprise BI Teams, and Cloud Architects.',
    targetAudience: 'Built for Analytics Leaders, Enterprise BI Teams, and Cloud Architects',
    highlights: [
      'Clean separation of Fact tables, Dimension tables, and auto-generated Date/Calendar tables',
      'Direct compatibility with Power BI Desktop Advanced Editor and Fabric Dataflow Gen2',
      'Full referential relationship mapping with explicit cardinality controls (N:1, 1:1)',
      'Elimination of circular references and synthetic keys native to legacy associative models'
    ],
    actionLabel: 'Deploy to Fabric / Power BI ↗',
    consoleTitle: 'Cloud Services Endpoint — Fabric Lakehouse',
    consoleLines: [
      { label: 'Target Workspace:', value: 'Power BI Service / Fabric Lakehouse', highlight: false },
      { label: 'Model Schema:', value: 'Strict Star-Schema (Fact ── 1:N ── Dimensions)', highlight: true },
      { label: 'Validation Barrier:', value: '100% blocking error gate before deployment', highlight: false },
      { label: 'Engine Type:', value: 'Analysis Services / VertiPaq Columnar Store', highlight: true }
    ]
  }
};
