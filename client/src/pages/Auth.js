import React from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Form,Button,Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { NavLink,useLocation } from "react-router-dom";
import { LOGIN_ROUTER, REGISTRATION_ROUTER } from "../utils/consts";

const Auth = () => {
    const location =useLocation()
    const isLogin=location.pathname===LOGIN_ROUTER
    console.log(location)
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin? "SignIn" : "SignUp"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control className="mt-3" placeholder="enter email..." />
          <Form.Control className="mt-3" placeholder="enter password..." />
         < Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
            {isLogin ?
                <div>
                No account? <NavLink to={REGISTRATION_ROUTER}>SignUp</NavLink>
                </div>
                :
                <div>
                Do you have an account? <NavLink to={LOGIN_ROUTER}>SignIn</NavLink>
                </div>

            }
     
         <Button  variant={"outline-success"}>{isLogin ? "Enter" :"SignUp"}</Button>
         </Row>
 
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
