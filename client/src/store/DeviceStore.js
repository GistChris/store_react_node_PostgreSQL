import { makeAutoObservable } from "mobx";

 export default class DeviceStore {
//globalnoe khranilitshe i v lubom meste prilozhenia mozhno poluchat is nego dannye
  constructor() {
    this._ratings=[];
    // this._types = [
    //   { id: 1, name: "frigidaires" },
    //   { id: 2, name: "cellulaires" },
    //   { id: 3, name: "tv" },
    //   { id: 4, name: "laptop" },
    // ];
    /////////////////////
    this._types = [];
    ////////////////////
    // this._brands = [
    //   { id: 1, name: "APPLE" },
    //   { id: 2, name: "SAMSUNG" },
    //   { id: 3, name: "Xiaomi" },
    //   { id: 4, name: "Lenovo" },
    // ];
    ////////////////////////////
    this._brands = [];
    ////////////////////////////////
    this._devices = [];
    ////////////////////////
    this._infos = [];
    ////////////////////////
    // this._products = [];
    this._cart = [];
    // this._devices = [
    //   {
    //     id: 1,
    //     name: "SAMSUNG Galaxy 20",
    //     price: 500,
    //     rating: 4,
    //     img: "https://gsm-store.ru/upload/medialibrary/a5a/tnua9yh9cmw6u7h78phr1g8wmou5ggvc.jpg",
    //   },
    //   {
    //     id: 2,
    //     name: "SAMSUNG Galaxy s24 ultra",
    //     price: 1500,
    //     rating: 5,
    //     img: "https://i.ytimg.com/vi/_yxdnfcr8js/maxresdefault.jpg?7857057827",
    //   },
    //   {
    //     id: 3,
    //     name: "SAMSUNG Galaxy a52",
    //     price: 460,
    //     rating: 3,
    //     img: "https://avshop.ru/images/upload/9b5/9b51a2f7df23347af1c079d4a3b50c41.webp",
    //   },
    //   {
    //     id: 4,
    //     name: "IPHONE 15 pro",
    //     price: 2300,
    //     rating: 5,
    //     img: "https://www.theapplepost.com/wp-content/uploads/2023/02/4B3DE31A-E802-409E-91E5-31313A43C3E1.jpg",
    //   },
    //   {
    //     id: 5,
    //     name: "IPHONE 15 promax",
    //     price: 5000,
    //     rating: 4,
    //     img: "https://i.ytimg.com/vi/j9l98h5wiLc/maxresdefault.jpg",
    //   },
    //   {
    //     id: 6,
    //     name: "Xiaomi 14 Ultra",
    //     price: 3125,
    //     rating: 5,
    //     img: "https://i.ytimg.com/vi/1CKy1wTcRZQ/maxresdefault.jpg",
    //   },
    //   {
    //     id: 7,
    //     name: "IPHONE 15 promax",
    //     price: 5002133540,
    //     rating: 4,
    //     img: "https://i.ytimg.com/vi/j9l98h5wiLc/maxresdefault.jpg",
    //   },
    //   {
    //     id: 8,
    //     name: "Xiaomi 14 Ultra",
    //     price: 312515515,
    //     rating: 5,
    //     img: "https://i.ytimg.com/vi/1CKy1wTcRZQ/maxresdefault.jpg",
    //   },
    // ];
    ///////////////////////////////////////////////////mozhno ubrat
    this._selectedType = {};
    this._selectedBrand = {};
    ///////////////////////////////////////////////////mozhno ubrat
    // this.page = 1;
    //pole ovechaiutshee za tekutshuiu starnitsy (po umolchaniu 1)
    this._page = 1;
    //obtshee kolichestvo tovarov po dannomu zaprosu
    this._totalCount = 0;
    //kolichestvo tovarov na odnoi stranitse
    this._limit = 3;
    //kolichestvo tovarov v korzine
    this._quantityCartItems=0
    makeAutoObservable(this);
  }
  setQuantityCartItems(quantityCartItems){
    this._quantityCartItems = quantityCartItems;
  }
  setRatings(ratings) {
    this._ratings = ratings;
  }
  // setProducts(products) {
  //   this._products = products;
  // }
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
  get ratings() {
    return this._ratings;
  }
  get infos() {
    return this._infos;
  }
  get cart() {
    return this._cart;
  }
  get products(){
    return this._products
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
