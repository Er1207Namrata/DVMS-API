'use strict';
import {
  Model,Sequelize
} from 'sequelize'

import  sequelize from '../../config/db.js'
const boardProceedingApproval = sequelize.define('mst_board_proc_approval',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  approval: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.INTEGER
  },
  
  updatedBy: {
    type: Sequelize.INTEGER
  },
  
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue:false
  },
  deletedBy: {
    type: Sequelize.INTEGER
  },
  
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue:true
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: true,
    type: Sequelize.DATE
  }
},{
  paranoid:false,
  freezeTableName:true,
  modelName:'boardProceedingApprovalMaster'
})

export default boardProceedingApproval
