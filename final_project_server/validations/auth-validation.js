const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const userSignupValidationSchema = Joi.object({
	firstname: Joi.string().required().trim(),
	lastname: Joi.string().required().trim(),
	username: Joi.string().required().lowercase().trim(),
	password: Joi.string().required().min(8).pattern(passwordRegex),
	phoneNumber: Joi.string().required().trim(),
	address: Joi.string().required().trim(),
	role: Joi.string().valid('ADMIN', 'USER').uppercase().trim()
});

const userLoginValidationSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required()
});

module.exports = { userLoginValidationSchema, userSignupValidationSchema };
