import React, { useContext, useState } from "react";
import { Context } from "../index";
import Navbar from "react-bootstrap/Navbar";
import { BsFillBasket3Fill } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Bs0Circle } from "react-icons/bs";

import Form from "react-bootstrap/Form";
// import Button from 'react-bootstrap/Button';
import InputGroup from "react-bootstrap/InputGroup";
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTER, BASKET_ROUTER, LOGIN_ROUTER, SHOP_ROUTER } from "../utils/consts";
// import { observer } from "mobx-react-light";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
//observer dlia pererendinga v rezhime realnogo vremeni
const NavBar = observer(() => {
  let [cartOpen,setCartOpen]=useState(false)
  // const NavBar =() => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    //pererenderivaetsia tolko navbar
    user.setUser({});
    user.setIsAuth(false);
//eto moe perecliuchenie
    // navigate(LOGIN_ROUTER)
  };
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      {/* <Navbar bg="dark" variant="dark"> */}
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTER}>
          BuyDevice
        </NavLink>
        <BsFillCartCheckFill onClick={()=>setCartOpen(cartOpen=!cartOpen)} className={`cart ${cartOpen &&'active'}`} color="white" cursor="pointer" />
        {/* <BsFillBasket3Fill className="BsFillBasket2Fill"/> */}
        {user.isAuth ? (
          <Nav className="ml-auto gap-4" style={{ color: "white" }}>
        
            <Button
             type="button" 
             className="btn btn-default btn-sm"
             onClick={() => navigate(BASKET_ROUTER)}
             >
                <b> Add to Cart </b>
            </Button>
               <Button
              variant={"outline-light"}
              // onClick={() => navigate(LOGIN_ROUTER)}
              onClick={() => logOut()}
              className="ml-2"
            >
              basket
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTER)}
            >
              Admin panel
            </Button>
            <Button
              variant={"outline-light"}
              // onClick={() => navigate(LOGIN_ROUTER)}
              onClick={() => logOut()}
              className="ml-2"
            >
              Exit
            </Button>
        
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              // onClick={() => user.setIsAuth(true)}
              onClick={() => navigate(LOGIN_ROUTER)}
            >
              SignIn
            </Button>
            {/* <Button variant={"outline-light"}>Admin panel</Button> */}
      {/* <Button variant={"outline-light"}>SignIn</Button> */}
          </Nav>
        )}
      </Container>
  
    </Navbar>

  
    //     <Navbar bg="dark" data-bs-theme="dark">
    //     <Container>
    //       <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    //       <Nav className="me-auto">
    //         <Nav.Link href="#home">Home</Nav.Link>
    //         <Nav.Link href="#features">Features</Nav.Link>
    //         <Nav.Link href="#pricing">Pricing</Nav.Link>
    //       </Nav>
    //       <Form inline>
    //      <InputGroup>
    //          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    //          <Form.Control
    //            placeholder="Username"
    //            aria-label="Username"
    //            aria-describedby="basic-addon1"
    //          />
    //        </InputGroup>
    //      </Form>
    //     </Container>
    //   </Navbar>
    //     <Navbar className="bg-body-tertiary justify-content-between">
    //     <Form inline>
    //       <InputGroup>
    //         <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
    //         <Form.Control
    //           placeholder="Username"
    //           aria-label="Username"
    //           aria-describedby="basic-addon1"
    //         />
    //       </InputGroup>
    //     </Form>
    //     <Form inline>
    //       <Row>
    //         <Col xs="auto">
    //           <Form.Control
    //             type="text"
    //             placeholder="Search"
    //             className=" mr-sm-2"
    //           />
    //         </Col>
    //         <Col xs="auto">
    //           <Button type="submit">Submit</Button>
    //         </Col>
    //       </Row>
    //     </Form>
    //   </Navbar>
  );
  // };
  // <style>
  //     .cart {
  //       color:white;
  //     }
  // </style>
});
{/* <style>

</style> */}
export default NavBar;
