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

const PersonalInfo = ({
  text,
  title,
  data,
  controlId,
  label,
  type,
  placeholder,
  linkTitle,
  addInfo
}) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  // const isLogin = location.pathname === LOGIN_ROUTER;
  const [inputVisible, setInputVisible] = useState(false);

  // console.log("user", user);
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
    <Container
      className="mt-4 d-flex justify-content-center align-items-center"
      // style={{ height: window.innerHeight - 54 }}
    >
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
              <Form>
                <Stack gap={3}>
                  <FloatingLabel
                    controlId="formGridFirstName"
                    label={"First name:" + linkTitle}
                  >
                    <Form.Control type="text" placeholder="Alexander" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="formGridMiddleName"
                    label="Middle Name"
                  >
                    <Form.Control type="text" placeholder="Alexander" />
                  </FloatingLabel>

                  <FloatingLabel
                    controlId="formGridFirstName"
                    label={"Last name:" + data}
                  >
                    <Form.Control type="text" placeholder="Alexander" />
                  </FloatingLabel>

                  {/* <FloatingLabel controlId="formGridLastName" label={label}>
                    <Form.Control type="text" placeholder="Alexander" />
                  </FloatingLabel> */}

                  <Form.Group as={Col} controlId="formGridRegion">
                    <Form.Label>Country or region</Form.Label>
                    <Form.Control type="text" placeholder="Canada" />
                  </Form.Group>

                  <FloatingLabel controlId="formGridCity" label="City">
                    <Form.Control type="text" placeholder="Montreal" />
                  </FloatingLabel>
                  
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="State/Province/Region"
                  >
                    <Form.Select aria-label="Select">
                      <option>-Select Province-</option>
                      <option value="1">Quebec</option>
                      <option value="2">Ontario</option>
                      <option value="3">Manitoba</option>
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                    as={Col}
                    controlId="formGridZip"
                    label="Postal code"
                  >
                    <Form.Control placeholder="H3V1C2" />
                  </FloatingLabel>
                  <Col className=" d-flex justify-content-between">
                  <Button 
                    variant={"outline-primary"}
                    onClick={() => setInputVisible(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant={"outline-secondary"}
                      // onClick={() => addInfo}
                  >
                    Save
                  </Button></Col>
                  <h5>{text}</h5>
                </Stack>
              </Form>
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

export default PersonalInfo;
