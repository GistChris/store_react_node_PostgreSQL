import Admin from "./pages/Admin"
import Basket from "./pages/Cart"
import Shop from "./pages/Shop"
import UpdateItem from "./pages/UpdateItem"
import { ADMIN_ROUTER, BASKET_ROUTER, DEVICE_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER, SHOP_ROUTER, UPDATE_DEVICE_ROUTER } from "./utils/consts"
import Auth from "./pages/Auth"
import DevicePage from "./pages/DevicePage"

export const authRoutes=[
{
    path:ADMIN_ROUTER,
    Component: Admin
},
{
    path:BASKET_ROUTER,
    Component: Basket
},
{
    path:UPDATE_DEVICE_ROUTER+'/:id',
    Component: UpdateItem
},
]
export const publicRoutes=[
    {
        path:SHOP_ROUTER,
        Component: Shop
    },  
    {
        path:LOGIN_ROUTER,
        Component: Auth
        
    }, 
    {
        path:REGISTRATION_ROUTER,
        Component: Auth
    }, 
    {
        path:DEVICE_ROUTER+'/:id',
        Component: DevicePage
    },  
]