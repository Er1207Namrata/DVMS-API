'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mst_minor_head', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      minorHead: {
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
        allowNull: false,
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
    await queryInterface.dropTable('mst_minor_head');
  }
};