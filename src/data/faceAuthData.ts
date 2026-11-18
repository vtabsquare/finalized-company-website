export interface FaceAuthWorkflowStep {
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

export interface FaceAuthFeatureItem {
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

export interface FaceAuthEdition {
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

export const FACEAUTH_CONFIG = {
  name: 'FaceAuth Biometric Attendance & Security Suite',
  shortName: 'FaceAuth Enterprise',
  topBadge: 'FACEAUTH BIOMETRIC ATTENDANCE & SECURITY SUITE · V2.4.1 PRODUCTION',
  tagline: 'Engineered for zero-trust biometric verification and workforce integrity.',
  description: 'From browser-based HD facial capture and sub-millisecond 128D vector embedding to automated geo-spatial fence verification and enterprise cloud sync, every check is optimized for instantaneous, fraud-proof attendance validation.',
  version: 'Enterprise Cloud · v2.4.1 PRODUCTION',
  categoryLabel: 'AI VISION & BIOMETRIC CYBER-DEFENSE',
  impactMetric: 'Sub-350ms Verification & 99.8% Precision',
  techStack: ['Python', 'OpenCV / dlib', 'React 18', 'Microsoft Dataverse OData v9.2', 'Azure AD MSAL', 'WebRTC', 'Brevo SMTP', 'Docker']
};

export const FACEAUTH_WORKFLOW_STEPS: FaceAuthWorkflowStep[] = [
  {
    step: '01',
    title: 'Capture & Extract',
    subtitle: 'High-definition webcam & edge frame decoding',
    description: 'Client-side video stream processing, dynamic canvas frame extraction, and automated liveness framing across all standard web and mobile browsers.',
    bullets: [
      'Cross-platform WebRTC camera stream capture with zero client software installation',
      'Real-time client-side frame scaling with WebGL edge rendering for optimal network transmission',
      'Auto-normalization and illumination balancing before facial vectorization'
    ],
    icon: 'Camera',
    terminalTitle: 'Pipeline Flow State — Biometric Ingestion Gateway',
    terminalLines: [
      { label: 'WebRTC Video Feed', status: 'LIVE', mode: 'HD 1080p Stream Active' },
      { label: 'dlib ResNet-34 Feature Extractor', status: 'LIVE', mode: '128D Deep CNN Model' },
      { label: 'Haversine GPS Distance Mesh', status: 'LIVE', mode: 'Geodesic Coordinate Auditor' },
      { label: 'Microsoft Dataverse API v9.2', status: 'LIVE', mode: 'Azure AD Bearer Authenticated' }
    ],
    terminalSummary: 'Anti-spoofing filter enabled: 99.4% of unauthorized attempts and proxy check-ins rejected before record commit.',
    bottomBadges: ['Zero Local Biometric Storage', 'Client-Side Cryptographic Session', 'TLS 1.3 Strict']
  },
  {
    step: '02',
    title: 'Detect & Embed',
    subtitle: 'Deep CNN 128-dimensional facial vectorization',
    description: 'Transform raw facial pixels into irreversible 128-dimensional Euclidean feature vectors. Raw image buffers are purged immediately from RAM upon mathematical extraction.',
    bullets: [
      'dlib ResNet-34 deep metric learning generating one-way mathematical face representations',
      'Instant memory sanitization ensuring zero persistent raw employee facial photography',
      'Resilient facial landmark localization across diverse lighting conditions and angles'
    ],
    icon: 'ScanFace',
    terminalTitle: 'Deep CNN Feature Extraction Engine',
    terminalLines: [
      { label: 'Face Detection Model', status: 'ACTIVE', mode: 'Histogram of Oriented Gradients (HOG)' },
      { label: 'Facial Landmark Alignment', status: 'ACTIVE', mode: '68-Point Geometric Coordinate Mapping' },
      { label: '128D Vector Projector', status: 'ACTIVE', mode: 'ResNet Metric Space Embedding' },
      { label: 'Pixel Buffer Sanitizer', status: 'PURGED', mode: 'Zero Raw Image Persistence in RAM' }
    ],
    terminalSummary: 'Facial embedding computed in 14ms. Non-reversible 128-dimensional float array dispatched for matching.',
    bottomBadges: ['128D Mathematical Vector', 'Zero Raw Image Exposure', 'Anti-Replay Guard']
  },
  {
    step: '03',
    title: 'Match & Geofence',
    subtitle: 'Haversine coordinate auditing & vector distance scoring',
    description: 'Evaluate Euclidean distance against enrolled employee vectors while computing geodesic distance between check-in and check-out GPS coordinates.',
    bullets: [
      'Euclidean vector distance thresholding calibrated for 99.8% biometric verification accuracy',
      'Haversine geodesic equation evaluating physical coordinates against organizational work zones',
      'Automated 500-meter anomaly threshold flagging location mismatches instantaneously'
    ],
    icon: 'MapPin',
    terminalTitle: 'Biometric Matching & Geofence Auditor',
    terminalLines: [
      { label: 'Vector Euclidean Distance', status: 'PASS', mode: 'Distance: 0.38 (Threshold < 0.60)' },
      { label: 'Biometric Confidence', status: 'PASS', mode: '99.8% Identity Match Confirmed' },
      { label: 'GPS Coordinate Validator', status: 'ENFORCED', mode: 'Lat/Long: High-Accuracy Fix' },
      { label: 'Haversine Displacement', status: 'PASS', mode: '42m from Registered Base (< 500m Limit)' }
    ],
    terminalSummary: 'Match Verified: Employee identity authenticated and physical location within approved zone.',
    bottomBadges: ['Euclidean Matching', 'Haversine Geofencing', 'Anomaly Detection']
  },
  {
    step: '04',
    title: 'Sync & Alert',
    subtitle: 'Microsoft Dataverse cloud integration & security telemetry',
    description: 'Commit immutable check-in logs to Microsoft Dataverse via Azure AD App Registration, and dispatch transactional alerts for security anomalies.',
    bullets: [
      'Direct OData v4.0 REST transactions to Microsoft Dataverse attendance entities',
      'Automated OAuth2 token refresh pooling via Microsoft Authentication Library (MSAL)',
      'Sub-second Brevo transactional email notifications dispatched to HR and security leads'
    ],
    icon: 'CloudSync',
    terminalTitle: 'Dataverse Cloud Ingestion & Alert Dispatch',
    terminalLines: [
      { label: 'Dataverse User Entity', status: 'CONNECTED', mode: 'crc6f_faceappuserses Synced' },
      { label: 'Attendance Ledger', status: 'COMMITTED', mode: 'crc6f_hr_faceappattendances Created' },
      { label: 'Azure AD Bearer Token', status: 'VALID', mode: 'MSAL Confidential Client Pool' },
      { label: 'Brevo Alert Gateway', status: 'STANDBY', mode: 'Zero Discrepancy Flags Active' }
    ],
    terminalSummary: 'Session #8920 committed to Dataverse in 120ms. Attendance record synchronized with enterprise payroll.',
    bottomBadges: ['Microsoft Dataverse v9.2', 'Azure AD MSAL', 'Brevo SMTP Dispatch']
  }
];

export const FACEAUTH_FEATURE_ITEMS: FaceAuthFeatureItem[] = [
  {
    id: 'facial-biometric-auth',
    category: 'Facial Biometric Authentication',
    shortTag: 'AUTH',
    title: 'Sub-Millisecond Facial Matching & Verification',
    description: 'Compare live client capture against enrolled 128D mathematical embeddings with zero raw photo persistence, ensuring absolute compliance and uncompromised employee privacy.',
    highlightPoints: [
      'Euclidean vector distance matching threshold calibrated for 99.8% precision',
      'Zero raw facial image storage—only one-way 128-dimensional vector floats',
      'Automatic session authorization and instant audit timestamp generation'
    ],
    specs: [
      { label: 'ALGORITHM', value: 'dlib ResNet-34 CNN' },
      { label: 'DIMENSIONS', value: '128D Float Vector' },
      { label: 'PRECISION', value: '99.8% Match Rate' }
    ],
    terminalTitle: 'Biometric Verification Engine State',
    terminalLines: [
      { label: 'Microsoft Dataverse (Azure AD OData)', status: 'LIVE', mode: '100% Operational' },
      { label: 'Brevo Transactional Email Gateway', status: 'LIVE', mode: 'Sub-second Alerts' },
      { label: 'Browser GeoLocation API', status: 'LIVE', mode: 'High-Accuracy GPS' },
      { label: 'Session Encryption & PBKDF2', status: 'LIVE', mode: 'AES-256 / SHA-256' }
    ],
    securityNotice: 'Automatic TLS 1.3 transit encryption and zero raw biometric retention active.'
  },
  {
    id: 'dynamic-geofencing',
    category: 'Dynamic Geo-Spatial Fencing',
    shortTag: 'GEOFENCE',
    title: 'Haversine Geo-Spatial Verification & Anti-Spoofing',
    description: 'Validate the physical integrity of every punch-in and punch-out. FaceAuth computes the straight-line Haversine geodesic distance between login and logout coordinates, automatically flagging location spoofing.',
    highlightPoints: [
      'Real-time dual-point GPS validation comparing entry and exit device coordinates',
      'Automated 500-meter threshold breach detection with direct Google Maps geo-link dispatch',
      'Instantaneous Brevo SMTP security notifications sent to security and HR leadership'
    ],
    specs: [
      { label: 'GEO ALGORITHM', value: 'Haversine Spherical Law' },
      { label: 'TOLERANCE', value: '500m Configurable Gate' },
      { label: 'DISPATCH', value: 'Brevo Real-Time SMTP' }
    ],
    terminalTitle: 'Geo-Spatial Validation Mesh',
    terminalLines: [
      { label: 'Entry Coordinate Fix', status: 'RESOLVED', mode: 'High Accuracy GPS Lock' },
      { label: 'Exit Coordinate Fix', status: 'RESOLVED', mode: 'Real-Time Triangulation' },
      { label: 'Haversine Calculation', status: 'COMPUTED', mode: 'Δ = 38.4 meters' },
      { label: 'Location Mismatch Check', status: 'PASS', mode: 'Within Authorized Workplace Zone' }
    ],
    securityNotice: 'Anti-tamper GPS coordinates signed with client timestamp and verified against browser telemetry.'
  },
  {
    id: 'meeting-break-tracking',
    category: 'Meeting & Break Tracking',
    shortTag: 'TRACK',
    title: 'Client Meeting & Productive Time Accounting',
    description: 'Granular workplace event capture for remote and hybrid teams. Track when employees transition between active workstation time, client meetings, and statutory breaks with zero manual log sheets.',
    highlightPoints: [
      'One-click "Start Meeting" and "Resume Work" state machine transitions',
      'Continuous session duration aggregation synced to daily attendance records',
      'Granular visibility into client-facing hours versus internal production'
    ],
    specs: [
      { label: 'STATE MACHINE', value: 'Finite State Work Engine' },
      { label: 'RESOLUTION', value: '1-Second Precision' },
      { label: 'STORAGE', value: 'Dataverse Session Table' }
    ],
    terminalTitle: 'Workforce Activity State Monitor',
    terminalLines: [
      { label: 'Current Session Status', status: 'ACTIVE', mode: 'In Client Meeting #412' },
      { label: 'Meeting Elapsed Time', status: 'RECORDING', mode: '01h 24m 12s' },
      { label: 'Previous Break Duration', status: 'COMMITTED', mode: '15m 00s (Rest Break)' },
      { label: 'Net Productive Hours', status: 'AGGREGATING', mode: '06h 48m Today' }
    ],
    securityNotice: 'State transitions cryptographically bound to user session token with audit lineage.'
  },
  {
    id: 'security-mismatch-alerts',
    category: 'Security Mismatch Alerts',
    shortTag: 'SECURITY',
    title: 'Automated Anomaly Detection & Leadership Alerts',
    description: 'Instant proactive defense against attendance tampering, buddy punching, and location spoofing. Flags discrepancies in real time and automatically alerts supervisors via rich transactional emails.',
    highlightPoints: [
      'Automated trigger when check-in and check-out distance exceeds policy thresholds',
      'Direct embedded Google Maps visual links sent to management in alert emails',
      'Tamper-evident audit flags permanently committed to the Dataverse security ledger'
    ],
    specs: [
      { label: 'ALERT ENGINE', value: 'Brevo Transactional API' },
      { label: 'DISPATCH SPEED', value: '< 800ms End-to-End' },
      { label: 'MAPS LINK', value: 'Dynamic Geo-Coord URLs' }
    ],
    terminalTitle: 'Security Telemetry & Incident Dispatcher',
    terminalLines: [
      { label: 'Coordinate Variance Check', status: 'MONITORED', mode: 'Delta Threshold: 500m' },
      { label: 'Liveness Anti-Spoof', status: 'ARMED', mode: 'Passive Depth & Texture Evaluation' },
      { label: 'Alert Dispatch Pipeline', status: 'READY', mode: 'Brevo SMTP Cloud Integration' },
      { label: 'Incident Audit Trail', status: 'ENFORCED', mode: 'Immutable PostgreSQL / Dataverse' }
    ],
    securityNotice: '100% of detected anomalies dispatches audit records with forensic device details.'
  },
  {
    id: 'self-service-portal',
    category: 'Self-Service Employee Portal',
    shortTag: 'PORTAL',
    title: 'Intuitive Employee Workspace & Punch Interface',
    description: 'Empower employees with an ultra-clean, touchless attendance dashboard. Allows quick clock-in, meeting management, historical log reviews, and secure self-enrollment from any device.',
    highlightPoints: [
      'One-click biometric punch-in and punch-out with live camera alignment',
      'Personal historical attendance log with exact timestamps and session durations',
      'Secure credential management and one-click self-enrollment'
    ],
    specs: [
      { label: 'FRAMEWORK', value: 'React 18 + Tailwind' },
      { label: 'COMPATIBILITY', value: 'Chrome, Edge, Safari, Mobile' },
      { label: 'OFFLINE CACHE', value: 'Session State Recovery' }
    ],
    terminalTitle: 'Employee Client Runtime State',
    terminalLines: [
      { label: 'Webcam Stream Initialization', status: 'READY', mode: 'MediaStream 30fps' },
      { label: 'Face Alignment Guide', status: 'ALIGNED', mode: 'Oval HUD Guide Target Locked' },
      { label: 'Local Session Token', status: 'ENCRYPTED', mode: 'PBKDF2 SHA-256 Session' },
      { label: 'Ledger Query Latency', status: 'OPTIMAL', mode: '64ms Response Time' }
    ],
    securityNotice: 'Zero sensitive credentials or biometric templates cached client-side.'
  },
  {
    id: 'enterprise-dataverse-mesh',
    category: 'Enterprise Dataverse Mesh',
    shortTag: 'DATAVERSE',
    title: 'Microsoft Dataverse Cloud Persistence & Federation',
    description: 'Enterprise-grade data persistence powered by Microsoft Dataverse. Direct OData v9.2 integration via Azure AD App Registration with MSAL OAuth token pooling and exponential backoff.',
    highlightPoints: [
      'Direct integration with Microsoft Dataverse OData REST API v9.2',
      'Automatic OAuth2 token caching and refresh with MSAL Confidential Client',
      'Resilient connection architecture with automated 3-tier exponential backoff retries'
    ],
    specs: [
      { label: 'API STANDARD', value: 'Microsoft OData v4.0' },
      { label: 'AUTH', value: 'Azure AD MSAL OAuth 2.0' },
      { label: 'RESILIENCY', value: 'Exponential Backoff 3x' }
    ],
    terminalTitle: 'Microsoft Cloud Federation Gateway',
    terminalLines: [
      { label: 'Dataverse User Entity', status: 'SYNCHRONIZED', mode: 'crc6f_faceappuserses OData v4.0' },
      { label: 'Attendance Ledger Table', status: 'SYNCHRONIZED', mode: 'crc6f_hr_faceappattendances' },
      { label: 'MSAL Token Pool', status: 'ACTIVE', mode: 'Bearer Token Auto-Refresh Active' },
      { label: 'Retry Circuit Breaker', status: 'STANDBY', mode: 'Zero Network Dropouts Logged' }
    ],
    securityNotice: 'Strict adherence to Microsoft Azure trust boundary and enterprise role-based access control.'
  }
];

export const FACEAUTH_EDITIONS_INFO: { portal: FaceAuthEdition; admin: FaceAuthEdition } = {
  portal: {
    badge: 'EMPLOYEE WORKSPACE & PUNCH INTERFACE',
    name: 'FaceAuth Employee Self-Service Station',
    subtitle: 'Self-Service Employee Touchpoints',
    description: 'Seamlessly punch in/out with instant facial verification, manage active client meetings or breaks, monitor personal attendance history, and update credentials from any authorized workstation or mobile device.',
    targetAudience: 'Built for Hybrid Employees, Remote Teams, and On-Site Enterprise Personnel',
    highlights: [
      'One-click biometric punch-in and punch-out with live camera alignment',
      'Instant "Start Meeting" and "Resume Work" state tracking with zero manual logging',
      'Personal historical attendance log with exact timestamps and session durations',
      'Secure credential management and one-click self-enrollment'
    ],
    actionLabel: 'Launch Employee Portal →',
    consoleTitle: 'Local Workstation Execution — Employee Workspace',
    consoleLines: [
      { label: 'Active Portal:', value: 'Employee Self-Service Workspace', highlight: false },
      { label: 'Camera Engine:', value: 'WebRTC MediaStream Active (HD)', highlight: true },
      { label: 'Biometric Match Status:', value: '128D Vector Match Verified', highlight: true },
      { label: 'Mode:', value: 'Biometric punch, meeting tracker, and daily ledger view', highlight: false }
    ]
  },
  admin: {
    badge: 'ADMINISTRATIVE CONTROL & SECURITY SUITE',
    name: 'FaceAuth Central Command & HR Analytics',
    subtitle: 'Centralized Cloud Administration',
    description: 'Comprehensive visibility and governance across the entire organizational workforce. Onboard employees, manage biometric enrollments, review live daily attendance records, and audit security anomalies in one centralized console.',
    targetAudience: 'Built for HR Directors, Security Compliance Leads, and Operations Executives',
    highlights: [
      'Real-time company-wide attendance monitoring with date-filtered logs',
      'Comprehensive employee provisioning and instant biometric de-registration',
      'Automated location mismatch auditing with direct incident alert dispatches',
      'Single-click export of structured attendance records for enterprise payroll integration'
    ],
    actionLabel: 'Open Admin Command Center ↗',
    consoleTitle: 'Cloud Services Endpoint — Dataverse API v9.2',
    consoleLines: [
      { label: 'Connected Endpoint:', value: 'https://api.dataverse.crm.dynamics.com/v9.2', highlight: false },
      { label: 'Active Modules:', value: 'Employee Master · Daily Audit Ledger · Security Monitor', highlight: true },
      { label: 'Authentication Mode:', value: 'Azure AD Service Principal + Role-Based Access Control', highlight: false },
      { label: 'Compliance Status:', value: 'Enforced across 100% of biometric and session logs', highlight: true }
    ]
  }
};
