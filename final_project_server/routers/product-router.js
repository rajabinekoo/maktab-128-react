const router = require('express').Router();
const {restrictTo , protect} = require("../controllers/auth-controller")

const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validations/validator');
const {
	addProduct,
	getAllProducts,
	getProductById,
	editProductById,
	removeProductById,
	uploadProductImages
} = require('../controllers/product-controller');
const {
	addProductValidationSchema,
	editProductValidationSchema
} = require('../validations/product-validation');

router.get('/' ,asyncHandler(getAllProducts));

router.post(
	'/',
	protect,
	restrictTo("ADMIN"),
	uploadProductImages,
	validator(addProductValidationSchema),
	asyncHandler(addProduct)
);

router.get('/:id', asyncHandler(getProductById));

router.patch(
	'/:id',
	uploadProductImages,
	validator(editProductValidationSchema),
	asyncHandler(editProductById)
);

router.delete('/:id', asyncHandler(removeProductById));

module.exports = router;
