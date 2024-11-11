import React, { useState, useEffect, useContext } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
import { updateCartItem } from "../http/cartApi";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTER } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";
import { fetchCart, deleteCartProduct } from "../http/cartApi";
const CartItem = ({ product }) => {
  let { device } = useContext(Context);
  const token = jwtDecode(localStorage.getItem("token"));
  const [quantity, setQuantity] = useState(product.productQuantity);
  const [cartItemsPrice, setCartItemsPrice] = useState(product.productPrice);
  // useEffect(() => {
  //   fetchCart(token.id).then((data) => device.setCart(data));
  //   console.log("device.cart",device.cart)
  // }, []);
  const changeQuantity = (item, quantity) => {
    const cartProduct = {
      id: item.productId,
      name: item.productName,
      rating: item.productRating,
      img: item.productImg,
      price: item.productPrice,
      quantity: quantity,
    };
    let items = Object.assign(
      device.cart.find((product) => product.id === item.id),
      cartProduct
    );
    // localStorage.setItem("products", JSON.stringify(items));
  };
  const revampCartItem = (cartItemId) => {
    setCartItemsPrice(product.productPrice * quantity);
    device.setCartItemsPrice(product.productPrice * quantity);
    const formData = new FormData();
    formData.append("productId", product.productId);
    formData.append("productQuantity", quantity);
    formData.append("productPrice", cartItemsPrice);

    updateCartItem(formData).then((data) => {
      fetchCart(token.id).then((data) => device.setCart(data));
    });
  };
  const removeItem = (id) => {
    deleteCartProduct(id);
    // localStorage.setItem(
    //   "products",
    //   JSON.stringify(device.cart.filter((e) => e.id !== id))
    // );
  };
  return (
    <Col md={3} className={"mt-3"}>
      <Card className={"item-cart"}>
        <Image
          width={150}
          heighteght={150}
          src={process.env.REACT_APP_API_URL + product.productImg}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div>Id:{product.productId}</div>
            <div>productName:{product.productName}</div>
            <div>rating:{product.productRating}</div>
            <div>Quantity:{product.productQuantity}</div>
            {/* <h3>Price:{product.productPrice}</h3> */}
            <h3>Price:{cartItemsPrice}</h3>
            <Image width={8} height={8} src={star} />
          </div>
          <div>device.name:{product.name}</div>
          <h3>
            Qty
            <input
              className="quantity-input"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              onClick={() => {
                changeQuantity(product, quantity);
                revampCartItem(product.id);
              }}
            ></input>
          </h3>
        </div>
        <p className="item-remove" onClick={() => removeItem(product.id)}>
          Remove
        </p>
      </Card>
    </Col>
  );
};
export default CartItem;
