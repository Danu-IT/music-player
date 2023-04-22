import { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks/redux";
import AppRouter from "./components/router/AppRouter";
import { GlobalStyles } from "./styles/global";
import Player from "./components/Player/Player";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeSlice);
  const { player } = useAppSelector((state) => state.userSlice);
  return (
    <ThemeProvider theme={theme}>
      {player && <Player></Player>}
      <GlobalStyles />
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
};

export default App;
