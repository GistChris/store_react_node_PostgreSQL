import React from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Form, Button, Row } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import { NavLink, useLocation } from "react-router-dom";
// import { LOGIN_ROUTER, REGISTRATION_ROUTER } from "../util/consts";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
const Shop = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList/>

        </Col>
      </Row>
    </Container>
  );
};

export default Shop;
