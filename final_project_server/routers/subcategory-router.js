const router = require('express').Router();
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validations/validator');
const {
	editSubcategoryValidationSchema,
	addSubcategoryValidationSchema
} = require('../validations/subcategory-validation');
const {
	getAllSubcategories,
	addSubcategory,
	getSubcategoryById,
	removeSubcategoryById,
	editSubcategoryById
} = require('../controllers/subcategory-controller');

router.get('/', asyncHandler(getAllSubcategories));

router.post(
	'/',
	validator(addSubcategoryValidationSchema),
	asyncHandler(addSubcategory)
);

router.get('/:id', asyncHandler(getSubcategoryById));

router.patch(
	'/:id',
	validator(editSubcategoryValidationSchema),
	asyncHandler(editSubcategoryById)
);

router.delete('/:id', asyncHandler(removeSubcategoryById));

module.exports = router;
