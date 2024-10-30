'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Thêm ràng buộc ngoại tuyến giữa 'users' và 'cards'
        await queryInterface.addConstraint('users', {
            fields: ['card_id'], // Sửa thành card_id
            type: 'foreign key',
            name: 'fk_user_card_id', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'bills' và 'cards'
        await queryInterface.addConstraint('bills', {
            fields: ['card_id'], // Sửa thành card_id
            type: 'foreign key',
            name: 'fk_bill_card_id', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'histories' và 'cards'
        await queryInterface.addConstraint('histories', {
            fields: ['card_id'], // Sửa thành card_id
            type: 'foreign key',
            name: 'fk_history_card_id', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        // Xóa ràng buộc ngoại tuyến giữa 'users' và 'cards'
        await queryInterface.removeConstraint('users', 'fk_user_card_id');

        // Xóa ràng buộc ngoại tuyến giữa 'bills' và 'cards'
        await queryInterface.removeConstraint('bills', 'fk_bill_card_id');

        // Xóa ràng buộc ngoại tuyến giữa 'histories' và 'cards'
        await queryInterface.removeConstraint('histories', 'fk_history_card_id');
    }
};
