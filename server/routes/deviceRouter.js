const Router = require("express");
const router = new Router();
const deviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRoleMiddleware");
router.post("/", checkRole("ADMIN"), deviceController.create);
router.put("/", checkRole("ADMIN"), deviceController.update);
// router.patch("/", checkRole("ADMIN"), deviceController.update);
// router.post("/", checkRole("ADMIN"), deviceController.update);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete("/",deviceController.delete);
// router.delete("/:id",deviceController.delete)
// router.update('/',)

module.exports = router;
