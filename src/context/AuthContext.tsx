import createUser from '@/lib/createUser';
import { supabase } from '@utils/supabase';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextValue = {
  user: any | null;
  session: any | null;
  isLoggedIn: boolean;
  loading: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleRegister: (
    userName: string,
    email: string,
    password: string,
  ) => Promise<void>; // ← NEW
  handleLogout: () => Promise<void>;
  supabase: typeof supabase;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  isLoggedIn: false,
  loading: true,
  handleLogin: async () => {},
  handleRegister: async () => {},
  handleLogout: async () => {},
  supabase,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Login (already working)
  const handleLogin = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) throw error;
  }, []);

  // NEW: Register (creates user on server + logs in automatically)
  const handleRegister = useCallback(
    async (userName: string, email: string, password: string) => {
      await createUser(userName.trim(), email.trim(), password);
      await handleLogin(email, password); // auto login after creation
    },
    [handleLogin],
  );

  // Logout
  const handleLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  // Auth listener (runs once when app starts)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      console.log('Supabase auth event:', event);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    session,
    isLoggedIn: !!user,
    loading,
    handleLogin,
    handleRegister, // ← now available everywhere
    handleLogout,
    supabase,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
