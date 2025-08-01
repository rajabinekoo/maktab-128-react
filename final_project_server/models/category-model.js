const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const CategorySchema = new Schema(
	{
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
		icon: {
			type: String,
			trim: true,
			default: 'categories-icons-default.png'
		}
	},
	{
		timestamps: true
	}
);

CategorySchema.pre('save', function (next) {
	// create slugname for product.name
	this.slugname = slugify(this.name, { lower: true });

	next();
});

module.exports = model('Category', CategorySchema);
