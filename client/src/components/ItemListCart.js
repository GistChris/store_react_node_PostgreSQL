import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
// import DeviceItem from "./DeviceItem";
import CartItem from "./CartItem";
const ItemListCart = observer(() => {
//   const { product } = useContext(Context);
  const { device } = useContext(Context);
 
  return (
    <Row className="item-list-cart">
        {/* {products.map((product) => ( */}
    {/* {product.products.map((product) => ( */}
        {device.cart.map((product) => (
      <CartItem key={product.id} product={product} />
    ))}
  </Row>
    // <Row className="d-flex">
    //   {device.devices.map((device) => (
    //     <DeviceItem key={device.id} device={device} />
    //   ))}
    // </Row>
  );
});

export default ItemListCart;
