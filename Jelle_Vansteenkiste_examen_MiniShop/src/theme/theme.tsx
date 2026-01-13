import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const lightTheme = {
  background: '#f2f2f2',
  card: '#ffffff',
  text: '#000000',
  muted: '#666666',
};

export const darkTheme = {
  background: '#121212',
  card: '#1e1e1e',
  text: '#ffffff',
  muted: '#aaaaaa',
};

type ThemeContextType = {
  isDark: boolean;
  toggle: () => void;
  colors: typeof lightTheme;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggle: () => {},
  colors: lightTheme,
});

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState<boolean>(false);

  const toggle = () => setIsDark(prev => !prev);

  const colors = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('isDark');
        if (savedTheme !== null) setIsDark(JSON.parse(savedTheme));
      } catch (e) {
        console.error('Failed to load theme', e);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('isDark', JSON.stringify(isDark));
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}