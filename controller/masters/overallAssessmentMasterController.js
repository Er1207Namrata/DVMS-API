import overallAssessment from "../../db/models/overallassessmentmaster.js";
import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";



export const getAllOverallAssessment = async (req, res) => {
    try {
      // res.send("hello")
      // {where:{isActive:true}}
      const newOverAll = await overallAssessment.findAll({
        attributes: ['id','assessmentName'],
        where:{isActive:true,isDeleted:false}});

      if (!newOverAll) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newOverAll);
      }
    
    } catch (error) {
      //console.log(error)
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const createOverallAssessment = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await overallAssessment.findOne({
        where: { assessmentName: JsonData.assessmentName,isDeleted:false,isActive:true },
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newOverAll = await overallAssessment.create({

        assessmentName: JsonData.assessmentName,
        createdBy: req.user.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newOverAll) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newOverAll);
      }
    }
    } catch (error) {
       //console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };

  export const getOverallAssessmentById = async (req, res) => {

    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newOverAll = await overallAssessment.findAll({ 

        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      },}
       
      );
      if (!newOverAll) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newOverAll);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updateOverallAssessment = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newOverAll = await overallAssessment.update(
        {
            assessmentName:JsonData.assessmentName,
            updatedBy:req.user.i
        },
        {
        where: {
        id: JsonData.Id
        
        }
      }
       
      );
      if (!newOverAll) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newOverAll);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deleteOverallAssessment = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newOverAll = await overallAssessment.update(

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
      if (!newOverAll) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newOverAll);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
