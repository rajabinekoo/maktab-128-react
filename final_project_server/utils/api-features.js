class ApiFeatures {
	constructor(model, queryString) {
		this.model = model;
		this.queryString = queryString;
	}

	limitFields() {
		const { fields = '-__v' } = this.queryString;

		this.model = this.model.select(fields.split(','));

		return this;
	}

	paginate() {
		const { page = 1, limit = 10 } = this.queryString;

		const skip = (page * 1 - 1) * limit * 1;

		this.model = this.model.skip(skip).limit(Number(limit));

		return this;
	}

	filter() {
		const { page, limit, sort, fields, ...filter } = this.queryString;

		const filterString = JSON.stringify(filter).replace(
			/\b(gt|gte|lt|lte)\b/g,
			match => `$${match}`
		);

		this.model = this.model.find(JSON.parse(filterString));

		return this;
	}

	sort() {
		const { sort: sortBy = 'createdAt' } = this.queryString;

		this.model = this.model.sort(sortBy);

		return this;
	}
}

module.exports = { ApiFeatures };
