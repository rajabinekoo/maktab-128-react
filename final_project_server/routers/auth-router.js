const router = require('express').Router();
const { asyncHandler } = require('../utils/async-handler');
const { validator } = require('../validations/validator');
const {
	userSignupValidationSchema,
	userLoginValidationSchema
} = require('../validations/auth-validation');
const {
	login,
	logout,
	signup,
	protect,
	generateAccessToken,
	authenticateRefreshToken
} = require('../controllers/auth-controller');

router.post(
	'/login',
	validator(userLoginValidationSchema),
	asyncHandler(login)
);

router.post(
	'/signup',
	validator(userSignupValidationSchema),
	asyncHandler(signup)
);

router.get('/logout', protect, asyncHandler(logout));

router.post(
	'/token',
	asyncHandler(authenticateRefreshToken),
	generateAccessToken
);

module.exports = router;
