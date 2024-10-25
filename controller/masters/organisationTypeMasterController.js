import organisationType from "../../db/models/organisationtypemaster.js";

import encryptDecrypt from "../../helper/encrypt-decrypt.js";

import sendRes from "../../helper/commonResponse.js";

export const getOrganisationTypeList = async (req, res) => {
  try {
    const neworganisation = await organisationType.findAll({
      attributes: ["id", "organizationType"],
      where: { isActive: true,isDeleted:false },
    });

    if (!neworganisation) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_NOT_FOUND
      );
    } else {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_GET_FOUND,
        neworganisation
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

export const createOrganisationType= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existing = await organisationType.findOne({
      where: { organizationType: JsonData.organizationType ,isActive:true,isDeleted:false },
    });
    
    if (existing) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX, 
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const neworganisation = await organisationType.create({
        organizationType: JsonData.organizationType,
        isDeleted:false,
        isActive:true,
        createdBy:req.user.id
      });
      
      if (!neworganisation) {
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
          neworganisation
        );
      }
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

export const getOrganisationTypeById = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const neworganisation = await organisationType.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!neworganisation) {
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
        neworganisation
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

export const updateorganisationType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const neworganisation = await organisationType.update(
      {
        organizationType: JsonData.organizationType,
        updatedBy:req.user.id
      },
      {
        where: {
          id: JsonData.Id,
        },
      }
    );
    if (!neworganisation) {
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
        neworganisation
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

export const deleteorganisationType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const neworganisation = await organisationType.update(
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
    if (!neworganisation) {
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
        neworganisation
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
