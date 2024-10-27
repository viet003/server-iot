'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu mẫu vào bảng `users`
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@example.com',
        password: 'password123',  // Lưu ý: mật khẩu nên được mã hóa trong thực tế
        username: 'user1',
        cardId: 'HDKZWQEF',
        type: 'Xe máy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@example.com',
        password: 'password123',
        username: 'user2',
        cardId: 'FGJHFLHJ',
        type: 'Xe máy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@example.com',
        password: 'password123',
        username: 'user3',
        cardId: 'UGHDSDFD',
        type: 'Xe máy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa tất cả các bản ghi trong bảng `users`
    await queryInterface.bulkDelete('users', null, {});
  }
};
