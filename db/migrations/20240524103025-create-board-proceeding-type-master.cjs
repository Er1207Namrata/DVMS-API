'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mst_board_proceeding_type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      boardProceedingType: {
        type: Sequelize.STRING
      },
      createdBy: {
        type: Sequelize.INTEGER
      },    
      createdAt: {
        
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
        defaultValue: false,
        type: Sequelize.BOOLEAN
      } 
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('mst_board_proceeding_type');
  }
};