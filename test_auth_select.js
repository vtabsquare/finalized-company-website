import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(url, anonKey);

async function testAuthSelect() {
  const email = 'testauth2@vtabsquare.com';
  const serviceClient = createClient(url, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  await serviceClient.auth.admin.createUser({
    email,
    password: 'password123',
    email_confirm: true
  });
  
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({ email, password: 'password123' });
  console.log("Auth User:", authData?.user?.id, "Error:", authError?.message);
  
  const { data, error } = await supabase.from('demo_requests').select('*');
  console.log("Data count:", data ? data.length : 0);
}

testAuthSelect();
