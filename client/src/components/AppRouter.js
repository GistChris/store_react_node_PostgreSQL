import React, { useContext } from "react";
// import { Routes, Route, Redirect } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
// import NotFind from "../pages/NotFind";
// import {SHOP_ROUTER}from "../pages/NotFind";
import Shop from "../pages/Shop";
import { Context } from "../index";
const AppRouter = () => {
  //zaglushka ili mokovaia peremennaia
  //vyzyvaem hoock useContext
  const { user } = useContext(Context);
  console.log("user",user)
  return (
    <Routes>
      {/* <Route  path={SHOP_ROUTER} element={<Shop/>} exact /> */}
      {user.isAuth === true &&
        authRoutes.map(({ path, Component }) => (
          // <Route key={path} path={path} component={Component} exact />
          //new syntax for react-dom-router
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        // <Route key={path} path={path} component={Component} exact />
        <Route key={path} path={path} element={<Component />} exact />
      ))}

      <Route path="*" element={<Shop />} exact />
    </Routes>
  );
};
export default AppRouter;
