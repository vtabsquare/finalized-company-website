import type { FeatureItem, DashboardData, WorkflowStep, EditionInfo } from '../typesReporting';

export const SITE_CONFIG = {
  name: 'VTAB Reporting Studio',
  shortName: 'VTAB Studio',
  tagline: 'Transform data into clear decisions.',
  description: 'VTAB Reporting Studio — an integrated environment for data modelling, analytics, and interactive business reporting.',
  version: 'Windows Desktop · v5.0.22',
  categoryLabel: 'BUSINESS INTELLIGENCE AND REPORTING',
  downloadUrl: '#download',
  demoUrl: '#demo',
  systemRequirements: 'Windows 10/11 x64 · 8 GB RAM (16 GB recommended) · 2.4 GHz Quad-Core or higher · DirectX 11+',
  releaseDate: 'October 2026',
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: '01',
    title: 'Connect & Ingest',
    subtitle: 'Universal data source federation',
    description: 'Direct queries, high-performance in-memory caching, and native enterprise connector mesh across 100+ platforms.',
    bullets: [
      'PostgreSQL, SQL Server, Snowflake, BigQuery, Databricks',
      'Parquet, Delta Lake, REST APIs, Excel & CSV streaming',
      'Encrypted transit with zero-copy live query passthrough'
    ],
    icon: 'Database',
  },
  {
    step: '02',
    title: 'Model & Relate',
    subtitle: 'Visual semantic diagramming',
    description: 'Design robust star and snowflake schemas with drag-and-drop cardinalities, role-playing dimensions, and automatic relationship detection.',
    bullets: [
      'Bidirectional cross-filtering and active/inactive pathways',
      'Composite models pairing direct-lake and imported entities',
      'Automated referential integrity validation'
    ],
    icon: 'GitFork',
  },
  {
    step: '03',
    title: 'Calculate & Measure',
    subtitle: 'VTAB Measure Vector Engine',
    description: 'Blazing fast vectorized evaluation of analytical DAX and calculation expressions compiled directly to machine code.',
    bullets: [
      'Sub-millisecond aggregation on multi-million row partitions',
      'Time-intelligence presets: YTD, Rolling 12M, Same Period Last Year',
      'Interactive syntax highlighter, auto-completion, and linter'
    ],
    icon: 'Cpu',
  },
  {
    step: '04',
    title: 'Publish & Distribute',
    subtitle: 'Desktop to Web Reporting Services',
    description: 'One-click publishing from local desktop directly to secure web workspaces with scheduled data refresh and embed tokens.',
    bullets: [
      'Role-based row level security (RLS) enforcement',
      'Automated PDF, PowerPoint, and Excel report bursting',
      'Responsive web portal optimized for desktop and mobile clients'
    ],
    icon: 'Share2',
  },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: 'connectivity',
    category: 'Data Connectivity',
    shortTag: 'CONNECT',
    title: 'High-Throughput Enterprise Ingestion',
    description: 'Connect seamlessly to on-premise relational databases, cloud data warehouses, and object storage lakes with zero data movement constraints.',
    highlightPoints: [
      'Over 120 verified enterprise data connectors',
      'Live DirectQuery with query folding acceleration',
      'Configurable incremental refresh policies and partition slicing'
    ],
    specs: [
      { label: 'Protocols', value: 'ODBC, JDBC, REST, OData' },
      { label: 'Throughput', value: 'Up to 4.2M rows/sec' },
      { label: 'Security', value: 'TLS 1.3 · Kerberos · OAuth 2.0' }
    ],
    previewType: 'connectors',
  },
  {
    id: 'transformation',
    category: 'Data Transformation',
    shortTag: 'TRANSFORM',
    title: 'Visual ETL & Data Shaping Canvas',
    description: 'Clean, pivot, unpivot, filter, and enrich disparate tables with intuitive step-by-step visual recipes backed by an expressive formula pipeline.',
    highlightPoints: [
      'Reversible, non-destructive step graph with visual diffing',
      'Automated schema type inference and anomaly detection',
      'Merge, append, fuzzy lookup, and geometric spatial transformations'
    ],
    specs: [
      { label: 'Engine', value: 'VTAB Pipeline Core v5' },
      { label: 'Memory Footprint', value: 'Zero-copy streaming' },
      { label: 'Undo Levels', value: 'Infinite step rollback' }
    ],
    previewType: 'transform',
  },
  {
    id: 'modelling',
    category: 'Semantic Modelling',
    shortTag: 'MODEL',
    title: 'High-Density Relational Schema Graph',
    description: 'Build enterprise-grade semantic layers with clear 1:N and N:M cardinality maps, display folders, hierarchies, and security roles.',
    highlightPoints: [
      'Multi-source hybrid relationships with visual bridge tables',
      'Calculation groups for currency and unit normalization',
      'Row-level security (RLS) and object-level security (OLS)'
    ],
    specs: [
      { label: 'Cardinalities', value: '1:1, 1:*, *:*, Inactive' },
      { label: 'Hierarchies', value: 'Multi-level drill paths' },
      { label: 'Format', value: 'Open TMDL & BIM compliant' }
    ],
    previewType: 'model',
  },
  {
    id: 'engine',
    category: 'VTAB Measure Engine',
    shortTag: 'CALCULATE',
    title: 'Vectorized Columnar Analytical Engine',
    description: 'Harness in-memory columnar compression and AVX-512 vectorization to compute complex metrics and window aggregations at instant speeds.',
    highlightPoints: [
      'Context transition and filter context matrix inspect tool',
      'Over 350 native statistical and time-series functions',
      'Live query execution plan tree and execution cost profiler'
    ],
    specs: [
      { label: 'Compiler', value: 'JIT Vectorized C++' },
      { label: 'Compression', value: 'Dictionary + RLE Run-length' },
      { label: 'Latency', value: '< 14ms typical cold query' }
    ],
    previewType: 'engine',
  },
  {
    id: 'dashboards',
    category: 'Interactive Dashboards',
    shortTag: 'VISUALIZE',
    title: 'Precision Pixel Canvas & Coordinated Filtering',
    description: 'Compose publication-grade interactive layouts with responsive grid snapping, cross-highlighting, micro-charts, and interactive tooltip cards.',
    highlightPoints: [
      '60 FPS cross-filtering across all visual cards simultaneously',
      'Custom visual plugin architecture with WebGL acceleration',
      'Dynamic bookmarks, drill-through pages, and navigation ribbons'
    ],
    specs: [
      { label: 'Rendering', value: 'Hardware-accelerated Canvas/SVG' },
      { label: 'Layout Grid', value: '12-column sub-pixel fluid' },
      { label: 'Interactivity', value: 'Hover, lasso, cross-brush' }
    ],
    previewType: 'dashboard',
  },
  {
    id: 'reporting',
    category: 'Advanced Reporting',
    shortTag: 'PUBLISH',
    title: 'Paginated Pixel-Perfect Document Engine',
    description: 'Design multi-page operational statements, invoices, and executive briefing dossiers with exact printable margins, headers, and pagination rules.',
    highlightPoints: [
      'Page break controls with repeating headers across boundaries',
      'Sub-reports, hierarchical tablix grids, and barcode rendering',
      'Export to Vector PDF, Excel XLSX, Word DOCX, and TIFF'
    ],
    specs: [
      { label: 'Print Standard', value: 'A4, Letter, Legal, Tabloid' },
      { label: 'DPI Resolution', value: '300 / 600 DPI vector output' },
      { label: 'Bursting', value: 'Multi-recipient tokenized distribution' }
    ],
    previewType: 'paginated',
  },
];

export const DASHBOARD_GALLERY: DashboardData[] = [
  {
    id: 'retail-performance-analysis',
    title: 'Retail Performance Analysis',
    subtitle: 'Store performance, revenue velocity, category margins, and India geographic insights',
    timeframe: 'Live Production Model',
    reportType: 'Interactive BI Report',
    keyDimensions: ['Store Region', 'Product Category', 'Payment Mode', 'Fulfillment'],
    metrics: [
      { label: 'Total Sales Revenue', value: '₹142.8M', change: '+22.4%', trend: 'up', subtext: 'Annualized run-rate' },
      { label: 'Store Footfall', value: '1.24M', change: '+14.6%', trend: 'up', subtext: 'Pan-India footprint' },
      { label: 'Avg Order Value', value: '₹3,450', change: '+8.2%', trend: 'up', subtext: 'Omnichannel baskets' },
      { label: 'Operating Margin', value: '26.8%', change: '+3.1%', trend: 'up', subtext: 'Above plan target' }
    ],
    embedUrl: 'https://reportservices.vtabsquare.com/?workspace=1&report=8682b28d-7505-4fcf-a377-3df8664f6369&embed=1',
    isLiveEmbed: true,
    badge: 'LIVE EMBED'
  },
  {
    id: 'sales-analytics',
    title: 'Sales Analytics',
    subtitle: 'Global revenue velocity, quota attainment, and regional pipeline conversion',
    timeframe: 'Current Quarter (Q4 2026)',
    reportType: 'Executive Scorecard',
    keyDimensions: ['Channel', 'Territory', 'Account Tier', 'Product Family'],
    metrics: [
      { label: 'Total Revenue', value: '$48.2M', change: '+18.4%', trend: 'up', subtext: 'vs $40.7M prior Q4' },
      { label: 'Win Rate', value: '34.8%', change: '+3.2%', trend: 'up', subtext: 'Enterprise cohort' },
      { label: 'Quota Attainment', value: '106.2%', change: '+6.2%', trend: 'up', subtext: '38 of 42 reps above plan' },
      { label: 'Avg Deal Size', value: '$142.5K', change: '+8.1%', trend: 'up', subtext: 'Multi-year commitments' }
    ],
  },
  {
    id: 'financial-analytics',
    title: 'Financial Analytics',
    subtitle: 'EBITDA margin reconciliation, operating cash flow, and cost variance waterfalls',
    timeframe: 'YTD Fiscal 2026',
    reportType: 'CFO Dossier',
    keyDimensions: ['Cost Center', 'Department', 'GL Account', 'Entity'],
    metrics: [
      { label: 'Operating Margin', value: '28.4%', change: '+2.1%', trend: 'up', subtext: 'EBITDA expansion' },
      { label: 'Free Cash Flow', value: '$19.6M', change: '+14.2%', trend: 'up', subtext: '94% conversion efficiency' },
      { label: 'Opex Variance', value: '-$1.8M', change: '-4.2%', trend: 'up', subtext: 'Under budget limit' },
      { label: 'Rule of 40', value: '54.6%', change: '+5.0%', trend: 'up', subtext: 'Top quartile tier' }
    ],
  },
  {
    id: 'geographic-intelligence',
    title: 'Geographic Intelligence',
    subtitle: 'Spatial distribution, territory penetration density, and logistics transit nodes',
    timeframe: 'Trailing 12 Months',
    reportType: 'Territory Map',
    keyDimensions: ['Region', 'Hub Lat/Lng', 'Fulfillment Zone', 'Radius'],
    metrics: [
      { label: 'Active Hubs', value: '184', change: '+22', trend: 'up', subtext: 'Across 34 countries' },
      { label: 'Mean Transit Time', value: '1.4d', change: '-0.3d', trend: 'up', subtext: 'Last-mile reduction' },
      { label: 'Regional Coverage', value: '94.2%', change: '+5.1%', trend: 'up', subtext: 'Addressable market' },
      { label: 'On-Time Delivery', value: '99.1%', change: '+0.4%', trend: 'up', subtext: 'SLA threshold 98.5%' }
    ],
  },
  {
    id: 'healthcare-reporting',
    title: 'Healthcare Reporting',
    subtitle: 'Clinical outcomes, patient census, bed occupancy, and departmental turnaround',
    timeframe: 'Last 30 Days (Rolling)',
    reportType: 'Clinical Operations',
    keyDimensions: ['Service Line', 'Acuity Level', 'Facility Wing', 'Specialty'],
    metrics: [
      { label: 'Patient Census', value: '4,120', change: '+1.8%', trend: 'neutral', subtext: 'Total admissions' },
      { label: 'Bed Occupancy', value: '82.4%', change: '-1.2%', trend: 'up', subtext: 'Safe operating band' },
      { label: 'Mean Length of Stay', value: '3.6d', change: '-0.4d', trend: 'up', subtext: 'Target 3.8 days' },
      { label: 'Readmission Rate', value: '4.8%', change: '-0.9%', trend: 'up', subtext: 'Benchmarked national: 6.2%' }
    ],
  },
];

export const EDITIONS_INFO: { desktop: EditionInfo; services: EditionInfo } = {
  desktop: {
    name: 'VTAB Reporting Studio Desktop',
    badge: 'AUTHORING ENVIRONMENT',
    description: 'Design professional analytical reports with VTAB Reporting Studio. A standalone desktop suite with raw power, local compilation, and offline modeling.',
    targetAudience: 'Built for BI analysts, data engineers, and report architects',
    highlights: [
      'Local vectorized memory engine capable of parsing gigabyte datasets offline',
      'Advanced semantic schema designer with custom measure authoring',
      'Full visual flexibility with pixel-perfect paginated report formatting',
      'Direct file saving in version-controlled JSON / TMDL project format'
    ],
    actionLabel: 'Download Desktop Edition'
  },
  services: {
    name: 'VTAB Reporting Services',
    badge: 'COLLABORATIVE CLOUD & SERVER',
    description: 'Explore published reports through a browser-based reporting experience. Distribute live insights, collaborate securely, and automate schedules.',
    targetAudience: 'Built for business leaders, executive stakeholders, and mobile teams',
    highlights: [
      'Interactive drill-through and bookmark sharing in modern web browsers',
      'Automated scheduled data refreshes and gateway synchronizations',
      'Enterprise role-based access control and tenant isolation',
      'Embedded analytics SDK for SaaS and portal integration'
    ],
    actionLabel: 'Explore Reporting Services'
  }
};
