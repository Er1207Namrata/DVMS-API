'use strict';
import {
  Model,Sequelize
} from 'sequelize'
import  sequelize from '../../config/db.js'
const PropertyType=sequelize.define('mst_property_type',{
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
    type: Sequelize.STRING
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
  modelName:'propertyTypeMaster'
}
)

export default PropertyType
