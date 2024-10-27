'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class History extends Model {
    static associate(models) {
      // Mỗi History thuộc về một Card
      History.belongsTo(models.Card, { foreignKey: 'cardId' });
    }
  }

  History.init({
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
    time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.BIGINT,
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
    modelName: 'History',
    tableName: 'histories',
    timestamps: true,
  });

  return History;
};
