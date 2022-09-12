// Models
const { History } = require('../models/history.model');
const { User } = require('../models/user.model');
const { Request } = require('../models/request.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const getAllHistory = catchAsync(async (req, res, next) => {
	// Deep includes
	const histories = await History.findAll({
		attributes: ['id', 'name', 'identification', 'containerBox', ],
		
	});

	res.status(200).json({
		status: 'success',
		histories,
	});
});


const createHistory = catchAsync(async (req, res, next) => {
	const { name, identification, containerBox } = req.body;
	const { sessionUser } = req;

	const newHistory = await History.create({
		userId: sessionUser.id,
		name,
		identification,
		containerBox
		
	});

	res.status(201).json({
		status: 'success',
		newHistory,
	});
});

const getHistoryById = catchAsync(async (req, res, next) => {
	const { history } = req;

	res.status(200).json({
		status: 'success',
		history,
	});
});


const updateHistory = catchAsync(async (req, res, next) => {
	const { history } = req;
	const { newHistory } = req.body;

	await history.update({ comment: newHistory });

	res.status(204).json({
		status: 'success',
	});
});

const deleteHistory = catchAsync(async (req, res, next) => {
	const { history } = req;

	await history.update({ status: 'deleted' });

	res.status(204).json({
		status: 'success',
	});
});

module.exports = {
	getAllHistory,
	createHistory,
	getHistoryById,
	updateHistory,
	deleteHistory,
};
