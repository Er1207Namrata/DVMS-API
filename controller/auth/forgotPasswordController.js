import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";

export const forgotpassword = async (req, res) => {
 // console.log(req.user.loginId);
  const headerValue = req.header("isUAT");
    try {
      let obj;
      const statusCode = 0;
      const message = "";
      console.log(req.user.loginId);
      if(headerValue == 0){
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
       
        obj =
        '{"login_id":"' +
        req.user.loginId +
        '","user_Password":"' +
        JsonData.UserPassword +
        '","message":"' +
        message +
        '","status":"' +
        statusCode +
        '"}';
     
      }else{
        obj =
        '{"login_id":"' +
        req.user.loginId +
        '","user_password":"' +
        req.body.UserPassword +
        '","message":"' +
        message +
        '","status":"' +
        statusCode +
        '"}';
    
      }
      console.log(obj);
      var result = await callprocMenthod.POST(obj, "forgot_password");
      console.log(result);
      if (result[0].status == "0") {
        if(headerValue==0)
          {
            await sendRes.sendResponse(
              res,
              sendRes.statusCode.FOUR_ZERO_ZERO,
              0,
              sendRes.statusMessage.FAILD_CREATE
            );
          }
          else{
            await sendRes.sendResponseUat(
              res,
              sendRes.statusCode.FOUR_ZERO_ZERO,
              0,
              sendRes.statusMessage.OLD_PASS
            );
          }
        
      } else {
        if(headerValue==0)
          {
            await sendRes.sendResponse(
              res,
              sendRes.statusCode.OK,
              1,
              result[0].message
            );
          }
          else
          {
            await sendRes.sendResponseUat(
              res,
              sendRes.statusCode.OK,
              1,
              result[0].message
              
            );
          }
        
      }
    } catch (error) {
      console.log(error);
      if(headerValue==0)
        {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FIVE_ZERO_ZERO,
            0,
            error
          );
        }
        else
        {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.FIVE_ZERO_ZERO,
            0,
            error
          );
        }
    }
  };