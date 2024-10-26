'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        // Thêm ràng buộc ngoại tuyến giữa 'Users' và 'Cards'
        await queryInterface.addConstraint('Users', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_user_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'Cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'Bills' và 'Cards'
        await queryInterface.addConstraint('Bills', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_bill_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'Cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });

        // Thêm ràng buộc ngoại tuyến giữa 'Histories' và 'Cards'
        await queryInterface.addConstraint('Histories', {
            fields: ['cardId'],
            type: 'foreign key',
            name: 'fk_history_cardId', // Tên constraint phải là duy nhất
            references: {
                table: 'Cards',
                field: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        });
    },

    async down(queryInterface, Sequelize) {
        // Xóa ràng buộc ngoại tuyến giữa 'Users' và 'Cards'
        await queryInterface.removeConstraint('Users', 'fk_user_cardId');

        // Xóa ràng buộc ngoại tuyến giữa 'Bills' và 'Cards'
        await queryInterface.removeConstraint('Bills', 'fk_bill_cardId');

        // Xóa ràng buộc ngoại tuyến giữa 'Histories' và 'Cards'
        await queryInterface.removeConstraint('Histories', 'fk_history_cardId');
    }
};
