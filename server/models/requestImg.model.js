const { db, DataTypes } = require('../utils/database.util');

const RequestImg = db.define('requestImg', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	requestId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	imgUrl: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { RequestImg };
