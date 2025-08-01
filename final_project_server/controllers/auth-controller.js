const { promisify } = require('node:util');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model');
const { AppError } = require('../utils/app-error');
const { asyncHandler } = require('../utils/async-handler');

const signToken = id => {
	const accessToken = jwt.sign({ id }, process.env.JWT_ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
	});
	const refreshToken = jwt.sign({ id }, process.env.JWT_REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
	});

	return { accessToken, refreshToken };
};

const generateAccessToken = (req, res, next) => {
	const accessToken = jwt.sign(
		{ id: req.userId },
		process.env.JWT_ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
		}
	);

	res.status(200).json({
		status: 'success',
		token: { accessToken }
	});
};

const login = async (req, res, next) => {
	const { username, password } = req.body;

	const user = await User.findOne({ username }).select('+password');
	if (!user) {
		return next(new AppError(401, 'incorrect username or password'));
	}

	const isPasswordMatch = await user.comparePassword(password);
	if (!isPasswordMatch) {
		return next(new AppError(401, 'incorrect username or password'));
	}

	const { accessToken, refreshToken } = signToken(user._id);

	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });

	res.status(200).json({
		status: 'success',
		token: { accessToken, refreshToken },
		data: { user }
	});
};

const logout = async (req, res, next) => {
	const user = await User.findById(req.userId);

	user.refreshToken = null;
	await user.save();

	res.status(204).json({
		status: 'success',
		data: null
	});
};

const signup = async (req, res, next) => {
	const { firstname, lastname, username, password, phoneNumber, address } =
		req.body;

	const userExists = await User.exists({ username });
	if (userExists) {
		return next(
			new AppError(
				409,
				'username is already taken. choose a different username'
			)
		);
	}

	const phoneNumberExists = await User.exists({ phoneNumber });
	if (phoneNumberExists) {
		return next(new AppError(409, 'phoneNumber is already exists.'));
	}

	const user = await User.create({
		firstname,
		lastname,
		username,
		password,
		phoneNumber,
		address,
		role: 'USER'
	});

	const { accessToken, refreshToken } = signToken(user._id);

	user.refreshToken = refreshToken;
	await user.save({ validateBeforeSave: false });

	res.status(201).json({
		status: 'success',
		token: { accessToken, refreshToken },
		data: { user }
	});
};

const protect = asyncHandler(async (req, res, next) => {
	const { authorization = null } = req.headers;

	if (!authorization || !authorization.startsWith('Bearer')) {
		return next(
			new AppError(401, 'You are not logged in! Please log in to get access')
		);
	}

	const token = authorization.split(' ')[1];

	const decoded = await promisify(jwt.verify)(
		token,
		process.env.JWT_ACCESS_TOKEN_SECRET
	);

	const user = await User.findById(decoded.id);

	if (!user) {
		return next(
			new AppError(401, 'The user belonging to this token does no longer exist')
		);
	}

	req.userId = user._id;
	next();
});

const restrictTo = (...roles) => {
	return asyncHandler(async (req, res, next) => {
		const { userId = null } = req;
		const user = await User.findById(userId);

		if (!roles.includes(user.role)) {
			return next(
				new AppError(403, 'You do not have permission to perform this action')
			);
		}

		next();
	});
};

const authenticateRefreshToken = async (req, res, next) => {
	const { refreshToken = null } = req.body;

	if (!refreshToken) {
		return next(new AppError(401, 'refresh token missing'));
	}

	const { id: userId } = await promisify(jwt.verify)(
		refreshToken,
		process.env.JWT_REFRESH_TOKEN_SECRET
	);

	const user = await User.findOne({ _id: userId, refreshToken });

	if (!user) {
		return next(
			new AppError(
				404,
				'the user belonging to this refresh token does no longer exist'
			)
		);
	}

	req.userId = userId;
	next();
};

module.exports = {
	login,
	signup,
	logout,
	protect,
	restrictTo,
	generateAccessToken,
	authenticateRefreshToken
};
