// Model's attributes: id, title, content, userId, status
const { db, DataTypes } = require('../utils/database.util');

const Request = db.define('request', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	identification: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	phoneNumber: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { Request };
