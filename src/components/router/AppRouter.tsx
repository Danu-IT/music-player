import React, { FC } from "react";
import { useAppSelector } from "../../hooks/redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../routes/index";
import { Fragment } from "react";
import Home from "../../pages/Home";
import Login from "../../pages/Login";

const AppRouter: FC = () => {
  const { token } = useAppSelector((state) => state.tokenSlice);
  return (
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
  );
};

export default AppRouter;
