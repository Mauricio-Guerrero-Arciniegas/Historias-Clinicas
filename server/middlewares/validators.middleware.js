const { body, validationResult } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		// Array has errors
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	checkResult,
];

const loginValidators = [
	checkResult,
];

const createRequestValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('identification').notEmpty().withMessage('identification cannot be empty'),
	checkResult,
];


const updateUserValidators = [
	body('username').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	checkResult,
];


module.exports = { createUserValidators, loginValidators, updateUserValidators,
	createRequestValidators};




