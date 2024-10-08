const Router = require('express');
const router = new Router();
const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const ratingRouter = require('./ratingRouter');
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
//!!!perdat middlewhere!!!est
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/rating', ratingRouter);
router.use('/basket', basketRouter);
router.use('/order', orderRouter);
module.exports = router;
