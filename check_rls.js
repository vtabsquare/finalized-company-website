import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(url, key);

async function fixRLS() {
  console.log("Fixing RLS policies via Supabase SQL...");

  // We'll use the REST API to execute raw SQL via service role
  // Since we can't run SQL directly through the JS client's rpc without a custom function,
  // let's test what policies exist by trying operations
  
  // Test: Can service role insert into demo_requests?
  const { data, error } = await supabase.from('demo_requests').insert([{
    full_name: 'RLS Policy Test',
    work_email: 'rls_policy_test_123@test.com',
    company_name: 'Test',
    team_size: '10',
    interest_area: 'Test',
    message: 'policy test - will be deleted'
  }]).select();
  
  if (error) {
    console.error("Service role insert failed:", error.message);
  } else {
    console.log("Service role insert succeeded:", data[0]?.id);
    await supabase.from('demo_requests').delete().eq('work_email', 'rls_policy_test_123@test.com');
  }
  
  // Check RLS on products with anon
  const anonClient = createClient(url, process.env.VITE_SUPABASE_ANON_KEY);
  
  // Test SELECT on products
  const { data: readData, error: readError } = await anonClient.from('products').select('id').limit(1);
  console.log("Anon SELECT products:", readData?.length > 0 ? "OK" : "BLOCKED", readError?.message || '');
  
  // Test SELECT on ai_employees
  const { data: empData, error: empError } = await anonClient.from('ai_employees').select('id').limit(1);
  console.log("Anon SELECT ai_employees:", empData?.length > 0 ? "OK" : "BLOCKED", empError?.message || '');
  
  // Test SELECT on innovations
  const { data: innData, error: innError } = await anonClient.from('innovations').select('id').limit(1);
  console.log("Anon SELECT innovations:", innData?.length > 0 ? "OK" : "BLOCKED", innError?.message || '');
  
  // Test SELECT on demo_requests with anon
  const { data: demoSelectData, error: demoSelectError } = await anonClient.from('demo_requests').select('id').limit(1);
  console.log("Anon SELECT demo_requests:", demoSelectData?.length > 0 ? "OK" : "BLOCKED/EMPTY", demoSelectError?.message || '');
}

fixRLS();
