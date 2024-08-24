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
import Search from "../components/Search";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

// import { useParams } from "react-router-dom";
import { fetchTypes, fetchBrands, fetchDevices,deleteDevice,fetchInfos } from "../http/deviceApi";
import Pages from "../components/Pages";
const Shop = observer(() => {
  const { device } = useContext(Context);
  // hook useEffect esli massiv zavisimostei pust .. ,[] to podgruzhaet stranitsiu odin raz
  //chtoby meniat stranitsu
  //v massiv vtorym parametrom }, [device.page, ] peredaem device.page
  //eto znachitchto pri kazhdom vybore tekutshei stranitsty 
  //device.page vyzyvaetsia function fetch Devices
  useEffect(() => { 
    // fetchInfos().then((data) => device.setInfos(data));
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    fetchDevices(
      device.selectedType.id,
      device.selectedBrand.id,
       device.page,
      7,
       device.name='k'
    ).then((data) => {
      device.setDevices(data.rows);
      device.setTotalCount(data.count);
    });
  }, [device.page, device.selectedType, device.selectedBrand,device]);
  console.log("Device(device)",device)
  return (
    <Container>
  <Search></Search>
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
