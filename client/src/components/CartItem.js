import React, { useState, useEffect, useContext } from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import star from "../assets/star.png";
//hook useHistory dlia pereckliuchenia mezhdu staranitsami
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTER } from "../utils/consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
// import { count } from "mobx-react-lite";
// const CartItem = ({ device }) => {
  // const CartItem = observer(({ product }) => {
    const CartItem = ({ product }) => {
  let { device } = useContext(Context);
  // const [dataAll, setDataAll] = useState(products);
  const [quantity, setQuantity] = useState(product.quantity);
  // console.log("quantity",quantity)
  // const navigate = useNavigate();
  // useEffect(() => {
    // let somme=0
    // let items=0
    // console.log("device.products",device.products)
  const changeQuantity=(iteme,quantity)=>{
    // console.log("device.products",device.cart)
    console.log("quantity",quantity)
    console.log("item",iteme)
    const product={
      // id: device.id,
      // name: device.name,
      // rating: device.rating,
      // img: device.img,
      // price:device.price,
      // quantity:quantity
      id: iteme.id,
      name: iteme.name,
      rating: iteme.rating,
      img: iteme.img,
      price:iteme.price,
      quantity:quantity
    }
   let items= Object.assign(device.cart.find(item => item.id === iteme.id), product)
   console.log("CARTITEMitems",items)
    localStorage.setItem('products', JSON.stringify(items))
    // count()
    // products.forEach((item) => {
    //   console.log("item.price", item.quantity);
    //   somme += Number(item.price*item.quantity);
    //   items=items+item.quantity
    //   console.log("items", items);
    //   console.log("somme", somme);
    //   // return somme;
    // });
    // localStorage.setItem('ключ', 'значение'). Добавляет в localStorage новый ключ со значением (а если такой ключ уже существует, то перезаписывает новым значением).
    // localStorage.getItem('ключ'). Берёт определённое значение из хранилища по ключу.
    // localStorage.removeItem("Ключ"). Удаляет ключ.
    // localStorage.clear(). Очищает всё хранилище.
      }
    // }, []);
//   const changeQuantity=(device,quantity)=>{
// const product={
//   id: device.id,
//   name: device.name,
//   rating: device.rating,
//   img: device.img,
//   price:device.price,
//   quantity:quantity
// }
// Object.assign(products.find(item => item.id === device.id), product)
// localStorage.setItem('products', JSON.stringify(products))
// // localStorage.setItem('ключ', 'значение'). Добавляет в localStorage новый ключ со значением (а если такой ключ уже существует, то перезаписывает новым значением).
// // localStorage.getItem('ключ'). Берёт определённое значение из хранилища по ключу.
// // localStorage.removeItem("Ключ"). Удаляет ключ.
// // localStorage.clear(). Очищает всё хранилище.
//   }
  const removeItem = (id) => {
    localStorage.setItem("products", JSON.stringify(device.cart.filter((e) => e.id !== id)));
    window.location.reload(false);
  };
  return (
    <Col
      md={3}
      className={"mt-3"}
    >
      <Card className={"item-cart"}>
        <Image
          width={150}
          heighteght={150}
          src={process.env.REACT_APP_API_URL +product.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div>device.id:{product.id}</div>
            <div>rating:{product.rating}</div>
            <div>device.info:{product.info}</div>
            <h3>device.price:{product.price}</h3>
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
              // value={product.quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              onClick={()=>changeQuantity(product,quantity)}
            ></input>
          </h3>
        </div>
        <p
          className="item-remove"
          // onClick={() => navigate(DEVICE_ROUTER + "/" + device.id)}
          onClick={() => removeItem(product.id)}
        >
          Remove
        </p>
      </Card>
    </Col>
  );
// });
};

export default CartItem;
