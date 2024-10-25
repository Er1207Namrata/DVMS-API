'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mst_vehicle_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vehicleType: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },    
      updatedAt: {
        type: Sequelize.DATE
      }, 
      isDeleted: {
        allowNull: false,
        defaultValue:false,
        type: Sequelize.BOOLEAN
      },
      deletedBy: {
        type: Sequelize.INTEGER
      },     
      isActive: {
        allowNull: false,
        defaultValue:true,
        type: Sequelize.BOOLEAN
      }
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mst_vehicle_type');
  }
};