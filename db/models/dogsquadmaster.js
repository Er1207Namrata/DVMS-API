'use strict';
import {
  Model,Sequelize
} from 'sequelize'
import  sequelize from '../../config/db.js'
const dogSquad = sequelize.define('mst_dog_squad',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  dogSquad: {
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
  modelName:'dogSquadMaster'
}
)

export default dogSquad