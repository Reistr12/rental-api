'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rental_contracts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      property_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      tenant_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      monthly_value: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED'),
        defaultValue: 'PENDING',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rental_contracts');
  },
};
