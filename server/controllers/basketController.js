const uuid = require("uuid");
//module path est v node.js
const path = require("path");
const { Basket, BasketDevice, CartItem, Cart,Device,Order,OrderItem } = require("../models/models");
const ApiError = require("../error/ApiError");
class BasketController {
  ///////////////////////////////////////////////
  async create(req, res, next) {
    try {
      const { userId, cart,total,status } = req.body;
      console.log("CART.NAME", userId);
      console.log("req.body", req.body);
      const order = await Order.create({
        userId,
        total,
        status,
      });
      if (cart) {
        console.log("cart", cart);
        let items = JSON.parse(cart);
        console.log("items", items);
        items.forEach((i) =>
          OrderItem.create({
            cartId: order.id,
            itemId: i.id,
            quantity: i.quantity,
            totalPrice: i.price,
            deviceId: i.id,
          })
        );
      }
      console.log("CARTCONTROLLER");
      return res.json(order);
    } catch (e) {
      console.log("BAAADDDCARTCART");
      next(ApiError.badRequest(e.message));
    }
  }
  /////////////////////////////////////////////////
  // async create(req, res, next) {
  //   try {
  //     // const { name, price, brandId, typeId, info } = req.body;
  //     // const {id, name, price, brandId, typeId,img, info,rating, } = req.body;
  //     const { userId, cart } = req.body;
  //     console.log("CART.NAME", userId);
  //     console.log("req.body", req.body);
  //     // let items = JSON.parse(cart);
  //     // console.log("items",items[0])
  //     // console.log("cart[0]", cart[0]);
  //     // const { img } = req.files;
  //     //dlia sozdania imeni
  //     // let fileName = uuid.v4() + ".jpg";
  //     //dlia peremetshenia fila v papku static
  //     //_dirname put do tekutshei papki s controllers, '..' dve tochki chto by vernytsia na derectoriu nazad
  //     // img.mv(path.resolve(__dirname, "..", "static", fileName));
  //     const basket = await Basket.create({
  //       userId,
  //     });
  //     // const brand=await Brand.create({name})
  //     // return res.json(brand)
  //     if (cart) {
  //       let items = JSON.parse(cart);
  //       items.forEach((i) =>
  //         // console.log("i.quantity",i.quantity),
  //         BasketDevice.create({
  //           basketId: basket.id,
  //           deviceId: i.id,
  //           // quantity: 1,
  //         })
  //       );
  //     }
  //     console.log("BASKETCONTROLLER");
  //     // console.log("deVICE", device);
  //     // console.log("deVICE", json(device));
  //     //posle sozdania device peredaem informatsiu na klienta
  //     return res.json(basket);
  //   } catch (e) {
  //     console.log("BAAADDDCART");
  //     next(ApiError.badRequest(e.message));
  //   }
  // }
  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 19;
    //offset eto otsup
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      // devices = await Device.findAll({limit, offset});
      // /////////////////////////////////////
      //.findAndCountAll for pagination
      devices = await Device.findAndCountAll({ limit, offset });
      ////////////////////////////////////////
    }
    if (brandId && !typeId) {
      // devices = await Device.findAll({ where: { brandId,limit,offset } });
      // devices = await Device.findAll({ where: { brandId } });
      devices = await Device.findAndCountAll({
        where: { brandId, limit, offset },
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAll({ where: { typeId, limit, offset } });
      // devices = await Device.findAll({ where: { typeId } });
      devices = await Device.findAndCountAll({
        where: { typeId, limit, offset },
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAll({
        where: { typeId, brandId, limit, offset },
      });
      //  devices = await Device.findAll({ where: { brandId, brandId } });
      devices = await Device.findAndCountAll({
        where: { typeId, brandId, limit, offset },
      });
    }
    return res.json(devices);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new BasketController();
