'use strict';
import {
  Model,Sequelize
} from 'sequelize'
import  sequelize from '../../config/db.js'
const organisationType=sequelize.define('mst_organisation_type',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  organizationType: {
    type: Sequelize.STRING
  },
  createdBy: {
    type: Sequelize.INTEGER
  },

  updatedBy: {
    type: Sequelize.INTEGER
  },
 
  isDeleted: {
    type: Sequelize.BOOLEAN
  },
  deletedBy: {
    type: Sequelize.INTEGER
  },
 
  isActive: {
    type: Sequelize.BOOLEAN
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
  modelName:'organisationTypeMaster'
})

 export default organisationType