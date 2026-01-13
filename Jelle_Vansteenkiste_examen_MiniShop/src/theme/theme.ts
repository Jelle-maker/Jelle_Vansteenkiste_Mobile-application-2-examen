import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#000',
    card: '#f2f2f2',
  },
};

export const DarkThemeCustom = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#121212',
    text: '#fff',
    card: '#1e1e1e',
  },
};