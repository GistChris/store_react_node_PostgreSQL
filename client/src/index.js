import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import UserStore from "./store/UserStore";
import App from "./App";
// import env from "./.env";
import DeviceStore from "./store/DeviceStore";
import CartStore from "./store/CartStore";
import  "./index.scss"
// import { env } from 'node:process';
// import * as dotenv from 'dotenv' // vea en https://github.com/motdotla/dotenv#como-uso-dotenv-con-import
// // REVISAR LINK DE REFERENCIA DE IMPORTACIÓN
// dotenv.config()
require('dotenv').config();


// import reportWebVitals from './reportWebVitals';
export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
      cart: new CartStore(),
      orders: [],
      // product: new CartStore(),
      // products : JSON.parse(localStorage.getItem('products'))
    }}
  >
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
