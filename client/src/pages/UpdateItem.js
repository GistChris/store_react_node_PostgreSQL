import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import bigStar from "../assets/bigStar.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
//nook useParams dlia poiska id na servere useParams
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceApi";
import { itemToCart } from "../http/cartApi";
import CreateRating from "../components/modals/CreateRating";
// const jwt = require("jsonwebtoken");
const DevicePage = () => {
  //useState dlia sozdania localnogo sostoiania
  const [device, setDevice] = useState({ info: [] });
  // const [device, setDevice] = useState({});
  const [ratingVisible, setRatingVisible] = useState(false);
  const { id } = useParams();
  //idiz paramentrov stroki
  // console.log("params.id", id);
  //useEffect pri otkrytii stranitsy kazhdyi raz edinozhdy dolzhny podgrouzhat
  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
    // console.log("USEEFFECTdevice",device.info[0].id)
  }, []);
  // const addToCart = () => {
  //   itemToCart(device);
  //   console.log("DEVICE", device);
  //   return;
  // };
  // fetchOneDevice(id).then(data => setDevice(data)) },[id]);

  // const device = {
  //   id: 5,
  //   name: "IPHONE 15 promax",
  //   price: 5000,
  //   rating: 4,
  //   img: "https://i.ytimg.com/vi/j9l98h5wiLc/maxresdefault.jpg",
  // };
  // const description=[
  //   {id:1,title:'random access memory',description:'5 Gb'},
  //   {id:2,title:'camera',description:'12 Mpx'},
  //   {id:3,title:'processor',description:'Intel core I7'},
  //   {id:4,title:'cors',description:'2'},
  //   {id:5,title:'battery',description:'4000'},
  // ]
  return (
    <Container className="mt-3">
        <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        // onClick={() => setDeviceVisible()}
      >
        Update item
      </Button>
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={process.env.REACT_APP_API_URL + device.img}
          />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{device.name}</h2>
            <h2>{device.id}</h2>
            {/* <h2>device.info:{device.info[0].id}</h2> */}
            <h2>{device.typeId}</h2>
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
           {device.rating} 
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
            <h3>From:{device.price} cad.</h3>
            {/* <Button variant={"outline-dark"} onClick={addToCart()}> */}
            <Button variant={"outline-dark"} >
              Add to Cart
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Specifications</h1>

        {device.info.map((info, index) => (
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
      </Row>
    </Container>
  );
};

export default DevicePage;
