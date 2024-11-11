const uuid = require("uuid");
//module path est v node.js
const path = require("path");
const {
  Cart,
  Order,
} = require("../models/models");
const ApiError = require("../error/ApiError");
class CartController {
  async create(req, res, next) {
    try {
      const {
        userId,
        cartProducts,
      } = req.body;
      let cartItems = JSON.parse(cartProducts);
      const orders= cartItems.forEach((i) =>
        Order.create({
          userId,
          productId: i.productId,
          orderItemName: i.productName,
          orderItemImg: i.productImg,
          orderItemPrice: i.productId,
          orderItemQuantity: i.productQuantity,
          orderItemTotal: i.productPrice*i.productQuantity,
        })
      );
        return res.json(orders);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async update(req, res, next) {
    try {
      const { productId, productPrice, productQuantity } = req.body;
      const cartItem = await Cart.update(
        {
          productPrice: productPrice,
          productQuantity: productQuantity,
        },
        {
          where: {
            productId: productId,
          },
        }
      );
      return res.json(cartItem);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
  async getAllOrders(req, res) {
    let { userId } = req.query;
    const orderProducts = await Order.findAll({
      where: { userId: userId },
    });
    return res.json(orderProducts);
  }

  async getOneOrder(req, res) {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
    });
    return res.json(order);
  }

  async emptyCart(req, res, next) {
    const { id } = req.query;
    const cart = await Cart.destroy({
      where: { id },
    });
    return res.json(cart);
  }
  async deleteCartItem(req, res, next) {
    const { id } = req.query;
    const cart = await Cart.destroy({
      where: { id },
    });
    return res.json(cart);
  }
}
module.exports = new CartController();
