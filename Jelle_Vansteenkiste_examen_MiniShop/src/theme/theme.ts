import { createContext, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Theme = {
  background: string;
  text: string;
  card: string;
};

type ThemeContextType = {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
  loading: boolean;
};

const lightTheme: Theme = {
  background: "#ffffff",
  text: "#000000",
  card: "#f2f2f2",
};

const darkTheme: Theme = {
  background: "#1a1a1a",
  text: "#ffffff",
  card: "#222222",
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const stored = await AsyncStorage.getItem("theme");
      if (stored === "dark") {
        setIsDark(true);
      }
    } catch (e) {
      console.warn("Failed to load theme");
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);

    try {
      await AsyncStorage.setItem("theme", next ? "dark" : "light");
    } catch (e) {
      console.warn("Failed to save theme");
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme, loading }} >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
};
