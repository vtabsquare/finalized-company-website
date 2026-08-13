import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const serviceKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const serviceClient = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

async function testFix() {
  console.log("=== Testing service role INSERT into demo_requests ===");
  const { data, error } = await serviceClient.from('demo_requests').insert([{
    full_name: 'FINAL FIX TEST',
    work_email: 'final_fix_test@test.com',
    company_name: 'VTab Test',
    team_size: '10-50',
    interest_area: 'AI Reporting Platform',
    message: 'Testing the fix - delete me'
  }]).select();
  
  if (error) {
    console.error("❌ Service role INSERT FAILED:", error.message);
  } else {
    console.log("✅ Service role INSERT SUCCEEDED, id:", data[0]?.id);
    // Clean up
    await serviceClient.from('demo_requests').delete().eq('work_email', 'final_fix_test@test.com');
    console.log("✅ Test row cleaned up");
  }
  
  console.log("\n=== Testing admin client for all tables (admin dashboard) ===");
  const tables = ['products', 'ai_employees', 'innovations'];
  for (const table of tables) {
    const { data, error } = await serviceClient.from(table).select('id').limit(1);
    if (error) console.error(`❌ Admin read ${table} FAILED:`, error.message);
    else console.log(`✅ Admin read ${table} OK (${data?.length} rows)`);
  }
}

testFix();
