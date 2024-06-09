const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
//!!!perdat middlewhere!!!est
router.use('/brand', brandRouter);
//!!!perdat middlewhere!!!est
router.use('/device', deviceRouter);

module.exports = router;
