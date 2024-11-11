const uuid = require("uuid");
const jwt = require("jsonwebtoken");
//module path est v node.js
const path = require("path");
const {
  Basket,
  BasketDevice,
  CartItem,
  Cart,
  Device,
  Order,
} = require("../models/models");
const ApiError = require("../error/ApiError");
class CartController {
  ///////////////////////////////////////////////
  async create(req, res, next) {
    // console.log("addToCartdfffff");
    try {
      const {
        userId,
        productId,
        productQuantity,
        productName,
        productPrice,
        productRating,
        productImg,
      } = req.body;
      const product = await Cart.findOne({
        where: { productId: productId },
      });
      if (!product) {
        const cartProduct = await Cart.create({
          userId,
          productId,
          productName,
          productPrice,
          productRating,
          productImg,
          productQuantity,
        });
        return res.json(cartProduct);
      }

      if (Number(productId) === product.productId) {
        const cartProduct = await Cart.update(
          {
            productQuantity: product.productQuantity + Number(productQuantity),
          },
          {
            where: {
              productId: productId,
            },
          }
        );
        return res.json(cartProduct);
      }
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
  async getAll(req, res) {
    let { userId } = req.query;
    const cartProducts = await Cart.findAll({
      where: { userId: userId },
    });
    return res.json(cartProducts);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: "info" }],
    });
    return res.json(device);
  }

  async emptyCart(req, res, next) {
    let { userId } = req.query;
    const cart = await Cart.destroy({
      where: { userId: userId },
    });
    return res.json(cart);
  }
  async deleteCartItem(req, res, next) {
    console.log("CARTTCONTROLLER");
    const { id } = req.query;
    console.log("CARTTCONTROLLER", id);
    const cart = await Cart.destroy({
      where: { id },
    });
    return res.json(cart);
  }
}
module.exports = new CartController();
