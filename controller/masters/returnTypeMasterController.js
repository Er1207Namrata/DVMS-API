import returnType from "../../db/models/returntypemaster.js";
import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";



export const getAllReturnType = async (req, res) => {
    try {
      // res.send("hello")
      // {where:{isActive:true}}
      const newreturn = await returnType.findAll({
        attributes: ['id','returnType'],
        where:{isActive:true,isDeleted:false}});

      if (!newreturn) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newreturn);
      }
    
    } catch (error) {
      //console.log(error)
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const createReturnType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await returnType.findOne({
        where: { returnType: JsonData.returnType,isDeleted:false,isActive:true },
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newreturn = await returnType.create({

        returnType: JsonData.returnType,
        createdBy: req.user.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newreturn) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newreturn);
      }
    }
    } catch (error) {
       //console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };

  export const getReturnTypeById = async (req, res) => {

    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newreturn = await returnType.findOne({ 

        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      },}
       
      );
      if (!newreturn) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newreturn);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updateReturnType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newreturn = await returnType.update(

        {
            returnType:JsonData.returnType,
            updatedBy:req.user.id
        },
        {
        where: {
        id: JsonData.Id
        
        }
      }
       
      );
      if (!newreturn) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newreturn);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deleteReturnType = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newreturn = await returnType.update(

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
      if (!newreturn) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newreturn);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
