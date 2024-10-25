import securityInfrastructure from "../../db/models/securityinfrastructuremaster.js";

import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";



export const getAllSecurityInfrastructure = async (req, res) => {
    try {
      // res.send("hello")
      // {where:{isActive:true}}
      const newInfra = await securityInfrastructure.findAll({
        attributes: ['id','securityInfra'],
        where:{isActive:true,isDeleted:false}});

      if (!newInfra) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newInfra);
      }
    
    } catch (error) {
      console.log(error)
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const createSecurityInfrastructure = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await securityInfrastructure.findOne({
        where: { securityInfra: JsonData.SecurityInfra,isDeleted:false,isActive:true },
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newInfra = await securityInfrastructure.create({

        securityInfra: JsonData.SecurityInfra,
        createdBy: req.user.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newInfra) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newInfra);
      }
    }
    } catch (error) {
       //console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };
  export const getSecurityInfrastructureById = async (req, res) => {

    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newInfra = await securityInfrastructure.findOne({ 

        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      },}
       
      );
      if (!newInfra) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newInfra);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updateSecurityInfrastructure = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newInfra = await securityInfrastructure.update(

        {
          securityInfra:JsonData.SecurityInfra,
          updatedBy:req.user.id
        },
        {
        where: {
        id: JsonData.Id
        
        }
      }
       
      );
      if (!newInfra) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newInfra);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deleteSecurityInfrastructure = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newInfra = await securityInfrastructure.update(

        {
          isActive:false,
          isDeleted:true,
          deletedBy:req.user.id
        },
        {
        where: {
        id: JsonData
        
        }
      }
       
      );
      if (!newInfra) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newInfra);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
