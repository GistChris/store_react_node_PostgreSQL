import Admin from "./pages/Admin";
import Basket from "./pages/Cart";
import Shop from "./pages/Shop";
import UpdateItem from "./pages/UpdateItem";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import OrderPage from "./pages/OrderPage";
import OrderList from "./components/OrderList";
import Profile from "./pages/Profile";
// import OrderPage from "./pages/DevicePage";
import {
  ORDER_ROUTER,
  SOLD_ROUTER,
  ADMIN_ROUTER,
  BASKET_ROUTER,
  DEVICE_ROUTER,
  LOGIN_ROUTER,
  REGISTRATION_ROUTER,
  SHOP_ROUTER,
  PROFILE_ROUTER,
  UPDATE_DEVICE_ROUTER,
} from "./utils/consts";
export const authRoutes = [
  {
    path: ADMIN_ROUTER,
    Component: Admin,
  },
  {
    path: BASKET_ROUTER,
    Component: Basket,
  },
  {
    path: UPDATE_DEVICE_ROUTER + "/:id",
    Component: UpdateItem,
  },
  {
    path: ORDER_ROUTER + "/:id",
    Component: OrderPage,
  },
  {
    path: SOLD_ROUTER,
    Component: OrderList,
  },
  {
    path: PROFILE_ROUTER,
    Component: Profile,
  },
];
export const publicRoutes = [
  {
    path: SHOP_ROUTER,
    Component: Shop,
  },
  {
    path: LOGIN_ROUTER,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTER,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTER + "/:id",
    Component: DevicePage,
  },
  //   {
  //     path: ORDER_ROUTER + "/:id",
  //     Component: OrderPage,
  //   },
];
