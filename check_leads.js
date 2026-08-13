import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

async function checkLeads() {
  const { data: demo_requests, error: dError } = await supabase.from('demo_requests').select('*');
  const { data: subscribers, error: sError } = await supabase.from('subscribers').select('*');
  console.log("Demo Requests:", demo_requests?.length, dError);
  console.log("Subscribers:", subscribers?.length, sError);
  console.log("Demo Requests Data:", demo_requests);
}

checkLeads();
