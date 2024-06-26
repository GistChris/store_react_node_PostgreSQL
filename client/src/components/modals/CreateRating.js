import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { createRating } from "../../http/deviceApi";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "../../index";
import { jwtDecode } from "jwt-decode";
import { currentUser } from "../../http/userApi";
const CreateRating = ({ show, onHide }) => {
  //   const [value, setValue] = useState(' ');
  //   const formData = new FormData();
  const { id } = useParams();
  const userId=Number(jwtDecode(localStorage.getItem('token')).id)
  const [rating, setRating] = useState(0);
  const addRating = () => {
    // createRating({ name: value }).then((data) => {
    createRating({ rate: rating, deviceId: Number(id),userId:userId }).then((data) => {
      //   setValue(' ');
      setRating(0);
      // setRating(rating);
      onHide();
    });
  };
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add your rating
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            className="mt-3"
            placeholder="Enter your rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <h1>{rating}</h1>
          <h1>{id}</h1>
          {/* <Form.Control
            className="mt-3"
            placeholder="Enter price"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          /> */}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Close
        </Button>
        <Button variant="outline-success" onClick={addRating}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateRating;
