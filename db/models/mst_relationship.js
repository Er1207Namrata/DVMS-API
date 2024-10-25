'use strict';
import {
  Model,Sequelize
} from 'sequelize'

import  sequelize from '../../config/db.js'
const relationshipMaster=sequelize.define('mst_relationship',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  relationshipname: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.INTEGER
  },
 
  updatedBy: {
    type: Sequelize.INTEGER,
    allowNull:true
  },
 
  isDeleted: {
    type: Sequelize.BOOLEAN,
    defaultValue:false
  },
  deletedBy: {
    type: Sequelize.INTEGER,
    allowNull:true
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
},
{
  paranoid:false,
  freezeTableName:true,
  modelName: 'relationshipMaster',
}
)
export default relationshipMaster;