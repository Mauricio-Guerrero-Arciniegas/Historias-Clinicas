const express = require('express');

// Controllers
const {
	getAllRequest,
	createRequest,
	getRequestById,
	updateRequest,
	deleteRequest,
} = require('../controllers/request.controller');

// Middlewares
const { requestExists } = require('../middlewares/request.middleware');
const { protectSession } = require('../middlewares/auth.middleware');
const {
	createRequestValidators,
  } = require('../middlewares/validators.middleware');

// Utils
const { upload } = require('../utils/upload.util');

const requestRouter = express.Router();

requestRouter.use(protectSession);

requestRouter
	.route('/')
	.get(getAllRequest)
	

requestRouter
    .post("/", upload.array("requestImg", 5), createRequestValidators, createRequest)
	.use('/:id', requestExists)
	.route('/:id')
	.get(getRequestById)
	.patch(updateRequest)
	.delete(deleteRequest);

module.exports = { requestRouter };
