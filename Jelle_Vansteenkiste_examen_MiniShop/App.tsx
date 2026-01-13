import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './src/redux/Index';
import RootTabs from './src/navigation/Tabs';
import { ThemeProvider } from './src/theme/theme';

const queryClient = new QueryClient();

export default function App() {
  return (
            <ThemeProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootTabs />
          </NavigationContainer>
      </QueryClientProvider>
    </Provider>
    </ThemeProvider>
  );
}