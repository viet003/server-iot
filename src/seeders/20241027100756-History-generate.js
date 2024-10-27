'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu mẫu vào bảng `histories`
    await queryInterface.bulkInsert('histories', [
      {
        cardId: "HDKZWQEF",
        time: new Date('2024-10-01T10:00:00Z'),
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardId: "HDKZWQEF",
        time: new Date('2024-10-02T12:00:00Z'),
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cardId: "HDKZWQEF",
        time: new Date('2024-10-03T14:00:00Z'),
        status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa tất cả các bản ghi trong bảng `histories`
    await queryInterface.bulkDelete('histories', null, {});
  }
};
