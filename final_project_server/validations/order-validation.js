const Joi = require('joi');

const createOrderValidationSchema = Joi.object({
	user: Joi.string().required(),
	products: Joi.array()
		.min(1)
		.items(
			Joi.object({
				product: Joi.string().required(),
				count: Joi.number().required()
			})
		)
		.required(),
	deliveryDate: Joi.date(),
	deliveryStatus: Joi.boolean()
});

const editOrderValidationSchema = Joi.object({
	user: Joi.string(),
	products: Joi.array()
		.min(1)
		.items(
			Joi.object({
				product: Joi.string().required(),
				count: Joi.number().required()
			})
		),
	deliveryDate: Joi.date(),
	deliveryStatus: Joi.boolean()
});

module.exports = { createOrderValidationSchema, editOrderValidationSchema };
