'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Categories.hasMany(models.Posts, {
        foreignKey: 'categoryId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Categories.hasMany(models.Ranks, {
        foreignKey: 'categoryId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
    }
  }
  Categories.init({
    categoryId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    },
    rewards: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};