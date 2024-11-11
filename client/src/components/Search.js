import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Context } from "../index";
import { Card, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { fetchTypes, fetchBrands, fetchAllDevices } from "../http/deviceApi";
import Form from "react-bootstrap/Form";
import axios from "axios";
const Search = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState(" ");
  // console.log("search,",search)
  const { device } = useContext(Context);
  const getItems = () => {
    // const devices=    axios.get('http://localhost:5000/api/device').then((response)=>{
    axios.get("http://localhost:5000/api/device").then((response) => {
      setItems(response.data);
    });
    // console.log("devicessd",devices)
  };
  useEffect(() => {
    getItems();
  }, []);
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
    <div>
      <Form className="search-block">
        <Form.Control
          type="search"
          placeholder="Search"
          className="search"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          //   onChange={(e) => console.log(e.target.value)}
        />
        {/* <Button variant="outline-success" onClick={searchItem}>Search</Button> */}
      </Form>
      <ListGroup>
      {device.devices.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
      {/* <Col className="d-flex ">
        
             {items.row.map((item) => (
          <Card
            style={{ cursor: "pointer" }}
            key={item.id}
            className="p-3"
            //   onClick={() => device.setSelectedBrand(brand)}
            //   border={brand.id === device.selectedBrand.id ? "danger" : "light"}
          >
            {item.name}
          </Card>
        ))}
      </Col> */}
      <Col className="d-flex ">
        {device.brands.map((brand) => (
          <Card
            style={{ cursor: "pointer" }}
            key={brand.id}
            className="p-3"
            onClick={() => device.setSelectedBrand(brand)}
            border={brand.id === device.selectedBrand.id ? "danger" : "light"}
          >
            {brand.name}
          </Card>
        ))}
      </Col>
    </div>
  );
};

export default Search;
