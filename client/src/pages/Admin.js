import React, { useState, useEffect, useContext } from "react";
import Col from "react-bootstrap/Col";
import { Button, Container, Row } from "react-bootstrap";
import CreateType from "../components/modals/CreateType";
import CreateDevice from "../components/modals/CreateDevice";
import CreateBrand from "../components/modals/CreateBrand";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
// import "./base.css";
// import "./lightbox.css";
import "./index.css";
import { jwtDecode } from "jwt-decode";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceApi";
const Admin = observer(() => {
  const token=jwtDecode(  localStorage.getItem('token'))
  ///////////////////////////////////////////////
  const { device } = useContext(Context);
  const [brandVisible, setBrandVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [deviceVisible, setDeviceVisible] = useState(false);
  //////////////////////////////////////
  const [showBrands, setShowBrands] = useState(false);
  const [showTypes, setShowTypes] = useState(false);
  const [showItems, setShowItems] = useState(false);
  useEffect(() => {
    //v sluchae uspeshnogo zaprosa .then peredaem data
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
    // fetchDevices(null, null, 1, 2).then((data) => {
    // // fetchDevices(null, null, 1, 8).then((data) => {
    //   device.setDevices(data.rows);
    //   device.setTotalCount(data.count);
    // });
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
  // }, []);
  
  // const {userId}=useParams()
  // console.log("userIdshop",userId)
  // hook useEffect esli massiv zavisimostei pust .. ,[] to podgruzhaet stranitsiu odin raz
  ////////////////////////////////////////////
  // useEffect(() => {
  //   fetchDevices(
  //     device.selectedType.id,
  //     device.selectedBrand.id,
  //     device.page,
  //     2
  //   ).then((data) => {
  //     device.setDevices(data.rows);
  //     device.setTotalCount(data.count);
  //   });
  // }, [device.page, device.selectedType, device.selectedBrand]);
  //////////////////////////////////////////////
  

  return (
    <Container className="d-flex flex-column">
     < h1>Hello {token.email}!</h1>
     < h1>Hello {token.id}!</h1>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShowTypes((s) => !s)}
      >
        {showTypes ? "hide types" :"show types"}
      </Button>

      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setTypeVisible(true)}
      >
        Add type
      </Button>
      <Col md={3}>{showTypes ? <TypeBar /> : null}</Col>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShowBrands((s) => !s)}
      >
        {showBrands ? "hide brands" : "show brands"}
      </Button>
     
      <Col md={3}>{showBrands ? <BrandBar /> : null}</Col>
   
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Add brand
      </Button>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setShowItems((s) => !s)}
      >
        {showItems ? "hide items" : "show items"}
      </Button>
      <Col md={9}>
      {showItems ? <DeviceList/> : null}
      {showItems ? <Pages></Pages> : null}
      </Col>
      <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add item
      </Button>
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      />
      <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
      {/* <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Update item
      </Button> */}
      {/* <CreateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
      /> */}
    </Container>
  );
});

export default Admin;
