import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Card, Row,Col } from "react-bootstrap";
import DeviceItem from "./DeviceItem";
const BrandBar = observer(() => {
  const { device } = useContext(Context);
  console.log("DEVICEBrandBar ",device.brands)
  return (
    <Col className="d-flex ">
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: "pointer" }}
          key={brand.id}
          className="p-3"
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? "danger" : "light"}
        >
          {brand.name}
        </Card>
      ))}
    </Col>
  );
});

export default BrandBar;
