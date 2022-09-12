// Models
const { User } = require('./user.model');
const { Request } = require('./request.model');
const { History } = require('./history.model');
const { RequestImg } = require('./requestImg.model');

const initModels = () => {
	// 1 User <----> M Request
	User.hasMany(Request, { foreignKey: 'userId' });
	Request.belongsTo(User);

	// 1 User <----> M History
	User.hasMany(History, { foreignKey: 'userId' });
	History.belongsTo(User);

	// 1 Request <----> M Comment
	Request.hasMany(History, { foreignKey: 'postId' });
	History.belongsTo(Request);

	// 1 Post <----> M PostImg
	Request.hasMany(RequestImg, { foreignKey: 'postId' });
	RequestImg.belongsTo(Request);
};

module.exports = { initModels };
