import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const updateProfile= async(req,res)=>{
    const headerValue = req.header('isUAT');
    try { 
        let obj;
        const statusCode=0;
        const message='';   
       if(headerValue==0)
       {  
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
           
         obj = "{\"login_id\":\"" + JsonData.loginid + "\",\"uer_name\":\"" + JsonData.name + "\",\"user_typeid\":\"" + JsonData.usertypeid + "\",\"mobile_no\":\"" + JsonData.mobileno + "\",\"email_id\":\"" + JsonData.emailid + "\",\"user_address\":\"" + JsonData.address + "\",\"user_stateid\":\"" + JsonData.stateid + "\",\"user_cityid\":\"" + JsonData.cityid + "\",\"user_pincode\":\"" + JsonData.pincode + "\",\"updated_by\":\"" +req.user.id + "\",\"message\":\"" + message + "\",\"status\":\"" + statusCode+ "\"}";
        
       }
       else{       
         obj = "{\"login_id\":\"" + req.body.loginid + "\",\"uer_name\":\"" + req.body.name + "\",\"user_typeid\":\"" + req.body.usertypeid + "\",\"mobile_no\":\"" + req.body.mobileno + "\",\"email_id\":\"" + req.body.emailid + "\",\"user_address\":\"" + req.body.address + "\",\"user_stateid\":\"" + req.body.stateid + "\",\"user_cityid\":\"" + req.body.cityid + "\",\"user_pincode\":\"" + req.body.pincode + "\",\"updated_by\":\"" + req.user.id + "\",\"message\":\"" + message + "\",\"status\":\"" + statusCode+ "\"}";
         console.log(obj);
       }
      var result = await callprocMenthod.POST(obj, 'update_profile')
      console.log(result);
      if (result[0].status=='0') {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_UPDATE);
        }else{
          await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_UPDATE);
        }   
      } 
      else{
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
        }else{          
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
        }
      } 
    } catch (error) {
      console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else{
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }  
  };