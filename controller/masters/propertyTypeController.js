import PropertyType from "../../db/models/propertytypemaster.js";
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";

import sendRes from '../../helper/commonResponse.js';
;


export const getAllPropertyType = async (req, res) => {
  const headerValue = req.header("isUAT");
    try {
      
      const newRType = await PropertyType.findAll({
        attributes:['id','propertyType'],
        where:{isActive:true,isDeleted:false}});
       // console.log(newRType)
      if (!newRType) {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
          }
      }
      else
      {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newRType);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newRType);
          }
      }
    
    } catch (error) {
      if(headerValue==0)
        {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
    }
  };

  export const createPropertyType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await PropertyType.findOne({
        where: { propertyType: JsonData.propertyType ,isDeleted:false,isActive:true},
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newType = await PropertyType.create({
        propertyType: JsonData.propertyType,
        createdBy: req.user.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newType) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newType);
      }
    }
    } catch (error) {
       console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const getPropertyTypeById = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
      console.log(JsonData)
      const newType = await PropertyType.findOne({ 
        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      }}
       
      );
      if (!newType) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newType);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updatePropertyType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newType = await PropertyType.update(
        {
            propertyType:JsonData.propertyType,
            updatedBy:req.user.id
        },
        {
        where: {
        id: JsonData.Id
        
        }
      }
       
      );
      if (!newType) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newType);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deletePropertyType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newType = await PropertyType.update(
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
      if (!newType) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newType);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };