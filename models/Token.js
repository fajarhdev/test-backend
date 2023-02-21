const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db").sequelize;
const User = require("./user");

// const sequelize = new Sequelize("redo", "root", "", {
// 	host: "localhost",
// 	port: "3306",
// 	dialect: "mysql",
// 	// benchmark: true,
// });

const Token = sequelize.define(
	"Token",
	{
		tokens_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		token: { type: DataTypes.TEXT, allowNull: false },
		users_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: User, key: "users_id" },
		},
	},
	{
		tableName: "tokens",
		timestamps: true,
		updatedAt: false,
	}
);

// Token.sync();

module.exports = Token;
