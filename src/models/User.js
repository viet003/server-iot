'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Mỗi User thuộc về một Card
      User.belongsTo(models.Card, { foreignKey: 'card_id', as : 'card' });
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
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token_device: {
      type: DataTypes.STRING,
      allowNull: true,
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
