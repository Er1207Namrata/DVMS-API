import vehicleTypeMaster from "../../db/models/vehicletypemaster.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";

import sendRes from "../../helper/commonResponse.js";

export const getVehicleList = async (req, res) => {
  try {
    const newVehicle = await vehicleTypeMaster.findAll({
      attributes: ["id", "vehicleType"],
      where: { isActive: true,isDeleted:false },
    });

    if (!newVehicle) {
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
        newVehicle
      );
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

export const createVehicleType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existingVehicleType = await vehicleTypeMaster.findOne({
      where: { vehicleType: JsonData.vehicleType ,isDeleted:false,isActive:true},
    });
    if (existingVehicleType) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const newVehicle = await vehicleTypeMaster.create({
        vehicleType: JsonData.vehicleType,
        createdBy:req.user.id
      });
      if (!newVehicle) {
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
          newVehicle
        );
      }
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

export const getVehicleTypeById = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newVehicleType = await vehicleTypeMaster.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!newVehicleType) {
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
        newVehicleType
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

export const updateVehicleType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const newVehicleType = await vehicleTypeMaster.update(
      {
        vehicleType: JsonData.vehicleType,
        updatedBy:req.user.id
      },
      {
        where: {
          id: JsonData.id,
        },
      }
    );
    if (!newVehicleType) {
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
        newVehicleType
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

export const deleteVehicleType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newVehicleType = await vehicleTypeMaster.update(
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
    if (!newVehicleType) {
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
        newVehicleType
      );
    }
  } catch (error) {
    //console.log(error)
    await sendRes.sendResponse(
      res,
      sendRes.statusCode.FIVE_ZERO_ZERO,
      0,
      error
    );
  }
};
