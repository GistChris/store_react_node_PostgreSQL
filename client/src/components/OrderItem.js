import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card, Button, Image } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
// import bigStar from "../assets/bigStar.png";
// import Image from "react-bootstrap/Image";
// import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { fetchOneOrder } from "../http/orderApi";
import { addToCart, fetchCart } from "../http/cartApi";
import { useNavigate } from "react-router-dom";
import { ORDER_ROUTER, SHOP_ROUTER, SOLD_ROUTER } from "../utils/consts";
// import CreateRating from "../components/modals/CreateRating";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
const OrderPage = ({ order }) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  // const [order, setOrder] = useState({ order: [] });
  //   const [order, setOrder] = useState([]);
  // const [orderDevice, setOrder] = useState([]);
  const [ratingVisible, setRatingVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  //   const { id } = useParams();
  //   useEffect(() => {
  //     fetchOneOrder(id).then((data) => {
  //       setOrder(data);
  //     });
  //   }, [id]);
  //   const arr=order.updatedAt

  return (
    <Container className="mt-3">
      <Card
        className="d-flex flex-column  "
        style={{
          border: "4px solid lightgray",
        }}
      >
        <Row className="d-flex  align-items-center justify-content-center ">
          <Col md={4}>
            <Image
              className="m-3"
              rounded
              width="200vh"
              height="100%"
              src={process.env.REACT_APP_API_URL + order.orderItemImg}
            />
          </Col>
          <Col md={0}>
            <Row className="m-3 d-flex flex-column align-items-center">
              <h2>{order.orderItemName}</h2>
              <h4>Item ID:{order.productId}</h4>
              <h5 className="d-flex flex-row align-items-center">
                <h1>C${order.orderItemTotal}.00</h1>Item subtotal
              </h5>
              <h5>+ Shipping(buyer paid C $20.00)</h5>
              <h4>
                Sold on:Sep 12{order.orderId} Buyer:{user.User.email}
              </h4>
              <h4>order.updatedAt{order.updatedAt}</h4>
              <h4>Order paid date:{order.createdAt.slice(0, 10)}</h4>
              <h4>Order number:{order.id}</h4>
            </Row>
          </Col>
          <Col md={0}>
            <Stack
              gap={5}
              className="m-3 d-flex flex-column align-items-center "
            >
              <Dropdown as={ButtonGroup}>
                <Button
                  size="lg"
                  variant="light"
                  onClick={() => navigate(ORDER_ROUTER + "/" + order.id)}
                >
                  View order details
                </Button>
                <Dropdown.Toggle
                  split
                  variant="light"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate(SOLD_ROUTER)}>
                    Get another label
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate(ORDER_ROUTER)}>
                    AView payment details
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Contact buyer</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Sell similar</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Send refund</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <h5 onClick={() => navigate(SHOP_ROUTER)}>View tracking</h5>
              <h5 onClick={() => navigate(SHOP_ROUTER)}>Edit tracking</h5>
            </Stack>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};
export default OrderPage;
