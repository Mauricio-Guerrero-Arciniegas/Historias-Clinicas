const path = require('path');

// Models
const { Request } = require('../models/request.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

const renderIndex = catchAsync(async (req, res, next) => {
	const request = await Request.findAll();

	res.status(200).render('index', {
		title: 'Rendered with Pug',
		request,
	});

	// Serve static html
	// const indexPath = path.join(__dirname, '..', 'public', 'index.html');

	// res.status(200).sendFile(indexPath);
});

module.exports = { renderIndex };
