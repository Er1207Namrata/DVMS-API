
import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';


  export const createDVRecord = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          if(JsonData.disciplinarydetails==undefined)
            {
              JsonData.disciplinarydetails=null;
            }
           obj = "{\"personal_no\":\"" + JsonData.PersonalNo + "\",\"rank_name\":\"" + JsonData.Rank + "\",\"can_name\":\"" + JsonData.name + "\",\"comm\":\"" + JsonData.Command + "\",\"summary_case\":\"" + JsonData.SummaryCase + "\",\"statusdisciplinary_id\":\"" + JsonData.StatusDisciplinaryId + "\",\"disciplinary_details\":\"" + JsonData.disciplinarydetails + "\",\"summaryofdisciplinary_action\":\"" + JsonData.SummaryofDisciplinaryAction + "\",\"created_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
           obj = "{\"personal_no\":\"" + req.body.personalno + "\",\"rank_name\":\"" + req.body.rank + "\",\"can_name\":\"" + req.body.name + "\",\"comm\":\"" + req.body.command + "\",\"personal_branch\":\"" + req.body.branch + "\",\"personal_appointment\":\"" + req.body.appointment + "\",\"present_unit\":\"" + req.body.presentunit + "\",\"type_of_entry\":\"" + req.body.typeofentry + "\",\"summary_case\":\"" + req.body.summarycase + "\",\"statusdisciplinary_id\":\"" + req.body.statusdisciplinaryid + "\",\"disciplinary_details\":\"" + req.body.disciplinarydetails + "\",\"summaryofdisciplinary_action\":\"" + req.body.summaryofdisciplinaryaction + "\",\"command_officer_id\":\""+req.body.commandingofficer+"\",\"created_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      console.log(obj)
      var result = await callprocMenthod.POST(obj, 'dv_insert')
      //console.log(result);
      if (result[0].status=='0') {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
          }
      } else {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1,  result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1,  result[0].message);
          }
      }
    
    } catch (error) {
     // console.log(error)
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

  export const getdvRecord = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
      
      if (headerValue == 0) {
        const decryptdate = await encryptDecrypt.decrypt(req.body.id);
        const JsonData=JSON.parse(decryptdate);
        let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
        let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
        obj = "{\"dv_id\":\"" + JsonData.id + "\",\"personal_no\":\"" + JsonData.personalno + "\",\"command_id\":\"" + JsonData.command + "\",\"status_id\":\"" + JsonData.disciplinarystatusid + "\",\"fromdate\":\"" + fromdate + "\",\"todate\":\"" + todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\"" + JsonData.page + "\",\"size\":\"" + req.body.size + "\"}";
  
      }
      else {
        let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
        let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
       if(req.body.fromdate == "" ||req.body.fromdate == null) {
        obj ='{"dv_id":"' +req.body.id +'","personal_no":"' +req.body.personalno +'","command_id":"' +req.body.command +'","status_id":"' +req.body.disciplinarystatusid +'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"' +req.body.page +'","size":"' +req.body.size +'"}';
        }
        else
        {
          obj ='{"dv_id":"' +req.body.id +'","personal_no":"' +req.body.personalno +'","command_id":"' +req.body.command +'","status_id":"' +req.body.disciplinarystatusid +'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"' +req.body.page +'","size":"' +req.body.size +'"}';
        }
      }
      
      var result = await callprocMenthod.GET(obj, 'dv_select')
      //console.log(result);
      if (!result) {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
        }
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result);
        }
      }
  
    } catch (error) {
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };




  export const updatedvRecord = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
           obj = "{\"dv_id\":\"" + JsonData.id + "\",\"summary_case\":\"" + JsonData.SummaryCase + "\",\"statusdisciplinary_id\":\"" + JsonData.StatusDisciplinaryId + "\",\"summaryofdisciplinary_action\":\"" + JsonData.SummaryofDisciplinaryAction + "\",\"disciplinary_details\":\"" + JsonData.SummaryDisciplinary + "\",\"created_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
           obj = "{\"dv_id\":\"" + req.body.id + "\",\"personal_no\":\"" + req.body.personalno + "\",\"rank_name\":\"" + req.body.rank + "\",\"can_name\":\"" + req.body.name + "\",\"comm\":\"" + req.body.command + "\",\"personal_branch\":\"" + req.body.branch + "\",\"personal_appointment\":\"" + req.body.appointment + "\",\"present_unit\":\"" + req.body.presentunit + "\",\"type_of_entry\":\"" + req.body.typeofentry + "\",\"summary_case\":\"" + req.body.summarycase + "\",\"statusdisciplinary_id\":\"" + req.body.statusdisciplinaryid + "\",\"disciplinary_details\":\"" + req.body.disciplinarydetails + "\",\"summaryofdisciplinary_action\":\"" + req.body.summaryofdisciplinaryaction + "\",\"command_officer_id\":\""+req.body.commandingofficer+"\",\"updated_by\":\""+statusCode+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      
      var result = await callprocMenthod.POST(obj, 'dv_update')
      //console.log(result);
      if (result[0].status=='0') {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 0, result[0].message);
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
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
        }
    }
  };
  export const deletedvRecord = async (req, res) => {
    const headerValue = req.header("isUAT");
    //console.log(headerValue)
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          console.log(decryptedData);
          const JsonData = JSON.parse(decryptedData);
          console.log(JsonData)
           obj = "{\"dv_id\":\"" + JsonData + "\",\"deleted_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
           obj = "{\"dv_id\":\"" + req.query.id + "\",\"deleted_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      console.log(obj)
      var result = await callprocMenthod.POST(obj, 'dv_delete')
      //console.log(result);
      if (result[0].status=='0') {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
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

  export const getdvRecordById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
     
      if(headerValue==0)
        {
          id = await encryptDecrypt.decrypt(req.query.id);
          
        }
        else
        {
          
          obj ='{"dv_id":"' +req.query.id +'","personal_no":"' +'' +'","command_id":0,"status_id":0,"fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"' +1 +'","size":"' +20 +'"}';
         
        }
            
      var result = await callprocMenthod.GET(obj,'dv_select')
     // console.log(result[0]);
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

  export const dvRecordAppDec= async (req, res) => {
    // console.log(req);
     const headerValue = req.header("isUAT");
     
     try {
       const statusCode=0;
       const message='';
       let obj;
       if(headerValue==0)
         {
           const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
           obj = "{\"dv_id\":\"" +JsonData.id+"\",\"formremark\":\""+ JsonData.remark+"\",\"emp_status\":\""+JsonData.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
         else
         {
          obj = "{\"dv_id\":\"" +req.body.id+"\",\"formremark\":\""+ req.body.remark+"\",\"emp_status\":\""+req.body.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"dependent_id\":\"" + req.body.dependentid + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
        //console.log(obj)
       var result = await callprocMenthod.POST(obj, 'dv_app_dec')
       
       if (result[0].status=='0') {
         if(headerValue==0)
           {
         await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
           }
           else
           {
             await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
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

   export const getdvRecordActivity = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
  
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
  
        obj = '{"bo_id":"' + JsonData + '"}';
      } else {
        obj = '{"dv_id":"' + req.query.id + '"}';
      }
  
      //console.log(obj)
      var result = await callprocMenthod.GET(obj, "dv_record_activity");
      //console.log(result);
      if (!result) {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
        }
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result
          );
        }
      }
    } catch (error) {
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      }
    }
  };
   