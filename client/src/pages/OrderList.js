import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { Context } from "../index";
import { Row } from "react-bootstrap";
import { ORDER_ROUTER } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import Order from "../components/Orders";
// import Order from "./OrderItem";
import DeviceItem from "../components/DeviceItem";
import OrderItem from "../components/OrderItem";
import { fetchDevices } from "../http/deviceApi";
import { fetchOrders } from "../http/orderApi";
const OrderList = observer(() => {
  const navigate = useNavigate();
  const { user, order } = useContext(Context);
  useEffect(() => {
    fetchOrders(user.User.id).then((data) => {
      order.setOrders(data);
      // console.log("order.order", order.orders);
    });
  }, []);

  return (
    <Row 
    className="d-flex align-items-center justify-content-center">
      <h1>My Flagman Orders</h1>
      {order.orders
        // .slice()
        // .sort((a, b) => a.id - b.id)
        .map((order) => (
          // <Order key={order.id} order={order}></Order>
          <Order
            key={order.id}
            order={order}
            // onClick={() =>{ navigate(ORDER_ROUTER + "/" + order.id)}}
          ></Order>
        ))}
    </Row>
  );
});

export default OrderList;
