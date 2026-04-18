import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, // ← this is the secret key
  {
    auth: { persistSession: false },
  },
);

// Generate a fallback username like chef_3858293
function generateChefUsername(): string {
  const randomNum = Math.floor(1000000 + Math.random() * 9000000); // 7-digit number
  return `chef_${randomNum}`;
}

export default async function createUser(
  userName: string,
  email: string,
  password: string,
) {
  const finalUsername = userName?.trim() || generateChefUsername();

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: email.trim(),
    password,
    email_confirm: true,
    user_metadata: {
      username: finalUsername,
    },
  });

  if (error) throw error;

  console.log('✅ User created with username:', finalUsername);
  return data.user;
}
