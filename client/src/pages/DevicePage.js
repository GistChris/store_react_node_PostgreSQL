import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import bigStar from "../assets/bigStar.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import { addToCart, fetchCart } from "../http/cartApi";
import { useNavigate } from "react-router-dom";
import { SHOP_ROUTER } from "../utils/consts";
import CreateRating from "../components/modals/CreateRating";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
const DevicePage = observer(() => {
  const { device,user } = useContext(Context);
  const navigate = useNavigate();
  const [product, setProduct] = useState({ info: [] });
  const [ratingVisible, setRatingVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  useEffect(() => {
    fetchOneDevice(id).then((data) => setProduct(data));
  }, []);
  console.log("product",product)
  const addItemToCart = (product) => {
    const formData = new FormData();
    formData.append("userId",user.User.id);
    formData.append("productId", product.id);
    formData.append("productName", product.name);
    formData.append("productPrice", product.price);
    formData.append("productRating", product.rating);
    formData.append("productImg", product.img);
    formData.append("productQuantity", quantity);
    addToCart(formData).then((data) => {
      fetchCart(user.User.id).then((data) => {
        localStorage.setItem("products", JSON.stringify(data));
        device.setCart(data);
      });
    });
    navigate(SHOP_ROUTER);
    return device.cart;
  };
  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + product.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>product.nameffff{product.name}</h2>
            <h2>product.id{product.id}</h2>
            <h2>product.typeId{product.typeId}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {product.rating}
            </div>
            <Button
              variant={"outline-dark"}
              className="mt-4 p-2"
              onClick={() => setRatingVisible(true)}
            >
              Add rating
            </Button>
            <CreateRating
              show={ratingVisible}
              onHide={() => setRatingVisible(false)}
            />
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>From:{product.price} cad.</h3>
            <h3>
              Qty
              <input
                className="quantity-input"
                type="number"
                min="1"
                value={quantity}
                placeholder={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              ></input>
            </h3>
            <Button
              variant={"outline-dark"}
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Specifications</h1>
        {product.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}:{info.description}
          </Row>
        ))}
        <p className="remove">remove</p>
      </Row>
    </Container>
  );
});
export default DevicePage;
