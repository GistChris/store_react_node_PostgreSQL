import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check } from "./http/userApi";
import { Spinner } from "react-bootstrap";
//obernem component App v observer, tak kak nam nyzhno sostoianie user userStore
const App = observer(() => {
  const { user } = useContext(Context);
  // console.log("user",user)
  //delaem localnoe sostoianie loading "idet zagruzka ili net"
  const [loading, setLoading] = useState(true);
  // console.log("loading1")
  // ????????????????????????????????
  //etot zapros tolko odin raz pered zapuskom prilozhenia dlia etogo
  //ispolzuem hook useEffect, kotoryi imeet functiu i massiv zavisimostei(
  // esli massiv zavisimostei[] pustoi to functia otrabotaet odin raz pri pervom zapuske)

  useEffect(() => {
    // setTimeout(() => {
      check()
        .then((data) => {
          user.setUser(true);
          //delaem setLoading(false) i nevazhno proizoshla u nas oshibka ili net
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    // }, 1000);
  }, []);

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
