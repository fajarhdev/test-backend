const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;

const User = sequelize.define(
	"User",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			field: "users_id",
		},
		username: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
	},
	{
		tableName: "users",
		timestamps: true,
		paranoid: true,
	}
);

User.sync();

module.exports = User;
