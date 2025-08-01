const Joi = require('joi');

// thumbnail: Joi.string().required().trim(),
// TODO: add array maxSize: 10
// images: Joi.array().items(Joi.string().trim()),

const addProductValidationSchema = Joi.object({
	category: Joi.string().required(),
	subcategory: Joi.string().required(),
	name: Joi.string().required().trim(),
	price: Joi.number().required(),
	quantity: Joi.number(),
	brand: Joi.string().required().trim(),
	description: Joi.string().required().trim(),
	rating: Joi.object({ rate: Joi.number(), count: Joi.number() })
});

const editProductValidationSchema = Joi.object({
	category: Joi.string(),
	subcategory: Joi.string(),
	name: Joi.string().trim(),
	price: Joi.number(),
	quantity: Joi.number(),
	brand: Joi.string().trim(),
	description: Joi.string().trim(),
	rating: Joi.object({ rate: Joi.number(), count: Joi.number() })
});

module.exports = { addProductValidationSchema, editProductValidationSchema };
