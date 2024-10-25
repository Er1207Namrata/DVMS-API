import postMortemStatus from "../../db/models/postmortemstatusmaster.js";
import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt  from "../../helper/encrypt-decrypt.js";



export const getAllPostMortemStatus = async (req, res) => {
    try {
      // res.send("hello")
      // {where:{isActive:true}}
      const newPost = await postMortemStatus.findAll({
        attributes: ['id','Status'],
        where:{isActive:true,isDeleted:false}});

      if (!newPost) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newPost);
      }
    
    } catch (error) {
      //console.log(error)
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };


  export const createPostMortemStatus = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      const existing = await postMortemStatus.findOne({
        where: { Status: JsonData.Status,isDeleted:false,isActive:true },
      });
      
      if (existing) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_SIX,
          0,
          sendRes.statusMessage.DATA_ALREADY_EXISTS
        );
      } else {
      const newPost = await postMortemStatus.create({

        Status: JsonData.Status,
        createdBy: req.user.id,
        isDeleted:false,
        isActive:true
      });
  
      if (!newPost) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      } else {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_INSERTED, newPost);
      }
    }
    } catch (error) {
       //console.log(error)
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  };

  export const getPostMortemStatusById = async (req, res) => {

    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newPost = await postMortemStatus.findAll({ 

        where: {
        id: JsonData,
        isDeleted:false,
        isActive:true
      },}
       
      );
      if (!newPost) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,newPost);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const updatePostMortemStatus = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newPost = await postMortemStatus.update(

        {
            Status:JsonData.Status,
            updatedBy:req.user.id
        },
        {
        where: {
        id: JsonData.Id
        
        }
      }
       
      );
      if (!newPost) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_UPDATE);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_UPDATED,newPost);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };

  export const deletePostMortemStatus = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
      //console.log(decryptedData);
      const JsonData = JSON.parse(decryptedData);
     // console.log(JsonData)
      const newPost = await postMortemStatus.update(

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
      if (!newPost) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else
      {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DELETE_DATA,newPost);
      }
    
    } catch (error) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  };
