const asyncHandler = asyncController => (req, res, next) => {
	asyncController(req, res, next).catch(next);
};

module.exports = { asyncHandler };
