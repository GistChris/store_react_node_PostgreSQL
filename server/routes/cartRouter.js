const Router = require("express");
const router = new Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require("../middleware/checkRoleMiddleware");
// router.post("/", checkRole("ADMIN"), cartController.create);
router.post("/", cartController.create);
router.get("/:id", cartController.getOne);
router.get("/", cartController.getAll);
// router.put("/", checkRole("ADMIN"), cartController.update);
router.put("/", cartController.update);
// router.delete("/",authMiddleware, cartController.emptyCart);
router.delete("/", cartController.emptyCart);
router.delete("/:id",cartController.deleteCartItem)
// router.delete("/",cartController.deleteCartItem)
module.exports = router;
