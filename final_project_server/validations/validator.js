const { AppError } = require('../utils/app-error');

const validator = validationSchema => (req, res, next) => {
	const { error } = validationSchema.validate(req.body);

	if (!!error) return next(new AppError(400, error));

	next();
};

module.exports = { validator };
