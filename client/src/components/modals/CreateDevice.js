import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import { Dropdown, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
// import { fetchTypes, fetchBrands, fetchDevices,deleteDevice,fetchInfos } from "../http/deviceApi";
import { fetchTypes, fetchBrands, fetchDevices } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { createDevice } from "../../http/deviceApi";
import Image from "react-bootstrap/Image";
//observer chto-by my srasu mogli typy vybirat i videt rerendering
const CreateDevice = observer(({ show, onHide }) => {
  // const CreateDevice = ({ show, onHide }) => {
  // const [product, setProduct] = useState({ info: [] });
  const { device } = useContext(Context);
  const [name, setName] = useState(" ");
  const [showImage, setShowImage] = useState(false);
  let [currentAvatar, setCurrentAvatar] = useState("");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState([]);
  const addFile = React.useRef(" ");
  //useEffect dlia zagruzki s DB
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  // }, [device]);
}, []);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const removeInfo = (number) => {
    setInfo(info.filter((i) => i.number !== number));
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
  // const submitMedia = async () => {
  //   state.taskMediaUrl = addFile.value;
  // };
  // const addFile = ref("");

 
  // {
  //   /* <someElement ref={myRef} /> */
  // }
  function onFileMediaChanged(e) {
    // const input = event.target ;
    const input = e.target;
    const file = input?.files?.[0];
    // if (file && file.type.startsWith("video/")) {
    const reader = new FileReader();
    reader.onload = (e) => {
      addFile.value = e.target?.result;
      currentAvatar = setCurrentAvatar(addFile.value);
      // submitMedia();
    };
    console.log("file",file)
    console.log("addFile.value",addFile.value)
    reader.readAsDataURL(file);
    // reader.readAsDataURL(addFile.value);
  }
  // if (file && file.type.startsWith("image/")) {
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     addFile.value = e.target?.result as string;
  //     submitMedia();
  //   };
  //   reader.readAsDataURL(file);
  // }
  // }
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
const clearForm=()=>{
  setName(" ");
  setPrice(0);
  setFile(null);
  setInfo([]);
  device.selectedType.name=null;
  device.selectedBrand.name=null;
  addFile.value=null;
  setShowImage(false)
}
  const addDevice = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", device.selectedBrand.id);
    formData.append("typeId", device.selectedType.id);
    formData.append("info", JSON.stringify(info));
    // console.log("name", name);
    // console.log("price", `${price}`);
    // console.log("img", file);
    // console.log("brandId", device.selectedBrand.id);
    // console.log("typeId", device.selectedType.id);
    // console.log("info", info);
    //a na servere json stroka budet parsitsia obratno v massiv
    //esli zapros proshel uspeshno zakryvaem modalnoe pkno
    createDevice(formData).then((data) => {
      device.selectedBrand.id=null
      device.selectedType.id=null
      clearForm();
      onHide();
    });
    // console.log("formData",formData)
    // console.log(77777777)

    // function showFile(input) {
    //   let file = input.files[0];

    //   alert(`File name: ${file.name}`); // например, my.png
    //   alert(`Last modified: ${file.lastModified}`); // например, 1552830408824
    // }
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2 ">
            <Dropdown.Toggle>
              {device.selectedType.name || "Choose type"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {device.selectedBrand.name || "Choose brand"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* <option key = 'blankChoice' hidden value> --Your placeholder text-- </option> */}

          {/* <Form.Label className="mt-3" htmlFor="deviceName">Enter  name</Form.Label> */}
          <Form.Control
            className="mt-3"
            id="deviceName"
            type="text"
            placeholder="Enter device name"
            // value={name || "Choose name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {showImage ? (
            <Image width={300} height={300} src={addFile.value} />
          ) : null}
          <Form.Label className="mt-3" htmlFor="devicePrice">
            Enter price
          </Form.Label>
          <Form.Control
            className="mt-3"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Enter price"
          />
          {/*<input type="file" onchange="showFile(this)"> */}
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="outline-success" onClick={clearForm}>
          Clean
        </Button>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addDevice}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
  // };
});

export default CreateDevice;
