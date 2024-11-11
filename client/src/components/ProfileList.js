import React, { useState, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Modal from "react-bootstrap/Modal";
import { createType } from "../../http/deviceApi";
import { Context } from "../../index";
import OrdersList from "../../components/OrdersList";
import { Form, Button, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import OrderItem from "../OrderItem";
import DeviceItem from "../DeviceItem";
import { ORDER_ROUTER } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import Orders from "../Orders";
import { fetchOrders } from "../../http/orderApi";
const Profile = ({ show, onHide }) => {
  const navigate = useNavigate();
  const { device, order, user } = useContext(Context);
  const [value, setValue] = useState(" ");
  console.log("FETCHORDERS");
  // const addType = () => {
  //   createType({ name: value }).then((data) => {
  //     setValue(' ');
  //     onHide();
  //   });
  // };
  useEffect(() => { 
  // const getOrders = () => {
    console.log("FETCHORDERS");
    fetchOrders(user.User.id).then((data) => {
      // console.log("orderdata");
      console.log("orderdata", data);
      // device.setOrders(data);

      order.setOrders(data);
        console.log("order.orders",order.orders);
    });
    // console.log("order.orders", order.orders)
    // createType({ name: value }).then((data) => {
    //   setValue(' ');
    //   onHide();
    // });
  // };
}, []);
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Orders</Modal.Title>
      </Modal.Header>
      {/* <Col className="cart-list"><OrdersList /></Col> */}
      <Modal.Body>
        {/* <Button variant="outline-danger" onClick={getOrders}>
          Orders
        </Button> */}
                {/* <Row className="d-flex">
          {device.devices
        // .slice()
        // .sort((a, b) => a.id - b.id)
        .map((device) => (
          // <OrderItem key={order.id} order={order}></OrderItem>
          <DeviceItem key={device.id} device={device}></DeviceItem>
        ))}
        </Row> */}
        {/* <Row className="d-flex">
          {order.orders
        .slice()
        .sort((a, b) => a.id - b.id)
        .map((order) => (
          <Orders
           key={order.id} 
           order={order}
          //  onClick={() => navigate(ORDER_ROUTER + "/" + order.id)}
           ></Orders>
        ))}
        </Row> */}
        {/* <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={"Enter type name"}
          />
        </Form> */}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={fetchOrders}>
          Add
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default Profile;
