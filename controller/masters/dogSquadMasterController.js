import dogSquad from "../../db/models/dogsquadmaster.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import sendRes from "../../helper/commonResponse.js";

export const getdogSquadList = async (req, res) => {
  try {
    const newdogSquad = await dogSquad.findAll({
      attributes: ["id", "dogSquad"],
      where: { isActive: true ,isDeleted:false},
    });

    if (!newdogSquad) {
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
        newdogSquad
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

export const createdogSquad= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existing = await dogSquad.findOne({
      where: { dogSquad: JsonData.DogSquad,isDeleted:false,isActive:true },
    });
    
    if (existing) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const newdogSquad = await dogSquad.create({
        dogSquad: JsonData.DogSquad,
        isActive: true,
        isDeleted:false,
        createdBy:req.user.id
      });
      
      if (!newdogSquad) {
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
          newdogSquad
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

export const getdogSquadById = async (req, res) => {
  try {
    //console.log(req.query.Id);
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
   // console.log(decryptedData)
    const JsonData = JSON.parse(decryptedData);
    //console.log(JsonData);
    const newdogSquad = await dogSquad.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!newdogSquad) {
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
        newdogSquad
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

export const updatedogSquad = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const newdogSquad = await dogSquad.update(
      {
        dogSquad: JsonData.DogSquad,
        isActive: true,
        isDeleted:false,
        updatedBy:req.user.id

      },
      {
        where: {
          id: JsonData.Id,
        },
      }
    );
    if (!newdogSquad) {
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
        newdogSquad
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

export const deletedogSquad = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newdogSquad = await dogSquad.update(
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
    if (!newdogSquad) {
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
        newdogSquad
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