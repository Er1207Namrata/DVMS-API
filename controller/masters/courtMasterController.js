import courtMaster from "../../db/models/courtmaster.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import sendRes from "../../helper/commonResponse.js";

export const getCourtList = async (req, res) => {
  try {
    const newCourt = await courtMaster.findAll({
      attributes: ["id", "court"],
      where: { isActive: true ,isDeleted:false},
    });

    if (!newCourt) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_FOUR,
        0,
        sendRes.statusMessage.DATA_NOT_FOUND
      );
    } else {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_GET_FOUND,
        newCourt
      );
    }
  } catch (error) {
    //console.log(error)
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};

export const createCourt= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existing = await courtMaster.findOne({
      where: { court: JsonData.Court ,isActive:true,isDeleted:false},
    });
    
    if (existing) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const newCourt = await courtMaster.create({
        court: JsonData.Court,
        createdBy:req.user.id
      });
      
      if (!newCourt) {
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
          sendRes.statusMessage.DATA_INSERTED,
          newCourt
        );
      }
    }
  } catch (error) {
   // console.log(error)
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};

export const getCourtById = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newCourt = await courtMaster.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!newCourt) {
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
        newCourt
      );
    }
  } catch (error) {
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};

export const updateCourt = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const newCourt = await courtMaster.update(
      {
        court: JsonData.Court,
        updatedBy:req.user.id
      },
      {
        where: {
          id: JsonData.Id,
        },
      }
    );
    if (!newCourt) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_ZERO,
        0,
        sendRes.statusMessage.NOT_UPDATE
      );
    } else {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_UPDATED,
        newCourt
      );
    }
  } catch (error) {
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};

export const deleteCourt = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newCourt = await courtMaster.update(
      {
        isActive: false,
        isDeleted: true,
        deletedBy:req.user.id
      },
      {
        where: {
          id: JsonData,
        },
      }
    );
    if (!newCourt) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_ZERO,
        0,
        sendRes.statusMessage.NOT_DELETE_DATA
      );
    } else {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DELETE_DATA,
        newCourt
      );
    }
  } catch (error) {
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};
