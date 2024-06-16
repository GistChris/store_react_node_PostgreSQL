import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Dropdown, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { fetchTypes, fetchBrands } from "../../http/deviceApi";
import { observer } from "mobx-react-lite";
import { createDevice } from "../../http/deviceApi";
//observer chto-by my srasu mogli typy vybirat i videt rerendering
const CreateDevice = observer(({ show, onHide }) => {
  // const CreateDevice = ({ show, onHide }) => {
  const { device } = useContext(Context);
  const [name, setName] = useState(" ");
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  //massive kharakteristik
  const [info, setInfo] = useState([]);
  //useEffect dlia zagruzki s DB
  useEffect(() => {
    fetchTypes().then((data) => device.setTypes(data));
    fetchBrands().then((data) => device.setBrands(data));
  }, []);
  const addInfo = () => {
    setInfo([...info, { title: " ", description: " ", number: Date.now() }]);
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

  const selectFile = (e) => {
    // /console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const addDevice = () => {
    // console.log(info);
    //ispolzuem ne stroku v formate json, a ispolzuem formData
    const formData = new FormData();
    formData.append("name", name);
    //BLOB - nabor bitov
    //znachenie dolzhno byt libo string libo blob - nabor bitov
    //v dannom sluchae mozhem otpravliat file
    //poetomy price converted in string
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    //nevozmozhno peredat obiect na backend ,poetomy massiv peregoniaem s pomotshiu
    //JSON.stringify(info) v stroku libo BLO'
    formData.append('info', JSON.stringify(info));
    //a na servere json stroka budet parsitsia obratno v massiv
    //esli zapros proshel uspeshno zakryvaem modalnoe pkno
    createDevice(formData).then((data) => onHide());
    console.log("formData",formData)
    console.log(77777777)
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
          <Dropdown className="mt-2 mb-2">
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
          <Form.Control
            className="mt-3"
            placeholder="Enter device name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Enter price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant={"outline-dark"} onClick={addInfo}>
            Add new property
          </Button>
          {info.map((i) => (
            <Row className="mt=4" key={i.number}>
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, i.number)
                  }
                  placeholder="Enter property name"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.number)
                  }
                  placeholder="Enter property description"
                />
              </Col>
              <Col md={4}>
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
