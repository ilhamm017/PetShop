'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    full_name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Full Name cannot be ommited'
        }
      }
    },
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate : {
        notNull: {
          msg: 'Email cannot be omitted'
            },
        notEmpty: {
          msg: 'Email cannot be an empty string'
            },
        isEmail: {
          msg: 'Wrong email format'
            }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : 'Password cannot be omitted'
        }
      }
    },
    gender: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        isIn : [['male','female']],
      }
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : true,
        isIn : [['admin','customer']],
      }
    },
    balance: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : true,
        isInt : true,
        max : 100000000,
        min : 0,
      }
    },
  },
  {
    hooks : {
      beforeCreate(instance){
        instance.balance = 0;
        instance.role = "customer";
      }
    },
    sequelize,
    modelName: 'User',
  }
  );
  User.associate = (models) => {
    User.hasMany(models.TransactionHistory)
  }
  return User;
};