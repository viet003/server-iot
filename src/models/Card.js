'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Card extends Model {
    static associate(models) {
      // Một Card có thể có nhiều Users
      Card.hasMany(models.User, { foreignKey: 'card_id' });
      // Một Card có thể có nhiều Bills
      Card.hasMany(models.Bill, { foreignKey: 'card_id' });
      // Một Card có thể có nhiều Histories
      Card.hasMany(models.History, { foreignKey: 'card_id' });
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
    modelName: 'Card',
    tableName: 'cards',  // Khớp với tên bảng trong migration
    timestamps: true,    // Để Sequelize tự động quản lý createdAt và updatedAt
  });

  return Card;
};
