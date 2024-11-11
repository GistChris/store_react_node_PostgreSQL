import React, { useState, useContext } from "react";
import { Container, Form, Button, Row, Col, Stack } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTER } from "../utils/consts";
import { login, registration } from "../http/userApi";
import Line from "./Line";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import CreateType from "./modals/CreateType";

const InfoBlock = ({
  text,
  title,
  data,
  controlId,
  label,
  type,
  placeholder,
  linkTitle,
  cancel,
  addInfo,
  inputInfo,
}) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  // const isLogin = location.pathname === LOGIN_ROUTER;
  const [inputVisible, setInputVisible] = useState(false);
  //   const [value, setValue] = useState(" ");
  //   console.log("user", user);
  //   console.log("value", value);
  // const signIn=async()=>{
  //   const response=await registration()
  //   console.log("response",response)
  // }

  // const click = async () => {
  //   // const response = await registration(email, password);
  //   // console.log("response", response);

  //   try {
  //     let data;
  //     if (isLogin) {
  //       data = await login(email, password);
  //       console.log("logindata", data);
  //     } else {
  //       data = await registration(email, password);
  //       console.log("registrationdata", data);
  //     }
  //     // console.log("data",data);
  //     // console.log("data.id",data.id);
  //     // user.setUserId(data.id)
  //     user.setUser(data);
  //     user.setIsAuth(true);
  //     navigate(SHOP_ROUTER);
  //   } catch (e) {
  //     alert(e.response.data.message);
  //   }
  // };
  // console.log(location);
  return (
    <Container className="mt-4 d-flex justify-content-center ">
      <Card style={{ width: "100%" }} className="p-4">
        <Row>
          <Col md={5}>
            <h5>{title}</h5>
          </Col>
          {!inputVisible ? (
            <Col md={5}>
              <h5>{data}</h5>
            </Col>
          ) : null}
          {inputVisible ? (
            <Col md={5}>
              <h5>{text}</h5>
              <Stack gap={3}>
                <FloatingLabel controlId={controlId} label={label}>
                  <Form.Control
                    inputInfo={inputInfo}
                    type={type}
                    placeholder={placeholder}
                    onChange={inputInfo}
                  />
                </FloatingLabel>
                <Col
                  cansel={cancel}
                  addInfo={addInfo}
                  className=" d-flex justify-content-between"
                >
                  <Button
                    variant={"outline-primary"}
                    onClick={() => setInputVisible(false)}
                    // onClick={cancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"outline-secondary"}
                  //   onClick={addInfo}
                    onClick={() =>addInfo(setInputVisible(false))}
                  >
                    Save
                  </Button>
                </Col>
              </Stack>
            </Col>
          ) : null}
          <Col md={1}>
            <h5
              onClick={() => setInputVisible((s) => !s)}
              style={{ width: "40px", cursor: "pointer" }}
            >
              {inputVisible ? null : linkTitle}
            </h5>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default InfoBlock;
