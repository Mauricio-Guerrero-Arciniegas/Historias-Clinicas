// Models
const { History } = require('../models/history.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const historyExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const history = await History.findOne({ where: { id } });

	if (!history) {
		return next(new AppError('Comment not found', 404));
	}

	req.history = history;
	next();
});

module.exports = { historyExists };
