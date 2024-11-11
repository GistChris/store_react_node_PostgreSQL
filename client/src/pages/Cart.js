import React, { useContext, useEffect, useState } from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Pagination, Row, Button } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import { NavLink, useLocation } from "react-router-dom";
// import { LOGIN_ROUTER, REGISTRATION_ROUTER } from "../util/consts";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
// import { useParams } from "react-router-dom";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceApi";
// import { fetchBasket} from "../http/basketApi";
import Pages from "../components/Pages";
import DeviceItem from "../components/DeviceItem";
import ItemListCart from "../components/ItemListCart";
// import { jwtDecode } from "jwt-decode";
import {
  fetchProducts,
  createOrder,
  emptyCart,
  fetchCart,
} from "../http/cartApi";
// import { createDevice } from "../../http/deviceApi";

const Basket = observer(() => {
  const { device, user } = useContext(Context);
  // const token=jwtDecode(  localStorage.getItem('token'))
  let somme = 0;
  let items = 0;
  const [order, setOrder] = useState([]);
  const [quantityTotal, setQuantityTotal] = useState(0);
  device.cart?.forEach((item) => {
    somme += Number(item.productPrice * item.productQuantity);
    items = items + item.productQuantity;
  });
  useEffect(() => {
    fetchCart(user.User.id).then((data) => device.setCart(data));
  }, []);

  const addOrder = () => {
    console.log("device.cart", device.cart);
    const formData = new FormData();
    formData.append("userId", user.User.id);
    formData.append("cartTotal", somme);
    formData.append("cartProducts", JSON.stringify(device.cart));
    createOrder(formData).then((data) => {
      emptyCart(user.User.id);
      device.setCart();
    });
  };
  return (
    <Container md={4} className="cart-container">
      <Col className="cart-list">
        <ItemListCart />
      </Col>
      <Col md={2} className="cart-total">
        <div className="text-container">
          <h4>items{items}</h4> <h4>${device.cartItemsPrice}</h4>
        </div>
        <div className="text-container">
          <h4>Shipping to H3v1C2</h4> <h4>${somme}</h4>
        </div>
        <div className="gray-line"></div>
        <div className="text-container">
          <h2>Subtotal</h2> <h2>${somme}</h2>
        </div>
        <Button className="" onClick={addOrder}>
          GO TO CKECKOUT
        </Button>
      </Col>
    </Container>
  );
});

export default Basket;
