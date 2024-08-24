import React, { useContext } from "react";
import { Context } from "../index";
import CartSigne from "./CartSign";
import Navbar from "react-bootstrap/Navbar";
import { jwtDecode } from "jwt-decode";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTER,LOGIN_ROUTER, SHOP_ROUTER } from "../utils/consts";
// import { observer } from "mobx-react-light";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
const token=jwtDecode(  localStorage.getItem('token'))
console.log("ROLE",token.role)
//observer dlia pererendinga v rezhime realnogo vremeni
const NavBar = observer(() => {
  // let [cartOpen,setCartOpen]=useState(false)
  // const NavBar =() => {
  const { user } = useContext(Context);
  // const {orders}= useContext(Context);
  const navigate = useNavigate();
  const logOut = () => {
    console.log("addItem");
    //pererenderivaetsia tolko navbar
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Container>
        <NavLink  className="shop-link"  to={SHOP_ROUTER}>
          FLAGMAN
        </NavLink>
      
   <CartSigne className="ml-7"></CartSigne>
        {user.isAuth ? (
          <Nav className="ml-auto gap-4" style={{ color: "white" }}>
            {token.role==="ADMIN" ? (<Button
              variant={"outline-light"}
              onClick={() => navigate(ADMIN_ROUTER)}
            >
              Admin panel
            </Button>) : (null)}
            <Button
              variant={"outline-light"}
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

export default NavBar;