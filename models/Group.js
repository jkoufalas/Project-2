const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Location model
class Group extends Model {}

// create fields/columns for Location model
Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "group",
  }
);

module.exports = Group;
