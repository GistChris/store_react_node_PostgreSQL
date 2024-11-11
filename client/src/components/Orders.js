import React, { useState } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
import { jwtDecode } from "jwt-decode";
import UpdateDevice from "../components/modals/UpdateDevice";
import { deleteDevice } from "../http/deviceApi";
// import { createDevice } from "../../http/deviceApi";
//hook useHistory dlia pereckliuchenia mezhdu staranitsami
import { useNavigate } from "react-router-dom";
import { ORDER_ROUTER } from "../utils/consts";
import { observer } from "mobx-react-lite";

const Order = ({ order }) => {
  console.log("Order",order );
  const navigate = useNavigate();
  const [deviceVisible, setDeviceVisible] = useState(false);
  const removeItem = (itemId) => {
    deleteDevice(itemId);
  };
  const updateItem = (device) => {
    setDeviceVisible(true);
  };
  const token = jwtDecode(localStorage.getItem("token"));
  // console.log(navigate );
  return (
    <div>
      <Col
        md={3}
        className={"mt-3"}
        onClick={() => navigate(ORDER_ROUTER + "/" + order.id)}
        // onClick={() => navigate(DEVICE_ROUTER + "/" + device.id)}
      >
        <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
          {/* <Image width={150} Heght={150} src={device.img} /> */}
          {/* // url server process.env.REACT_APP_API_URL */}
          {/* <Image
            width={150}
            heighteght={150}
            src={process.env.REACT_APP_API_URL + device.img}
          /> */}
          <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <h2>Id:{order.id}</h2>
            <h2>orderUserId:{order.userId}</h2>
            <h2>orderTotal:{order.total}</h2>
            {/* <div className="d-flex align-items-center">
              <h2>device.id:{device.id}</h2>
              <div>{device.rating}</div>
              <div>device.info:{device.info}</div>
              <Image width={8} height={8} src={star} />
            </div> */}
          </div>
          {/* <div>{device.name}</div> */}
          {/* {token.role === "ADMIN" ? <p 
        className="remove"
        // onClick={() => logOut()}
        // onClick={() =>  console.log("REMOVE")}
        onClick={() =>  removeItem(device)}
        >remove</p> : null} */}
        </Card>
        {/* {token.role === "ADMIN" ? <p 
        className="remove"
        // onClick={() => logOut()}
        // onClick={() =>  console.log("REMOVE")}
        onClick={() =>  removeItem(device)}
        >remove</p> : null} */}
      </Col>
      {/* {token.role === "ADMIN" ? (
        <p
          className="remove"
          // onClick={() => logOut()}
          // onClick={() =>  console.log("REMOVE")}
          onClick={() => removeItem(device.id)}
        >
          remove
        </p>
      ) : null} */}
      {/* {token.role === "ADMIN" ? (
        <p
          className="remove"
          // onClick={() => logOut()}
          // onClick={() =>  console.log("REMOVE")}
          onClick={() => updateItem(device)}
          // onClick={() => setDeviceVisible(true)}
        >
          update
        </p>
      ) : null} */}
      {/* <Button
        variant={"outline-dark"}
        className="mt-4 p-2"
        onClick={() => setDeviceVisible(true)}
      >
        Add item
      </Button> */}
      {/* <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} /> */}
      {/* <UpdateDevice
        show={deviceVisible}
        onHide={() => setDeviceVisible(false)}
        id={device.id}
      /> */}
    </div>
  );
};

export default Order;
