const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Trip model
class GroupMembership extends Model {}

// create fields/columns for Trip model
GroupMembership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "group",
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
    modelName: "groupmembership",
  }
);

module.exports = GroupMembership;
