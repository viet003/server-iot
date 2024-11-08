'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class History extends Model {
    static associate(models) {
      // Mỗi History thuộc về một Card
      History.belongsTo(models.Card, { foreignKey: 'card_id', as: 'card' });
    }
  }

  History.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    card_id: { 
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
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
    modelName: 'History',
    tableName: 'histories', // Khớp với tên bảng trong migration
    timestamps: true,
  });

  return History;
};
