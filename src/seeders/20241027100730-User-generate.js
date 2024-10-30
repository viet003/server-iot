'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm dữ liệu mẫu vào bảng `users`
    await queryInterface.bulkInsert('users', [
      {
        email: 'user1@example.com',
        pass_word: 'password123',  // Lưu ý: mật khẩu nên được mã hóa trong thực tế
        user_name: 'user1',
        type: 0,
        card_id: 'HDKZWQEF',
        vehicle_type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user2@example.com',
        pass_word: 'password123',
        user_name: 'user2',
        type: 0,
        card_id: 'FGJHFLHJ',
        vehicle_type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'user3@example.com',
        pass_word: 'password123',
        user_name: 'user3',
        type: 0,
        card_id: 'UGHDSDFD',
        vehicle_type: 0,
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
