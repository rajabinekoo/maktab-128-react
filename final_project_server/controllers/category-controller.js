const { join } = require('node:path');
const { unlink, access, constants } = require('fs/promises');
const { AppError } = require('../utils/app-error');
const { ApiFeatures } = require('../utils/api-features');
const { multerUpload } = require('../utils/multer-config');
const sharp = require('sharp');

const Category = require('../models/category-model');
const Subcategory = require('../models/subcategory-model');

const categoriesIconsDefault = 'categories-icons-default.png';

//** services
const uploadCategoryIcon = multerUpload.single('icon');

const resizeCategoryIcon = async (categoryId, file = null) => {
	if (!file) return file;

	const icon = file;

	const iconFilename = `categories-${categoryId}-${Date.now()}.png`;

	await sharp(icon.buffer)
		.resize(50, 50)
		.toFormat('png')
		.png({ quality: 100 })
		.toFile(
			join(__dirname, `../public/images/categories/icons/${iconFilename}`)
		);

	return iconFilename;
};

// ** controllers
//? done: api features
const getAllCategories = async (req, res, next) => {
	const categoriesModel = new ApiFeatures(Category.find({}), req.query)
		.limitFields()
		.paginate()
		.filter()
		.sort();

	const categories = await categoriesModel.model;

	const { page = 1, limit = 10 } = req.query;
	const totalModels = new ApiFeatures(Category.find(), req.query).filter();
	const total = await totalModels.model;

	const totalPages = Math.ceil(total.length / Number(limit));

	res.status(200).json({
		status: 'success',
		page: Number(page),
		per_page: Number(limit),
		total: total.length,
		total_pages: totalPages,
		data: { categories }
	});
};

//? done: refactor upload
const addCategory = async (req, res, next) => {
	const { name: categoryName } = req.body;

	const isCategoryExists = await Category.exists({ name: categoryName });
	if (isCategoryExists) {
		return next(
			new AppError(
				409,
				'category name is already exists. choose a different category name'
			)
		);
	}

	//? for required icon, use category name(unique) instead of id and call resize + validation before create
	const category = await Category.create({ name: categoryName });

	const icon = await resizeCategoryIcon(category._id, req.file);

	category.icon = icon ?? categoriesIconsDefault;
	await category.save({ validateModifiedOnly: true });

	res.status(201).json({
		status: 'success',
		data: { category }
	});
};

//* done
const getCategoryById = async (req, res, next) => {
	const { id: categoryId } = req.params;

	const category = await Category.findById(categoryId);

	if (!category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	res.status(200).json({
		status: 'success',
		data: { category }
	});
};

//? done: refactor upload, code split validation: pre save hook
const editCategoryById = async (req, res, next) => {
	const { id: categoryId } = req.params;
	const { name: categoryName = null } = req.body;

	const category = await Category.findById(categoryId);
	if (!category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	const duplicateCategory = await Category.findOne({ name: categoryName });
	if (!!duplicateCategory && duplicateCategory.name !== category.name) {
		return next(
			new AppError(
				409,
				'category name is already exists. choose a different category name'
			)
		);
	}

	const icon = await resizeCategoryIcon(categoryId, req.file);
	if (!!icon && category.icon !== categoriesIconsDefault) {
		await access(
			join(__dirname, '../public/images/categories/icons', category.icon),
			constants.F_OK
		);

		await unlink(
			join(__dirname, '../public/images/categories/icons', category.icon)
		);
	}

	// update category properties
	category.name = categoryName ?? category.name;
	category.icon = icon ?? category.icon;
	await category.save({ validateBeforeSave: true });

	res.status(200).json({
		status: 'success',
		data: { category }
	});
};

//? done: internal server error: handle not accessible images or thumbnail for remove
const removeCategoryById = async (req, res, next) => {
	const { id: categoryId } = req.params;

	const category = await Category.findByIdAndDelete(categoryId);

	if (!category) {
		return next(new AppError(404, `category: ${categoryId} not found`));
	}

	const subcategories = await Subcategory.deleteMany({
		category: category._id
	});

	if (category.icon !== categoriesIconsDefault) {
		await access(
			join(__dirname, '../public/images/categories/icons', category.icon),
			constants.F_OK
		);
		await unlink(
			join(__dirname, '../public/images/categories/icons', category.icon)
		);
	}

	res.status(200).json({
		status: 'success',
		data: { category, subcategories }
	});
};

module.exports = {
	addCategory,
	getAllCategories,
	getCategoryById,
	editCategoryById,
	removeCategoryById,
	uploadCategoryIcon
};
