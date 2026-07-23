export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Analytics & BI' | 'Enterprise Automation' | 'Database & Migration' | 'AI Vision & Construction' | 'Logistics';
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

export type NavTab = 'home' | 'products' | 'solutions' | 'industries' | 'lab' | 'about' | 'careers' | 'contact';
