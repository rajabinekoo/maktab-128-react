const { join } = require('node:path');
const { unlink, readdir } = require('node:fs/promises');

// node develop-tools/remove-products-images.js --remove-product-thumbnails
// node develop-tools/remove-products-images.js --remove-product-images
// node develop-tools/remove-products-images.js --remove-category-icons

// node develop-tools/remove-products-images.js --remove-category-data
// node develop-tools/remove-products-images.js --remove-product-data
// node develop-tools/remove-products-images.js --remove-user-data

require('dotenv').config({ path: join(__dirname, '../config.env') });

const { connectToDatabase } = require('../database/database-connection');

const Category = require('../models/category-model');
const Product = require('../models/product-model');
const User = require('../models/user-model');

const removeProdcutImages = async () => {
	try {
		const productImages = await readdir(
			join(__dirname, '../public/images/products/images')
		);

		if (!productImages.length) {
			return console.log('directory is empty');
		}

		await Promise.all(
			productImages.map(async image => {
				await unlink(
					join(__dirname, '../public/images/products/images', image)
				);
			})
		);

		console.log('product images removed successfully');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const removeProdcutThumbnails = async () => {
	try {
		const productThumbnail = await readdir(
			join(__dirname, '../public/images/products/thumbnails')
		);

		if (!productThumbnail.length) {
			return console.log('directory is empty');
		}

		await Promise.all(
			productThumbnail.map(async thumbnail => {
				await unlink(
					join(__dirname, '../public/images/products/thumbnails', thumbnail)
				);
			})
		);

		console.log('product thumbnail removed successfully');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const removeCategoryIcons = async () => {
	try {
		const categoryIcons = await readdir(
			join(__dirname, '../public/images/categories/icons')
		);

		if (!categoryIcons.length) {
			return console.log('directory is empty');
		}

		await Promise.all(
			categoryIcons.map(async icon => {
				await unlink(
					join(__dirname, '../public/images/categories/icons', icon)
				);
			})
		);

		console.log('category icons removed successfully');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const removeProductData = async () => {
	try {
		await connectToDatabase();
		await Product.deleteMany({});

		console.log('removed');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const removeCategoryData = async () => {
	try {
		await connectToDatabase();
		await Category.deleteMany({});

		console.log('removed');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const removeUserData = async () => {
	try {
		await connectToDatabase();
		await User.deleteMany({});

		console.log('removed');
	} catch (error) {
		console.log(error);
	} finally {
		process.exit(1);
	}
};

const [, , option] = process.argv;

if (option === '--remove-product-images') {
	removeProdcutImages();
}

if (option === '--remove-product-thumbnails') {
	removeProdcutThumbnails();
}

if (option === '--remove-category-icons') {
	removeCategoryIcons();
}

if (option === '--remove-product-data') {
	removeProductData();
}

if (option === '--remove-category-data') {
	removeCategoryData();
}

if (option === '--remove-user-data') {
	removeUserData();
}
