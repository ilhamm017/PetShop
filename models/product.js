'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : true,
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : true,
        isInt : true,
        max : 50000000,
        min : 0,
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : true,
        isInt : true,
        min : 5
      }
    },
    CategoryId: {
       type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Categry ID cannot be omitted'
          },
          notEmpty: {
            msg: 'User ID cannot be an empty string'
          }
        }
    },
  },
   {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = (models) => {
    Product.belongsTo(models.Category)
    Product.hasMany(models.TransactionHistory)
  }
  return Product;
};