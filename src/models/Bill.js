'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Bill extends Model {
    static associate(models) {
      // Mỗi Bill thuộc về một Card
      Bill.belongsTo(models.Card, { foreignKey: 'cardId' });
    }
  }

  Bill.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cardId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
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
    modelName: 'Bill',
    tableName: 'bills',
    timestamps: true,
  });

  return Bill;
};
