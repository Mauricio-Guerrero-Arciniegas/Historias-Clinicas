const { db, DataTypes } = require('../utils/database.util');

// Create our first model (table)
const User = db.define('user', {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	containerBox:{
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	
	identification: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},

	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'active',
	},
});

module.exports = { User };
