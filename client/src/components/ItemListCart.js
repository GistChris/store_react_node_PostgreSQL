import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import CartItem from "./CartItem";
const ItemListCart = observer(() => {
  const { device } = useContext(Context);
  return (
    <Row className="item-list-cart">
      {device.cart?.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </Row>
  );
});

export default ItemListCart;
