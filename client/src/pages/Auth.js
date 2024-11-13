import React, { useState, useContext } from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Form, Button, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  SHOP_ROUTER,
} from "../utils/consts";
import { login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
// import { Context } from "../index";
import { Context } from "../index";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTER;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const signIn=async()=>{
  //   const response=await registration()
  //   console.log("response",response)
  // }

  const click = async () => {
    // const response = await registration(email, password);
    // console.log("response", response);

    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
        console.log("logindata",data);
      } else {
         data = await registration(email, password);
        console.log("registrationdata",data);
      }
      console.log("Authdata",data);
      user.setUser(data)
      user.setIsAuth(true)
      navigate(SHOP_ROUTER)
    } catch (e) {
      alert(e.response.data.message)
    }
  };
  // console.log(location);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "SignIn" : "SignUp"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
            {isLogin ? (
              <div>
                No account? <NavLink to={REGISTRATION_ROUTER}>SignUp</NavLink>
              </div>
            ) : (
              <div>
                Do you have an account?{" "}
                <NavLink to={LOGIN_ROUTER}>SignIn</NavLink>
              </div>
            )}

            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Enter" : "SignUp"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
