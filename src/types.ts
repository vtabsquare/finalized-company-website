export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  subcategory?: string;
  tags: string[];
  impactMetric: string;
  keyFeatures: string[];
  techStack: string[];
  iconName: string;
  featured?: boolean;
  imageUrl?: string;
  demoSnippet?: {
    type: 'chart' | 'code' | 'blueprint' | 'biometric' | 'chat' | '3d';
    previewHeadline: string;
    metrics: { label: string; value: string; color?: string }[];
  };
  detailContent?: {
    challenge: string[];
    approach: string;
    features: { title: string; emoji: string; description: string }[];
    impact: string[];
    videoUrl?: string;
    pptUrl?: string;
  };
}

export interface AiEmployee {
  id: string;
  title: string;
  role: string;
  description: string;
  icon: string;
  capabilities: string[];
  samplePrompt: string;
  sampleOutput: string;
  badge: string;
}

export interface Innovation {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  highlights: string[];
  status: 'In Development' | 'Alpha Testing' | 'Private Beta';
}

export interface CareerRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
}

export interface DemoFormState {
  fullName: string;
  workEmail: string;
  companyName: string;
  teamSize: string;
  interestArea: string;
  preferredDate: string;
  message: string;
}

export type NavTab = 'home' | 'products' | 'iot' | 'solutions' | 'industries' | 'lab' | 'about' | 'careers' | 'contact';

export interface IoTCapability {
  icon: string;
  title: string;
  description: string;
}

export interface IoTSignal {
  icon: string;
  label: string;
  detail: string;
  color: string;
}

export interface IoTContent {
  id: string;
  header_badge: string;
  header_title: string;
  header_highlight: string;
  header_description: string;
  reference_app_badge: string;
  reference_app_title: string;
  benefits: string[];
  capabilities: IoTCapability[];
  signals: IoTSignal[];
  updated_at?: string;
}

