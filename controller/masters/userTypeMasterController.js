
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";
import sendRes from '../../helper/commonResponse.js';
import UserTypeMaster from "../../db/models/usertypemaster.js";

import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';
import { DATE } from "sequelize";
;
  export const getAllUserType = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
      
      
        
        obj = '{"user_id":"' + 0 + '"}';
      
      
      var result = await callprocMenthod.GET(obj, "mst_user_type_select");
      //console.log(result);
      if (!result) {
        
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
       
      } else {
        
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result
          );
        
      }
    } catch (error) {
      //console.log(error)
      
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
     
    }
  };

  // export const createUserType = async (req, res) => {
  //   try {
  //     var date_time = new Date();
  //     const decryptedData = await encryptDecrypt.decrypt(req.body.body);
  //     const JsonData = JSON.parse(decryptedData);
  //     const existing = await UserTypeMaster.findOne({
  //       where: { userType: JsonData.userType,isDeleted:false,isActive:true },
  //     });
      
  //     if (existing) {
  //       await sendRes.sendResponse(
  //         res,
  //         sendRes.statusCode.FOUR_ZERO_SIX,
  //         0,
  //         sendRes.statusMessage.DATA_ALREADY_EXISTS
  //       );
  //     } else {
  //     const newUserType = await UserTypeMaster.create({

  //       userType: JsonData.userType,
  //       createdBy: req.user.id,
  //       createdAt:date_time
  //     });
  
  //     if (!newUserType) {
  //       await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
  //     } else {
  //       await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newUserType);
  //     }
  //   }
  //   } catch (error) {
  //      console.log(error)
  //     await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
  //   }
  // };
  export const createUserType = async (req, res) => {
    
    try {
      let obj;
     
      const statusCode = 0;
      const message = "";
     
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"user_type":"' + JsonData.usertype + '","created_by":"' + req.user.id + '","statuscode":"' + statusCode + '","message":"' + message + '"}';
        console.log(obj)
     
      
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "mst_user_type_insert");
      console.log(result);
      if (result[0].status == "0") {
        
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.FAILD_CREATE
          );
        
      } else {
       
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            result[0].message
          );
       
      }
    } catch (error) {
      console.log(error);
     
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
     
    }
  };

  export const getAllUserTypeId = async (req, res) => {
   
    try {
      let obj;
      
     
        const descryptData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData= JSON.parse(descryptData);
        obj = '{"user_id":"' + JsonData + '"}';
      
      var result = await callprocMenthod.GET(obj, "mst_user_type_select");
      //console.log(result);
      if (!result) {
       
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
      
      } else {
       
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result[0]
          );
       
      }
    } catch (error) {
      //console.log(error)
    
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      
    }
  };
  
  export const updateUserType = async (req, res) => {
    
    try {
      let obj;
     
      const statusCode = 0;
      const message = "";
     
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"user_id":"' + JsonData.id + '","user_type":"' + JsonData.usertype + '","updated_by":"' + req.user.id + '","statuscode":"' + statusCode + '","message":"' + message + '"}';
        console.log(obj)
     
      
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "mst_user_type_update");
      console.log(result);
      if (result[0].status == "0") {
        
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            0,
            result[0].message
          );
        
      } else {
       
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            result[0].message
          );
       
      }
    } catch (error) {
      console.log(error);
     
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
     
    }
  };

  export const deleteUserType = async (req, res) => {
    
    try {
      let obj;
     
      const statusCode = 0;
      const message = "";
     
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"user_id":"' + JsonData + '","deleted_by":"' + req.user.id + '","statuscode":"' + statusCode + '","message":"' + message + '"}';
        console.log(obj)
     
      
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "mst_user_type_delete");
      console.log(result);
      if (result[0].status == "0") {
        
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            0,
            result[0].message
          );
        
      } else {
       
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            result[0].message
          );
       
      }
    } catch (error) {
      console.log(error);
     
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
     
    }
  };
 