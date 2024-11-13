import React, { useState, useContext } from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Form, Button, Row } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { updateUser } from "../http/userApi";
import Card from "react-bootstrap/Card";
import InfoBlock from "../components/InfoBlock";
import PersonalInfo from "../components/PersonalInfo";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  SHOP_ROUTER,
} from "../utils/consts";
import {currentUser, login, registration } from "../http/userApi";
import { observer } from "mobx-react-lite";
// import { Context } from "../index";
import { Context } from "../index";

const Profile = observer(() => {
  const { user } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddileName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
//   user.getUseruser.setUserId(data.id)
console.log("response", user);
  const revampPersonalInfo = () => {
    const formData = new FormData();
    if (user.User.id) {
      formData.append("userId", user.User.id);
    }
    if (email) {
      formData.append("email", email);
    }
    // if (password) {
    // //   formData.append("password", password);
    // }
    if (userName) {
      formData.append("userName", userName);
    }
    if (firstName) {
      formData.append("firstName", firstName);
    }
    if (middleName) {
      formData.append("middleName", middleName);
    }
    if (lastName) {
      formData.append("lastName", lastName);
    }
    if (country) {
      formData.append("country", country);
    }
    if (region) {
      formData.append("region", region);
    }
    if (city) {
      formData.append("city", city);
    }
    if (streetAddress) {
      formData.append("streetAddress", streetAddress);
    }
    if (postalCode) {
      formData.append("postalCode", postalCode);
    }
    if (phoneNumber) {
      formData.append("phoneNumber", phoneNumber);
    }
    try {
      updateUser(formData).then((data) => {
        currentUser(user.User.id).then((data)=>{
            
            user.setUser(data)
        });
      });
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  console.log("USERUPDATE",user.User)
//   console.log("USERUPDATE",user.User.city)
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Stack gap={3}>
        <h2 className="m-auto">Personal infoww{user.User.city}</h2>
        <InfoBlock
          title="Username"
          text="If you change your username, you won’t be able to modify it again for 30 days."
          data={user.User.id}
          controlId="floatingUserName"
          label="Username"
          linkTitle="Edit"
          addInfo={revampPersonalInfo}
          inputInfo={(e) => setUserName(e.target.value)}
        ></InfoBlock>
        <InfoBlock
          title="Email address"
          text="For a higher level of protection, make sure your personal info is up to date."
          data="Email address
          c***9@mail.ru
          Verified"
          controlId="floatingEmail"
          label="Email"
          type="email"
          linkTitle="Edit"
          addInfo={revampPersonalInfo}
          inputInfo={(e) => setEmail(e.target.value)}
        ></InfoBlock>
        <InfoBlock
          title="Phone number"
          text="If verification is required, you agree to receive a security code. Standard rates may apply."
          data="Phone number
            +1 xxxxxxxx54
            Verified"
          controlId="floatingEmail"
          label="Phone number"
          type="text"
          linkTitle="Edit"
          addInfo={revampPersonalInfo}
          inputInfo={(e) => setPhoneNumber(e.target.value)}
        ></InfoBlock>
        <PersonalInfo
          text="
Please make sure your details are accurate. If we're unable to verify the updates you make, your payouts may be held."
          title="Personal info"
          data="
Owner name, address
Chentsov Alexander
3500-207 Ridgewood
Montreal, QC H3V1C2 
CA"
          inputFirstName={(e) => setFirstName(e.target.value)}
          inputMiddleName={(e) => setMiddileName(e.target.value)}
          inputLastName={(e) => setLastName(e.target.value)}
          inputCountry={(e) => setCountry(e.target.value)}
          inputCity={(e) => setCity(e.target.value)}
          inputRegion={(e) => setRegion(e.target.value)}
          inputStreetAddress={(e) => setStreetAddress(e.target.value)}
          inputPostalCode={(e) => setPostalCode(e.target.value)}
          linkTitle="Edit"
          addInfo={revampPersonalInfo}
        ></PersonalInfo>
      </Stack>

      {/* <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "SignIn" : "SignUp"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            placeholder="enter email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pr-3 pl-3">
            {isLogin ? (
              <div>
                No account? <NavLink to={REGISTRATION_ROUTER}>SignUp</NavLink>
              </div>
            ) : (
              <div>
                Do you have an account?{" "}
                <NavLink to={LOGIN_ROUTER}>SignIn</NavLink>
              </div>
            )}

            <Button variant={"outline-success"} onClick={click}>
              {isLogin ? "Enter" : "SignUp"}
            </Button>
          </Row>
        </Form>
      </Card> */}
    </Container>
  );
});

export default Profile;
