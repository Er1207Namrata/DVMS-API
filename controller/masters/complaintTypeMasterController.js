import complaintType from "../../db/models/complainttypemaster.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import sendRes from "../../helper/commonResponse.js";

/**
 * @swagger
 * /apiv1/getcomplaintTypeList:
 *   get:
 *     description: get complaint Type List
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server error
 */
export const getcomplaintTypeList = async (req, res) => {
  try {
    const newcomplaint = await complaintType.findAll({
      attributes: ["id", "complaintType"],
      where: { isActive: true ,isDeleted:false},
    });

    if (!newcomplaint) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_FOUR,
        0,
        statusMessage.DATA_NOT_FOUND
      );
    } else {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.OK,
        1,
        sendRes.statusMessage.DATA_GET_FOUND,
        newcomplaint
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

export const createComplaintType= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    const JsonData = JSON.parse(decryptedData);
    const existing = await complaintType.findOne({
      where: { complaintType: JsonData.complaintType ,isActive:true,isDeleted:false},
    });
    
    if (existing) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FOUR_ZERO_SIX,
        0,
        sendRes.statusMessage.DATA_ALREADY_EXISTS
      );
    } else {
      const newcomplaint = await complaintType.create({
        complaintType: JsonData.complaintType,
        createdBy:req.user.id
      });
      
      if (!newcomplaint) {
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
          newcomplaint
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

export const getComplaintTypeId = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newcomplaint = await complaintType.findOne({
      where: {
        id: JsonData,
        isDeleted: false,
        isActive: true,
      },
    });
    if (!newcomplaint) {
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
        newcomplaint
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

export const updateComplaintType= async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.body.body);
    //console.log(decryptedData);
    const JsonData = JSON.parse(decryptedData);
    // console.log(JsonData)
    const newcomplaint = await complaintType.update(
      {
        complaintType: JsonData.complaintType,
        updatedBy:req.user.id
      },
      {
        where: {
          id: JsonData.Id,
        },
      }
    );
    if (!newcomplaint) {
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
        newcomplaint
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

export const deleteComplaintType = async (req, res) => {
  try {
    const decryptedData = await encryptDecrypt.decrypt(req.query.Id);
    const JsonData = JSON.parse(decryptedData);
    const newcomplaint = await complaintType.update(
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
    if (!newcomplaint) {
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
        newcomplaint
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
