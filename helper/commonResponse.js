import encryptDecrypt  from "../helper/encrypt-decrypt.js";
import db from '../config/db.js'
import jwt from 'jsonwebtoken'

const sendRes = {
  sendResponse: async (res, statusCode, status, message, data = null) => {
    const commonResponse = {
      status,
      message,
      data,
    };
    const custData = JSON.stringify(commonResponse);
    const encryptedData = await encryptDecrypt.encrypt(custData); 

    try {
      return res.status(statusCode).json({
        body: encryptedData,
      });
    } catch (error) {
      return res.status(statusCode).json({
        body: encryptedData,
      });
    }
  },
  sendResponseUat: async (res, statusCode, status, message, data = null) => {
    
    try {
      return res.status(statusCode).json({
      status,
      message,
      
      data,
      });
    } catch (error) {
      return res.status(statusCode).json({
        error,
      });
    }
  },
  sendResponseUatStep: async (res, statusCode, status, message,data) => {
    const body = {
      status,
      message,
      data
    };
    //console.log(body)
    try {
      return res.status(statusCode).json({
      status,
      message,
      data,
      });
    } catch (error) {
      return res.status(statusCode).json({
        error,
      });
    }
  },

  sendResponseUatRegistration: async (res, statusCode, status, message,loginid,password,data) => {
    const body = {
      status,
      message,
      loginid,
      password,
      data
    };
    //console.log(body)
    try {
      return res.status(statusCode).json({
      status,
      message,
      loginid,
      password,
      data
      });
    } catch (error) {
      return res.status(statusCode).json({
        error,
      });
    }
  },
  statusCode: {
    OK: 200,
    FOUR_ZERO_FOUR: 404,
    FOUR_ZERO_THREE: 403,
    FOUR_ZERO_ONE: 401,
    FOUR_ZERO_SIX: 406,
    FIVE_ZERO_ZERO: 500,
    FOUR_ZERO_ZERO: 400
  },

  statusMessage: {
    SERVER_BUSY: 'Our Servers are busy. Please try again later.',
    DATA_INSERTED: 'Data save successfully.',
    DATA_UPDATED: 'Data updated successfully.',
    DELETE_DATA: 'Data deleted successfully',
    PARAMS_MISSING: 'Parameter Missing.',
    DATA_ALREADY_EXISTS: 'Sorry..Already exists',
    NOT_DELETE_DATA: 'Can not be deleted. Please try again',
    NOT_UPDATE: 'Can not be updated. Please try again',
    DATA_NOT_FOUND: 'Data not found',
    DATA_GET_FOUND: 'Data get successfully',
    FAILD_CREATE: 'Can not be created. Please try again',
    OLD_PASS:'Current password does not match'
  },

  generateToken: function(user) {
    
    return jwt.sign(
      { id: user[0].id, mobilenumber: user[0].mobileno, full_name: user[0].name,loginId:user[0].loginid }, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE } 
    );
  },
  generateTokenUAT: function(user) {
    //console.log(user)
    const jsonObject = JSON.parse(user.jsonString);
    // console.log(user.jsonString);
    // console.log(user.result[0].id)
    return jwt.sign(
      { id: user.result[0].id, mobilenumber: user.result[0].MobileNo, full_name: user.result[0].userName,loginId:user.result[0].loginid}, 
      process.env.JWT_SECRET,
      { expiresIn: process.env.EXPIRE } 
    );
  }
};

export default sendRes;