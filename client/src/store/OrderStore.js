import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._orders = [];
    this._orderItems = [];
    makeAutoObservable(this);
  }
  //Actions - functions change state
  setOrders(orders) {
    this._orders = orders;
  }
  setOrderItems(orderItems) {
    this._orderItems = orderItems;
  }
  get orders() {
    return this._orders;
  }
  get orderItems() {
    return this._orderItems;
  }
}
