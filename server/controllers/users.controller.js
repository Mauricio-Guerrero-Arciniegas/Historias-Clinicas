const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/user.model');
const { Request } = require('../models/request.model');
const { History } = require('../models/history.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { Email } = require('../utils/email.util');

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
	const users = await User.findAll({
		
	});

	res.status(200).json({
		status: 'success',
		users,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, identification, containerBox } = req.body;

	const newUser = await User.create({
		name,
		containerBox,
		identification,
	});

	// Remove password from response
	newUser.password = undefined;

	// Send welcome email
	//await new Email(email).sendWelcome(name);

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const getUserById = catchAsync(async (req, res, next) => {
	const { user } = req;

	res.status(200).json({
		status: 'success',
		user,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { user } = req;
	const { name } = req.body;

	await user.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { user } = req;

	// await user.destroy();
	await user.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	const { identification } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		where: {
			identification,
			status: 'active',
		},
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
	});
});

const checkToken = catchAsync(async (req, res,next) => {
	const { sessionUser } = req;
	res.status(200).json({
		status: 'success',
		user: sessionUser,
	});
	
});

module.exports = {
	checkToken,
	getAllUsers,
	createUser,
	getUserById,
	updateUser,
	deleteUser,
	login,
};
