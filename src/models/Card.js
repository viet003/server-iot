'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Card extends Model {
    static associate(models) {
      // One Card can have many Users
      Card.hasMany(models.User, { foreignKey: 'card_id', as: 'users' });
      // One Card can have many Bills
      Card.hasOne(models.Bill, { foreignKey: 'card_id', as: 'bill' });
      // One Card can have many Histories
      Card.hasMany(models.History, { foreignKey: 'card_id', as: 'histories' });
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
    tableName: 'cards',  // Matches the table name in migration
    timestamps: true,    // Sequelize will automatically manage createdAt and updatedAt
  });

  return Card;
};

