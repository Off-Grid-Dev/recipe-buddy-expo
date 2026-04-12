// dependencies
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
// constants
import { getTheme, ThemeMode, Theme } from '@constants/theme';

type ThemeContextValue = Theme & {
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  ...getTheme('light'),
  toggleTheme: () => {},
  setMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(
    systemScheme === 'light' ? 'light' : 'dark',
  );

  const toggleTheme = useCallback(() => {
    setModeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
  }, []);

  const value: ThemeContextValue = {
    ...getTheme(mode),
    toggleTheme,
    setMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
