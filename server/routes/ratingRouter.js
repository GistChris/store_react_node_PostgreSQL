const Router = require("express");
const router = new Router();
const ratingController=require('../controllers/ratingController')
const checkRole=require('../middleware/checkRoleMiddleware')
router.post('/',checkRole('ADMIN'),ratingController.create);
// router.post('/',typeController.create);
router.get('/',ratingController.getAll);
module.exports = router;
