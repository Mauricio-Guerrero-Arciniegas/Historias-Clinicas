const express = require('express');

// Controller
const {
	getAllHistory,
	createHistory,
	getHistoryById,
	updateHistory,
	deleteHistory,
} = require('../controllers/history.controller');

// Middlewares
const { historyExists } = require('../middlewares/history.middleware');
const { protectSession } = require('../middlewares/auth.middleware');

const historyRouter = express.Router();

historyRouter.use(protectSession);

historyRouter.route('/').get(getAllHistory).post(createHistory);

historyRouter

	.use('/:id', historyExists)
	.route('/:id')
	.get(getHistoryById)
	.patch(updateHistory)
	.delete(deleteHistory);

module.exports = { historyRouter };
