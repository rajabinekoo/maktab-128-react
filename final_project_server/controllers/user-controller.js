const { AppError } = require('../utils/app-error');

const User = require('../models/user-model');
const { ApiFeatures } = require('../utils/api-features');

//** Controllers
const getAllUsers = async (req, res, next) => {
	const UsersModel = new ApiFeatures(User.find({}), req.query)
		.limitFields()
		.paginate()
		.filter()
		.sort();

	const users = await UsersModel.model;

	const { page = 1, limit = 10 } = req.query;
	const totalModels = new ApiFeatures(User.find(), req.query).filter();
	const total = await totalModels.model;

	const totalPages = Math.ceil(total.length / Number(limit));

	res.status(200).json({
		status: 'success',
		page: Number(page),
		per_page: Number(limit),
		total: total.length,
		total_pages: totalPages,
		data: { users }
	});
};

const addUser = async (req, res, next) => {
	const {
		firstname,
		lastname,
		username,
		password,
		phoneNumber,
		address,
		role
	} = req.body;

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
		role
	});

	res.status(201).json({
		status: 'success',
		data: { user }
	});
};

const getUserById = async (req, res, next) => {
	const { id: userId } = req.params;

	const user = await User.findById(userId);

	if (!user) {
		return next(new AppError(404, `user: ${userId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { user }
	});
};

const editUserById = async (req, res, next) => {
	const { id: userId } = req.params;
	const {
		firstname = null,
		lastname = null,
		username = null,
		password = null,
		phoneNumber = null,
		address = null
	} = req.body;

	const user = await User.findById(userId).select('+select');
	if (!user) {
		return next(new AppError(404, `user: ${userId} not found`));
	}

	const duplicateUsername = await User.findOne({ username });
	if (!!duplicateUsername && duplicateUsername.username !== user.username) {
		return next(
			new AppError(
				409,
				'username  is already exists. choose a different username'
			)
		);
	}

	const duplicatePhoneNumber = await User.findOne({ phoneNumber });
	if (
		!!duplicatePhoneNumber &&
		duplicatePhoneNumber.phoneNumber !== user.phoneNumber
	) {
		return next(new AppError(409, 'phoneNumber is already exists.'));
	}

	user.firstname = firstname ?? user.firstname;
	user.lastname = lastname ?? user.lastname;
	user.username = username ?? user.username;
	user.password = password ?? user.password;
	user.phoneNumber = phoneNumber ?? user.phoneNumber;
	user.address = address ?? user.address;

	user.save({ validateBeforeSave: true });

	res.status(201).json({
		status: 'success',
		data: { user }
	});
};

const removeUserById = async (req, res, next) => {
	const { id: userId } = req.params;

	const user = await User.findByIdAndDelete(userId);

	if (!user) {
		return next(new AppError(404, `user: ${userId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { user }
	});
};

module.exports = {
	addUser,
	getAllUsers,
	getUserById,
	editUserById,
	removeUserById
};
