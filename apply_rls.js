import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

// We need to use the Management API to apply RLS policies
// The JS client doesn't support raw SQL, but we can use fetch with the service role
async function applyRLSPolicies() {
  console.log("Applying RLS policies via Management API...");
  
  // Supabase Management API endpoint for SQL execution
  const projectRef = 'jqxqujrldlutwgkaqwkb';
  const managementUrl = `https://${projectRef}.supabase.co/rest/v1/rpc`;
  
  // Use supabase-js with service role to run raw SQL via a special endpoint
  const response = await fetch(`https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`
    },
    body: JSON.stringify({ sql: 'SELECT 1' })
  });
  
  const text = await response.text();
  console.log("exec_sql test:", response.status, text.substring(0, 200));
  
  // Try direct SQL via postgres REST
  const pgResponse = await fetch(`https://${projectRef}.supabase.co/pg/`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`
    },
    body: JSON.stringify({ query: 'SELECT 1' })
  });
  console.log("pg status:", pgResponse.status);
}

applyRLSPolicies();
