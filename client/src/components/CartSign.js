import React, { useContext, useState,useEffect } from "react";
import { Context } from "../index";
import { useNavigate } from "react-router-dom";
import { BsFillBasket3Fill } from "react-icons/bs";
import { BsFillCartCheckFill } from "react-icons/bs";
import { fetchProducts } from "../http/cartApi";
// import  "./index.scss"
// import  "./index.css"
import { ADMIN_ROUTER, BASKET_ROUTER, LOGIN_ROUTER, SHOP_ROUTER } from "../utils/consts";
const CartSign = () => { 
    
   
    const {device}= useContext(Context);
    const [items,setItems]=useState(0)
    // setItems(device.cart.length)
    useEffect(() => {
        // setItems(JSON.parse(localStorage.getItem('products')).length)
        // fetchProducts(cart)
        fetchProducts().then((data) => {
        //  device.setCart(data);
        //  console.log("cart.length",cart.length)
            console.log("datalength",data.length)
            
            setItems(data.length) 
        });
      }, []);
const navigate = useNavigate();
    return (
        <div className="cart">
            {/* <h1 className="quantity">{device.cart.length}</h1> */}
            <h1 className="quantity">{items}</h1>
               {/* <h1 className="quantity"   >{product.products.length}</h1> */}
             {/* <h1 className="quantity-items"  style={{ color: "red" ,fontSize:30}} >{orders.length}</h1> */}
             <BsFillCartCheckFill  onClick={() => navigate(BASKET_ROUTER)} style={{ color: "white" ,fontSize:30}} />
        </div>
    );
};

export default CartSign;