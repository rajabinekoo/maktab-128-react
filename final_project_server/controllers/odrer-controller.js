const { AppError } = require('../utils/app-error');

const User = require('../models/user-model');
const Order = require('../models/order-model');
const Product = require('../models/product-model');
const { ApiFeatures } = require('../utils/api-features');

//** Services

//** Controllers
//? population option + api features
const getAllOrders = async (req, res, next) => {
	const ordersModel = new ApiFeatures(Order.find({}), req.query)
		.limitFields()
		.paginate()
		.filter()
		.sort();

	const orders = await ordersModel.model;

	const { page = 1, limit = 10 } = req.query;
	const totalModels = new ApiFeatures(Order.find(), req.query).filter();
	const total = await totalModels.model;

	const totalPages = Math.ceil(total.length / Number(limit));

	res.status(200).json({
		status: 'success',
		page: Number(page),
		per_page: Number(limit),
		total: total.length,
		total_pages: totalPages,
		data: { orders }
	});
};

//? done: code split for validation
const createOrder = async (req, res, next) => {
	const { user: userId, products, deliveryDate, deliveryStatus } = req.body;

	const user = await User.findById(userId);
	if (!user) {
		return next(new AppError(404, `user: ${userId} not found`));
	}

	for (const { product: productId } of products) {
		const product = await Product.findById(productId);

		if (!product) {
			return next(new AppError(404, `product: ${productId} not found`));
		}
	}

	const order = await Order.create({
		user: userId,
		products,
		deliveryDate,
		deliveryStatus
	});

	res.status(201).json({
		status: 'success',
		data: { order }
	});
};

//? done: population option, projection
const getOrderById = async (req, res, next) => {
	const { id: orderId } = req.params;

	const order = await Order.findById(orderId)
		.populate('user')
		.populate('products.product');

	if (!order) {
		return next(new AppError(404, `order: ${orderId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { order }
	});
};

//? code split validation for 404
const editOrderById = async (req, res, next) => {
	const { id: orderId } = req.params;
	const {
		user: userId = null,
		products = [],
		deliveryDate = null,
		deliveryStatus = null
	} = req.body;

	const order = await Order.findById(orderId);

	if (!order) {
		return next(new AppError(404, `order: ${orderId} not found`));
	}

	if (!!userId) {
		let user = await User.findById(userId);

		if (!user) {
			return next(new AppError(404, `suser: ${userId} not found`));
		}
	}

	if (!!products.length) {
		for (const { product: productId } of products) {
			const product = await Product.findById(productId);

			if (!product) {
				return next(new AppError(404, `product: ${productId} not found`));
			}
		}
	}

	// update primary keys
	order.user = userId ?? order.user;
	order.products = !!products.length ? products : order.products;
	order.deliveryStatus = deliveryStatus ?? order.deliveryStatus;
	order.deliveryDate = deliveryDate ?? order.deliveryDate;

	await order.save({ validateBeforeSave: true });

	res.status(200).json({
		status: 'success',
		data: { order }
	});
};

//? done pre hook for 404
const removeOrderById = async (req, res, next) => {
	const { id: orderId } = req.params;

	const order = await Order.findByIdAndDelete(orderId);

	if (!order) {
		return next(new AppError(404, `order: ${orderId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { order }
	});
};

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	editOrderById,
	removeOrderById
};
