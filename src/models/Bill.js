'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Bill extends Model {
    static associate(models) {
      // Mỗi Bill thuộc về một Card
      Bill.belongsTo(models.Card, { foreignKey: 'card_id' });
    }
  }

  Bill.init({
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    card_id: { // Sửa thành card_id để phù hợp với bảng
      type: DataTypes.STRING,
      allowNull: false,
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
