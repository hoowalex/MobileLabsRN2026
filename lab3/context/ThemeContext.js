import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components/native';

const ThemeContext = createContext();

const lightTheme = {
  colors: {
    background: '#F4F7FB',
    card: '#FFFFFF',
    text: '#1F2937',
    mutedText: '#6B7280',
    border: '#E5E7EB',
    primary: '#3B82F6',
    primarySoft: '#DBEAFE',
    success: '#16A34A',
    successSoft: '#DCFCE7',
  },
};

const darkTheme = {
  colors: {
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    mutedText: '#CBD5E1',
    border: '#334155',
    primary: '#60A5FA',
    primarySoft: '#1E3A8A',
    success: '#22C55E',
    successSoft: '#14532D',
  },
};

export function ThemeProviderWrapper({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}