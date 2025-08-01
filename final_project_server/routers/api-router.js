const router = require('express').Router();
const userRouter = require('./user-router');
const authRouter = require('./auth-router');
const orderRouter = require('./order-router');
const productRouter = require('./product-router');
const categoryRouter = require('./category-router');
const subcategoryRouter = require('./subcategory-router');

router.use('/auth', authRouter);

router.use('/users', userRouter);

router.use('/orders', orderRouter);

router.use('/products', productRouter);

router.use('/categories', categoryRouter);

router.use('/subcategories', subcategoryRouter);

module.exports = router;
