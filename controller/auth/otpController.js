import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const SendOtp = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      console.log(JsonData);
      const statusCode = 0;
      const message = "";
      const obj =
        '{"mobile_no":"' +
        JsonData.MobileNo +
        '","type":"' +
        JsonData.type +
        '","message":"' +
        message +
        '","status":"' +
        statusCode +
        '","otp_no":"' +
        JsonData.otp_no +
        '"}';
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "send_otp");
      console.log(result);
      if (result[0].status == "0") {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.FAILD_CREATE
        );
      } else {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          sendRes.statusMessage.DATA_INSERTED,
          result
        );
      }
    } catch (error) {
      console.log(error);
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        error
      );
    }
  };
  
  export const otpverify = async (req, res) => {
    try {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      console.log(JsonData);
      const statusCode = 0;
      const message = "";
      const obj =
        '{"mobile_no":"' +
        JsonData.MobileNo +
        '","otp_verify":"' +
        JsonData.OtpVerify +
        '","message":"' +
        message +
        '","status":"' +
        statusCode +
        '"}';
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "otp_verify");
      console.log(result);
      if (result[0].status == "0") {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.FAILD_CREATE
        );
      } else {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          sendRes.statusMessage.DATA_INSERTED,
          result
        );
      }
    } catch (error) {
      console.log(error);
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        error
      );
    }
  };