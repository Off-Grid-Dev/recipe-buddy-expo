// todo look over and optimize
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.EXPO_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

function generateChefUsername(): string {
  const randomNum = Math.floor(1000000 + Math.random() * 9000000);
  return `chef_${randomNum}`;
}

export default async function createUser(
  userName: string,
  email: string,
  password: string,
) {
  const finalUsername = userName?.trim() || generateChefUsername();

  const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim(),
      password,
      email_confirm: true,
      user_metadata: {
        display_name: finalUsername,
        username: finalUsername,
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Create user failed:', data);
    throw new Error(data.message || data.error || 'Failed to create user');
  }

  console.log('✅ User created successfully with username:', finalUsername);
  return data;
}
