// VTAB Invoice Intelligence Suite Data
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

export const invoiceFlowHero = {
  badge: "VTAB INVOICE INTELLIGENCE SUITE · V2.4.1 STABLE",
  title: "VTAB Invoice Flow",
  eyebrow: "END-TO-END PIPELINE ARCHITECTURE",
  headline: "Engineered for the complete billing and financial lifecycle.",
  description: "From automated profile and client onboarding to real-time GST tax computation, automated PDF rendering, and direct multi-channel distribution, every step is optimized for frictionless enterprise billing.",
  primaryAction: "Schedule Technical Demo",
  secondaryAction: "Explore Capabilities",
  tags: ["REST API", "HTTPS", "SMTP", "Webhooks", "React 18", "Node.js", "Express", "Vector PDF"],
  metrics: [
    { label: "Document Synthesis", value: "Sub-Second" },
    { label: "Tax Precision", value: "100%" },
    { label: "SMTP Delivery Rate", value: "99.8%" }
  ],
  mediaImage: "/media/invoice-flow-console.png"
};

export const invoiceFlowPipelineStages: PipelineStage[] = [
  {
    id: "ingest-profile",
    stageNumber: "01",
    stageTag: "STAGE 01 OF 04 · Multi-entity master data sync",
    stageHeadline: "Ingest & Profile",
    stageDescription: "Seamless synchronization of client ledgers, business entities, banking details, and tax classifications into a unified billing pipeline.",
    bullets: [
      "Enterprise profile mapping (GSTIN, PAN, bank IFSC, and signature assets)",
      "Client directory management with localized state codes and billing addresses",
      "Instant line-item rate cards and automated multi-currency support"
    ],
    bottomBadges: ["GST Compliance Certified", "Real-Time Ledger Scored"],
    activeNode: "Federated Billing Connectors",
    streamStates: [
      { name: "Client Directory Sync", status: "LIVE" },
      { name: "GST & Tax Rules Engine", status: "LIVE" },
      { name: "Banking & Remittance Gateways", status: "LIVE" },
      { name: "Cloud Ledger & Spreadsheets", status: "LIVE" }
    ],
    filterStatus: "Validation filter enabled: 100% of missing tax fields and invalid invoice math flagged before generation."
  },
  {
    id: "calculate-compose",
    stageNumber: "02",
    stageTag: "STAGE 02 OF 04 · Automated GST & line item computation",
    stageHeadline: "Calculate & Compose",
    stageDescription: "Deterministic tax arithmetic evaluating inter-state vs. intra-state jurisdiction rules, HSN/SAC codes, discount matrices, and surcharge bounds.",
    bullets: [
      "Intelligent tax splitting: automated CGST + SGST (intra-state) or IGST (inter-state) calculation",
      "Per-line HSN/SAC classification with quantity, unit metrics, and variable discount brackets",
      "Subtotal, gross, and net payable round-off verification preventing fractional currency drift"
    ],
    bottomBadges: ["Automated Tax Routing", "Zero Rounding Drift"],
    activeNode: "Tax & Financial Arithmetic Engine",
    streamStates: [
      { name: "HSN / SAC Code Validator", status: "LIVE" },
      { name: "State Jurisdiction Tax Router", status: "LIVE" },
      { name: "Discount & Round-off Verifier", status: "LIVE" },
      { name: "Multi-Currency Exchange Stream", status: "LIVE" }
    ],
    filterStatus: "Tax Arithmetic Engine: 100% verified tax formulas across all line items."
  },
  {
    id: "generate-validate",
    stageNumber: "03",
    stageTag: "STAGE 03 OF 04 · High-fidelity invoice document rendering",
    stageHeadline: "Generate & Validate",
    stageDescription: "High-resolution vector PDF compilation with cryptographic signature embedding, dynamic company branding, and audit-proof metadata stamping.",
    bullets: [
      "Sub-second vector PDF generation with standardized corporate layout templates",
      "Cryptographic digital signature rendering, corporate seals, and bank QR code generation",
      "Pre-dispatch layout validator preventing text clipping, orphaned line items, and pagination shifts"
    ],
    bottomBadges: ["Vector PDF Compliant", "Cryptographic Signatures"],
    activeNode: "Vector Document Compositor",
    streamStates: [
      { name: "Vector Canvas Layout Engine", status: "LIVE" },
      { name: "Digital Signature & Seal Injector", status: "LIVE" },
      { name: "UPI & Bank QR Code Generator", status: "LIVE" },
      { name: "Page-Break Layout Guard", status: "LIVE" }
    ],
    filterStatus: "Rendering Integrity: Verified pixel-perfect vector A4 layout."
  },
  {
    id: "dispatch-ledger",
    stageNumber: "04",
    stageTag: "STAGE 04 OF 04 · Automated email distribution & cloud sync",
    stageHeadline: "Dispatch & Ledger",
    stageDescription: "Multi-channel invoice transmission via secure corporate SMTP mailer, client portal delivery, real-time Google Sheets ledger sync, and automated payment tracking.",
    bullets: [
      "Direct customer delivery via authenticated SMTP with encrypted PDF attachment",
      "Real-time bidirectional synchronization with cloud spreadsheets and enterprise accounting systems",
      "Lifecycle status tracking (Draft, Sent, Viewed, Paid, Overdue) with automated payment reminders"
    ],
    bottomBadges: ["SMTP Delivery Gateway", "Cloud Ledger Sync", "Full Audit Log"],
    activeNode: "Multi-Channel Distribution Broker",
    streamStates: [
      { name: "Corporate SMTP Mailer", status: "DELIVERED" },
      { name: "Google Sheets Cloud Ledger", status: "SYNCHRONIZED" },
      { name: "Payment Webhook Listener", status: "LISTENING" },
      { name: "Audit Trail & Event Log", status: "RECORDED" }
    ],
    filterStatus: "Dispatch Pipeline: Outbound invoice delivery verified and logged."
  }
];

export const invoiceFlowFeatureCapabilities: FeatureCapability[] = [
  {
    id: "invoice-studio",
    name: "Invoice Studio",
    shortName: "STUDIO",
    categoryTag: "BILLING · INVOICE STUDIO",
    headline: "High-Throughput Invoice Generation",
    description: "Generate audit-ready commercial invoices, recurring bills, and credit notes with real-time tax calculation, dynamic itemization, and automated subtotal reconciliation.",
    bullets: [
      "Automated CGST, SGST, and IGST rule routing based on state tax jurisdictions",
      "Integrated digital signature rendering and company stamp placement",
      "Instant balance reconciliation with automated payment status tracking"
    ],
    specs: [
      { label: "Generation Speed", value: "< 800ms" },
      { label: "Tax Routing", value: "State Jurisdiction Aware" },
      { label: "Invoice Types", value: "Commercial, Credit, Proforma" },
      { label: "Format", value: "Vector PDF & JSON" }
    ],
    tagColor: "blue"
  },
  {
    id: "automated-gst-engine",
    name: "Automated GST Engine",
    shortName: "GST ENGINE",
    categoryTag: "TAX · AUTOMATED GST ROUTER",
    headline: "Automated Compliance & Tax Routing",
    description: "Eliminate manual tax computation. The built-in GST engine validates GSTIN formats, looks up state jurisdiction codes, and automatically decides between dual-tax or integrated tax rates.",
    bullets: [
      "Dynamic intra-state (CGST + SGST) vs. inter-state (IGST) tax classification",
      "HSN/SAC code search and rate determination across 5%, 12%, 18%, and 28% slabs",
      "Strict mathematical rounding algorithms avoiding paise-level currency drift"
    ],
    specs: [
      { label: "GST Slabs", value: "0%, 5%, 12%, 18%, 28%" },
      { label: "State Code Routing", value: "All 36 States & UTs" },
      { label: "HSN Validation", value: "Real-Time Directory" },
      { label: "Math Discrepancy", value: "0.00% Zero-Tolerance" }
    ],
    tagColor: "cyan"
  },
  {
    id: "client-profile-mesh",
    name: "Client & Profile Mesh",
    shortName: "CLIENT MESH",
    categoryTag: "DIRECTORY · CLIENT & ENTITY MESH",
    headline: "Centralized Multi-Entity & Client Records",
    description: "Manage multiple business entities, branch offices, and corporate clients in one consolidated directory with auto-fill billing addresses, bank accounts, and localized tax details.",
    bullets: [
      "Multi-entity profile switching: toggle company brands, logos, bank accounts, and GSTINs",
      "Comprehensive corporate client directory with billing address and shipping destination auto-fill",
      "Real-time ledger historical lookup with outstanding receivables and payment records"
    ],
    specs: [
      { label: "Entity Architecture", value: "Multi-Brand Ready" },
      { label: "Client Directory", value: "Dynamic Search & Cache" },
      { label: "Bank Remittance", value: "IFSC & SWIFT Bound" },
      { label: "Address Splitting", value: "Billing & Shipping Sync" }
    ],
    tagColor: "indigo"
  },
  {
    id: "pdf-print-vector",
    name: "PDF Print & Vector Render",
    shortName: "VECTOR PDF",
    categoryTag: "ENGINE · HIGH-FIDELITY VECTOR RENDER",
    headline: "Pixel-Perfect Vector PDF Output",
    description: "Deliver immaculate, professional A4 invoices rendered with crisp vector typography, pristine grid layouts, and embedded digital signatures without page overflow.",
    bullets: [
      "Pixel-perfect typography and tabular data layout eliminating layout shifting",
      "Dynamic page-splitting engine with smart totals and pagination headers on multi-page bills",
      "Instant browser print preview and direct vector PDF download stream"
    ],
    specs: [
      { label: "Rendering Engine", value: "Vector Document Engine" },
      { label: "Resolution", value: "Infinite Vector Sharp" },
      { label: "Multi-Page Handling", value: "Dynamic Overflow Gate" },
      { label: "Print Standard", value: "ISO A4 Standard" }
    ],
    tagColor: "emerald"
  },
  {
    id: "digital-signature-hub",
    name: "Digital Signature Hub",
    shortName: "SIGNATURES",
    categoryTag: "SECURITY · DIGITAL SIGNATURE & STAMP",
    headline: "Cryptographic Signatures & Corporate Stamps",
    description: "Embed authentic authorized signatory assets and official corporate stamps directly into invoices with cryptographic timestamping and tamper-evident metadata.",
    bullets: [
      "Authorized signatory canvas with saved vector signatures and corporate seal placement",
      "Dynamic payment QR code injection linking directly to UPI or bank account remittance",
      "Audit-proof document metadata including creation timestamps and dispatch hashes"
    ],
    specs: [
      { label: "Signature Placement", value: "Deterministic Bounding" },
      { label: "Payment QR", value: "Dynamic UPI & IFSC" },
      { label: "Tamper Protection", value: "Metadata Hash Stamped" },
      { label: "Verification", value: "Two-Factor Approved" }
    ],
    tagColor: "purple"
  },
  {
    id: "multi-channel-dispatch",
    name: "Multi-Channel Dispatch",
    shortName: "DISPATCH",
    categoryTag: "DISTRIBUTION · MULTI-CHANNEL DISPATCH",
    headline: "Automated Email & Cloud Delivery",
    description: "Transmit invoices directly to client financial contacts via corporate SMTP with customized email templates, trackable attachments, and automated cloud sync.",
    bullets: [
      "Automated SMTP dispatch sending branded email receipts with attached PDF invoices",
      "Real-time bidirectional synchronization appending invoice rows to Google Sheets ledgers",
      "Scheduled payment reminder notifications for overdue accounts and pending collections"
    ],
    specs: [
      { label: "Email Gateway", value: "Direct SMTP TLS" },
      { label: "Cloud Sync", value: "Google Sheets Webhook" },
      { label: "Delivery Tracking", value: "Sent / Opened / Paid" },
      { label: "Follow-Up Logic", value: "Automated Reminders" }
    ],
    tagColor: "teal"
  }
];

export const invoiceFlowConnectorCatalog = [
  { name: "Google Sheets Cloud Database", status: "LIVE (Real-Time Read/Write)", uptime: "100%" },
  { name: "Automated SMTP Mail Dispatcher", status: "LIVE (99.8% Delivery)", uptime: "99.8%" },
  { name: "High-Precision PDF Generator", status: "LIVE (Vector Master)", uptime: "100%" },
  { name: "Tax Calculation Services", status: "LIVE (100% Precision)", uptime: "100%" }
];

export const invoiceFlowArchitectureLayers: ArchitectureLayer[] = [
  {
    layerNumber: "01",
    sectionTag: "01 · UNIVERSAL LEDGER & DATA FEDERATION",
    headline: "Grounded across live enterprise sheets and cloud ledgers.",
    description: "Connect enterprise client directories, product inventories, and historical invoice rows through native cloud sheet synchronization. Every generated line item, calculation, and remittance detail is strictly validated against primary ledger records with zero calculation discrepancies.",
    bullets: [
      "Direct synchronization with cloud spreadsheets and enterprise database backends",
      "Full traceability linking each invoice back to verified client records, GST numbers, and bank profiles",
      "Automated data drift detection with continuous schema and ledger synchronization"
    ],
    tags: ["Multi-Entity Support", "Dual-Layer Validation", "TLS 1.3 Strict"],
    rightBoxTitle: "Active Knowledge Ingestion Mesh",
    rightBoxSubtitle: "Live Sheet Sync & Enterprise Ledgers",
    rightBoxItems: [
      { label: "Client Master Records", status: "Connected (Live Fetch Active)" },
      { label: "Company Profiles & Banking Data", status: "Connected (Verified Signatures)" },
      { label: "Historical Invoices & Ledgers", status: "Connected (Real-Time Append)" },
      { label: "Tax Code & GST Table Rules", status: "Connected (Active Cache)" }
    ]
  },
  {
    layerNumber: "02",
    sectionTag: "02 & 03 · ENTERPRISE INVOICE VALIDATION & TAX INTEGRITY",
    headline: "Enterprise invoice validation with verified tax integrity.",
    description: "Ensure every GSTIN, HSN/SAC code, currency conversion, and bank detail printed on your invoice is 100% verified. Drop mismatched tax sums, enforce company brand standards, and eliminate invoice disputes before sending.",
    bullets: [
      "Multi-field validation verifying GSTIN syntax, client addresses, and state code pairings",
      "Strict arithmetic integrity preventing rounding errors across CGST, SGST, IGST, and gross totals",
      "Role-based approval and instant invoice lifecycle tracking (Draft, Sent, Paid, Overdue)"
    ],
    tags: ["Tax Verified", "Arithmetic Grounded", "Audit-Ready Enforced"],
    rightBoxTitle: "Unified Model Topology",
    rightBoxSubtitle: "Draft Input to Verified Dispatch",
    rightBoxItems: [
      { label: "Invoice Draft Input", status: "Tax & Math Verification Engine" },
      { label: "Profile & Bank Mesh", status: "High-Fidelity Document Builder" },
      { label: "Admin Review", status: "Automated Email & Ledger Dispatch" }
    ]
  },
  {
    layerNumber: "04",
    sectionTag: "04 · CODE-RENDERED HYBRID DOCUMENT COMPOSITOR",
    headline: "High-precision vector document engine for master invoice generation.",
    description: "Experience crisp, pixel-perfect invoice rendering without layout shifts or unaligned tabular data. VTAB Invoice renders clean, high-resolution vector PDFs with perfectly formatted tables, razor-sharp typography, and embedded cryptographic signatures.",
    bullets: [
      "Sub-second vector PDF generation with standardized enterprise layout templates",
      "Automated pre-dispatch visual layout check ensuring correct page splits and footer alignment",
      "Fully dynamic currency formatters, localized date handling, and responsive line-item displays"
    ],
    tags: ["Vector PDF Output", "Cryptographic Signatures", "Sub-Second Speed"],
    rightBoxTitle: "Document Generation Topology",
    rightBoxSubtitle: "High-Fidelity Document Compositor",
    rightBoxItems: [
      { label: "Layout Template Engine", status: "Standardized Grid Verified" },
      { label: "Typography & Currency Formatter", status: "Localized Precision Active" },
      { label: "Cryptographic Signature Injector", status: "Tamper-Evident Stamping" }
    ]
  }
];

export const invoiceFlowDeploymentEditions: DeploymentEdition[] = [
  {
    tier: "Authoring",
    cardTag: "INVOICE CREATION & ADMINISTRATION ENVIRONMENT",
    title: "VTAB Invoice Workspace",
    subtitle: "Create invoices, onboard corporate clients, set up multi-entity profiles, and inspect financial metrics in an intuitive workspace. Built for Finance Teams, Operations Executives, and Business Owners.",
    badge: "WORKSTATION STUDIO",
    bullets: [
      "Real-time billing form with dynamic item additions, tax calculations, and instant previews",
      "One-click business profile switching with integrated bank accounts and digital signatures",
      "Comprehensive client directory with auto-fill billing addresses and GST details",
      "Instant export to print-ready PDF, cloud spreadsheet synchronization, and CSV archives"
    ],
    primaryCtaText: "Open Invoice Workspace →",
    specs: [
      { label: "Primary Persona", value: "Finance & Operations Teams" },
      { label: "Architecture", value: "React UI + Express.js REST API" },
      { label: "Tax Modes", value: "Intra-State & Inter-State GST" },
      { label: "Export Output", value: "Vector PDF & Cloud Ledger" }
    ],
    consoleTitle: "Local Workstation Execution",
    consoleItems: [
      { label: "Active Workspace", value: "Enterprise Finance Suite" },
      { label: "Active Profiles", value: "Multi-Brand & Entity Ready" },
      { label: "Engine", value: "Express.js REST API + React UI Engine" },
      { label: "Mode", value: "Full authoring, invoice drafting, and client administration capable" }
    ]
  },
  {
    tier: "Cloud & Distribution",
    cardTag: "COLLABORATIVE CLOUD & DISTRIBUTION",
    title: "VTAB Automated Dispatch & Cloud Services",
    subtitle: "Deliver verified invoices directly to clients via automated email pipelines with complete delivery logs and audit compliance. Built for CFOs, Accounts Receivable Teams, and Financial Controllers.",
    badge: "AUTOMATED CLOUD DISPATCH",
    bullets: [
      "Direct one-click customer dispatch via secure corporate SMTP mailer",
      "Automated invoice payment reminders and status update pipelines",
      "Administrative OTP verification and encrypted credential access",
      "Real-time delivery logs, invoice audit trails, and payment reconciliation hooks"
    ],
    primaryCtaText: "Schedule Enterprise Demo ↗",
    specs: [
      { label: "Primary Persona", value: "CFOs & AR Controllers" },
      { label: "Protocol", value: "Authenticated SMTP TLS 1.3" },
      { label: "Compliance", value: "100% Tax & Audit Verified" },
      { label: "Cloud Sync", value: "Real-Time Google Sheets Sync" }
    ],
    consoleTitle: "Cloud Services Endpoint",
    consoleItems: [
      { label: "Connected Endpoint", value: "https://api.invoice.vtab.internal/v1/invoices" },
      { label: "Active Channels", value: "Direct SMTP Email · Cloud Backup · Ledger Webhooks" },
      { label: "Dispatch Mode", value: "Automated PDF Dispatch with Two-Factor / OTP Verification" },
      { label: "Compliance Status", value: "Enforced for 100% of outbound commercial invoices" }
    ]
  }
];
