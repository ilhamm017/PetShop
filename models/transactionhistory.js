'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionHistory.init({
    ProductId: {
       type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID fff cannot be omitted'
          },
          notEmpty: {
            msg: 'User ID cannot be an empty string'
          }
        }
    },
    UserId: {
       type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'User ID wwwcannot be omitted'
          },
          notEmpty: {
            msg: 'User ID cannot be an empty string'
          }
        }
    },
    quantity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        isInt : true
      }
    },
    total_price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : true,
        isInt : true
      }
    }
  }, {
    sequelize,
    modelName: 'TransactionHistory',
  });
  TransactionHistory.associate = (models) => {
    TransactionHistory.belongsTo(models.User)
    TransactionHistory.belongsTo(models.Product)
  }
  return TransactionHistory;
};