import crypto from 'crypto'
const secretKey = 'DVMSNavy@C711@40';
const iv = crypto.randomBytes(16);

import {Sequelize} from 'sequelize'
const env=process.env.NODE_ENV|| 'development'
import config from '../config/config.js'

const sequelize=new Sequelize(config[env])
export default sequelize

