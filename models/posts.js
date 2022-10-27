'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Posts.hasMany(models.Comments, {
        foreignKey: 'postId',
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Posts.belongsTo(models.Users, {
        foreignKey: "userId",
        onDelete: "cascade",
        onUpdate: "cascade"
      });
      models.Posts.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        onDelete: "cascade",
        onUpdate: "cascade"
      });
    }
  }
  Posts.init({
    postId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    categoryId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },

    lookup: {
      type: DataTypes.INTEGER
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
    modelName: 'Posts',
  });
  return Posts;
};