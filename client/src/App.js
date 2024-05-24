import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";

// import logo from './logo.svg';
// import './App.css';

const  App =()=> {
  return (
    // <div>Working</div>
    <BrowserRouter>
     <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
