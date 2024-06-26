import React, { useContext, useEffect } from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Pagination, Row } from "react-bootstrap";
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
import Pages from "../components/Pages";
const Shop = observer(() => {
  const { device } = useContext(Context);
  // const {userId}=useParams()
  // console.log("userIdshop",userId)
  // hook useEffect esli massiv zavisimostei pust .. ,[] to podgruzhaet stranitsiu odin raz
  useEffect(() => {
    //v sluchae uspeshnogo zaprosa .then peredaem data
    fetchTypes().then((data) => device.setTypes(data));

    fetchBrands().then((data) => device.setBrands(data));
    // fetchDevices(null, null, 1, 2).then((data) => {
    fetchDevices(null, null, 1, 8).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
   
      // fetch(`${process.env.REACT_APP_API_URL}users/${id}/`)
      //   .then((results) => {
      //     console.log("results", results);
      //     return results.json();
      //   })
      
 
  }, []);
  // },[device])
  //chtoby meniat stranitsu
  //v massiv vtorym parametrom }, [device.page, ] peredaem device.page
  //eto znachitchto pri kazhdom vybore tekutshei stranitsty 
  //device.page vyzyvaetsia function fetch Devices
  useEffect(() => {
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
      device.page,
      2
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand]);

  // },[device.page, device.selectedType, device.selectedBrand, device])
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <DeviceList />
          <Pages></Pages>
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
