// QA-AI Autonomous Testing Platform Data
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

export const qaTestingHero = {
  badge: "QA-AI AUTONOMOUS TESTING PLATFORM · V2.0.0 STABLE",
  title: "QA-AI Autonomous Testing Platform",
  eyebrow: "END-TO-END PIPELINE ARCHITECTURE",
  headline: "Engineered for the complete autonomous quality lifecycle.",
  description: "From natural language prompt ingestion and video workflow synthesis to dual-engine Playwright and Windows UIA execution with OpenTelemetry root-cause diagnostics, every layer is built for deterministic test reliability.",
  primaryAction: "Schedule Technical Demo",
  secondaryAction: "Explore Capabilities",
  tags: ["Playwright", "Windows UIA", "OpenTelemetry", "Gemini 2.5", "Python 3.11", "DPAPI", "Supabase"],
  metrics: [
    { label: "Step Dispatch Latency", value: "< 50ms" },
    { label: "Manual Effort Reduction", value: "65-80%" },
    { label: "Contract Determinism", value: "100%" }
  ],
  mediaImage: "/media/qa-ai-testing-console.png"
};

export const qaTestingPipelineStages: PipelineStage[] = [
  {
    id: "ingest-synthesize",
    stageNumber: "01",
    stageTag: "STAGE 01 OF 04 · Multi-Modal Test Ingestion & Synthesis",
    stageHeadline: "Ingest & Synthesize",
    stageDescription: "Ingest raw user stories, structured test matrices, or screen recordings into strictly typed Contract Version 2 automation definitions with zero synthetic hallucination.",
    bullets: [
      "Gemini AI plain-text parser converting natural language instructions into executable steps",
      "High-throughput CSV/Excel test case matrix ingestion with step dependency trees and critical failure gates",
      "Multimodal screen-recording ingest analyzing MP4/WebM videos into mapped web and desktop test drafts"
    ],
    bottomBadges: ["Strict Contract V2 Enforced", "Zero-Hallucination Schema Validator"],
    activeNode: "Multi-Modal Ingestion Pipeline",
    streamStates: [
      { name: "Gemini NLP Translator", status: "LIVE" },
      { name: "Video Draft Synthesizer", status: "LIVE (Multimodal Processing)" },
      { name: "Structured CSV Matrix Importer", status: "LIVE (100% Validated)" },
      { name: "Asset Storage & Virtual Media Mesh", status: "LIVE" }
    ],
    filterStatus: "Verification Guard: 100% of generated steps validated against deterministic action schemas before disk write."
  },
  {
    id: "inspect-resolve",
    stageNumber: "02",
    stageTag: "STAGE 02 OF 04 · Smart Locator Resolution & Tree Inspection",
    stageHeadline: "Inspect & Resolve",
    stageDescription: "High-precision element targeting orchestrating multi-strategy CSS/XPath/text web locators and native Windows UI Automation (UIA) COM control tree discovery.",
    bullets: [
      "Multi-strategy resilient web selectors prioritizing accessible labels, ARIA roles, and semantic IDs",
      "Live Windows control hierarchy inspection resolving Win32, WPF, and Electron native desktop windows",
      "Dynamic ambiguation filter preventing brittle flaky selectors by rejecting ambiguous multi-element matches"
    ],
    bottomBadges: ["Accessible ARIA Strictness", "Native Windows COM UIA"],
    activeNode: "Smart Selector & UIA Inspector",
    streamStates: [
      { name: "ARIA & Semantic Locator Resolver", status: "LIVE" },
      { name: "Windows UIA COM Adapter", status: "LIVE" },
      { name: "Win32 / WPF Handle Tracker", status: "LIVE" },
      { name: "Selector Self-Healing Watcher", status: "LIVE" }
    ],
    filterStatus: "Locator Resolution: Multi-surface hierarchy validated."
  },
  {
    id: "execute-validate",
    stageNumber: "03",
    stageTag: "STAGE 03 OF 04 · Dual-Runtime Headless & Native Execution",
    stageHeadline: "Execute & Validate",
    stageDescription: "Deterministic dual-surface test runner executing Playwright Chromium browser tasks and Windows desktop automation simultaneously with virtual biometric camera injection.",
    bullets: [
      "Bundled local Playwright Chromium runner supporting headed, headless, and isolated context switching",
      "Native Windows desktop worker driving mouse clicks, keyboard keystrokes, and dialog handling",
      "FFmpeg virtual webcam pipeline injecting Y4M video streams to bypass biometric facial authentication in CI/CD"
    ],
    bottomBadges: ["Dual-Surface Engine", "Virtual Biometric Streamer"],
    activeNode: "Dual-Runtime Execution Engine",
    streamStates: [
      { name: "Playwright Chromium CDP Worker", status: "RUNNING" },
      { name: "Windows UIA pywinauto Process", status: "RUNNING" },
      { name: "FFmpeg Y4M Virtual Webcam Feed", status: "INJECTING" },
      { name: "Local DPAPI Secret Vault", status: "UNLOCKED" }
    ],
    filterStatus: "Execution Integrity: Zero external Node.js dependencies required."
  },
  {
    id: "observe-audit",
    stageNumber: "04",
    stageTag: "STAGE 04 OF 04 · Distributed Tracing & AI Diagnostics",
    stageHeadline: "Observe & Audit",
    stageDescription: "End-to-end observability correlating browser interaction steps with microservice HTTP traces, automatic screenshot captures, and AI root-cause diagnostic explanations.",
    bullets: [
      "OpenTelemetry distributed tracing correlating frontend UI actions directly with backend API latencies",
      "Intelligent failure classifier distinguishing between overlay blockers, selector shifts, and backend timeouts",
      "Exportable audit-ready test reports formatted in interactive HTML, structured JSON, and executive PDF"
    ],
    bottomBadges: ["OpenTelemetry Spans", "AI Diagnostic Root-Cause", "Audit-Ready Report"],
    activeNode: "OTel Observability & Diagnostic Hub",
    streamStates: [
      { name: "OTel HTTP & Span Exporter", status: "STREAMING" },
      { name: "Failure Diagnostic Classifier", status: "ANALYTICAL" },
      { name: "HTML & PDF Report Generator", status: "READY" },
      { name: "Supabase Cloud Analytics Sync", status: "SYNCHRONIZED" }
    ],
    filterStatus: "Audit Gate: Root-cause telemetry logged with full DOM and network trace capture."
  }
];

export const qaTestingFeatureCapabilities: FeatureCapability[] = [
  {
    id: "gemini-ai-translation",
    name: "Gemini AI Translation",
    shortName: "AI TRANSLATE",
    categoryTag: "SYNTHESIS · AI TEST GENERATION",
    headline: "Deterministic AI Step Translation",
    description: "Convert raw user stories, acceptance criteria, or fuzzy instructions into robust, production-grade Playwright and UIA automation steps without writing code.",
    bullets: [
      "Deterministic command grammar combined with Gemini 2.5 multimodal intelligence",
      "Strict contract validation preserving exact raw commands, targets, and expected values",
      "Automated parameterization with sensitive credential protection via {{test_password}} tokens"
    ],
    specs: [
      { label: "AI Engine", value: "Gemini 2.5 Multimodal" },
      { label: "Grammar Strictness", value: "Contract V2 Enforced" },
      { label: "Credential Vault", value: "DPAPI Tokenized" },
      { label: "Hallucination Rate", value: "0.00% Zero-Drift" }
    ],
    tagColor: "blue"
  },
  {
    id: "video-to-test-synthesis",
    name: "Video-to-Test Synthesis",
    shortName: "VIDEO SYNTHESIS",
    categoryTag: "MULTIMODAL · VIDEO TO AUTOMATION",
    headline: "Screen Recording to Test Case Compilation",
    description: "Upload an MP4 or WebM video recording of a manual test workflow. The multimodal engine extracts user clicks, text inputs, page transitions, and synthesizes runnable test cases.",
    bullets: [
      "In-memory frame extraction analyzing cursor coordinates, click events, and field entries",
      "Automated OCR and UI bounding box detection mapping visual elements to resilient CSS selectors",
      "Draft generation allowing visual step-by-step editing before promoting into the release regression suite"
    ],
    specs: [
      { label: "Supported Formats", value: "MP4, WebM, AVI" },
      { label: "Frame Analysis", value: "Dynamic Keyframe Decimation" },
      { label: "Extraction Speed", value: "< 15s per Minute Video" },
      { label: "Draft Accuracy", value: "94.6% First Pass" }
    ],
    tagColor: "cyan"
  },
  {
    id: "dual-web-windows-automation",
    name: "Dual Web & Windows Automation",
    shortName: "DUAL RUNNER",
    categoryTag: "RUNTIME · WEB & WINDOWS HYBRID",
    headline: "Unified Cross-Platform Test Execution",
    description: "Run automated tests across web browsers and native desktop applications in a single unified suite. Handle hybrid workflows that jump between browser tabs and desktop ERP software.",
    bullets: [
      "Bundled Playwright Chromium runner optimized for fast, reliable headless execution",
      "Windows UI Automation (UIA) COM wrapper inspecting and driving native Windows dialogs and apps",
      "Synchronized state sharing passing auth tokens, session cookies, and clipboard data across surfaces"
    ],
    specs: [
      { label: "Browser Engine", value: "Playwright Chromium Bundled" },
      { label: "Desktop Engine", value: "Native Windows UIA COM" },
      { label: "Step Dispatch", value: "< 50ms per Action" },
      { label: "Prerequisites", value: "Zero Node.js Required" }
    ],
    tagColor: "indigo"
  },
  {
    id: "virtual-webcam-biometrics",
    name: "Virtual Webcam Biometric Auth",
    shortName: "BIOMETRIC STREAM",
    categoryTag: "INJECTION · BIOMETRIC BYPASS STREAMER",
    headline: "Automated Biometric CI/CD Testing",
    description: "Bypass physical hardware webcam constraints in automated CI/CD pipelines. Stream pre-recorded Y4M video feeds into browser WebRTC camera inputs for automated facial verification tests.",
    bullets: [
      "FFmpeg virtual camera feed piping dynamic synthetic video streams directly into browser video elements",
      "Automated testing of FaceAuth, KYC identity checks, and video liveness verification flows",
      "Isolated project-level video asset management securely stored in private cloud buckets"
    ],
    specs: [
      { label: "Stream Format", value: "Y4M Video Pipe" },
      { label: "Injection Bridge", value: "Chromium Fake Device Flags" },
      { label: "CI/CD Ready", value: "100% Headless Compatible" },
      { label: "Security", value: "Sandboxed Project Assets" }
    ],
    tagColor: "purple"
  },
  {
    id: "otel-trace-observability",
    name: "OTel Trace Observability",
    shortName: "OTEL TRACING",
    categoryTag: "OBSERVABILITY · OPENTELEMETRY TRACES",
    headline: "Correlated Frontend & Backend Diagnostics",
    description: "Instantly pinpoint whether a test failure is caused by an unexpected UI change or an underlying microservice 500 error through distributed OpenTelemetry span tracing.",
    bullets: [
      "Distributed trace instrumentation mapping frontend user actions to downstream API call spans",
      "Automated failure categorization distinguishing network errors from selector mismatches",
      "Waterfall timeline rendering latency bottlenecks and microservice delays across test runs"
    ],
    specs: [
      { label: "Tracing Standard", value: "OpenTelemetry W3C" },
      { label: "Span Resolution", value: "Sub-Millisecond" },
      { label: "Error Classification", value: "AI Root-Cause Model" },
      { label: "Export Protocol", value: "OTLP HTTP / gRPC" }
    ],
    tagColor: "emerald"
  },
  {
    id: "audit-reporting-export",
    name: "Audit-Ready Reporting & Export",
    shortName: "REPORTS & AUDIT",
    categoryTag: "GOVERNANCE · TEST AUDIT & COMPLIANCE",
    headline: "Compliance-Grade Execution Evidence",
    description: "Generate comprehensive, audit-ready verification reports complete with full screenshot timelines, trace logs, network HAR files, and executive summary dashboards.",
    bullets: [
      "Self-contained interactive HTML reports with embedded video replays and console logs",
      "Executive PDF summary reports designed for compliance auditors and release managers",
      "Automated cloud sync pushing test run metrics directly into Supabase analytics dashboards"
    ],
    specs: [
      { label: "Report Formats", value: "Interactive HTML, JSON, PDF" },
      { label: "Evidence Capture", value: "Screenshots, DOM, Network HAR" },
      { label: "Cloud Storage", value: "Supabase S3 Compatible" },
      { label: "Compliance Grade", value: "Release Audit Ready" }
    ],
    tagColor: "teal"
  }
];

export const qaTestingConnectorCatalog = [
  { name: "Playwright Chromium Engine", status: "LIVE (Bundled Local Runner)", uptime: "100%" },
  { name: "Windows UI Automation (UIA)", status: "LIVE (COM / pywinauto Adapter)", uptime: "99.9%" },
  { name: "Virtual Webcam Media Streamer", status: "LIVE (Y4M Biometric Injection)", uptime: "100%" },
  { name: "OpenTelemetry Span Tracer", status: "LIVE (Microservice Latency & Tracing)", uptime: "100%" }
];

export const qaTestingArchitectureLayers: ArchitectureLayer[] = [
  {
    layerNumber: "01",
    sectionTag: "01 · ZERO-HALLUCINATION TEST CONTRACT ENGINE",
    headline: "Grounded in deterministic UI actions with zero AI drift.",
    description: "Bridge generative AI flexibility with engineering-grade determinism. Every user story translated by Gemini must pass an isolated Contract V2 schema validation gate that rejects hallucinated buttons, invented credentials, and speculative UI interactions.",
    bullets: [
      "Strict action schema enforcement covering goto, click, fill, select, upload_file, and verify",
      "Accessible locator resolution rejecting ambiguous multiple-element matches",
      "Hard boundary isolation preventing arbitrary hardware, backend database, or network spoofing from masquerading as UI clicks"
    ],
    tags: ["Contract Version 2", "Accessible Label Strictness", "Windows DPAPI Protected"],
    rightBoxTitle: "Active Knowledge Ingestion Mesh",
    rightBoxSubtitle: "Contract Schema Validator V2 & Storage",
    rightBoxItems: [
      { label: "Project Test Case Library", status: "Connected (Supabase Cloud Sync)" },
      { label: "Local DPAPI Encrypted Vault", status: "Connected (AES-Protected Variables)" },
      { label: "Project Asset Storage", status: "Connected (Private In-Memory Chunks)" },
      { label: "Contract Schema Validator V2", status: "Active (100% Strict Type Verification)" }
    ]
  },
  {
    layerNumber: "02",
    sectionTag: "02 & 03 · ENTERPRISE ASSERTION & TRACE OBSERVABILITY",
    headline: "Enterprise assertion verification with full trace observability.",
    description: "Separate physical UI click completion from verified business outcomes. The QA-AI verification pipeline continuously inspects DOM states, URL routing, input field values, and microservice HTTP response codes to detect functional regressions instantly.",
    bullets: [
      "Multi-condition assertion checks verifying visible text, URL targets, field values, and element states",
      "Integrated OpenTelemetry distributed tracing correlating browser actions with backend API failure codes",
      "Intelligent failure diagnostics classifying errors into overlay blockers, ambiguous selectors, or network timeouts with actionable recommendations"
    ],
    tags: ["Verified Assertions", "OTel Tracing", "Smart Failure Classification"],
    rightBoxTitle: "Unified Model Topology",
    rightBoxSubtitle: "Test Definition to Verified Assertion",
    rightBoxItems: [
      { label: "Test Definition", status: "Contract Schema Validator" },
      { label: "Smart Selector Resolver", status: "Bundled Playwright / UIA Engine" },
      { label: "OTel Trace Interceptor", status: "Failure Diagnostic Classifier" }
    ]
  },
  {
    layerNumber: "04",
    sectionTag: "04 · DUAL-SURFACE HYBRID RUNTIME ENGINE",
    headline: "High-precision Playwright Chromium & Native Windows UIA execution.",
    description: "Execute end-to-end user journeys seamlessly across modern web applications and complex Windows legacy desktop software. A unified runner orchestrates browser automation, window hierarchy discovery, and native control interaction from a single workstation.",
    bullets: [
      "Bundled local Playwright Chromium engine with headed/headless switching and zero external Node.js requirements",
      "Native Windows UI Automation (UIA) worker with live running-window control discovery and atomic inspection",
      "FFmpeg-backed virtual webcam stream pipeline injecting custom Y4M video streams to bypass biometric facial authentication in automated CI/CD pipelines"
    ],
    tags: ["Dual-Surface Hybrid", "Native Windows UIA", "Virtual Webcam Injection"],
    rightBoxTitle: "Runtime Execution Topology",
    rightBoxSubtitle: "Dual-Engine Workstation Execution",
    rightBoxItems: [
      { label: "Playwright Chromium Worker", status: "Headed / Headless Swappable" },
      { label: "Windows UIA COM Adapter", status: "Live Win32 / WPF Tree Discovery" },
      { label: "FFmpeg Y4M Video Streamer", status: "Biometric WebRTC Bypass Ready" }
    ]
  }
];

export const qaTestingDeploymentEditions: DeploymentEdition[] = [
  {
    tier: "Authoring",
    cardTag: "ISOLATED DESKTOP WORKSPACE & RUNNER",
    title: "QA-AI Desktop Studio",
    subtitle: "Build, inspect, and run web and native Windows test suites locally with zero cloud dependencies. Built for QA Automation Engineers, SDETs, and Enterprise Release Teams.",
    badge: "WORKSTATION STUDIO",
    bullets: [
      "Self-contained installer bundling Python 3.11+, Playwright Chromium, and FFmpeg without prerequisite setup",
      "Live desktop window inspector discovering Win32/WPF/Electron control trees with zero code",
      "Interactive live execution console with millisecond-precision step timing and live screenshot capture",
      "Standalone offline report generation exporting self-contained HTML, raw JSON, and styled PDF files"
    ],
    primaryCtaText: "Explore Desktop Studio Specs →",
    specs: [
      { label: "Primary Persona", value: "SDETs & QA Engineers" },
      { label: "Runtime", value: "Bundled Python + Playwright" },
      { label: "Desktop Access", value: "Native Windows UIA COM" },
      { label: "Offline Mode", value: "100% Fully Functional" }
    ],
    consoleTitle: "Local Workstation Execution",
    consoleItems: [
      { label: "Active Workspace", value: "Enterprise Release Cluster" },
      { label: "Execution Runtime", value: "Bundled Python Engine + Playwright Chromium" },
      { label: "Windows UIA Status", value: "Active (Live Handle & Control Discovery)" },
      { label: "Security Mode", value: "Localhost Token-Gated (X-QA-AI-Token Active)" }
    ]
  },
  {
    tier: "Cloud & Governance",
    cardTag: "COLLABORATIVE CLOUD & ASSET GOVERNANCE",
    title: "QA-AI Cloud Hub & Supabase Services",
    subtitle: "Centralize test case libraries, manage versioned project assets, and synchronize test execution history securely across distributed development teams. Built for VP of Engineering, QA Leads, and DevOps Teams.",
    badge: "ENTERPRISE CLOUD HUB",
    bullets: [
      "Multi-device test case and suite synchronization with automatic local cache recovery",
      "Centralized project asset vault storing test spreadsheets, media assets, and biometric bypass videos",
      "Strict zero-secret client design: server-role keys and master credentials never touch the client",
      "Team-wide execution analytics, historical pass/fail velocity tracking, and audit-ready test reports"
    ],
    primaryCtaText: "Explore Enterprise Cloud Specs ↗",
    specs: [
      { label: "Primary Persona", value: "QA Leads & DevOps Directors" },
      { label: "Cloud Engine", value: "Supabase PostgreSQL + RLS" },
      { label: "Asset Storage", value: "Private S3-Compatible Buckets" },
      { label: "Security", value: "Zero Server-Secret Leak" }
    ],
    consoleTitle: "Cloud Services Endpoint",
    consoleItems: [
      { label: "Connected Endpoint", value: "https://api.qa-ai.internal/v1" },
      { label: "Cloud Data Engine", value: "Supabase Cloud (PostgreSQL + RLS + Storage)" },
      { label: "Project Assets", value: "Private S3/Storage Buckets (Biometric Media & Chunks)" },
      { label: "Authentication", value: "Supabase Auth with Role-Based Access Controls" }
    ]
  }
];
