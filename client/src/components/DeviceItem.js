import React from "react";
import { Card,Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
//hook useHistory dlia pereckliuchenia mezhdu staranitsami
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTER } from "../utils/consts";
const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  console.log(navigate );
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => navigate(DEVICE_ROUTER + '/' + device.id)}
    //   onClick={() => navigate.push(DEVICE_ROUTER + "/" + device.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        {/* <Image width={150} Heght={150} src={device.img} /> */}
        {/* // url server process.env.REACT_APP_API_URL */}
        <Image width={150} Heght={150} src={process.env.REACT_APP_API_URL + device.img} />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>Samsung...</div>
          <div className="d-flex align-items-center">
            <div>{device.rating}</div>
            <Image width={10} height={10} src={star} />
          </div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;
