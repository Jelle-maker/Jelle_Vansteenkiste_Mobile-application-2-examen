import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Tabs from "./src/navigation/Tabs";
import { store } from "./src/store/store";
import { ThemeProvider } from "./src/theme/ThemeContext";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <NavigationContainer>
            <Tabs />
          </NavigationContainer>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}