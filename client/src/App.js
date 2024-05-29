import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";

// import logo from './logo.svg';
// import './App.css';

const  App =()=> {
  return (
    <BrowserRouter>
    <NavBar/>
     <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
