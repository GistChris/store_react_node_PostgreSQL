import Admin from "./pages/Admin"
import Basket from "./pages/Basket"
import Shop from "./pages/Shop"
import { ADMIN_ROUTER, BASKET_ROUTER, DEVICE_ROUTER, LOGIN_ROUTER, REGISTRATION_ROUTER, SHOP_ROUTER } from "./utils/consts"
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