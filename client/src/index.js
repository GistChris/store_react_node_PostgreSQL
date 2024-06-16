import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import UserStore from "./store/UserStore";
import App from "./App";
// import env from "./.env";
import DeviceStore from "./store/DeviceStore";
// import { env } from 'node:process';
// import * as dotenv from 'dotenv' // vea en https://github.com/motdotla/dotenv#como-uso-dotenv-con-import
// // REVISAR LINK DE REFERENCIA DE IMPORTACIÓN
// dotenv.config()
require('dotenv').config();
// import './index.css';

// import reportWebVitals from './reportWebVitals';
export const Context = createContext(null);
// console.log(555)
// env.TEST=999999
// console.log(process.env)
// const NAME=process.env.PUBLIC_URL
// console.log("NAME",NAME)
console.log("process.env",process.env.REACT_APP_API_URL)
// console.log("process.env.DB_NAME",process.env.NAME)
// console.log("process.env.REACT_APP_API_URL",process.env.NODE_ENV)
// console.log("process.env.REACT_APP_BASE_URL",process.env.REACT_APP_BASE_URL)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      device: new DeviceStore(),
    }}
  >
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
