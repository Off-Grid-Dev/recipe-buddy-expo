import loginUser from './login-user';
import createUser from './register-user';

export default async function userAuth(
  mode: 'register' | 'login',
  email: string,
  password: string,
  userName?: string,
) {
  function generateChefUsername(): string {
    const randomNum = Math.floor(1000000 + Math.random() * 9000000);
    return `chef_${randomNum}`;
  }
  const finalUserName = userName ? userName.trim() : generateChefUsername();

  return mode === 'register'
    ? createUser(finalUserName, email, password)
    : loginUser(email, password);
}
