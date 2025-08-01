const Joi = require('joi');

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

const addUserValidationSchema = Joi.object({
	firstname: Joi.string().required().trim(),
	lastname: Joi.string().required().trim(),
	username: Joi.string().required().lowercase().trim(),
	password: Joi.string().required().min(8).pattern(passwordRegex),
	phoneNumber: Joi.string().required().trim(),
	address: Joi.string().required().trim(),
	role: Joi.string().valid('ADMIN', 'USER').uppercase().trim()
});

const editUserValidationSchema = Joi.object({
	firstname: Joi.string().trim(),
	lastname: Joi.string().trim(),
	username: Joi.string().lowercase().trim(),
	password: Joi.string().min(8).pattern(passwordRegex),
	phoneNumber: Joi.string().trim(),
	address: Joi.string().trim()
});

module.exports = { addUserValidationSchema, editUserValidationSchema };
