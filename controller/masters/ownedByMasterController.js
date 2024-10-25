import ownedByMaster from "../../db/models/ownedbymaster.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";

import sendRes from "../../helper/commonResponse.js";

export const getOownedByList = async (req, res) => {
  const headerValue = req.header("isUAT");
  try {
    const newOwnedBy = await ownedByMaster.findAll({
      attributes: ["id", "ownedBy"],
      where: { isActive: true,isDeleted:false },
    });

    if (!newOwnedBy) {
      if(headerValue==0)
        {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_FOUR,
        0,
        sendRes.statusMessage.DATA_NOT_FOUND
      );
    }
    else
    {
      await sendRes.sendResponseUat(
        res,
        sendRes.statusCode.FOUR_ZERO_FOUR,
        0,
        sendRes.statusMessage.DATA_NOT_FOUND
      );
    }
    } else {
      if(headerValue==0)
        {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_GET_FOUND,
        newOwnedBy
      );
    }
    else
    {
      await sendRes.sendResponseUat(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_GET_FOUND,
        newOwnedBy
      );
    }
    }
  } catch (error) {
    if(headerValue==0)
      {
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
  else
  {
    await sendRes.sendResponseUat(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
  }
};

export const createownedBy= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existing = await ownedByMaster.findOne({
      where: { ownedBy: JsonData.ownedBy ,isDeleted:false,isActive:true},
    });
    
    if (existing) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const newOwnedBy = await ownedByMaster.create({
        ownedBy: JsonData.ownedBy,
        createdBy:req.user.id
      });
      
      if (!newOwnedBy) {
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
          newOwnedBy
        );
      }
    }
  } catch (error) {
    console.log(error)
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      sendRes.statusMessage.SERVER_BUSY
    );
  }
};

export const getownedById = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newOwnedBy = await ownedByMaster.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!newOwnedBy) {
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
        newOwnedBy
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

export const updateownedBy = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const newOwnedBy = await ownedByMaster.update(
      {
        ownedBy: JsonData.ownedBy,
        updatedBy:req.user.id
      },
      {
        where: {
          id: JsonData.Id,
        },
      }
    );
    if (!newOwnedBy) {
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
        newOwnedBy
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

export const deleteownedBy = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newOwnedBy = await ownedByMaster.update(
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
    if (!newOwnedBy) {
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
        newOwnedBy
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
