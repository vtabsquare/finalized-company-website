// BuildSmart 360 Civil Estimator Data
// Structured strictly according to the VTAB Reporting Tool presentation format

export interface PipelineStage {
  id: string;
  stageNumber: string;
  stageTag: string;
  stageHeadline: string;
  stageDescription: string;
  bullets: string[];
  bottomBadges: string[];
  activeNode: string;
  streamStates: { name: string; status: string; detail?: string }[];
  filterStatus?: string;
}

export interface FeatureCapability {
  id: string;
  name: string;
  shortName: string;
  categoryTag: string;
  headline: string;
  description: string;
  bullets: string[];
  specs: { label: string; value: string }[];
  tagColor: string;
}

export interface ArchitectureLayer {
  layerNumber: string;
  sectionTag: string;
  headline: string;
  description: string;
  bullets: string[];
  tags: string[];
  rightBoxTitle: string;
  rightBoxSubtitle: string;
  rightBoxItems: { label: string; status: string; detail?: string }[];
}

export interface DeploymentEdition {
  tier: string;
  cardTag: string;
  title: string;
  subtitle: string;
  badge?: string;
  bullets: string[];
  primaryCtaText: string;
  specs: { label: string; value: string }[];
  consoleTitle: string;
  consoleItems: { label: string; value: string }[];
}

export const buildsmartEstimatorHero = {
  badge: "BUILDSMART 360 CIVIL ESTIMATOR SUITE · V2.4.1 ENTERPRISE",
  title: "BuildSmart 360 Civil Estimator",
  eyebrow: "END-TO-END CIVIL ESTIMATION ARCHITECTURE",
  headline: "Engineered for the complete construction estimation journey.",
  description: "From raw multi-floor architectural dimensional ingestion to dynamic regional rate resolution, multi-tier BOQ synthesis, and automated audit-ready PDF quotation dispatch, every step is optimized for zero-slippage contracting.",
  primaryAction: "Schedule Technical Demo",
  secondaryAction: "Explore Capabilities",
  tags: ["REST API", "JSON Schema", "Brevo SMTP", "PostgREST", "ReportLab", "Gemini 1.5 Flash"],
  metrics: [
    { label: "BOQ Generation", value: "Sub-Second" },
    { label: "Rate Master Sync", value: "Real-Time" },
    { label: "Structural Compliance", value: "IS 456" }
  ],
  mediaImage: "/media/buildsmart-estimator-console.png"
};

export const buildsmartPipelineStages: PipelineStage[] = [
  {
    id: "ingest-parameterize",
    stageNumber: "01",
    stageTag: "STAGE 01 OF 04 · Architectural & Dimensional Parameter Ingestion",
    stageHeadline: "Ingest & Parameterize",
    stageDescription: "Multi-floor dimensional parsing, room-by-room MEP fixture cataloging, and structural zoning across residential, commercial, and turnkey construction projects.",
    bullets: [
      "Multi-floor built-up area aggregation, staircase & portico calculations, and plot open-area analysis",
      "Room-by-room MEP quantification (light points, switch boards, sanitary inlets, geyser points, and HVAC conduits)",
      "Turnkey quality tier selection (Base ₹2,100, Standard ₹2,400, Premium ₹2,600, Luxury ₹2,800 per sq.ft)"
    ],
    bottomBadges: ["IS 456 Structural Compliant", "Real-Time Vector & Dimensional Calculation"],
    activeNode: "Structural Quantity & Rate Harvester",
    streamStates: [
      { name: "City Rate Master (Erode, Chennai, Coimbatore, Default)", status: "LIVE" },
      { name: "Civil & Structural Material Registry", status: "LIVE" },
      { name: "MEP & Electrical Fixture Matrix", status: "LIVE" },
      { name: "Architectural Add-Ons & Package Inclusions Engine", status: "LIVE" }
    ],
    filterStatus: "Estimation Precision Filter: 100% mathematical consistency with zero contractor discrepancy."
  },
  {
    id: "index-resolve",
    stageNumber: "02",
    stageTag: "STAGE 02 OF 04 · City-Tier Localized Material Rate & Master Matrix",
    stageHeadline: "Index & Resolve",
    stageDescription: "Dynamic district material indexation matching cement brands, TMT rebar grades, M-sand quality, and coarse aggregates against live municipal market rates.",
    bullets: [
      "Live city-tier pricing feeds spanning Erode, Chennai, Coimbatore, and regional Tamil Nadu clusters",
      "Dynamic grade weighting for UltraTech, Dalmia, Tata Tiscon, JSW Steel, and local quarry aggregators",
      "Parametric escalation protection buffering against volatile steel and cement spot-price spikes"
    ],
    bottomBadges: ["Dynamic District Rates", "Zero Price Drift Buffer"],
    activeNode: "Municipal Rate Resolution Broker",
    streamStates: [
      { name: "UltraTech & Dalmia Cement Indices", status: "LIVE" },
      { name: "Tata Tiscon Fe550D Rebar Registry", status: "LIVE" },
      { name: "M-Sand & P-Sand Quarry Price Feed", status: "LIVE" },
      { name: "Dynamic Tax & Transportation Engine", status: "LIVE" }
    ],
    filterStatus: "Market Rate Validation: Strict regional price bounding active."
  },
  {
    id: "synthesize-quantify",
    stageNumber: "03",
    stageTag: "STAGE 03 OF 04 · Dynamic BOQ Calculation & Structural Civil Engine",
    stageHeadline: "Synthesize & Quantify",
    stageDescription: "High-precision structural volume calculation transforming architectural floorplans into itemized Bill of Quantities with IS code reinforcement ratios.",
    bullets: [
      "IS code-calibrated consumption metrics (0.40 bags cement/sq.ft, 4.0 kg TMT steel/sq.ft)",
      "Coarse aggregate zoning separating 40mm PCC/footings, 20mm RCC slabs/columns, and 12mm lintels",
      "Automated boundary calculations computing ground coverage, carpet area, and open setbacks"
    ],
    bottomBadges: ["IS Code Ratio Enforced", "Sub-Millisecond Math"],
    activeNode: "Dynamic BOQ Synthesizer",
    streamStates: [
      { name: "Structural Concrete Mix Engine (M20/M25)", status: "LIVE" },
      { name: "Reinforcement Steel Tonnage Calculator", status: "LIVE" },
      { name: "Masonry & Plastering Mortar Matrix", status: "LIVE" },
      { name: "Finishing & Architectural Add-on Bus", status: "LIVE" }
    ],
    filterStatus: "Zero-Slippage Math: Deterministic structural formulas strictly enforced."
  },
  {
    id: "generate-deliver",
    stageNumber: "04",
    stageTag: "STAGE 04 OF 04 · Vector PDF Quotation Generation & Client Dispatch",
    stageHeadline: "Generate & Deliver",
    stageDescription: "Sub-second report compilation using ReportLab vector engine with custom typography, 5-stage milestone breakdown, and automated Brevo SMTP email delivery.",
    bullets: [
      "Pixel-perfect vector A4 client quotation compilation complete with executive summary cards",
      "5-Stage milestone payment breakdown (Foundation 20%, Structure 30%, Masonry 20%, MEP 15%, Finishing 15%)",
      "Automated Brevo transactional email dispatch with encrypted PDF attachment delivery"
    ],
    bottomBadges: ["ReportLab Vector PDF", "Brevo SMTP Delivery", "Audit-Ready Quotation"],
    activeNode: "Quotation Dispatch & Delivery Hub",
    streamStates: [
      { name: "ReportLab Vector PDF Renderer", status: "DISPATCHED" },
      { name: "Brevo SMTP Transactional Gateway", status: "LIVE" },
      { name: "Admin Audit Logging Node", status: "RECORDED" },
      { name: "Client Proposal Archive", status: "SYNCHRONIZED" }
    ],
    filterStatus: "Executive Delivery Gate: Encrypted multi-page proposal generated."
  }
];

export const buildsmartFeatureCapabilities: FeatureCapability[] = [
  {
    id: "dimensional-quantification",
    name: "Dimensional Quantification",
    shortName: "QUANTIFY",
    categoryTag: "QUANTIFY · CIVIL & STRUCTURAL TAKEOFF",
    headline: "High-Precision Dimensional Quantity Surveying",
    description: "Automatically transform architectural room layouts and floor dimensions into exact material quantities—bags of cement, metric tonnes of Fe550D steel, units of M-Sand, and graded coarse aggregates.",
    bullets: [
      "IS code-calibrated structural consumption factors (0.40 bags cement/sq.ft, 4.0 kg TMT steel/sq.ft)",
      "Dynamic coarse aggregate split (40mm for PCC/footings, 20mm for RCC slabs/columns, 12mm for lintels)",
      "Automated boundary validation calculating ground coverage, carpet area, and open plot setbacks"
    ],
    specs: [
      { label: "Cement Ratio", value: "0.40 Bags/Sq.Ft" },
      { label: "Steel Ratio", value: "4.0 kg Fe550D/Sq.Ft" },
      { label: "Calculation Latency", value: "< 25ms" },
      { label: "Compliance", value: "IS 456 Structural" }
    ],
    tagColor: "cyan"
  },
  {
    id: "dynamic-boq-generation",
    name: "Dynamic BOQ Generation",
    shortName: "BOQ ENGINE",
    categoryTag: "ESTIMATION · DYNAMIC BILL OF QUANTITIES",
    headline: "Instantaneous Multi-Tier BOQ Compilation",
    description: "Generate comprehensively itemized construction estimates with real-time package tier selection spanning Base, Standard, Premium, and Luxury configurations.",
    bullets: [
      "Dynamic tier adjustment: Base (₹2,100), Standard (₹2,400), Premium (₹2,600), and Luxury (₹2,800/sq.ft)",
      "Itemized trade breakdown covering Substructure, Superstructure, Masonry, MEP, and Finishes",
      "Real-time profit margin guardrails ensuring contractor overhead and contingency protections"
    ],
    specs: [
      { label: "Package Tiers", value: "4 Pre-Calibrated" },
      { label: "Trade Categories", value: "18 Itemized Divisions" },
      { label: "Margin Accuracy", value: "100% Deterministic" },
      { label: "Export Formats", value: "Vector PDF, CSV, Excel" }
    ],
    tagColor: "blue"
  },
  {
    id: "city-rate-master",
    name: "City Rate Master Index",
    shortName: "RATE MASTER",
    categoryTag: "GOVERNANCE · REGIONAL RATE MATRIX",
    headline: "Centralized Multi-Municipal Material Pricing",
    description: "Maintain live regional cost indexes for cement, TMT rebar, fine sand, coarse aggregate, bricks, and finishing fixtures with zero manual spreadsheet reconciliation.",
    bullets: [
      "Dedicated municipal rate profiles for Erode, Chennai, Coimbatore, and regional defaults",
      "Granular brand-specific tracking across UltraTech, Dalmia, Tata Tiscon, and regional quarry rates",
      "Instant administrative rate broadcast immediately propagating across all pending client bids"
    ],
    specs: [
      { label: "Municipal Zones", value: "Multi-City Clustered" },
      { label: "Sync Engine", value: "Supabase PostgREST" },
      { label: "Update Propagation", value: "Instantaneous" },
      { label: "Audit Traceability", value: "Full Historical Log" }
    ],
    tagColor: "emerald"
  },
  {
    id: "ai-civil-advisory",
    name: "AI Civil Advisory Engine",
    shortName: "AI ADVISORY",
    categoryTag: "INTELLIGENCE · GEMINI 1.5 FLASH",
    headline: "Contextual AI Engineering Notes & Risk Analysis",
    description: "Harness generative AI to audit architectural dimensions, evaluate soil/structural conditions, and produce contextual engineering observations for client proposals.",
    bullets: [
      "Contextual Gemini 1.5 Flash analysis assessing plot layout, soil assumptions, and foundation depth",
      "Automatic identification of structural risk factors and value-engineering recommendations",
      "Client-friendly executive summaries explaining technical choices in transparent language"
    ],
    specs: [
      { label: "AI Model", value: "Gemini 1.5 Flash" },
      { label: "Inference Latency", value: "< 900ms" },
      { label: "Output Grounding", value: "IS Code Bounded" },
      { label: "Tone Calibration", value: "Executive Engineering" }
    ],
    tagColor: "indigo"
  },
  {
    id: "milestone-schedule",
    name: "5-Stage Milestone Schedule",
    shortName: "CASH FLOW",
    categoryTag: "FINANCE · MILESTONE CASH FLOW",
    headline: "Structured Milestone Contracting & Billing",
    description: "Protect contractor cash flow and build client trust with mathematically phased payment schedules mapped directly to tangible construction milestones.",
    bullets: [
      "Standard 5-stage milestone allocation: Foundation (20%), Structure (30%), Masonry (20%), MEP (15%), Finishing (15%)",
      "Configurable milestone triggers tied to structural inspection sign-offs and concrete pouring stages",
      "Automated client payment schedule tables embedded directly into generated quotation proposals"
    ],
    specs: [
      { label: "Milestone Stages", value: "5 Defined Phases" },
      { label: "Stage Allocation", value: "20% / 30% / 20% / 15% / 15%" },
      { label: "Cash Flow Guard", value: "Pre-Funded Stages" },
      { label: "Dispute Reduction", value: "95% Clearer Sign-Offs" }
    ],
    tagColor: "purple"
  },
  {
    id: "audit-ready-pdf",
    name: "Audit-Ready PDF Quotations",
    shortName: "VECTOR PDF",
    categoryTag: "DELIVERY · REPORTLAB VECTOR ENGINE",
    headline: "Executive-Grade Vector PDF Proposal Delivery",
    description: "Compile professional, branded vector A4 quotations with company letterhead, detailed trade schedules, and automated email dispatch in seconds.",
    bullets: [
      "Vector-sharp A4 PDF generation utilizing ReportLab with custom typography and clean data tables",
      "Dynamic builder branding with custom logos, GST registration metadata, and custom contract terms",
      "Automated Brevo SMTP delivery sending client proposals directly with encrypted PDF attachments"
    ],
    specs: [
      { label: "Engine", value: "Python ReportLab" },
      { label: "Output Resolution", value: "Infinite Vector Sharp" },
      { label: "Email Dispatch", value: "Brevo SMTP Integrated" },
      { label: "Compilation Speed", value: "< 1.2 Seconds" }
    ],
    tagColor: "teal"
  }
];

export const buildsmartConnectorCatalog = [
  { name: "Civil Works & Structural Concrete", status: "LIVE (100% Calibrated)", uptime: "100%" },
  { name: "MEP Conduits & Plumbing Fixtures", status: "LIVE (98% Fixture Accuracy)", uptime: "99.8%" },
  { name: "Architectural Add-Ons (Tanks, Compound, Elevation)", status: "LIVE (Direct DB Bound)", uptime: "100%" },
  { name: "AI Civil Advisory (Gemini 1.5 Flash)", status: "LIVE (Real-Time Inferences)", uptime: "99.9%" }
];

export const buildsmartArchitectureLayers: ArchitectureLayer[] = [
  {
    layerNumber: "01",
    sectionTag: "01 · REGIONAL RATE MASTER & MATERIAL FEDERATION",
    headline: "Grounded in real-time local material and vendor pricing.",
    description: "Connect municipal supplier rates, district material databases, and turnkey package catalogs directly into your cost calculations. Every cement bag, steel rebar, and aggregate unit reflects actual procurement costs with zero guesswork.",
    bullets: [
      "Multi-city localized rate indexing with seamless fallback to regional default benchmarks",
      "Real-time vendor pricing tracking across UltraTech, Tata Tiscon, Kajaria, and local quarry aggregates",
      "Granular material overrides per city for M-Sand, P-Sand, AAC blocks, red clay bricks, and fittings"
    ],
    tags: ["Multi-City Rate Indexing", "Full Source Traceability", "Strict Tenant Isolation"],
    rightBoxTitle: "Active Material Ingestion Mesh",
    rightBoxSubtitle: "Live Supabase PostgREST & Parametric Matrix",
    rightBoxItems: [
      { label: "City Rate Overrides (District & Municipal Tier)", status: "Connected (Live Supabase PostgREST)" },
      { label: "Turnkey Package Pricing (Base / Standard / Premium / Luxury)", status: "Connected (Real-Time Sync)" },
      { label: "Add-on Work Schedules (Compound Walls, Sumps, Septic)", status: "Connected (Parametric Matrix)" },
      { label: "Vendor Quotation Catalog", status: "Connected (Live Cache)" }
    ]
  },
  {
    layerNumber: "02",
    sectionTag: "02 & 03 · STRUCTURAL QUANTITY & DYNAMIC BOQ COMPOSITOR",
    headline: "Automated civil engineering validation and quantity integrity.",
    description: "Ensure every structural metric, reinforcement ratio, concrete mix grade, and MEP fixture count in your quotation is 100% compliant with standard civil engineering norms. Prevent cost overruns, enforce margin protections, and lock project profitability before client proposal delivery.",
    bullets: [
      "Multi-point structural validation linking built-up area to exact cement, steel, sand, and aggregate requirements",
      "Strict financial integrity calculating contingencies, contractor margins, and tax obligations with deterministic precision",
      "Granular builder & admin permission gates ensuring quotations require authorized status before generation"
    ],
    tags: ["Civil Engineering Grounded", "IS Code Compliant", "Deterministic Math"],
    rightBoxTitle: "Unified Model Topology",
    rightBoxSubtitle: "Architectural Input to Verified Proposal",
    rightBoxItems: [
      { label: "Architectural Input", status: "Structural Quantity Engine" },
      { label: "City Rate Matrix", status: "Dynamic BOQ Compositor" },
      { label: "AI Advisory (Gemini)", status: "Branded PDF Dispatch" }
    ]
  },
  {
    layerNumber: "04",
    sectionTag: "04 · REPORTLAB HIGH-FIDELITY DOCUMENT COMPOSITOR",
    headline: "Pixel-perfect vector PDF generation for executive contractor quotations.",
    description: "Experience professional client-facing quotation delivery without messy spreadsheets or misaligned exports. Buildsmart compiles multi-page, branded engineering reports featuring executive summary cards, stage milestone schedules, itemized BOQ tables, and AI advisory notes directly into vector-sharp A4 PDFs.",
    bullets: [
      "Sub-second report compilation using ReportLab vector engine with custom typography and curated palettes",
      "Dynamic company branding supporting builder logos, contact details, GST metadata, and custom terms",
      "5-Stage milestone payment breakdown (Foundation 20%, Structure 30%, Masonry 20%, MEP 15%, Finishing 15%) for immediate client sign-off"
    ],
    tags: ["ReportLab Vector PDF", "Brevo SMTP Delivery", "Milestone Phased"],
    rightBoxTitle: "Production Delivery Topology",
    rightBoxSubtitle: "Document Pipeline & Email Delivery",
    rightBoxItems: [
      { label: "ReportLab Vector Engine", status: "Pixel-Perfect Layout" },
      { label: "Milestone Phasing Matrix", status: "5-Stage Cash Flow Enforced" },
      { label: "Brevo SMTP Gateway", status: "Instant Encrypted Dispatch" }
    ]
  }
];

export const buildsmartDeploymentEditions: DeploymentEdition[] = [
  {
    tier: "Authoring",
    cardTag: "ESTIMATION & BIDDING ENVIRONMENT",
    title: "Buildsmart Builder Studio Workspace",
    subtitle: "Parameterize multi-floor buildings, customize material brands, configure architectural add-ons, and generate verified client proposals in minutes. Built for General Contractors, Civil Engineers, Architects, and Builders.",
    badge: "WORKSTATION STUDIO",
    bullets: [
      "Interactive 6-step guided wizard from package selection to final quotation preview",
      "Room-by-room architectural MEP layout designer with electrical and plumbing fixture tallies",
      "One-click architectural add-on toggles (underground sumps, compound walls, modular kitchens, front elevations)",
      "Instant export to branded vector PDF and automated Brevo email dispatch"
    ],
    primaryCtaText: "Launch Estimator Workspace →",
    specs: [
      { label: "Primary Persona", value: "Builders & Civil Engineers" },
      { label: "Workflow Mode", value: "6-Step Guided Estimation" },
      { label: "Quotation Speed", value: "< 2 Minutes End-to-End" },
      { label: "Export Output", value: "Branded Vector A4 PDF" }
    ],
    consoleTitle: "Builder Workstation Execution",
    consoleItems: [
      { label: "Active Workspace", value: "Residential Villa & Commercial Suite" },
      { label: "Structural Models", value: "Ground + Multi-Floor Custom Layouts" },
      { label: "Calculation Engine", value: "Deterministic Quantity Engine + Gemini 1.5 Flash" },
      { label: "Mode", value: "Full parameterization and instant BOQ synthesis" }
    ]
  },
  {
    tier: "Cloud & Governance",
    cardTag: "CENTRALIZED CLOUD & RATE GOVERNANCE",
    title: "Buildsmart Cloud Control & Rate Master",
    subtitle: "Centrally govern material rates across municipal zones, monitor regional builder adoption, enforce security controls, and audit system transactions. Built for Construction Enterprises, Project Directors, and Platform Administrators.",
    badge: "ADMIN CLOUD GOVERNANCE",
    bullets: [
      "Centralized Rate Master updating cement, steel, sand, and brick rates across multiple cities simultaneously",
      "Enterprise RBAC with instant builder approval, status toggling, and brute-force lockout safeguards",
      "Comprehensive audit logging tracking all calculation revisions, user actions, and system modifications",
      "Production security suite: SOC 2 Type II, ISO/IEC 27001, OWASP Top 10 hardening, and TLS 1.3 strict"
    ],
    primaryCtaText: "Explore Admin Governance ↗",
    specs: [
      { label: "Primary Persona", value: "Platform Admins & Directors" },
      { label: "Governance Protocol", value: "Centralized Rate Master" },
      { label: "Compliance Controls", value: "277 / 277 Passed" },
      { label: "Security Level", value: "SOC 2 Type II · TLS 1.3" }
    ],
    consoleTitle: "Cloud Services Endpoint",
    consoleItems: [
      { label: "Connected Endpoint", value: "https://api.buildsmart360.internal/v1" },
      { label: "Active Modules", value: "Rate Master · User RBAC · System Settings · Audit Logs" },
      { label: "Governance Mode", value: "Real-time DB sync with instant token invalidation" },
      { label: "Compliance Status", value: "100% Passed (277/277 Security Checklist Controls)" }
    ]
  }
];
