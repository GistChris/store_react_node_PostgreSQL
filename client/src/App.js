import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";
import  "./App.scss"
//obernem component App v observer, tak kak nam nyzhno sostoianie user userStore
const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setTimeout(() => {
      // device.setCart(JSON.parse(localStorage.getItem("products")));
      check()
        .then((data) => {
          // user.setUser(true);
           user.setUser(data);
          //delaem setLoading(false) i nevazhno proizoshla u nas oshibka ili net
          user.setIsAuth(true);
          // user.setIsAuth(false);
        })
        .finally(() => setLoading(false));
        // .finally(() => setLoading(true));
    // }, 1000);
  }, []);
  // }, [user]);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
