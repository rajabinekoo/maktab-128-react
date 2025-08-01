const { Schema, model } = require('mongoose');
const slugify = require('slugify');

const SubcategorySchema = new Schema(
	{
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: [true, 'category is required']
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
		}
	},
	{
		timestamps: true
	}
);

SubcategorySchema.pre('save', function (next) {
	// create slugname for product.name
	this.slugname = slugify(this.name, { lower: true });

	next();
});

module.exports = model('Subcategory', SubcategorySchema);
