import React, { useContext, useState, useEffect } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { BsFillBasket3Fill } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { fetchCart } from "../http/cartApi";
// import  "./index.scss"
// import  "./index.css"
import { BASKET_ROUTER } from "../utils/consts";
const CartSign = observer(() => {
  const { device, user } = useContext(Context);
  // console.log("user.User.id", user.User.id);
  // console.log("user.User.role", user.User.role);
  const [items, setItems] = useState(0);
  useEffect(() => {
    setItems(device.cart?.length);
    fetchCart(user.User.id).then((data) => {
      device.setCart(data);
      console.log("fetchCartDATA", data);
    });
  }, [device.cart?.length]);
  const navigate = useNavigate();
  return (
    <div className="cart">
      <h1 className="quantity">{items}</h1>
      {/* <h1 className="quantity">2</h1> */}
      <BsFillCartCheckFill
        onClick={() => navigate(BASKET_ROUTER)}
        style={{ color: "white", fontSize: 30 }}
      />
    </div>
  );
});

export default CartSign;
