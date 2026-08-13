import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const CAREER_ROLES = [
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

async function setupCareersTable() {
  console.log("Setting up career_roles table via Management API...");
  
  const projectRef = url.match(/:\/\/(.+?)\./)[1];
  
  const sql = `
    CREATE TABLE IF NOT EXISTS public.career_roles (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      department TEXT,
      location TEXT,
      type TEXT,
      experience TEXT,
      description TEXT,
      requirements JSONB,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Enable RLS
    ALTER TABLE public.career_roles ENABLE ROW LEVEL SECURITY;

    -- Drop existing policies if any
    DROP POLICY IF EXISTS "Enable read access for all users" ON public.career_roles;

    -- Create select policy
    CREATE POLICY "Enable read access for all users" ON public.career_roles FOR SELECT USING (true);
  `;

  // Try direct SQL via pg REST endpoint
  const pgResponse = await fetch(`https://${projectRef}.supabase.co/pg/`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`
    },
    body: JSON.stringify({ query: sql })
  });
  
  console.log("Create table response status:", pgResponse.status);
  if (!pgResponse.ok) {
    const errorText = await pgResponse.text();
    console.error("Error creating table:", errorText);
    
    console.log("Trying exec_sql fallback...");
    const response = await fetch(`https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`
      },
      body: JSON.stringify({ sql })
    });
    console.log("exec_sql status:", response.status);
  }

  // Insert seed data
  console.log("Inserting initial data...");
  const supabase = createClient(url, serviceKey);
  const { data, error } = await supabase
    .from('career_roles')
    .upsert(CAREER_ROLES, { onConflict: 'id' });

  if (error) {
    console.error("Error inserting data:", error);
  } else {
    console.log("Data inserted successfully.");
  }
}

setupCareersTable().catch(console.error);
