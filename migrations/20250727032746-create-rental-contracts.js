'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rental_contracts', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      propertyId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'property_id',
      },
      tenantId: {
        type: Sequelize.UUID,
        allowNull: false,
        field: 'tenant_id',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'start_date',
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'end_date',
      },
      monthlyValue: {
        type: Sequelize.FLOAT,
        allowNull: false,
        field: 'monthly_value',
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        field: 'is_active',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('rental_contracts');
  }
};
