const { db, DataTypes } = require('../utils/database.util');

const History = db.define('history', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	userId: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},

	containerBox:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
     name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	identification: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { History };
