const Joi = require('joi');

const addSubcategoryValidationSchema = Joi.object({
	category: Joi.string().required(),
	name: Joi.string().required().trim()
});

const editSubcategoryValidationSchema = Joi.object({
	category: Joi.string(),
	name: Joi.string().trim()
});

module.exports = {
	addSubcategoryValidationSchema,
	editSubcategoryValidationSchema
};
