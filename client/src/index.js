import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import UserStore from "./store/UserStore";
import App from "./App";
import DeviceStore from "./store/DeviceStore";
import CartStore from "./store/CartStore";
import OrderStore from "./store/OrderStore";
import  "./index.scss"
require('dotenv').config();
export const Context = createContext(null);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      order: new OrderStore(),
      device: new DeviceStore(),
      cart: new CartStore(),
      
    }}
  >
    <App />
  </Context.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
