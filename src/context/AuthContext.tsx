// dependencies
import React, { createContext, useCallback, useContext, useState } from 'react';

type AuthContextValue = {
  handleLogin: () => void;
  handleLogout: () => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextValue>({
  handleLogin: () => {},
  handleLogout: () => {},
  isLoggedIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  const value: AuthContextValue = { handleLogin, handleLogout, isLoggedIn };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
