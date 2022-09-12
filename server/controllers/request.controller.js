const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Request } = require('../models/request.model');
const { RequestImg } = require('../models/requestImg.model');
const { User } = require('../models/user.model');
const { History } = require('../models/history.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { Email } = require('../utils/email.util');
const { storage } = require('../utils/firebase.util');
const { request } = require('express');

const getAllRequest = catchAsync(async (req, res, next) => {
	// Include user (users info)
	// Include history
	const request = await Request.findAll({
		attributes: ['id', 'identification','email', 'phoneNumber'],
	});

	res.status(200).json({
		status: 'success',
		request,
		
	});
});

const createRequest = catchAsync(async (req, res, next) => {
	const { name, identification, email, phoneNumber } = req.body;
	const { sessionUser } = req;

	const newRequest = await Request.create({
		name,
		identification,
		email,
		phoneNumber,
		userId: sessionUser.id,
	});

	if (req.files.length > 0) {
		const filesPromises = req.files.map(async file => {
			const imgRef = ref(storage, `request/${Date.now()}_${file.originalname}`);
			const imgRes = await uploadBytes(imgRef, file.buffer);

			return await RequestImg.create({
				requestId: newRequest.id,
				imgUrl: imgRes.metadata.fullPath,
			});
		});

		await Promise.all(filesPromises);
	}

	//Send mail when request has been created
	//await new Email(sessionUser.email).sendNewRequest(name, identification);

	res.status(201).json({
		status: 'success',
		newRequest,
	});
});

const getRequestById = catchAsync(async (req, res, next) => {
	const { post } = req;

	// Map async
	const requestImgsPromises = request.requestImgs.map(async requestImg => {
		const imgRef = ref(storage, requestImg.imgUrl);

		const imgFullPath = await getDownloadURL(imgRef);

		requestImg.imgUrl = imgFullPath;
	});

	await Promise.all(requestImgsPromises);

	res.status(200).json({
		status: 'success',
		request,
	});
});

const updateRequest = catchAsync(async (req, res, next) => {
	const { request } = req;

	await request.update({ title, content });

	res.status(204).json({ status: 'success' });
});

const deleteRequest = catchAsync(async (req, res, next) => {
	const { request } = req;

	await request.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllRequest,
	createRequest,
	getRequestById,
	updateRequest,
	deleteRequest,
};
