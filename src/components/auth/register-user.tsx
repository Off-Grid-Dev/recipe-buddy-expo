import { createClient } from '@supabase/supabase-js';

import { SUPABASE_KEY, SUPABASE_URL } from '@constants/supabase';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

export default async function createUser(
  userName: string,
  email: string,
  password: string,
) {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      userName,
    },
  });

  if (error) throw error;
  console.log('Created user: ', data.user?.id, data.user?.email);
}
