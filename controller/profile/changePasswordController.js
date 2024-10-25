import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";

export const changepassword = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      
      let obj;
      const statusCode = 0;
      const message = "";
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
         obj =
          '{"login_id":"' +
          "admin" +
          '","current_password":"' +
          JsonData.currentpassword +
          '","new_password":"' +
          JsonData.newpassword +
          '","message":"' +
          message +
          '","status":"' +
          statusCode +
          '"}';
        console.log(obj);
      } else {
       //console.log(req.session.user.LoginId)
         obj =
          '{"login_id":"' +
          req.session.user.LoginId +
          '","current_password":"' +
          req.body.currentpassword +
          '","new_password":"' +
          req.body.newpassword +
          '","message":"' +
          message +
          '","status":"' +
          statusCode +
          '"}';
  
      }
      //console.log(JsonData);
  
      var result = await callprocMenthod.POST(obj, "password_change");
      //oconsole.log(result);
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
      //
     
    }
  };