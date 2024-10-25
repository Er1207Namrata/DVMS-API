import callprocMenthod from '../config/callProcedure.js';
import sendRes from '../helper/commonResponse.js';
import encryptDecrypt from '../helper/encrypt-decrypt.js'


  export const userRegistration = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      let obj;
      const statusCode=0;
      const message='';
      let createdBy;
      if(req.user==undefined)
      {
        createdBy=0;
      }
      else
      {
        createdBy =req.user.id;
      }
      const Password='';
      const loginId='';
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
            obj = "{\"usertypeid\":\"" + JsonData.usertypeid + "\",\"name\":\"" + JsonData.name + "\",\"email_id\":\"" + JsonData.emailid + "\",\"address\":\"" + JsonData.address + "\",\"pincode\":\"" + JsonData.pincode + "\",\"mobile_no\":\"" + JsonData.mobileno + "\",\"state_id\":\"" + JsonData.stateid + "\",\"city_id\":\"" + JsonData.cityid + "\",\"personal_no\":\"" +JsonData.personalno + "\",\"command_id\":\"" + JsonData.commandid + "\",\"p_unit\":\"" + JsonData.unit + "\",\"p_rank\":\"" + JsonData.rank + "\",\"createdBy\":\""+createdBy+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\",\"pass\":\""+Password+"\",\"Login_Id\":\""+loginId+"\"}";
        }
      else{
        obj = "{\"usertypeid\":\"" + req.body.usertypeid + "\",\"name\":\"" + req.body.name + "\",\"email_id\":\"" + req.body.emailid + "\",\"address\":\"" + req.body.address + "\",\"pincode\":\"" + req.body.pincode + "\",\"mobile_no\":\"" + req.body.mobileno + "\",\"state_id\":\"" + req.body.stateid + "\",\"city_id\":\"" + req.body.cityid + "\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.commandid + "\",\"p_unit\":\"" + req.body.unit + "\",\"p_rank\":\"" + req.body.rank + "\",\"createdBy\":\""+createdBy+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\",\"pass\":\""+Password+"\",\"Login_Id\":\""+loginId+"\"}";
      }
     
      var result = await callprocMenthod.POST(obj, 'user_registration')
      if (result[0].status=='0') {
        if(headerValue==0)
          {
           await sendRes.sendResponse(res, sendRes.statusCode.OK, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 0,result[0].message);
          }
      } else {
        if(headerValue==0)
          {
            await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result);
          }
          else
          {
            await sendRes.sendResponseUatRegistration(res, sendRes.statusCode.OK, 1, result[0].message,result[0].login_id,result[0].pass,);
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

  export const getuserRegistration = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
     
      if(headerValue==0)
        {
           const decryptData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptData);
           obj = "{\"ip_id\":\"" +JsonData.id+"\",\"page\":\""+ JsonData.page+"\",\"size\":\""+JsonData.size+"\"}";
          
        }
     else
     {
      obj = "{\"ip_id\":\"" +req.body.id+"\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
          
     }
      
      var result = await callprocMenthod.GET(obj,'get_user_registration')
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
       //console.log(error)
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

  export const getuserRegistrationById = async (req, res) => {
    
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      
      if(headerValue==0)
        {
           const decryptdata = await encryptDecrypt.decrypt(req.query.id);
           const jsonData=JSON.parse(decryptdata);
           obj = "{\"ai_id\":\"" +jsonData+"\",\"page\":\""+ 1+"\",\"size\":\""+30+"\"}";
           
        }
     else
     {
      obj = "{\"ai_id\":\"" +req.query.id+"\",\"page\":\""+ 1+"\",\"size\":\""+30+"\"}";
      
     }
      
     // console.log(obj)
      var result = await callprocMenthod.GET(obj,'get_user_registration')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
          }
      }
    
    } catch (error) {
       //console.log(error)
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

  export const deleteuserRegistration = async (req, res) => {
    const headerValue = req.header("isUAT");   
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.query.body);
          const JsonData = JSON.parse(decryptedData);
          obj = "{\"user_id\":\"" +JsonData+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
          obj = "{\"user_id\":\"" +req.query.id+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      
      var result = await callprocMenthod.POST(obj, 'user_Registration_delete')
      //console.log(result);
      if (result[0].status=='0') {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
          }
      } else {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
          }
      }
    
    } catch (error) {
      // console.log(error)
       if(headerValue==0)
        {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
    }
  };

  export const userRegistrationUpdate = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      let obj;
      const statusCode=0;
      const message='';
      const updatedby =1;
      const Password='';
      const loginId='';
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
            obj = "{\"user_id\":\"" + req.body.id + "\",\"usertype_id\":\"" + JsonData.usertypeid + "\",\"uer_name\":\"" + JsonData.name + "\",\"email_id\":\"" + JsonData.email_id + "\",\"user_address\":\"" + JsonData.address + "\",\"pin_code\":\"" + JsonData.pincode + "\",\"mobile_no\":\"" + JsonData.mobileno + "\",\"state_id\":\"" + JsonData.stateid + "\",\"city_id\":\"" + JsonData.cityid + "\",\"updated_by\":\""+updatedby+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\"}";
        }
      else{
        obj = "{\"user_id\":\"" + req.body.id + "\",\"usertype_id\":\"" + req.body.usertypeid + "\",\"uer_name\":\"" + req.body.name + "\",\"email_id\":\"" + req.body.email_id + "\",\"user_address\":\"" + req.body.address + "\",\"pin_code\":\"" + req.body.pincode + "\",\"mobile_no\":\"" + req.body.mobileno + "\",\"state_id\":\"" + req.body.stateid + "\",\"city_id\":\"" + req.body.cityid + "\",\"updated_by\":\""+updatedby+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\"}";
      }
     
      var result = await callprocMenthod.POST(obj, 'user_registration_update')
      if (result[0].status == "0") {
        if(headerValue==0)
          {
            await sendRes.sendResponse(
              res,
              sendRes.statusCode.FOUR_ZERO_ZERO,
              0,
              sendRes.statusMessage.NOT_UPDATE
            );
          }
          else{
            await sendRes.sendResponseUat(
              res,
              sendRes.statusCode.FOUR_ZERO_ZERO,
              0,
              sendRes.statusMessage.NOT_UPDATE
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