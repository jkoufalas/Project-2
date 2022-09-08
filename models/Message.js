const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Location model
class Message extends Model {}

// create fields/columns for Location model
Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "message",
  }
);

module.exports = Message;
