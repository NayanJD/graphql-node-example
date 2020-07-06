"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cuisine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cuisine.belongsTo(models.user, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        as: "chef",
      });
    }
  }
  cuisine.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "created_at",
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: "updated_at",
      },
    },
    {
      sequelize,
      modelName: "cuisine",
    }
  );
  return cuisine;
};
