const User = require('../models/user-model');
const { asyncHandler } = require('./async-handler');

const addAdmin = asyncHandler(async () => {
	const isAdminExists = await User.findOne({ role: 'ADMIN' });

	if (isAdminExists) {
		return console.info('[i] admin already exists');
	}

	await User.create({
		firstname: process.env.ADMIN_FIRSTNAME,
		lastname: process.env.ADMIN_LASTNAME,
		username: process.env.ADMIN_USERNAME,
		password: process.env.ADMIN_PASSWORD,
		phoneNumber: process.env.ADMIN_PHONE_NUMBER,
		address: process.env.ADMIN_ADDRESS,
		role: 'ADMIN'
	});

	return console.log('[+] admin added');
});

module.exports = { addAdmin };
