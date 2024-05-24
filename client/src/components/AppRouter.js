import React from "react";
// import { Routes, Route, Redirect } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import NotFind from "../pages/NotFind";
const AppRouter = () => {
  //zaglushka ili mokovaia peremennaia
  const isAuth = false;
  return (
    <Routes>
      {isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          // <Route key={path} path={path} component={Component} exact />
          //new syntax for react-dom-router
          <Route key={path} path={path} element={<Component/>} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        // <Route key={path} path={path} component={Component} exact />
        <Route key={path} path={path} element={<Component/>} exact />
      ))}
      <Route  path="*" element={<NotFind/>} exact />
    </Routes>
  );
};

export default AppRouter;
