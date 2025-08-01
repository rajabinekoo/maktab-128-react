const multer = require('multer');

// TODO: consider diskStorage for multi fields images, avoid memory overflow
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	file.mimetype.startsWith('image')
		? cb(null, true)
		: cb(new AppError(400, 'not an image, upload only images'), false);
};

const multerUpload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});

module.exports = { multerUpload };
