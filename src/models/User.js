'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      // Định nghĩa các quan hệ nếu có, ví dụ: User.belongsTo(models.Card, { foreignKey: 'cardId' });
      User.belongsTo(models.Card, { foreignKey: 'cardId' });
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
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    cardId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
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
    tableName: 'users',  // Khớp với tên bảng trong migration
    timestamps: true, // Để Sequelize tự động quản lý createdAt và updatedAt
  });

  return User;
};
