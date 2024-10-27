'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Thêm ràng buộc ngoại tuyến giữa 'Users' và 'cards'
        await queryInterface.addConstraint('users', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_user_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'Bills' và 'cards'
        await queryInterface.addConstraint('bills', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_bill_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'Histories' và 'cards'
        await queryInterface.addConstraint('histories', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_history_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        // Xóa ràng buộc ngoại tuyến giữa 'Users' và 'cards'
        await queryInterface.removeConstraint('users', 'fk_user_cardId');

        // Xóa ràng buộc ngoại tuyến giữa 'Bills' và 'cards'
        await queryInterface.removeConstraint('bills', 'fk_bill_cardId');

        // Xóa ràng buộc ngoại tuyến giữa 'Histories' và 'cards'
        await queryInterface.removeConstraint('histories', 'fk_history_cardId');
    }
};
