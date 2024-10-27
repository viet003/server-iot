'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Thêm dữ liệu mẫu vào bảng `cards`
    await queryInterface.bulkInsert('cards', [
      {
        id: 'HDKZWQEF',
        type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'FGJHFLHJ',
        type: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'UGHDSDFD',
        type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Xóa tất cả các bản ghi trong bảng `cards`
    await queryInterface.bulkDelete('cards', null, {});
  }
};
