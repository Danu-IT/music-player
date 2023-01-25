import { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks/redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { privateRoutes, publicRoutes } from "./routes";
import Login from "./pages/Login";
import { Fragment } from "react";

const App = () => {
  const { theme } = useAppSelector((state) => state.themeSlice);
  const { token } = useAppSelector((state) => state.tokenSlice);
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {token !== null
            ? privateRoutes.map((route) => (
                <Fragment key={route.path}>
                  <Route
                    path={route.path}
                    element={<route.component></route.component>}></Route>
                  <Route
                    path="*"
                    element={<Home />}
                  />
                </Fragment>
              ))
            : publicRoutes.map((route) => (
                <Fragment key={route.path}>
                  <Route
                    path={route.path}
                    element={<route.component></route.component>}></Route>
                  <Route
                    path="*"
                    element={<Login />}
                  />
                </Fragment>
              ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
