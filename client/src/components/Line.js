import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import { Card, Col, Container,Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchTypes, fetchBrands, fetchAllDevices } from "../http/deviceApi";
import Form from "react-bootstrap/Form";
import axios from "axios";
const Line = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(" ");
  // console.log("search,",search)
  const { device } = useContext(Context);
  // const getItems = () => {
  //   // const devices=    axios.get('http://localhost:5000/api/device').then((response)=>{
  //   // axios.get("http://localhost:5000/api/device").then((response) => {
  //   //   setItems(response.data);
  //   // });
  //   // console.log("devicessd",devices)
  // };
  // useEffect(() => {
  //   getItems();
  // }, []);
  // console.log("ITEMSSSS",items.rows)
  //   const filteredItems = items.filter((item) => {
  //     return item.name.toLowerCase().includes(search.toLowerCase());
  //   });

  // const searchItem=()=>{
  //    const devices  =   fetchAllDevices()
  //    console.log("device.name",devices)
  // //   devices.rows.forEach((device) => {
  //    device.devices.forEach((device) => {
  //    console.log("device.name:",device.name)
  //    console.log("device.id:",device.id)
  //    });

  // }

  return (
   <Container>
    <div className="mb-2"
      style={{ backgroundColor: "grey", width: "100%", height: "2px" }}
    ></div>
     {/* <Row>
     <Col><h5>Username</h5></Col><Col><h5>Username</h5></Col>
      </Row> */}
    </Container> 
  );
};

export default Line;
