const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new Schema(
	{
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'category is required']
		},
		subcategory: {
			type: Schema.Types.ObjectId,
			ref: 'Subcategory',
			required: [true, 'subcategory is required']
		},
		name: {
			type: String,
			unique: true,
			required: [true, 'name is required'],
			trim: true
		},
		slugname: {
			type: String,
			trim: true
		},
		price: {
			type: Number,
			required: [true, 'price is required']
		},
		quantity: {
			type: Number,
			default: 1
		},
		brand: {
			type: String,
			required: [true, 'brand is required'],
			trim: true
		},
		description: {
			type: String,
			required: [true, 'description is required'],
			trim: true
		},
		thumbnail: {
			type: String,
			trim: true,
			default: 'products-thumbnails-default.jpeg'
		},
		images: {
			type: [String],
			trim: true,
			default: ['products-images-default.jpeg']
		},
		rating: {
			rate: {
				type: Number,
				default: 0
			},
			count: {
				type: Number,
				default: 0
			}
		}
	},
	{
		timestamps: true
	}
);

// create slugname for product.name
ProductSchema.pre('save', function (next) {
	this.slugname = slugify(this.name, { lower: true });

	next();
});

module.exports = model('Product', ProductSchema);
