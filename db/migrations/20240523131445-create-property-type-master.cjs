'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mst_property_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      propertyType: {
        type: Sequelize.STRING
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable('mst_property_type');
  }
};