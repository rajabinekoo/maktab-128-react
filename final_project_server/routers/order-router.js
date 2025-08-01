const router = require('express').Router();
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validations/validator');
const {
	createOrder,
	getAllOrders,
	getOrderById,
	editOrderById,
	removeOrderById
} = require('../controllers/odrer-controller');
const {
	createOrderValidationSchema,
	editOrderValidationSchema
} = require('../validations/order-validation');

router.get('/', asyncHandler(getAllOrders));

router.post(
	'/',
	validator(createOrderValidationSchema),
	asyncHandler(createOrder)
);

router.get('/:id', asyncHandler(getOrderById));

router.patch(
	'/:id',
	validator(editOrderValidationSchema),
	asyncHandler(editOrderById)
);

router.delete('/:id', asyncHandler(removeOrderById));

module.exports = router;
