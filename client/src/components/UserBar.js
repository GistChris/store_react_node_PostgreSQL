import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
// import DeviceStore from "../store/DeviceStore";
import ListGroup from "react-bootstrap/ListGroup";
import { Context } from "../index";
// import device from "../store/DeviceStore";
// observer chto by mobx otslezhival vse izmenenia
const UserBar = observer(() => {
  const { device } = useContext(Context);
  return (
    <ListGroup>
      {device.types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default UserBar;
