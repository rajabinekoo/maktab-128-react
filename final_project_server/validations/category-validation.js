const Joi = require('joi');

// TODO: add icon validation into resize icon controller
const addCategoryValidationSchema = Joi.object({
	name: Joi.string().required().trim()
});

const editCategoryValidationSchema = Joi.object({
	name: Joi.string().trim()
});

module.exports = { addCategoryValidationSchema, editCategoryValidationSchema };
