import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import CartSigne from "./CartSign";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import UserBar from "../components/UserBar";
import Profile from "../components/modals/Profile";
import CreateRating from "../components/modals/Profile";
import { NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import {
  ADMIN_ROUTER,
  LOGIN_ROUTER,
  SHOP_ROUTER,
  SOLD_ROUTER,
  PROFILE_ROUTER,
} from "../utils/consts";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import { values } from "mobx";
import { Dropdown, DropdownItem } from "react-bootstrap";
const NavBar = observer(() => {
  const { user } = useContext(Context);
  const [profileVisible, setProfileVisible] = useState(false);
  let [value, setValue] = useState(" ");
  const [showActions, setShowActions] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const logOut = () => {
    localStorage.clear();
    user.setUser({});
    user.setIsAuth(false);
  };
  return (
    <Navbar bg="dark" variant="dark" className="navbar">
      <Container>
        <Dropdown>
          <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
            Your Flagman
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate(SHOP_ROUTER)}>
              Account setting
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(PROFILE_ROUTER)}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate(SOLD_ROUTER)}>
              Orders
            </Dropdown.Item>
            <Dropdown.Item>Recently viewed</Dropdown.Item>
            <Dropdown.Item>Watch List</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <NavLink className="shop-link" to={SHOP_ROUTER}>
          FLAGMAN
        </NavLink>
        <CartSigne className="ml-7"></CartSigne>
        {/* {user.isAuth===true ? ( */}
        {user.isAuth ? (
          <Nav className="ml-auto gap-4" style={{ color: "white" }}>
            {user.User.role === "ADMIN" ? (
              <Button
                variant={"outline-light"}
                onClick={() => navigate(ADMIN_ROUTER)}
              >
                Admin panel
              </Button>
            ) : null}
            <Button
              variant={"outline-light"}
              onClick={() => {
                // navigate(SHOP_ROUTER);
                logOut();
              }}
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

      {/* <h1 show={profileVisible} onHide={() => setProfileVisible(false)} style={{ color: "white" }}>TT</h1> */}
      <Profile show={profileVisible} onHide={() => setProfileVisible(false)} />
      {/* <Profile/> */}
    </Navbar>
  );
});

export default NavBar;
