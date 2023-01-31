import { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks/redux";
import AppRouter from "./components/router/AppRouter";
import { GlobalStyles } from "./styles/global";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeSlice);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
};

export default App;
