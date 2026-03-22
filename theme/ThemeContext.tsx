import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { getTheme, ThemeMode } from './theme';

const ThemeContext = createContext(getTheme('light'));

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>(systemScheme === 'light' ? 'light' : 'dark');

  const toggleTheme = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');
  const theme = { ...getTheme(mode), toggleTheme };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
