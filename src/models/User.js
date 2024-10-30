'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Mỗi User thuộc về một Card
      User.belongsTo(models.Card, { foreignKey: 'card_id' });
    }
  }

  User.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    pass_word: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_id: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    vehicle_type: { 
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
    timestamps: true, 
  });

  return User;
};
