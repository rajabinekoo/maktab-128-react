const { join } = require('node:path');
const { unlink, access, constants } = require('node:fs/promises');
const sharp = require('sharp');
const { AppError } = require('../utils/app-error');
const { ApiFeatures } = require('../utils/api-features');
const { multerUpload } = require('../utils/multer-config');

const Product = require('../models/product-model');
const Category = require('../models/category-model');
const Subcategory = require('../models/subcategory-model');

const productsThumbnailsDefault = 'products-thumbnails-default.jpeg';
const productsImagesDefault = ['products-images-default.jpeg'];

//** Services
//? consider diskStorage for multi fields images, avoid memory overflow
const uploadProductImages = multerUpload.fields([
	{ name: 'thumbnail', maxCount: 1 },
	{ name: 'images', maxCount: 10 }
]);

const resizeProductImages = async (productId, files) => {
	const { images = [] } = files;

	if (!images.length) return images;

	const resizedImages = await Promise.all(
		images.map(async (image, index) => {
			const imageFilename = `products-${productId}-${Date.now()}-${
				index + 1
			}.jpeg`;

			await sharp(image.buffer)
				.resize(2000, 1300)
				.toFormat('jpeg')
				.jpeg({ quality: 95 })
				.toFile(
					join(__dirname, `../public/images/products/images/${imageFilename}`)
				);

			return imageFilename;
		})
	);

	return resizedImages;
};

const resizeProductThumbnail = async (productId, files) => {
	const { thumbnail = [] } = files;

	if (!thumbnail.length) return null;

	const thumbnailFilename = `products-${productId}-${Date.now()}.jpeg`;

	await sharp(thumbnail[0].buffer)
		.resize(1500, 800)
		.toFormat('jpeg')
		.jpeg({ quality: 95 })
		.toFile(
			join(
				__dirname,
				`../public/images/products/thumbnails/${thumbnailFilename}`
			)
		);

	return thumbnailFilename;
};

//** Controllers
//? done
const getAllProducts = async (req, res, next) => {
	const productsModel = new ApiFeatures(Product.find({}), req.query)
		.limitFields()
		.paginate()
		.filter()
		.sort();

	const products = await productsModel.model;

	const { page = 1, limit = 10 } = req.query;
	const totalModels = new ApiFeatures(Product.find(), req.query).filter();
	const total = await totalModels.model;

	const totalPages = Math.ceil(total.length / Number(limit));

	res.status(200).json({
		status: 'success',
		page: Number(page),
		per_page: Number(limit),
		total: total.length,
		total_pages: totalPages,
		data: { products }
	});
};

//? done: code split for validations: pre hook, required thumbnail and images if needed
const addProduct = async (req, res, next) => {
	const {
		category: categoryId,
		subcategory: subcategoryId,
		name: productName,
		price,
		quantity,
		brand,
		description,
		rating
	} = req.body;

	const isProductExists = await Product.exists({ name: productName });
	if (isProductExists) {
		return next(
			new AppError(
				409,
				'product name is already exists. choose a different product name'
			)
		);
	}

	const category = await Category.findById(categoryId);
	if (!category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	const subcategory = await Subcategory.findById(subcategoryId);
	if (!subcategory) {
		return next(new AppError(404, `subcategory: ${subcategory} not found`));
	}

	// check subcategory and category relation
	if (subcategory.category.toString() !== categoryId.toString()) {
		return next(
			new AppError(
				409,
				`category: ${categoryId} and subcategory: ${subcategoryId} not related`
			)
		);
	}

	const product = await Product.create({
		category: categoryId,
		subcategory: subcategoryId,
		name: productName,
		price,
		quantity,
		brand,
		description,
		rating
	});

	//? for required images and thumbnail, use resize + validation before save(create)
	const thumbnail = await resizeProductThumbnail(product._id, req.files);
	const images = await resizeProductImages(product._id, req.files);

	product.images = images.length ? images : productsImagesDefault;
	product.thumbnail = thumbnail ?? productsThumbnailsDefault;
	product.save({ validateModifiedOnly: true });

	res.status(201).json({
		status: 'success',
		data: { product }
	});
};

//? done: populate projection and option
const getProductById = async (req, res, next) => {
	const { id: productId } = req.params;

	const product = await Product.findById(productId)
		.populate('category')
		.populate('subcategory');

	if (!product) {
		return next(new AppError(404, `product: ${productId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { product }
	});
};

//? done: refactor upload, code split validation: cat and subcat validation + relation check(pre hook)
const editProductById = async (req, res, next) => {
	const { id: productId } = req.params;
	const {
		category: categoryId = null,
		subcategory: subcategoryId = null,
		name: productName = null,
		price = null,
		quantity = null,
		brand = null,
		description = null,
		rating = null
	} = req.body;

	// populate subcategory for relation checking
	const product = await Product.findById(productId)
		.populate('category')
		.populate('subcategory');

	if (!product) {
		return next(new AppError(404, `product: ${productId} not found`));
	}

	const duplicateProduct = await Product.findOne({ name: productName });
	if (!!duplicateProduct && duplicateProduct.name !== product.name) {
		return next(
			new AppError(
				409,
				'product name is already exists. choose a different product name'
			)
		);
	}

	let category = await Category.findById(categoryId);
	if (!!categoryId && !category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	let subcategory = await Subcategory.findById(subcategoryId);
	if (!!subcategoryId && !subcategory) {
		return next(new AppError(404, `subcategory: ${subcategoryId} not found`));
	}

	category ??= product.category;
	subcategory ??= product.subcategory;

	// check subcategory and category relation
	if (subcategory.category.toString() !== category._id.toString()) {
		return next(
			new AppError(
				409,
				`category: ${category._id} and subcategory: ${subcategory._id} not related`
			)
		);
	}

	const thumbnail = await resizeProductThumbnail(productId, req.files ?? {});

	if (!!thumbnail && product.thumbnail !== productsThumbnailsDefault) {
		await access(
			join(
				__dirname,
				'../public/images/products/thumbnails',
				product.thumbnail
			),
			constants.F_OK
		);
		await unlink(
			join(__dirname, '../public/images/products/thumbnails', product.thumbnail)
		);
	}

	const images = await resizeProductImages(productId, req.files ?? {});
	if (!!images.length && !product.images.includes(productsImagesDefault)) {
		//? use Promise.all
		for (const image of product.images) {
			await access(
				join(__dirname, '../public/images/products/images', image),
				constants.F_OK
			);
			await unlink(join(__dirname, '../public/images/products/images', image));
		}
	}

	// update primary keys
	product.category = category._id;
	product.subcategory = subcategory._id;

	// update product properties
	product.name = productName ?? product.name;
	product.price = price ?? product.price;
	product.quantity = quantity ?? product.quantity;
	product.brand = brand ?? product.brand;
	product.description = description ?? product.description;
	product.rating = rating ?? product.rating;

	// update product images
	product.thumbnail = thumbnail ?? product.thumbnail;
	product.images = images.length ? images : product.images;

	await product.save({ validateBeforeSave: true });

	res.status(200).json({
		status: 'success',
		data: { product }
	});
};

//? done: internal server error: handle not accessible images or thumbnail for remove
const removeProductById = async (req, res, next) => {
	const { id: productId } = req.params;

	const product = await Product.findByIdAndDelete(productId);

	if (!product) {
		return next(new AppError(404, `product: ${productId} not found`));
	}

	if (product.thumbnail !== productsThumbnailsDefault) {
		await access(
			join(
				__dirname,
				'../public/images/products/thumbnails',
				product.thumbnail
			),
			constants.F_OK
		);
		await unlink(
			join(__dirname, '../public/images/products/thumbnails', product.thumbnail)
		);
	}

	if (!product.images.includes(productsImagesDefault)) {
		//? use Promise.all
		for (const image of product.images) {
			await access(
				join(__dirname, '../public/images/products/images', image),
				constants.F_OK
			);
			await unlink(join(__dirname, '../public/images/products/images', image));
		}
	}

	res.status(200).json({
		status: 'success',
		data: { product }
	});
};

module.exports = {
	addProduct,
	getAllProducts,
	getProductById,
	editProductById,
	removeProductById,
	uploadProductImages
};
