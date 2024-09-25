const Router = require("express");
const router = new Router();
const orderController = require("../controllers/orderController");
const checkRole =require("../middleware/checkRoleMiddleware");
router.post("/", checkRole("ADMIN"), orderController.create);
router.get("/:id", orderController.getOne);
router.get("/", orderController.getAll);
module.exports = router;
