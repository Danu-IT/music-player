import { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks/redux";
import AppRouter from "./components/router/AppRouter";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeSlice);
  return (
    <ThemeProvider theme={theme}>
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
};

export default App;
