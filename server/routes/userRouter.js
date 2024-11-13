const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', authMiddleware, userController.check);
router.put('/',  userController.update);
router.get('/',  userController.getUser);
// router.get('/auth', userController.check);
// router.get('/auth',(req,res)=>{
//     res.json({message:'ALL WORKING'})
// })
// router.delete('/',)
// router.update('/',)

module.exports = router;
