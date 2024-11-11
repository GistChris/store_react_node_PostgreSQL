import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._ratings = [];
    this._types = [];
    this._brands = [];
    this._orders = [];
    this._devices = [];
    this._infos = [];
    this._products = [];
    this._cart = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    this._quantityCartItems = 0;
    this._cartItemsPrice = 0;
    makeAutoObservable(this);
  }
  //Actions - functions change state
  setQuantityCartItems(quantityCartItems) {
    this._quantityCartItems = quantityCartItems;
  }
  setCartItemsPrice(cartItemsPrice) {
    this._cartItemsPrice = cartItemsPrice;
  }
  setRatings(ratings) {
    this._ratings = ratings;
  }
  setProducts(products) {
    this._products = products;
  }
  setOrders(orders) {
    this._orders = orders;
  }
  setCart(cart) {
    this._cart = cart;
  }
  setTypes(types) {
    this._types = types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  setInfos(infos) {
    this._infos = infos;
  }
  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }
  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }
  setPage(page) {
    this._page = page;
  }
  setTotalCount(count) {
    this._totalCount = count;
  }
  get quantityCartItems() {
    return this._quantityCartItems;
  }
  get cartItemsPrice() {
    return this._cartItemsPrice;
  }
  get ratings() {
    return this._ratings;
  }
  get infos() {
    return this._infos;
  }
  get cart() {
    return this._cart;
  }
  get products() {
    return this._products;
  }
  get orders() {
    return this._orders;
  }
  get types() {
    return this._types;
  }
  get brands() {
    return this._brands;
  }
  get devices() {
    return this._devices;
  }
  get selectedType() {
    return this._selectedType;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  get totalCount() {
    return this._totalCount;
  }
  get page() {
    return this._page;
  }
  get limit() {
    return this._limit;
  }
}
