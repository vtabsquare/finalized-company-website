import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

async function checkAllTables() {
  console.log("=== CHECKING PRODUCTS TABLE ===");
  const { data: products, error: pe } = await supabase.from('products').select('id, title').limit(20);
  if (pe) console.error("Products error:", pe.message);
  else console.log("Products:", products?.length, "rows:", products?.map(p => p.id));

  console.log("\n=== CHECKING AI_EMPLOYEES TABLE ===");
  const { data: employees, error: ee } = await supabase.from('ai_employees').select('id, title').limit(20);
  if (ee) console.error("AI Employees error:", ee.message);
  else console.log("AI Employees:", employees?.length, "rows:", employees?.map(e => e.id));

  console.log("\n=== CHECKING INNOVATIONS TABLE ===");
  const { data: innovations, error: ie } = await supabase.from('innovations').select('id, title').limit(20);
  if (ie) console.error("Innovations error:", ie.message);
  else console.log("Innovations:", innovations?.length, "rows:", innovations?.map(i => i.id));

  console.log("\n=== CHECKING DEMO_REQUESTS TABLE ===");
  const { data: demos, error: de } = await supabase.from('demo_requests').select('id, full_name, created_at').limit(5);
  if (de) console.error("Demo requests error:", de.message);
  else console.log("Demo requests:", demos?.length, "recent:", demos?.map(d => d.full_name));

  console.log("\n=== CHECKING SUBSCRIBERS TABLE ===");
  const { data: subs, error: se } = await supabase.from('subscribers').select('id, email').limit(5);
  if (se) console.error("Subscribers error:", se.message);
  else console.log("Subscribers:", subs?.length, "rows:", subs?.map(s => s.email));

  // Check RLS policies for demo_requests and products
  console.log("\n=== CHECKING ANON KEY ACCESS TO PRODUCTS ===");
  const anonClient = createClient(url, process.env.VITE_SUPABASE_ANON_KEY);
  const { data: anonProducts, error: anonError } = await anonClient.from('products').select('id').limit(5);
  if (anonError) console.error("Anon products error:", anonError.message);
  else console.log("Anon can read products:", anonProducts?.length, "rows");
  
  console.log("\n=== CHECKING ANON KEY ACCESS TO DEMO_REQUESTS (INSERT) ===");
  const { data: insertTest, error: insertError } = await anonClient.from('demo_requests').insert([{
    full_name: 'RLS Test',
    work_email: 'rls_test_delete@test.com',
    company_name: 'Test',
    team_size: '10',
    interest_area: 'Test',
    message: 'RLS test - delete me'
  }]).select();
  if (insertError) console.error("Anon insert demo_request error:", insertError.message);
  else {
    console.log("Anon insert succeeded, id:", insertTest?.[0]?.id);
    // Clean up
    await supabase.from('demo_requests').delete().eq('work_email', 'rls_test_delete@test.com');
  }
}

checkAllTables();
