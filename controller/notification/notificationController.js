import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const getNotification = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      
      if(headerValue==0)
        {
            
            obj = "{\"send_to\":\"" +req.user.id+"\"}";
        }
     else
     {
        obj = "{\"send_to\":\"" +req.user.id+"\"}";
     }
      
      var result = await callprocMenthod.GET(obj,'get_notification')
     // console.log(result);
      if (!result) {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
          }
      } else {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result);
          }
      }
    
    } catch (error) {
       if(headerValue==0)
        {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
    }
  };

  export const updateNotification = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      const statusCode = 0;
        const message = "";
      
      if(headerValue==0)
        {
            
            obj = "{\"noti_id\":\"" +req.body.id+"\"}";
        }
     else
     {
        obj = "{\"noti_id\":\"" +req.body.id+"\",\"status\":\"" +statusCode+"\",\"message\":\"" +message+"\"}";
     }
      
      var result = await callprocMenthod.POST(obj,'notification_update')
     // console.log(result);
     if (result[0].status == "0") {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
        }
  
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
        }
  
      }
    
    } catch (error) {
       if(headerValue==0)
        {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
    }
  };