import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router-dom";
// import { Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
// import { fetchTypes, fetchBrands } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { updateDevice } from "../../http/deviceApi";
import Image from "react-bootstrap/Image";
import { fetchProducts } from "../../http/cartApi";
import { fetchOneDevice, fetchDevices } from "../../http/deviceApi";
import { UPDATE_DEVICE_ROUTER, SHOP_ROUTER } from "../../utils/consts";

//observer chto-by my srasu mogli typy vybirat i videt rerendering
const UpdateDevice = observer(({ show, onHide, id }) => {
  const [product, setProduct] = useState({ info: [] });
  const { device } = useContext(Context);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [showImage, setShowImage] = useState(false);
  //massive kharakteristik
  const [info, setInfo] = useState([]);
  let [newInfo, setNewInfo] = useState([]);
  let [currentAvatar, setCurrentAvatar] = useState("");
  const addFile = React.useRef(" ");
  const navigate = useNavigate();
  //useEffect dlia zagruzki s DB
  // console.log("product.info", product.info);
  /////////////////////////////////////////
  useEffect(() => {
    setNewInfo([...product.info]);
    fetchOneDevice(id).then((data) => setProduct(data));
    // fetchOneDevice(id).then((data) =>  setNewInfo([...product.info]));
  }, []);
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
  };
  const changeNewInfo = (key, value, id) => {
    setNewInfo(
      newInfo.map((i) => (i.id === id ? { ...i, [key]: value } : i))
      // product.info.map((i) => (i.id === id ? { ...i, [key]: value } : i))
    );
    console.log(" newInfobbb", newInfo);
  };
  const selectFile = (e) => {
    const input = e.target;
    const file = input?.files?.[0];
    setShowImage(true);
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      addFile.value = e.target?.result;
      currentAvatar = setCurrentAvatar(addFile.value);
      // submitMedia();
    };
    reader.readAsDataURL(file);
  };

  const clearForm = () => {
    setName(product.name);
    console.log("product.price ", product.price);
    setPrice(product.price);
    setFile(null);
    setInfo([]);
    brand.name = null;
    type.name = null;
    console.log("type.name ", device.types[product.typeId]?.name);
    device.selectedType.name = device.types[product.typeId]?.name;
    console.log("brand.name ", device.brands[product.brandId]?.name);
    device.selectedBrand.name = device.brands[product.brandId]?.name;
    addFile.value = null;
    setShowImage(false);
  };
  const revampDevice = () => {
    const formData = new FormData();
    //BLOB - nabor bitov
    //znachenie dolzhno byt libo string libo blob - nabor bitov
    //nevozmozhno peredat obiect na backend ,poetomy massiv peregoniaem s pomotshiu
    //JSON.stringify(info) v stroku libo BLOb'
    if (name) {
      formData.append("name", name);
    } else {
      console.log("ITEM NAME EXIST");
    }
    if (brand.id) {
      formData.append("brandId", brand.id);
    } else {
      formData.append("brandId", product.brandId);
    }
    if (type.id) {
      formData.append("typeId", type.id);
    } else {
      formData.append("typeId", product.typeId);
    }
    if (`${price}`) {
      formData.append("price", `${price}`);
    } else {
      formData.append("price", product.price);
    }
    if (file) {
      formData.append("img", file);
    } else {
      formData.append("img", product.img);
    }
    formData.append("deviceId", product.id);
    formData.append("info", JSON.stringify(info));
    formData.append("newInfo", JSON.stringify(newInfo));
    updateDevice(formData).then((data) => {
      fetchDevices(
        device.selectedType.id,
        device.selectedBrand.id,
        device.page,
        7,
        (device.name = "k")
      ).then((data) => {
        device.setDevices(data.rows);
        device.setTotalCount(data.count);
      });
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update device {name}, {product.name}, DeviceId{product.id},
          {product.typeId},{product.brandId},{product.price}
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
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            // placeholder={product.price || 7}
            placeholder={product.price || "Enter price"}
          />
          <Image
            width={300}
            height={300}
            src={addFile.value || process.env.REACT_APP_API_URL + product.img}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          {/* <Button variant={"outline-dark"} onClick={addNewInfo}>
            Add add New Info
          </Button> */}
          <h4>Info:{product.id}</h4>
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new property
          </Button>
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
                  placeholder="Enter property name"
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
        <Button variant="outline-success" onClick={clearForm}>
          Clean
        </Button>
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
