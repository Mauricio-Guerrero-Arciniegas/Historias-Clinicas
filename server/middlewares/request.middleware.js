// Models
const { Request } = require('../models/request.model');
const { RequestImg } = require('../models/requestImg.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const requestExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const request = await Request.findOne({
		where: { id },
		include: { model: PostImg },
	});

	if (!request) {
		return next(new AppError('request not found', 404));
	}

	req.request = request;
	next();
});

module.exports = { requestExists };
