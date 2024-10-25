'use strict';
import {
  Model,Sequelize
} from 'sequelize'
import  sequelize from '../../config/db.js'
const rolemaster=sequelize.define('mst_role',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  rolename: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
 
  updatedBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  
  isDeleted: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    defaultValue:false
  },
  deletedBy: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
 
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
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
 
},
{
  paranoid:false,
  freezeTableName:true,
  modelName: 'rolemaster',
}
)
export default rolemaster;