const { Schema, model } = require('mongoose');

const OrderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'user is required']
		},
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: [true, 'products.product is required']
				},
				count: {
					type: Number,
					required: [true, 'products.count is required']
				}
			}
		],
		totalPrice: {
			type: Number,
			default: 0
		},
		deliveryDate: {
			type: Date,
			default: () => {
				const now = new Date();
				const tomorrow = new Date();
				tomorrow.setDate(now.getDate() + 1);

				return tomorrow;
			}
		},
		deliveryStatus: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true
	}
);

// calculate totalPrice
OrderSchema.pre('save', async function (next) {
	let total = 0;

	const { products } = await this.populate('products.product', { price: 1 });

	for (const { product, count } of products) {
		total += product.price * count;
	}

	this.totalPrice = total;

	next();
});

module.exports = model('Order', OrderSchema);
