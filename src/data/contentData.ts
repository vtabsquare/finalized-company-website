import { Product, AiEmployee, Innovation, CareerRole } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'ai-reporting-platform',
    title: 'AI Reporting Platform',
    shortDescription: 'Transform raw data into interactive dashboards with AI-powered insights, natural language queries, automated analytics, and enterprise-grade reporting.',
    fullDescription: 'Our flagship AI Reporting Platform connects seamlessly with your enterprise data warehouses, streaming systems, and databases. Powered by LLMs and domain-trained statistical engines, it allows business leaders to query complex datasets using natural language, auto-generate real-time Power BI and web dashboards, and receive proactive anomaly alerts before KPIs drift.',
    category: 'Analytics & BI',
    tags: ['Power BI', 'Python', 'AI Analytics', 'Data Warehouse'],
    impactMetric: '10x Faster Executive Reporting',
    keyFeatures: [
      'Natural Language to SQL & DAX Generation',
      'Automated Executive Insights & Trend Narratives',
      'Real-time Anomaly Detection & Predictive Alerts',
      'Multi-source ETL with Zero Data Latency'
    ],
    techStack: ['Python', 'Power BI', 'PostgreSQL', 'Azure Synapse', 'OpenAI/Gemini LLM', 'React'],
    iconName: 'BarChart3',
    featured: true,
    imageUrl: '/src/assets/images/ai_reporting_dashboard_1784778548313.jpg',
    demoSnippet: {
      type: 'chart',
      previewHeadline: 'Query: "Show Q3 Margin Growth by Region"',
      metrics: [
        { label: 'Q3 Revenue', value: '$4.82M', color: 'text-emerald-400' },
        { label: 'DAX Formulas', value: 'Auto-Generated', color: 'text-cyan-400' },
        { label: 'Latency', value: '18ms', color: 'text-blue-400' }
      ]
    }
  },
  {
    id: 'qlik-to-powerbi-migration',
    title: 'Qlik to Power BI Migration',
    shortDescription: 'Automatically convert legacy Qlik applications into modern Power BI dashboards while preserving business logic, KPIs, and reporting structure.',
    fullDescription: 'Say goodbye to manual, month-long migration projects. Our AI-driven migration engine parses Qlik script files (.qvw, .qvd), interprets complex expressions and set-analysis logic, and automatically synthesizes equivalent Power BI datasets, DAX measures, and visual layouts with 99.4% accuracy.',
    category: 'Database & Migration',
    tags: ['Migration', 'Power BI', 'Automation', 'Qlik Sense'],
    impactMetric: '80% Reduction in Migration Cost',
    keyFeatures: [
      'Automated Qlik Script & Set Analysis Parsing',
      'Intelligent Qlik Expression to DAX Translation',
      'Data Model & Relationship Reconstruction',
      'Automated Visual Layout & KPI Reconciliation'
    ],
    techStack: ['Python AST Parser', 'Power BI REST API', 'DAX Compiler', 'TypeScript'],
    iconName: 'ArrowLeftRight',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    demoSnippet: {
      type: 'code',
      previewHeadline: 'Qlik Set Analysis ➔ Power BI DAX Conversion',
      metrics: [
        { label: 'Accuracy', value: '99.4%', color: 'text-emerald-400' },
        { label: 'Time Saved', value: '45 Days', color: 'text-purple-400' },
        { label: 'Calculations', value: '1,420 Measures', color: 'text-cyan-400' }
      ]
    }
  },
  {
    id: 'gbti-smart-home-builder',
    title: 'GBTI Smart Home Builder',
    shortDescription: 'An intelligent platform that simplifies home construction planning, estimation, project tracking, and customer collaboration using AI.',
    fullDescription: 'Designed for residential and commercial builders, GBTI Smart Home Builder integrates computer vision, blueprint parsing, and predictive project management. It bridges the gap between client expectations, material procurement, site tracking, and financial estimations.',
    category: 'AI Vision & Construction',
    tags: ['AI Construction', 'Estimation', 'Tracking', 'Computer Vision'],
    impactMetric: '35% Higher On-Time Delivery',
    keyFeatures: [
      'AI Blueprint Parsing & 3D Spatial Estimation',
      'Real-time Site Milestone Tracking via Vision AI',
      'Dynamic Material Cost & Vendor Allocation',
      'Interactive Client Portal & 3D Render Walkthroughs'
    ],
    techStack: ['Python', 'OpenCV', 'TensorFlow', 'React', 'Node.js', 'FastAPI'],
    iconName: 'Home',
    featured: true,
    imageUrl: '/src/assets/images/ai_construction_blueprint_1784778562638.jpg',
    demoSnippet: {
      type: 'blueprint',
      previewHeadline: '3D CAD Blueprint Vision Parsing Active',
      metrics: [
        { label: 'Rooms Detected', value: '14 Areas', color: 'text-cyan-400' },
        { label: 'Milestone Sync', value: 'Real-time', color: 'text-emerald-400' },
        { label: 'Estimate Accuracy', value: '98.8%', color: 'text-blue-400' }
      ]
    }
  },
  {
    id: 'buildsmart-estimator',
    title: 'BuildSmart Estimator',
    shortDescription: 'AI-powered construction cost estimation with automated quantity calculations, pricing intelligence, and project forecasting.',
    fullDescription: 'BuildSmart Estimator turns architectural drawings and CAD files into instant, high-precision BoQ (Bill of Quantities) estimates. It analyzes historical supplier rates, local labor indexes, and market fluctuations to deliver bankable project quotes in minutes.',
    category: 'AI Vision & Construction',
    tags: ['Cost Estimation', 'AI Forecasting', 'Quantity Calc', 'Construction'],
    impactMetric: '90% Time Saved in Estimations',
    keyFeatures: [
      'Automated Takeoff & Quantity Extractions',
      'Dynamic Inflation & Material Price Forecasting',
      'Subcontractor Bid Comparison & Scoring',
      'Export to Primavera, MS Project, and Excel'
    ],
    techStack: ['Python PyMuPDF', 'PyTorch', 'FastAPI', 'Pandas', 'React'],
    iconName: 'Calculator',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    demoSnippet: {
      type: 'chart',
      previewHeadline: 'BoQ Auto-Calculated from PDF Drawing',
      metrics: [
        { label: 'Concrete & Steel', value: '$840k', color: 'text-emerald-400' },
        { label: 'Supplier Rate', value: 'Live Index', color: 'text-amber-400' },
        { label: 'Time to Quote', value: '2.5 Mins', color: 'text-cyan-400' }
      ]
    }
  },
  {
    id: 'faceauth',
    title: 'FaceAuth Enterprise',
    shortDescription: 'Secure facial recognition authentication platform supporting modern identity verification and attendance management.',
    fullDescription: 'FaceAuth delivers millisecond-level biometric authentication with anti-spoofing 3D liveness detection. Built for enterprise access control, remote workforce verification, and industrial time tracking without physical contact.',
    category: 'AI Vision & Construction',
    tags: ['Facial Recognition', 'Biometrics', 'Attendance', 'Security'],
    impactMetric: '99.9% Liveness Accuracy',
    keyFeatures: [
      '3D Passive Liveness & Anti-Spoofing Guard',
      'Edge-based On-Device Facial Feature Vectorizing',
      'Touchless Attendance & Geo-fenced Check-ins',
      'Enterprise SSO & Active Directory Integration'
    ],
    techStack: ['PyTorch', 'ONNX Runtime', 'WebRTC', 'React', 'Docker'],
    iconName: 'ScanFace',
    featured: true,
    imageUrl: '/src/assets/images/faceauth_biometric_1784778584512.jpg',
    demoSnippet: {
      type: 'biometric',
      previewHeadline: 'Biometric 3D Mesh Vectorizing',
      metrics: [
        { label: 'Match Latency', value: '14ms', color: 'text-emerald-400' },
        { label: 'Liveness Guard', value: 'Active', color: 'text-cyan-400' },
        { label: 'FAR Ratio', value: '< 0.0001%', color: 'text-blue-400' }
      ]
    }
  },
  {
    id: 'packaging-optimization-platform',
    title: 'Packaging Optimization Platform',
    shortDescription: 'AI-driven packaging optimization that reduces costs, improves logistics efficiency, and enhances production planning.',
    fullDescription: 'By applying 3D spatial bin packing algorithms combined with neural machine learning, this platform computes the mathematically optimal package sizes, cushioning requirements, and container loading schedules to drastically cut material waste and freight expenses.',
    category: 'Logistics',
    tags: ['Logistics', 'Production', 'AI Packaging', 'Supply Chain'],
    impactMetric: '22% Freight Cost Savings',
    keyFeatures: [
      '3D Bin-Packing Optimization & Cushion Calculation',
      'Carbon Footprint & Material Sustainability Indexing',
      'Production Line Box Recommendation API',
      'Warehouse WMS & ERP Deep Integration'
    ],
    techStack: ['Python OR-Tools', 'NumPy', '3D Three.js', 'Express', 'React'],
    iconName: 'PackageCheck',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    demoSnippet: {
      type: '3d',
      previewHeadline: '3D Spatial Bin Packing Engine',
      metrics: [
        { label: 'Space Utilization', value: '94.2%', color: 'text-emerald-400' },
        { label: 'Freight Savings', value: '22%/mo', color: 'text-purple-400' },
        { label: 'Box Types', value: '4 Sizes', color: 'text-cyan-400' }
      ]
    }
  },
  {
    id: 'ai-l1-support-agent',
    title: 'AI L1 Support Agent',
    shortDescription: 'An intelligent IT support assistant capable of resolving Level-1 issues automatically using knowledge retrieval, workflow automation, and conversational AI.',
    fullDescription: 'An autonomous digital IT technician that integrates with Slack, Teams, ServiceNow, and Jira. It troubleshoots VPN issues, resets credentials, provisions software access, and guides employees through IT workflows with zero human agent intervention.',
    category: 'Enterprise Automation',
    tags: ['Knowledge Retrieval', 'Automation', 'Conversational AI', 'ITSM'],
    impactMetric: '75% L1 Tickets Auto-Resolved',
    keyFeatures: [
      'RAG Knowledge Base & Policy Search',
      'Automated Active Directory & Okta Actions',
      'Multi-channel Support (Slack, Teams, Web, Email)',
      'Seamless Escalation to L2/L3 with Context Summaries'
    ],
    techStack: ['LangChain / LlamaIndex', 'Pinecone VectorDB', 'Node.js', 'React'],
    iconName: 'Headphones',
    featured: true,
    imageUrl: '/src/assets/images/ai_support_agent_1784778598154.jpg',
    demoSnippet: {
      type: 'chat',
      previewHeadline: 'Autonomous Ticket #4920 Resolution',
      metrics: [
        { label: 'Response Time', value: '0.8 Sec', color: 'text-emerald-400' },
        { label: 'Auto-Resolved', value: '75%', color: 'text-cyan-400' },
        { label: 'Integrations', value: 'ServiceNow/Okta', color: 'text-blue-400' }
      ]
    }
  },
  {
    id: 'postgresql-to-sqlserver-migration',
    title: 'PostgreSQL to SQL Server Migration',
    shortDescription: 'Automated database migration platform ensuring schema conversion, data validation, and minimal downtime.',
    fullDescription: 'Migrate mission-critical relational databases smoothly. Our migration tool parses PL/pgSQL functions, triggers, and stored procedures, converting them into equivalent T-SQL statements with live side-by-side data checksum validation.',
    category: 'Database & Migration',
    tags: ['Schema Conversion', 'Data Validation', 'Database', 'SQL Server'],
    impactMetric: 'Zero Data Loss & 99% Uptime',
    keyFeatures: [
      'Automated PL/pgSQL to T-SQL Code Translation',
      'Parallel High-Throughput Data Transfer Pipeline',
      'Continuous Change Data Capture (CDC) Sync',
      'Automated Row & Column Level Checksum Auditing'
    ],
    techStack: ['Go', 'Python AST Engine', 'PostgreSQL', 'Microsoft SQL Server'],
    iconName: 'DatabaseZap',
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1200&q=80',
    demoSnippet: {
      type: 'code',
      previewHeadline: 'PL/pgSQL ➔ T-SQL AST Translator',
      metrics: [
        { label: 'Checksum Audit', value: '100% Match', color: 'text-emerald-400' },
        { label: 'Throughput', value: '250k rows/s', color: 'text-cyan-400' },
        { label: 'Downtime', value: 'Near-Zero', color: 'text-blue-400' }
      ]
    }
  }
];

export const AI_EMPLOYEES: AiEmployee[] = [
  {
    id: 'ai-meeting-assistant',
    title: 'AI Meeting Assistant',
    role: 'Autonomous Executive Secretary',
    description: 'Automatically joins video calls, transcribes multilingual conversations, isolates action items, generates executive summaries, and sends minute notes to attendees.',
    icon: 'Video',
    badge: 'Meeting Intelligence',
    capabilities: [
      'Multilingual transcription & speaker identification',
      'Instant extraction of decisions & assigned action items',
      'Automatic sync to Jira, Asana, and Google Workspace',
      'Custom email minute generation for key stakeholders'
    ],
    samplePrompt: "Summarize the quarterly product roadmap meeting and draft action items for Engineering.",
    sampleOutput: "✅ Decision: Approved v2.4 launch date for Oct 15.\n📌 Action Item: @Alex (Eng) to deploy staging environment by Friday.\n📌 Action Item: @Sarah (Design) to finalize dark-mode component tokens."
  },
  {
    id: 'ai-data-analyst',
    title: 'AI Data Analyst',
    role: 'Autonomous Business Intelligence Specialist',
    description: 'Connects directly to your SQL databases or data lakes. Answers complex business questions, writes optimized SQL/DAX queries, and auto-generates visual charts.',
    icon: 'PieChart',
    badge: 'Real-time Analytics',
    capabilities: [
      'Natural language to SQL / DAX query synthesis',
      'Cohort analysis & churn forecasting models',
      'Auto-generation of interactive charts & reports',
      'Proactive notification on statistical anomalies'
    ],
    samplePrompt: "Which product line had the highest revenue margin growth in Q2 compared to Q1?",
    sampleOutput: "📊 Result: AI Reporting Platform recorded a 42.8% margin expansion in Q2 ($1.2M -> $1.71M), driven by reduced cloud compute overhead."
  },
  {
    id: 'ai-support-engineer',
    title: 'AI Support Engineer',
    role: '24/7 Tier-1 IT & Operations Specialist',
    description: 'Monitors incoming tickets and Slack messages. Autonomously troubleshoots infrastructure alerts, resets user permissions, and executes IT workflows.',
    icon: 'Cpu',
    badge: 'Autonomous ITSM',
    capabilities: [
      'Zero-delay automated resolution of L1 support tickets',
      'Integration with AD, Okta, Jira, ServiceNow, and AWS',
      'Root-cause analysis logs for complex IT incidents',
      'Context-aware escalations to human senior engineers'
    ],
    samplePrompt: "User john.doe@company.com requests access to the staging Kubernetes cluster.",
    sampleOutput: "🔒 Verification: John's manager approved ticket #4920. Executed RBAC policy binding. Access granted for 24 hours. User notified in Slack."
  },
  {
    id: 'ai-reporting-system',
    title: 'AI Reporting System',
    role: 'Enterprise Data Synthesizer',
    description: 'Transforms unstructured data streams, CSVs, and API feeds into published Power BI dashboards with zero manual ETL setup.',
    icon: 'FileSpreadsheet',
    badge: 'Dashboard Automation',
    capabilities: [
      'Automated schema detection & normalization',
      'DAX measure calculation & KPI formulas',
      'Scheduled automated delivery to C-level executives',
      'Interactive drill-downs & scenario modeling'
    ],
    samplePrompt: "Synthesize sales CSVs from 5 global regions into a consolidated KPI dashboard.",
    sampleOutput: "🚀 Complete! Cleaned 142,000 rows, built relationship schema, calculated global MRR, CAC, and LTV metrics. Dashboard live at bi.vtabsquare.com/global-sales."
  },
  {
    id: 'ai-process-automation',
    title: 'AI Process Automation',
    role: 'End-to-End Workflow Coordinator',
    description: 'Orchestrates complex multi-departmental workflows across legacy ERPs, CRM systems, emails, and document repositories.',
    icon: 'Workflow',
    badge: 'Hyper-Automation',
    capabilities: [
      'Unstructured document extraction (Invoices, Contracts, Receipts)',
      'Cross-system RPA & API orchestration',
      'Compliance checking & fraud risk scoring',
      'Self-healing workflow pipelines on API updates'
    ],
    samplePrompt: "Process incoming vendor invoice #INV-8891 and reconcile with PO #9921 in SAP.",
    sampleOutput: "⚡ Matched 100% line items. Total $14,250 verified against PO #9921. Sent to Finance queue for 1-click batch payment."
  }
];

export const INNOVATIONS_DATA: Innovation[] = [
  {
    id: 'ai-meeting-assistant-innov',
    title: 'AI Meeting Assistant',
    tagline: 'Never take meeting notes manually again',
    description: 'Automatically joins meetings, understands multilingual conversations, creates summaries, action items, and emails minutes instantly.',
    icon: 'Mic',
    status: 'Alpha Testing',
    highlights: [
      'Real-time speaker sentiment & engagement index',
      'Automatic task assignment into Jira & Trello',
      'Support for 40+ languages with domain dialect tuning',
      '1-click audio replay keyed to key decisions'
    ]
  },
  {
    id: 'ai-hr-assistant',
    title: 'AI HR Assistant',
    tagline: 'End-to-end talent acquisition and onboarding intelligence',
    description: 'Automates resume screening, interview scheduling, candidate scoring against technical job descriptions, offer letter drafting, and employee onboarding.',
    icon: 'Users',
    status: 'In Development',
    highlights: [
      'Bias-free candidate resume scoring & skill matrix',
      'Autonomous multi-party calendar scheduling',
      'Automated technical interview screening questions',
      'Personalized employee onboarding roadmaps'
    ]
  },
  {
    id: 'ai-business-analyst',
    title: 'AI Business Analyst',
    tagline: 'Turn vague client requirements into production-ready specs',
    description: 'Converts unstructured client discussion notes or recorded audio into formal Business Requirement Documents (BRDs), User Stories, Test Cases, and System Architecture suggestions.',
    icon: 'FileText',
    status: 'Private Beta',
    highlights: [
      'Audio-to-BRD pipeline with confidence scoring',
      'Auto-generated user stories & acceptance criteria',
      'System architecture diagram suggestions',
      'Test case generation from business requirements'
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'AI First',
    description: 'Every solution is designed with Artificial Intelligence at its core, not slapped on as a marketing gimmick.',
    icon: 'Sparkle'
  },
  {
    title: 'Enterprise Ready',
    description: 'Scalable, secure, SOC2-compliant, and production-grade software engineered for critical business workloads.',
    icon: 'ShieldCheck'
  },
  {
    title: 'Rapid Innovation',
    description: 'From concept and architecture to production deployment in weeks, not years, accelerating time-to-value.',
    icon: 'Zap'
  },
  {
    title: 'Custom AI Development',
    description: 'Every organization is unique. We build tailored AI systems, custom fine-tuned models, and domain workflows.',
    icon: 'Wrench'
  },
  {
    title: 'Data Intelligence',
    description: 'Unlock insights hidden deep inside your enterprise data warehouses, legacy files, and unstructured repositories.',
    icon: 'Brain'
  },
  {
    title: 'End-to-End Delivery',
    description: 'Full lifecycle coverage: Consulting -> Architecture -> Development -> Deployment -> Managed AI Support.',
    icon: 'Layers'
  }
];

export const IMPACT_NUMBERS = [
  { label: 'AI Products', value: '8+', description: 'Production-ready solutions', suffix: '' },
  { label: 'Automation Modules', value: '25+', description: 'Plug & play AI modules', suffix: '' },
  { label: 'Business Processes Automated', value: '100+', description: 'Across global enterprises', suffix: '' },
  { label: 'Reduction in Manual Effort', value: '95%', description: 'Measured operational savings', suffix: '' },
  { label: 'AI Availability', value: '24/7', description: 'Autonomous uptime guard', suffix: '' }
];

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'senior-ai-engineer',
    title: 'Senior AI / LLM Engineer',
    department: 'AI Engineering',
    location: 'Hybrid / Remote',
    type: 'Full-time',
    experience: '4+ Years',
    description: 'Lead the architecture and deployment of fine-tuned domain LLM agents, RAG systems, and high-throughput AI API pipelines.',
    requirements: ['Experience with PyTorch, Transformers, LangChain, LlamaIndex', 'Python, FastAPI, Docker, K8s', 'Vector databases (Pinecone, Qdrant, Milvus)', 'Enterprise LLM evaluation & fine-tuning']
  },
  {
    id: 'powerbi-ai-architect',
    title: 'Power BI & AI Analytics Architect',
    department: 'Data & Analytics',
    location: 'Hybrid / Remote',
    type: 'Full-time',
    experience: '5+ Years',
    description: 'Architect next-generation AI-powered Power BI reporting solutions, automated migration pipelines, and enterprise data models.',
    requirements: ['Deep DAX, Power Query, and M scripting mastery', 'Python data science stack (Pandas, PySpark, NumPy)', 'Experience with Qlik Sense to Power BI migrations', 'Enterprise Azure Synapse / Snowflake data warehousing']
  },
  {
    id: 'fullstack-ai-developer',
    title: 'Full Stack AI Developer (React + Node + Python)',
    department: 'Product Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'Build sleek, futuristic glassmorphism UI interfaces for AI products, integrating real-time agent web sockets and LLM streams.',
    requirements: ['React, TypeScript, Tailwind CSS, Motion', 'Node.js, Express, Python FastAPI', 'Real-time WebSocket & SSE streaming experience', 'Clean component architecture & UX polish']
  }
];
