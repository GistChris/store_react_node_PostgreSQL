import { makeAutoObservable } from "mobx";
 export default class CartStore {
//globalnoe khranilitshe i v lubom meste prilozhenia mozhno poluchat is nego dannye
  constructor() {
    this._products=[];
    // this._orders=[];
    // this._orders=88;
    makeAutoObservable(this);
  }
  setProducts(products) {
    this._products = products;
  }
  // setOrders(orders) {
  //   this._orders = orders;
  // }
  get products(){
    return this.products;
  }
  // get orders(){
  //   return this.orders;
  // }
}
