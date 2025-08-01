const router = require('express').Router();
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validations/validator');
const { protect, restrictTo } = require('../controllers/auth-controller');
const {
	addUser,
	getAllUsers,
	getUserById,
	editUserById,
	removeUserById
} = require('../controllers/user-controller');
const {
	addUserValidationSchema,
	editUserValidationSchema
} = require('../validations/user-validation');

router.get('/', protect, restrictTo('ADMIN'), asyncHandler(getAllUsers));

router.post(
	'/',
	protect,
	restrictTo('ADMIN'),
	validator(addUserValidationSchema),
	asyncHandler(addUser)
);

router.get('/:id', asyncHandler(getUserById));

router.patch(
	'/:id',
	validator(editUserValidationSchema),
	asyncHandler(editUserById)
);

router.delete('/:id', asyncHandler(removeUserById));

module.exports = router;
