'use client';

import { createContext, useContext, PropsWithChildren, useState } from 'react';

export declare type ThemeValue = 'dark' | 'light';

export interface ThemeContextValue<T extends string> {
  theme: T;
  toggleTheme?: () => void;
}

interface ThemeProviderProps<T> {
  defaultTheme?: T;
}

export const ThemeContext = createContext<ThemeContextValue<ThemeValue>>({
  theme: 'light',
});

export const ThemeProvider = ({ children, defaultTheme }: PropsWithChildren<ThemeProviderProps<ThemeValue>>) => {
  const [theme, setTheme] = useState<ThemeValue>(defaultTheme || 'light');
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        // @todo: handle this with a state, that can toggle between dark and light
        theme: theme,
        toggleTheme: toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
