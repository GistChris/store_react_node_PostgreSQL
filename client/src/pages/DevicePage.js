import React, { useState, useEffect, useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import bigStar from "../assets/bigStar.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
//nook useParams dlia poiska id na servere useParams
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import { itemToCart } from "../http/cartApi";
import { useNavigate } from "react-router-dom";
// import { DEVICE_ROUTER } from "../utils/consts";UPDATE_DEVICE_ROUTER
import { UPDATE_DEVICE_ROUTER, SHOP_ROUTER } from "../utils/consts";
import CreateRating from "../components/modals/CreateRating";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
const DevicePage = observer(() => {
  const { device, orders, cart } = useContext(Context);

  const navigate = useNavigate();
  //useState dlia sozdania localnogo sostoiania
  // const [device, setDevice] = useState({ info: [] });
  const [product, setProduct] = useState({ info: [] });
  // const [cart, setCart] = useState([]);
  // const [device, setDevice] = useState({});
  const [ratingVisible, setRatingVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const { id } = useParams();
  // let  orderss={}
  let orderss = [];
  let order = [];
  //id iz paramentrov stroki
  // console.log("params.id", id);
  //useEffect pri otkrytii stranitsy kazhdyi raz edinozhdy dolzhny podgrouzhat
  useEffect(() => {
    fetchOneDevice(id).then((data) => setProduct(data));
    // console.log("USEEFFECTdevice",device.info[0].id)
  }, []);
  // let cart=[];
  // const card = cart.setCart(device);
  // console.log("addItem");
  // console.log("DEVICE", device);
  // // cart.push(device)
  // console.log("CARD", card);
  // console.log("CART", cart.cart);
  const addItemToCart = (product) => {
    // const addItemToCart = (device) => {
    // this.setState({orders:[...this.state.orders,device]})
    /////////////////////////////////////////////////
    if (localStorage.getItem("products")) {
      // products = JSON.parse(localStorage.getItem("products"));
      // device.products = JSON.parse(localStorage.getItem("products"));
      orderss = JSON.parse(localStorage.getItem("products"));
      console.log("orders777777");
    }
    //  cart.setOrders(orders) = JSON.parse(localStorage.getItem("products"));
    // device.cart.push({
    // cart.orders.push({
    // orderss= JSON.parse(localStorage.getItem("products"));
    console.log("orderess", orderss);
    // orderss.push({
    //   id: product.id,
    //   name: product.name,
    //   rating: product.rating,
    //   img: product.img,
    //   price:product.price,
    //   quantity:1
    // });
    // orderss=order
    // orderss={
    orderss.push({
      // OrderTotal:45.59,
      // CartDataCreationTime:"1721449637347",
      // CartId:"1b549bb8-0fad-431d-b1a4-699cf09a353a",
      // Currency:"CA$",
      // Products:[1,2,3]
      // {"productTitle":"FLOVEME Magnetic Car Phone Holder L Shape Clip Air Vent Mount For Cell Phone GPS","productPrice":6.28,"productUrl":"https://www.ebay.ca/itm/394172140590",
      // "productImg":"https://i.ebayimg.com/images/g/43UAAOSwOh5i15UM/s-l225.webp",
      // "productQuantity":1,
      // "productSeller":"",
      // "foundInWebAssist":false,
      // "productBrand":""},
      // {"productTitle":"Cell Phone Accessories Car Mount Suction Cup Camera Stand Bracket Window Holder","productPrice":6.76,
      //   "productUrl":"https://www.ebay.ca/itm/315489972189",
      //   "productImg":"https://i.ebayimg.com/images/g/Lx0AAOSwzBxmf8j3/s-l225.webp",
      //   "productQuantity":1,"productSeller":"","foundInWebAssist":false,
      //   "productBrand":""},
      // {"productTitle":"Universal Gravity Car Holder Mount Air Vent Stand Cradle For Mobile Cell Phone","productPrice":3.16,"productUrl":"https://www.ebay.ca/itm/176347908824","productImg":"https://i.ebayimg.com/ima…
      order: [1],
      id: product.id,
      name: product.name,
      rating: product.rating,
      img: product.img,
      price: product.price,
      quantity: 1,
    });
    // order.push({...orderss})
    console.log("order", order);
    console.log("orderessttt", orderss);
    // localStorage.setItem("products", JSON.stringify(device.cart));
    // localStorage.setItem("products", JSON.stringify(product));
    // localStorage.setItem("products", JSON.stringify(cart.orders));
    // localStorage.setItem("products", JSON.stringify( orderss));
    localStorage.setItem("products", JSON.stringify(orderss));

    navigate(SHOP_ROUTER);
    // window.location.reload(false);
    // return device.cart;
    // return cart.orders;
    return orders;
  };
  // fetchOneDevice(id).then(data => setDevice(data)) },[id]);

  return (
    <Container className="mt-3">
      <Button
        value={updateVisible}
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => navigate(UPDATE_DEVICE_ROUTER + "/" + product.id)}
      >
        Update item
      </Button>
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
            <h2>{product.name}</h2>
            <h2>{product.id}</h2>
            {/* <h2>device.info:{device.info[0].id}</h2> */}
            <h2>{product.typeId}</h2>
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
            <Button
              variant={"outline-dark"}
              onClick={() => addItemToCart(product)}
              // onClick={() =>cart.setCart(device)}
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
        {/* {token.role === "ADMIN" ? <p 
        className="remove"
        // onClick={() => logOut()}
        // onClick={() =>  console.log("REMOVE")}
        onClick={() =>  removeItem(device)}
        >remove</p> : null} */}
      </Row>
    </Container>
  );
});

export default DevicePage;
