import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getMaintenanceCase= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"mc_id":"' +JsonData.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
         if(req.body.fromdate == "" ||req.body.fromdate == null) {
          obj = '{"mc_id":"' +req.body.id +'","personal_no":"' +req.body.personalno +'","command_id":"'+req.body.command+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
        else
        {
          obj = '{"mc_id":"' +req.body.id +'","personal_no":"' +req.body.personalno +'","command_id":"'+req.body.command+'","fromdate":"'+fromdate+'","todate":"'+todate+'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
        }
        }
   
      var result = await callprocMenthod.GET(obj,'maintenance_cases_select')
      //console.log(result);
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

  export const getMaintenanceCaseById= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"mc_id":"' +JsonData +'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"mc_id":"' +req.query.id +'","personal_no":"' +'' +'","command_id":"'+0+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+30+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'maintenance_cases_select')
      //console.log(result);
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


  export const createMaintenanceCase = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let docattachmentfilepath=null;
      let commentfilepath=null;
      let commentsattachment;
      let docttachment;
      const statusCode = 0;
      const message = "";
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentfilepath = 'storage/' + commentsattachment;
      }
      if (req.files.documentsattachment != undefined) {
        docttachment = req.files.documentsattachment[0].filename;
        docattachmentfilepath = 'storage/' + docttachment;
      }
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","spouse_name":"' + JsonData.spousename + '","amount_sought":"' + JsonData.amountsought + '","main_narrative":"' + JsonData.narrative + '","comments_recc":"' + JsonData.comments + '","comments_recc_attach":"' + commentfilepath + '","document_attch":"' + docattachmentfilepath + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        obj = '{"personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","file_no":"' + req.body.fileno + '","spouse_name":"' + req.body.spousename + '","amount_sought":"' + req.body.amountsought + '","main_narrative":"' + req.body.narrative + '","comments_recc":"' + req.body.comments + '","comments_recc_attach":"' + commentfilepath + '","document_attch":"' + docattachmentfilepath + '","commanding_officer":"' + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'maintenance_cases_insert');
      //console.log(result);
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
     //console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const updateMaintenanceCase = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let docattachmentfilepath=null;
      let commentfilepath=null;
      let commentsattachment;
      let docttachment;
      const statusCode = 0;
      const message = "";
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentfilepath = 'storage/' + commentsattachment;
      }
      if (req.files.documentsattachment != undefined) {
        docttachment = req.files.documentsattachment[0].filename;
        docattachmentfilepath = 'storage/' + docttachment;
      }
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"mc_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","spouse_name":"' + JsonData.spousename + '","amount_sought":"' + JsonData.amountsought + '","main_narrative":"' + JsonData.narrative + '","comments_recc":"' + JsonData.comments + '","comments_recc_attach":"' + commentfilepath + '","document_attch":"' + docattachmentfilepath + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        obj = '{"mc_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","file_no":"' + req.body.fileno + '","spouse_name":"' + req.body.spousename + '","amount_sought":"' + req.body.amountsought + '","main_narrative":"' + req.body.narrative + '","comments_recc":"' + req.body.comments + '","comments_recc_attach":"' + commentfilepath + '","document_attch":"' + docattachmentfilepath + '","commanding_officer":"' + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'maintenance_cases_update');
      //console.log(result);
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
     //console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };
  export const deleteMaintenanceCase = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      const statusCode = 0;
      const message = "";
      
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"mc_id":"' + JsonData + '","deleted_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        obj = '{"mc_id":"' + req.query.id + '","deleted_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'maintenance_cases_delete');
      //console.log(result);
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
     //console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const approvedeclineMaintenanceCase = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        
        let statusCode=0;
        let message='';
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
                    obj = '{"case_id":"' +JsonData.id +'","remark":"' +JsonData.remark +'","case_status":"'+JsonData.status+'","app_deci_by":"'+JsonData.req.user.id+'","status":"'+statusCode+'","message":"'+message+'"}';
        }else{ 
         
          obj = '{"main_id":"' +req.body.id +'","formremark":"' +req.body.remark +'","emp_status":"'+req.body.status+'","app_deci_by":"'+req.user.id+'","dependent_id":"'+req.body.dependentid+'","status":"'+statusCode+'","message":"'+message+'"}';
                
        }
      
       //console.log(obj)
      var result = await callprocMenthod.POST(obj,'maintence_case_app_dec')
     // console.log(result);
      if (result[0].status == "0") {
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

  export const getmaintenancecaseActivity = async (req, res) => {
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
      var result = await callprocMenthod.GET(obj, "maintenance_cases_activity");
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