const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole = require("../middleware/checkRoleMiddleware");
// router.post("/", checkRole("ADMIN"), cartController.create);
router.post("/", orderController.create);
router.get("/:id", orderController.getOneOrder);
router.get("/", orderController.getAllOrders);
// router.put("/", checkRole("ADMIN"), cartController.update);
// router.put("/", orderController.update);
// router.delete("/", cartController.emptyCart);
// router.delete("/:id",cartController.deleteCartItem)
// router.delete("/",orderController.deleteOrderItem)
module.exports = router;
