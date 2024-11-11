import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    //nizhnee podcherkivanie my stavim dlia togo chto by znat chto eta peremennaiia izmeniatsia ne mozhet
    // . Если переменная или метод имеет нижнее подчёркивание в начале (например, _privateVariable или _privateMethod),
    // это может указывать на то,
    // что они предназначены только для внутреннего использования
    // и не предназначены для использования извне объекта или функции.
    // При использовании определенного подхода к написанию кода это возможно.
    //  В javascript — если делать публичные методы класса на замыканиях,
    // то для приватных объявлять локальные переменные в теле конструктора.
    //  И кажется, это достаточно распространненая практика в ES 5
    // this._isAuth=true;
    this._isAuth = false;
    this._user = {};
    //makeAutoObservable(this) dlia togo, chtoby mobx sledil za izmeneniami v etikh peremennykh
    //i sootvetstvenno pri etikh izmeneniakh componenty bydyt pererendrivatsia
    //componenty bydyt pereredrivatsia
    makeAutoObservable(this);
  }
  //actions functsii izmeniaiutshie sostoianie peredaiet peremennoi _isAuth znachenie bool
  setIsAuth(bool) {
    this._isAuth = bool;
  }
  //action dlia izmenenia polzovatelia
  setUser(user) {
    this._user = user;
  }
  get isAuth() {
    return this._isAuth;
  }
  get User() {
    return this._user;
  }
}
