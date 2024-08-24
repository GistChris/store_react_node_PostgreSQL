import React, { useContext, useEffect,useState } from "react";
// import {Container,Form} from 'react-bootstrap/esm/Container';
import { Container, Pagination, Row, Button } from "react-bootstrap";
// import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
// import { NavLink, useLocation } from "react-router-dom";
// import { LOGIN_ROUTER, REGISTRATION_ROUTER } from "../util/consts";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
// import { useParams } from "react-router-dom";
import { fetchTypes, fetchBrands, fetchDevices } from "../http/deviceApi";
// import { fetchBasket} from "../http/basketApi";
import Pages from "../components/Pages";
import DeviceItem from "../components/DeviceItem";
import ItemListCart from "../components/ItemListCart";
import { fetchProducts } from "../http/cartApi";

const Basket = observer(() => {
  // const[somme,setSomme]=useState(0)
  let somme = 0;
  let items=0
  console.log("product.products1")
  const [quantityTotal, setQuantityTotal] = useState(0);
  // const { device, orders, products } = useContext(Context);
  // const { device, orders, product } = useContext(Context);
  const { device} = useContext(Context);
  console.log("product.products2")
// const itemss=  fetchProducts(product)
// console.log("itemss",itemss)
// useEffect(() => { 
//  fetchProducts().then((data) => {
  
//   device.setProducts(data);
//       console.log("CAAAAAAART",data)
      
//     })
  // },[]);
    // console.log("itemssw",   product)
  // let somme = 0;
  // let items=0
  // console.log("product.products3",product.products)
//  function countSomme(items,somme){
//   products.forEach((item) => {
//     console.log("item.price", item.quantity);
//     somme += Number(item.price*item.quantity);
//     items=items+item.quantity
//     return somme;
//   });
//  }
console.log("items", items);
  console.log("somme", somme);
// const count =(items,somme)=>{
  // let somme = 0;
  // let items=0
  // console.log("items", items);
  // console.log("somme", somme);
  /////////////////////////////////
  // product.products.forEach((item) => {
  // // products.forEach((item) => {
  //   console.log("item.price", item.quantity);
  //   somme += Number(item.price*item.quantity);
  //   items=items+item.quantity
  //   console.log("items", items);
  //   console.log("somme", somme);
   
    // return somme;
  // });
  ///////////////////////////////////////
// }
// console.log("items", items);
// console.log("somme", somme);
   // hook useEffect esli massiv zavisimostei pust .. ,[] to podgruzhaet stranitsiu odin raz
   console.log("product.products4")
   device.cart.forEach((item) => {
    console.log("item.price", item.quantity);
    somme += Number(item.price*item.quantity);
    items=items+item.quantity
    // device.setQuantityCartItems(items)
    // console.log("device.quantityCartItems", device.quantityCartItems);
    // device.quantityCartItems=items
    console.log("items", items);
    console.log("somme", somme);
    // setSomme(somme)
   
    // return somme;
  });
   useEffect(() => {
    // if (localStorage.getItem("products")) {
    //   // products = JSON.parse(localStorage.getItem("products"));
    //   // device.products = JSON.parse(localStorage.getItem("products"));
    //   // device.cart = JSON.parse(localStorage.getItem("products"));
    //   device.setCart(JSON.parse(localStorage.getItem("products")));
    // }
    // console.log("useEffectcart",cart)
    fetchProducts().then((data) => {
      // console.log("useEffectcart",data)
     device.setCart(data);
     console.log("device.cart",  device.cart)
      // console.log("product.products5",product.products)

    // fetchProducts().then((products) => {
    //     products.setProducts(products);
    //     device.setTotalCount(data.count);
      // });
  //  JSON.parse(localStorage.getItem('products'))
        // console.log("device.cart",device.cart)


  // JSON.parse(localStorage.getItem('products'))
  //   // v sluchae uspeshnogo zaprosa .then peredaem data
  //   fetchDevices(
  //     device.selectedType.id,
  //     device.selectedBrand.id,
  //     device.page,
  //     2
  //   ).then((data) => {
  //     device.setDevices(data.rows);
  //     device.setTotalCount(data.count);
    });
  }, []);
  // console.log("product.products5")
  //chtoby meniat stranitsu
  //v massiv vtorym parametrom }, [device.page, ] peredaem device.page
  //eto znachitchto pri kazhdom vybore tekutshei stranitsty
  //device.page vyzyvaetsia function fetch Devices
  return (
    <Container md={4} className="cart-container">
      <Col className="cart-list">
        {/* {orders.map((device) => ( */}
        <ItemListCart />
        {/* {products.map((device) => (
          // <DeviceItem className={"item-card"} key={device.id} device={device} />
          <CartItem className={"item-card"} key={device.id} device={device} />
        ))} */}
      </Col>
      <Col md={2} className="cart-total">
        <div className="text-container">
          <h4>items{items}</h4> <h4>${somme}</h4>
        </div>
        <div className="text-container">
          <h4>Shipping to H3v1C2</h4> <h4>${somme}</h4>
        </div>
        <div className="gray-line"></div>
        <div className="text-container">
          <h2>Subtotal</h2> <h2>${somme}</h2>
        </div>
        <Button className="">GO TO CKECKOUT</Button>

        {/* {orders.map((device) => (
        // <DeviceItem className={"item-card"} key={device.id} device={device} />
         <CartItem className={"item-card"} key={device.id} device={device} />
      ))} */}
      </Col>
    </Container>
  );
});

export default Basket;
