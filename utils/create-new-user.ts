// dependecies
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const email = 'test+' + Date.now() + '@example.com';
const password = 'ChangeMe!12345';

const { data, error } = await supabase.auth.admin.createUser({
  email,
  password,
  email_confirm: true, // convenient for testing
});

if (error) throw error;
console.log('Created user:', data.user?.id, data.user?.email);
