'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Card extends Model {
    static associate(models) {
      // Một Card có thể có nhiều Users
      Card.hasMany(models.User, { foreignKey: 'cardId' });
      // Một Card có thể có nhiều Bills
      Card.hasMany(models.Bill, { foreignKey: 'cardId' });
      // Một Card có thể có nhiều Histories
      Card.hasMany(models.History, { foreignKey: 'cardId' });
    }
  }

  Card.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true, // Dựa vào migration, trường này có thể để null
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
    modelName: 'Card',
    tableName: 'cards',  // Khớp với tên bảng trong migration
    timestamps: true,    // Để Sequelize tự động quản lý createdAt và updatedAt
  });

  return Card;
};
