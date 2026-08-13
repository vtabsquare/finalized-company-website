import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function testInsert() {
  console.log("Testing insert with ANON KEY...");
  const { data, error } = await supabase.from('demo_requests').insert([{
    full_name: 'Test Anon',
    work_email: 'test@example.com',
    company_name: 'Test',
    team_size: '10',
    interest_area: 'Test',
    preferred_date: '2025-01-01',
    message: 'Test'
  }]);
  
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Success:", data);
  }
}

testInsert();
