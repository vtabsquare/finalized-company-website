export interface HomeScapeWorkflowStep {
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

export interface HomeScapeFeatureItem {
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

export interface HomeScapeEdition {
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

export const HOMESCAPE_CONFIG = {
  name: 'HomeScape360 Modular Architecture Suite',
  shortName: 'HomeScape 360',
  topBadge: 'HOMESCAPE360 MODULAR ARCHITECTURE SUITE · V2.4.0 PRODUCTION',
  tagline: 'Engineered for the complete modular home building journey.',
  description: 'From interactive 3D spatial design and canvas-driven 2D layout planning to real-time dynamic BoQ pricing and automated CRM lead pipeline syncing, every step is optimized for instant customer conversion.',
  version: 'Enterprise Cloud · v2.4.0 PRODUCTION',
  categoryLabel: 'AI VISION & 3D ARCHITECTURAL COMPUTING',
  impactMetric: '60 FPS 3D Render · Sub-10ms BoQ Recalculation',
  techStack: ['React 18', 'Three.js / R3F', 'HTML5 Canvas & Konva', 'Zustand', 'Supabase PostgreSQL & RLS', 'Google reCAPTCHA v3', 'ExcelJS', 'Tailwind CSS']
};

export const HOMESCAPE_WORKFLOW_STEPS: HomeScapeWorkflowStep[] = [
  {
    step: '01',
    title: 'Configure & Visualize',
    subtitle: 'Interactive 3D spatial & 2D canvas designer',
    description: 'Client-side photorealistic 3D environment rendering paired with precision 2D interactive canvas floor planning across desktop, mobile, and showroom tablets.',
    bullets: [
      'WebGL-accelerated Three.js & React Three Fiber dynamic environment and modular home preview',
      'Interactive 2D floorplan editor powered by HTML5 Canvas & Konva with real-time zone and room layout',
      'Live configuration state driven by Zustand for sub-millisecond visual reactivity'
    ],
    icon: 'Box',
    terminalTitle: 'Pipeline Flow State — Real-Time Design & BoQ Pipeline',
    terminalLines: [
      { label: '3D Spatial Canvas (Three.js)', status: 'LIVE', mode: 'WebGL 2.0 60 FPS' },
      { label: '2D Architectural Planner (Konva)', status: 'LIVE', mode: 'Pixel-Perfect Grid Snap' },
      { label: 'Real-Time Pricing Matrix', status: 'LIVE', mode: 'Deterministic BoQ Linked' },
      { label: 'Supabase Edge & Lead Sync', status: 'LIVE', mode: 'RLS Shield Enforced' }
    ],
    terminalSummary: 'Input filter enabled: 100% of invalid room geometries and incomplete configurations sanitized before dispatch.',
    bottomBadges: ['WebGL 2.0 Accelerated', 'Cross-Device Responsive', 'Zero Latency State']
  },
  {
    step: '02',
    title: 'Cost & Calculate',
    subtitle: 'Dynamic BoQ engine & real-time cost estimator',
    description: 'Every architectural modification, elevation variant, room addition, and material finish instantly triggers line-item Bill of Quantities recalculation.',
    bullets: [
      'Granular parameter-level pricing engine tracking modules, upgrades, and finishes in real time',
      'Transparent cost breakdown mapping directly to room dimensions, fixtures, and add-ons',
      'Instant state propagation across Zustand stores without unnecessary DOM re-renders'
    ],
    icon: 'Calculator',
    terminalTitle: 'Dynamic BoQ Cost Computation Engine',
    terminalLines: [
      { label: 'Base Structure & Framing', status: 'CALCULATED', mode: 'Verified Unit Base Cost' },
      { label: 'Custom Bed & Bath Modules', status: 'CALCULATED', mode: 'Reactive Pricing Applied' },
      { label: 'Premium Kitchen & Finishes', status: 'CALCULATED', mode: 'Dynamic Matrix Linked' },
      { label: 'Live Estimate Total', status: 'SYNCHRONIZED', mode: 'Instant Reactive Store Update' }
    ],
    terminalSummary: 'BoQ State Verified: 100% deterministic pricing. Zero discrepancies between customer configuration and CRM quote records.',
    bottomBadges: ['Deterministic Pricing', 'Sub-10ms Calculation', 'Audit-Ready Breakdown']
  },
  {
    step: '03',
    title: 'Protect & Verify',
    subtitle: 'Google reCAPTCHA v3 & Supabase RLS security gate',
    description: 'Frictionless behavioral verification, strict Zod schema validation, and database-level Row Level Security (RLS) policies defend your quote pipeline from malicious abuse.',
    bullets: [
      'Frictionless Google reCAPTCHA v3 behavioral verification eliminating bot spam without disruptive challenges',
      'Strict Zod schema enforcement across client forms and server edge functions',
      'PostgreSQL Row Level Security (RLS) policies ensuring complete data isolation and customer privacy'
    ],
    icon: 'ShieldCheck',
    terminalTitle: 'Zero-Trust Submission Gateway',
    terminalLines: [
      { label: 'reCAPTCHA v3 Behavioral Score', status: 'PASS', mode: 'Human Score > 0.9' },
      { label: 'Zod Configuration Schema', status: 'PASS', mode: 'Strict Type-Safe Validation' },
      { label: 'PostgreSQL Row Level Security', status: 'ENFORCED', mode: 'Client Context Bound' },
      { label: 'Anti-Abuse Rate Limiter', status: 'ACTIVE', mode: 'Per-IP Token Bucket Guard' }
    ],
    terminalSummary: 'Security Approved: 100% of untrusted payloads and automated bot spam rejected before database persistence.',
    bottomBadges: ['reCAPTCHA v3', 'Zod Validated', 'Row Level Security (RLS)']
  },
  {
    step: '04',
    title: 'Capture & Convert',
    subtitle: 'Admin CRM orchestration & Excel lead export',
    description: 'Equip sales directors and project managers with centralized lead qualification, multi-criteria filtering, and prototype-pollution-free Excel spreadsheet generation.',
    bullets: [
      'Secure in-memory workbook serialization with automated column auto-sizing and timestamped outputs',
      'Instant lead search, multi-criteria filtering, and one-click bulk email distribution',
      'Real-time synchronization with Supabase backend for instant status tracking and conversion metrics'
    ],
    icon: 'FileSpreadsheet',
    terminalTitle: 'Admin Lead Intelligence & Distribution Mesh',
    terminalLines: [
      { label: 'Lead Ingestion Channel', status: 'COMMITTED', mode: 'Config Snapshot Persisted' },
      { label: 'Sales Notification Gateway', status: 'DISPATCHED', mode: 'Instant Email & Webhook Sync' },
      { label: 'ExcelJS Secure Engine', status: 'READY', mode: 'In-Memory XLSX Generation' },
      { label: 'Conversion Telemetry Feed', status: 'STREAMING', mode: 'Real-Time Pipeline Analytics' }
    ],
    terminalSummary: 'Lead #3891 ingested with full 3D spatial snapshot and dynamic BoQ specification.',
    bottomBadges: ['Supabase Realtime', 'ExcelJS Secure Sandbox', 'One-Click CRM Export']
  }
];

export const HOMESCAPE_FEATURE_ITEMS: HomeScapeFeatureItem[] = [
  {
    id: '3d-spatial-configurator',
    category: '3D Spatial Configurator',
    shortTag: 'VISUALIZE',
    title: 'High-Fidelity 3D Home Customization',
    description: 'Enable prospective homeowners to customize architectural models, elevations, room layouts, and exterior finishes with instant visual feedback and zero client stutter.',
    highlightPoints: [
      'Real-time lighting, materials, and environment simulation via Three.js & Drei',
      'Instant recalculation of dimensions, floor areas, and add-on module footprints',
      'Unified reactive synchronization between 3D view, 2D floor plans, and bill of quantities'
    ],
    specs: [
      { label: 'GRAPHICS ENGINE', value: 'Three.js / React Three Fiber' },
      { label: 'FRAME RATE', value: '60 FPS WebGL 2.0' },
      { label: 'SHADING', value: 'Physically Based (PBR)' }
    ],
    terminalTitle: 'Spatial 3D Rendering Mesh Telemetry',
    terminalLines: [
      { label: 'Three.js / R3F Rendering Mesh', status: 'LIVE', mode: '60 FPS WebGL' },
      { label: 'Konva 2D Floorplan Canvas', status: 'LIVE', mode: 'Pixel-Perfect Alignment' },
      { label: 'Real-Time Cost & BoQ Calculation', status: 'LIVE', mode: 'Instant Reactive Matrix' },
      { label: 'Supabase PostgreSQL & Auth Engine', status: 'LIVE', mode: 'RLS Shield Active' }
    ],
    securityNotice: 'reCAPTCHA v3 bot protection and prototype-pollution-free ExcelJS pipelines active.'
  },
  {
    id: '2d-interactive-floor-planner',
    category: '2D Interactive Floor Planner',
    shortTag: 'PLANNER',
    title: 'Precision 2D Canvas Architectural Planning',
    description: 'Interactive HTML5 Canvas and Konva floorplan editor allowing buyers to drag, snap, resize, and configure rooms with millimeter accuracy and immediate structural feedback.',
    highlightPoints: [
      'Sub-pixel magnetic snapping and grid alignment for rooms, walls, and doorways',
      'Live square footage and circulation area calculation updated during user interaction',
      'Instant 2D-to-3D projection synchronization keeping elevation models in exact parity'
    ],
    specs: [
      { label: 'CANVAS ENGINE', value: 'HTML5 Canvas & Konva.js' },
      { label: 'PRECISION', value: 'Millimeter Scale Snapping' },
      { label: 'SYNC SPEED', value: '< 5ms Zustand Bus' }
    ],
    terminalTitle: '2D Architectural Planner State',
    terminalLines: [
      { label: 'Canvas Rendering Loop', status: 'OPTIMAL', mode: 'Hardware Accelerated' },
      { label: 'Room Polygon Boundary Solver', status: 'ACTIVE', mode: 'Non-Overlapping Constraint' },
      { label: 'Dimension Annotator', status: 'LOCKED', mode: 'Live Linear Measurement' },
      { label: 'State Projection Transformer', status: 'SYNCHRONIZED', mode: '2D ➔ 3D Model Coordinates' }
    ],
    securityNotice: 'Client-side geometric bounds sanitization prevents self-intersecting polygon exploits.'
  },
  {
    id: 'dynamic-boq-costing',
    category: 'Dynamic BoQ Costing',
    shortTag: 'COSTING',
    title: 'Deterministic BoQ Pricing & Cost Engine',
    description: 'Eliminate sticker shock and estimation lag. Every bedroom, bathroom, kitchen tier, and modular add-on selected by the homebuyer triggers an instant recalculation across the pricing matrix.',
    highlightPoints: [
      'Granular parameter-level pricing engine tracking modules, upgrades, and finishes in real time',
      'Transparent cost breakdown mapping directly to room dimensions, fixtures, and add-ons',
      'Instant state propagation across Zustand stores without unnecessary DOM re-renders'
    ],
    specs: [
      { label: 'CALC SPEED', value: '< 10ms Recalculation' },
      { label: 'ACCURACY', value: '100% Deterministic' },
      { label: 'DATA BUS', value: 'Zustand Reactive Store' }
    ],
    terminalTitle: 'Active Configuration & Pricing Mesh',
    terminalLines: [
      { label: 'Base Structure & Framing', status: 'CALCULATED', mode: 'Unit Base Cost Applied' },
      { label: 'Custom Bed & Bath Modules', status: 'CALCULATED', mode: 'Matrix Dimensional Factor' },
      { label: 'Premium Kitchen & Finishes', status: 'CALCULATED', mode: 'Dynamic SKU Link' },
      { label: 'Live Estimate Total', status: 'SYNCHRONIZED', mode: 'Zero Estimation Drift' }
    ],
    securityNotice: 'Server-side price verification guarantees submitted quotes match official price lists.'
  },
  {
    id: 'automated-lead-capture',
    category: 'Automated Lead Capture',
    shortTag: 'LEADS',
    title: 'Zero-Friction Lead Capture & Qualification',
    description: 'Transform casual home design exploration into qualified builder inquiries. Automatically captures client preferences, saved floorplans, and estimated budgets into high-converting lead dossiers.',
    highlightPoints: [
      'Full architectural snapshot bundling 3D render, 2D floorplan JSON, and BoQ breakdown',
      'Silent Google reCAPTCHA v3 bot protection with zero annoying visual puzzles',
      'Automated customer confirmation email with PDF project brochure download link'
    ],
    specs: [
      { label: 'BOT DEFENSE', value: 'Google reCAPTCHA v3' },
      { label: 'SCHEMA CHECK', value: 'Zod Strict Typing' },
      { label: 'ATTACHMENT', value: 'jsPDF Automated Brochure' }
    ],
    terminalTitle: 'Lead Ingestion Gateway Telemetry',
    terminalLines: [
      { label: 'Submission Ingestion Queue', status: 'PROCESSING', mode: 'Multi-Tenant Edge Worker' },
      { label: 'Behavioral Bot Verifier', status: 'CLEARED', mode: 'reCAPTCHA v3 Score: 0.98' },
      { label: 'Zod Payload Sanitizer', status: 'VALIDATED', mode: 'Zero Malformed Attributes' },
      { label: 'PDF Brochure Compiler', status: 'READY', mode: 'jsPDF Vector Floorplan' }
    ],
    securityNotice: 'Complete PII protection with strict data governance and GDPR/CCPA compliance.'
  },
  {
    id: 'admin-lead-intelligence',
    category: 'Admin Lead Intelligence',
    shortTag: 'ADMIN',
    title: 'Centralized Sales Intelligence & CRM Hub',
    description: 'Equip sales managers and residential developers with an interactive control tower. Inspect lead configurations, prioritize high-value prospects, and review conversion analytics in real time.',
    highlightPoints: [
      'Interactive lead table with multi-parameter search, status tags, and timeline tracking',
      'Visual configuration inspector loading the exact 3D model and 2D floorplan designed by the buyer',
      'Integrated email outreach and follow-up logging connected to your team workflow'
    ],
    specs: [
      { label: 'DATABASE', value: 'Supabase PostgreSQL 15+' },
      { label: 'PERMISSIONS', value: 'Role-Based Access (RLS)' },
      { label: 'SYNC', value: 'Supabase Realtime Websockets' }
    ],
    terminalTitle: 'Admin Operations Control Tower',
    terminalLines: [
      { label: 'PostgreSQL Realtime Channel', status: 'CONNECTED', mode: 'Instant Lead Notification' },
      { label: 'Configuration Viewer Modal', status: 'MOUNTED', mode: 'WebGL Client Recreation' },
      { label: 'Lead Scoring Algorithm', status: 'ACTIVE', mode: 'Budget & Timeline Weighted' },
      { label: 'Audit Trail Journal', status: 'RECORDING', mode: 'Immutable Operator Actions' }
    ],
    securityNotice: 'Protected by Supabase Row Level Security with enterprise RBAC enforcement.'
  },
  {
    id: 'secure-enterprise-export',
    category: 'Secure Enterprise Export',
    shortTag: 'EXPORT',
    title: 'Prototype-Safe Excel & Financial Export',
    description: 'Export structured lead registries, line-item BoQ breakdowns, and executive summaries to Microsoft Excel (.xlsx) using an enterprise-grade ExcelJS engine with zero prototype pollution vulnerabilities.',
    highlightPoints: [
      'Secure in-memory workbook serialization with automated column auto-sizing and styling',
      'Sanitized formulas and values preventing CSV/Excel injection vulnerabilities',
      'One-click synchronization with enterprise ERP and CRM systems'
    ],
    specs: [
      { label: 'EXCEL ENGINE', value: 'ExcelJS Secure Stream' },
      { label: 'FORMAT', value: 'Microsoft OpenXML (.xlsx)' },
      { label: 'SAFETY', value: 'Zero Prototype Pollution' }
    ],
    terminalTitle: 'Enterprise Export Engine State',
    terminalLines: [
      { label: 'Workbook Builder Stream', status: 'READY', mode: 'In-Memory Buffer Assembly' },
      { label: 'Formula Injection Sanitizer', status: 'ENFORCED', mode: 'Leading-Char Neutralization' },
      { label: 'Column Auto-Fit Computer', status: 'ACTIVE', mode: 'Dynamic Cell Padding' },
      { label: 'Binary Dispatch Pipeline', status: 'STREAMING', mode: 'Safe Client Download Handshake' }
    ],
    securityNotice: 'Audited against CVE-level prototype pollution and formula injection vectors.'
  }
];

export const HOMESCAPE_EDITIONS_INFO: { configurator: HomeScapeEdition; admin: HomeScapeEdition } = {
  configurator: {
    badge: 'INTERACTIVE CLIENT APPLICATION',
    name: 'HomeScape360 Configurator & Design Suite',
    subtitle: 'Interactive Home Customization Experience',
    description: 'Explore, customize, and price dream modular homes through a photorealistic 3D and 2D canvas interface. Built for prospective buyers, showroom kiosks, and field sales consultants.',
    targetAudience: 'Built for Prospective Homebuyers, Showroom Sales Kiosks, and Architectural Designers',
    highlights: [
      'Instant modular home customization across layout, dimensions, materials, and styles',
      'Real-time dynamic quotation updates with transparent line-item BoQ breakdowns',
      'Fluid motion transitions and accessible controls powered by Tailwind CSS & Framer Motion',
      'Automated PDF brochure and floorplan export via jsPDF'
    ],
    actionLabel: 'Launch 3D Configurator →',
    consoleTitle: 'Client Runtime State — WebGL 2.0 Canvas',
    consoleLines: [
      { label: 'Rendering Target:', value: 'Vite + React 18 + SWC', highlight: false },
      { label: 'Spatial Engine:', value: 'Three.js & React Three Fiber (WebGL 2.0)', highlight: true },
      { label: 'Canvas Framework:', value: 'Konva HTML5 Canvas (60 FPS)', highlight: false },
      { label: 'Build Architecture:', value: 'Tree-shaken bundle with strict TypeScript validation', highlight: true }
    ]
  },
  admin: {
    badge: 'CLOUD ENGINE & ADMINISTRATIVE SUITE',
    name: 'HomeScape360 Sales Intelligence & Operations Hub',
    subtitle: 'Centralized Builder CRM & Lead Analytics',
    description: 'Review incoming modular home leads, analyze customer configuration preferences, and coordinate client outreach with secure administrative controls. Built for Sales Managers, Operations Leads, and Executives.',
    targetAudience: 'Built for Modular Home Builders, Sales Directors, and Construction Operations Leads',
    highlights: [
      'Centralized lead intake pipeline with rich configuration snapshots and contact details',
      'Role-based admin authentication and encrypted session management',
      'Bulk email broadcasting engine directly connected to lead segments',
      'One-click export to Excel (.xlsx) for seamless CRM and ERP ingestion'
    ],
    actionLabel: 'Open Admin Portal ↗',
    consoleTitle: 'Cloud Services Endpoint — Supabase PostgreSQL',
    consoleLines: [
      { label: 'Backend Infrastructure:', value: 'Supabase Cloud (PostgreSQL 15+)', highlight: false },
      { label: 'Container Platform:', value: 'Multi-stage Docker with Nginx Alpine proxy', highlight: true },
      { label: 'Security CI Gate:', value: 'Automated dependency enforcement at build time', highlight: false },
      { label: 'Data Pipeline:', value: 'Secure ExcelJS workbook generation (Zero Pollution)', highlight: true }
    ]
  }
};
