import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
// import { Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { fetchTypes, fetchBrands } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { updateDevice } from "../../http/deviceApi";
import Image from "react-bootstrap/Image";
import { fetchProducts } from "../../http/cartApi";
import { fetchOneDevice } from "../../http/deviceApi";

//observer chto-by my srasu mogli typy vybirat i videt rerendering
const UpdateDevice = observer(({ show, onHide, id }) => {
  const [product, setProduct] = useState({ info: [] });
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  //massive kharakteristik
  const [info, setInfo] = useState([]);
  let [newInfo, setNewInfo] = useState([]);
  //useEffect dlia zagruzki s DB
  // console.log("product.info", product.info);
  /////////////////////////////////////////
  useEffect(() => {
    setNewInfo([...product.info]);
    fetchOneDevice(id).then((data) => setProduct(data));
    // fetchOneDevice(id).then((data) =>  setNewInfo([...product.info]));
  },[]);
  /////////////////////////////////////////////
  // console.log("new----------Info", newInfo);
  // const addNewInfo = () => {
  //   setNewInfo([...product.info]);
  //   // setInfo([...info, { title: "", description: "", number: Date.now() }]);
  //   // setInfo([...product.info, { title: "", description: "", number: Date.now() }]);
  // };
  const addInfo = () => {
    setNewInfo([...product.info]);
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
  };
  const removeNewInfo = (id) => {
    setNewInfo(newInfo.filter((i) => i.id !== id));
  };
  const changeInfo = (key, value, number) => {
    // key eto libo title libo description, number- nomer kharakteristiki
    //  po kotoroi znachenie budem izmeniat
    setInfo(
      //esli number v massive info sovpadaet s nomerom elementa itteratsii ,to
      // togda my vozratshaem novyi obiect, razvorachivaem v nego kharacteristiku
      // po kluchu zameniaem u nee pole
      //to est esli kliuch byl title to my zameniaem na novoe znachenie, esli
      //nomer ne sovpadaet my vozratshaem obect ne izmenennym
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
    console.log(" Inf))))", info);
  };
  // setNewInfo([...product.info]);
  // const changeNewInfo = (key, value, number) => {
  const changeNewInfo = (key, value, id) => {
    console.log("value", value);
    console.log("KEY", key);
    console.log("ID", id);
    // setNewInfo([...newInfo, { title: "", description: "", number: Date.now() }]);
    // setNewInfo([...newInfo]);
    // setNewInfo([...product.info]);
    // key eto libo title libo description, number- nomer kharakteristiki
    //  po kotoroi znachenie budem izmeniat
    // setNewInfo([...product.info]);
    setNewInfo(
      newInfo.map((i) => (i.id === id ? { ...i, [key]: value } : i))
      // product.info.map((i) => (i.id === id ? { ...i, [key]: value } : i))
    );
    console.log(" newInfobbb", newInfo);
  };
  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };
  const revampDevice = () => {
    console.log("newInfo", newInfo);
    console.log("Info", info);
    console.log("product", product);
    console.log("product.price", product.price);
    console.log("product.img", product.img);
    console.log("product.brandId", product.brandId);
    console.log("product.typeId", product.typeId);
    console.log("deviceId", product.id);
    const formData = new FormData();
    formData.append("name", name || product.name);
    //BLOB - nabor bitov
    //znachenie dolzhno byt libo string libo blob - nabor bitov
    //v dannom sluchae mozhem otpravliat file
    //poetomy price converted in string
    // formData.append("price", `${price}` || product.price);
    // formData.append("img", file || product.img);
    // formData.append("brandId", brand.id || product.brandId);
    // formData.append("typeId", type.id || product.typeId);
    // formData.append("deviceId", product.id);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", brand.id);
    formData.append("typeId", type.id);
    formData.append("deviceId", product.id);
    //nevozmozhno peredat obiect na backend ,poetomy massiv peregoniaem s pomotshiu
    //JSON.stringify(info) v stroku libo BLOb'
    formData.append("info", JSON.stringify(info));
    formData.append("newInfo", JSON.stringify(newInfo));
    //a na servere json stroka budet parsitsia obratno v massiv
    //esli zapros proshel uspeshno zakryvaem modalnoe pkno
    // console.log("formData.price",formData.img)
    // console.log("formData",formData)
    updateDevice(formData).then((data) => onHide());
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update device {product.name}, DeviceId{product.id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2 ">
            <h4>Type:{type.name || device.types[product.typeId]?.name}</h4>
            <Dropdown.Toggle>
              {type.name || device.types[product.typeId]?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item onClick={() => setType(type)} key={type.id}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <h4>Brand:{brand.name || device.brands[product.brandId]?.name}</h4>
            <Dropdown.Toggle>
              {brand.name || device.brands[product.brandId]?.name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item onClick={() => setBrand(brand)} key={brand.id}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Label className="mt-3" htmlFor="deviceName">
            Enter name
          </Form.Label>
          <Form.Control
            className="mt-3"
            id="deviceName"
            type="text"
            // placeholder="Enter device name" {device.selectedBrand.name || "Choose brand"}
            placeholder={product.name || "Enter device name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Label className="mt-3" htmlFor="devicePrice">
            Enter price
          </Form.Label>
          <Form.Control
            className="mt-3"
            type="number"
            // value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            // placeholder={product.price || 7}
            placeholder={product.price || "Enter price"}
          />
          <Image
            width={300}
            height={300}
            // src={process.env.REACT_APP_API_URL + product.img}
            src={
              process.env.REACT_APP_API_URL + product.img
              // || process.env.REACT_APP_API_URL + file
            }
          />
          {/* <p>{product.info[0].id}</p> */}
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          {/* <Button variant={"outline-dark"} onClick={addNewInfo}>
            Add add New Info
          </Button> */}
          <h4>Info:{product.id}</h4>
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new property
          </Button>

          {/* {newInfo.map((i) => ( */}
          {product.info.map((i, index) => (
            <Row className="mt=4" key={i.id}>
              <Col md={4}>
                <Form.Control
                  className="mt-3"
                  id="propertyName"
                  value={newInfo[i]}
                  // value={i.title}
                  onChange={(e) => changeNewInfo("title", e.target.value, i.id)}
                  placeholder={i.title}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  id="propertyDescription"
                  className="mt-3"
                  value={newInfo[i]}
                  // value={i.description}
                  onChange={(e) =>
                    changeNewInfo("description", e.target.value, i.id)
                  }
                  placeholder={i.description}
                />
              </Col>
              <Col className="mt-3" md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeNewInfo(i.id)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
          {info.map((i) => (
            <Row className="mt=4" key={i.number}>
              <Col md={4}>
                {/* <Form.Label className="mt-3" htmlFor="propertyName">Enter property name</Form.Label> */}
                <Form.Control
                  className="mt-3"
                  id="propertyName"
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Enter propertyf name"
                />
              </Col>
              <Col md={4}>
                {/* <Form.Label className="mt-3" htmlFor="propertyDescription">Enter property description</Form.Label> */}
                <Form.Control
                  id="propertyDescription"
                  className="mt-3"
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Enter property description"
                />
              </Col>
              <Col className="mt-3" md={4}>
                <Button
                  variant={"outline-danger"}
                  onClick={() => removeInfo(i.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>

      {/* {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))} */}
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={revampDevice}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
  // };
});

export default UpdateDevice;
