
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import sendRes from "../../helper/commonResponse.js";
import nationalityMaster from "../../db/models/mst_nationality.js";


export const getAllNationality = async (req, res) => {
    try {
      const newreturn = await nationalityMaster.findAll({
        attributes: ['id','nationalityname'],
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
export const createnationality = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await nationalityMaster.findOne({
        where: { nationalityname: JsonData.nationalityname ,isDeleted:false,isActive:true},
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newApp = await nationalityMaster.create({
        nationalityname: JsonData.nationalityname,
        createdBy:req.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newApp) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newApp);
      }
    }
    } catch (error) {
       console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
  export const getnationalityById = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);
      const newHead = await nationalityMaster.findOne({ 
        attributes: ['id','nationalityname'],
        where: {
        id: JsonData,
         isDeleted:false,
         isActive:true
      },}
       
      );
      if (!newHead) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newHead);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
  export const updatenationality = async (req, res) => {
    try {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const newHead = await nationalityMaster.update(
        {
            nationalityname:JsonData.nationalityname,
            updatedBy:req.id
        },
        {
        where: {
        id: JsonData.id
        }
      }
      );
      if (!newHead) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newHead);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };
  export const deletenationality = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newHead = await nationalityMaster.update(
        {
          isActive:false,
          isDeleted:true,
          deletedBy:req.id
        },
        {
        where: {
        id: JsonData
        
        }
      }
       
      );
      if (!newHead) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newHead);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
