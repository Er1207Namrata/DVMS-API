import DisciplinaryStatusMaster from "../../db/models/disciplinarystatusmaster.js";
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";

import sendRes from '../../helper/commonResponse.js';


export const getAllDisciplinaryStatus = async (req, res) => {
  const headerValue = req.header("isUAT");
    try {
       
       const newStatus = await DisciplinaryStatusMaster.findAll({
        attributes: ['id','disciplinaryStatus'],
        where:{isActive:true,isDeleted:false}});
      
      if (!newStatus) {
        
            await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
         
        
      }
      else
      {
        
            await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newStatus);
          
        
      }
    
    } catch (error) {
      //console.log(error)
      
          await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        
      
    }
  };


  export const createDisciplinaryStatus = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      let existing;
      let newStatus;
      let JsonData;
     
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           JsonData = JSON.parse(decryptedData);
           existing = await DisciplinaryStatusMaster.findOne({
            where: { disciplinaryStatus: JsonData.disciplinaryStatus ,isActive:true,isDeleted:false},
          });
       
      if (existing) {
     
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
     
      } else {
        
       newStatus = await DisciplinaryStatusMaster.create({
        disciplinaryStatus: JsonData.disciplinaryStatus,
        createdBy: req.user.id,
      });
          
      if (!newStatus) {
        
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
         
      } else {
        
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED);
          
      }
    }
    } catch (error) {
      
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
       
    }
  };
  export const getDisciplinaryStatusById = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newStatus = await DisciplinaryStatusMaster.findAll({ 
        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      },}
       
      );
      if (!newStatus) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newStatus[0]);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updateDisciplinaryStatus = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const newStatus = await DisciplinaryStatusMaster.update(
        {
          disciplinaryStatus:JsonData.disciplinaryStatus,
          updatedBy:req.user.id
        },
        {
        where: {
        id: JsonData.id
        
        }
      }
       
      );
      if (!newStatus) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deleteDisciplinaryStatus = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newStatus = await DisciplinaryStatusMaster.update(
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
      if (!newStatus) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };