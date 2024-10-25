import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getCourtCase = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"cc_id":"' +JsonData.id +'","court_id":"'+JsonData.courtid+'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else
        { 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
          if(req.body.fromdate == "" ||req.body.fromdate == null) 
          {
            obj = '{"cc_id":"' +req.body.id +'","court_id":"'+req.body.courtid+'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","c_status":"'+req.body.status+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
          }
          else
          {
            obj = '{"cc_id":"' +req.body.id +'","court_id":"'+req.body.courtid+'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","c_status":"'+req.body.status+'","fromdate":"'+fromdate+'","todate":"'+todate+'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
          }
        }
          
      var result = await callprocMenthod.GET(obj,'court_case_select')
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

  export const createCourtCase = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let firattachmentfilepath=null;
      let copyfilepath=null;
      let commentfilepath=null;
      let copyattachment;
      let commentsattachment;
      let firattachment;
      const statusCode = 0;
      const message = "";
      if (req.files.firattachment != undefined) {
        firattachment = req.files.firattachment[0].filename;
        firattachmentfilepath = 'storage/' + firattachment;
      }
      if (req.files.copyattachment != undefined) {
        copyattachment = req.files.copyattachment[0].filename;
        copyfilepath = 'storage/' + copyattachment;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentfilepath = 'storage/' + commentsattachment;
      }
      
      
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","case_subject":"' + JsonData.subject + '","party_1":"' + JsonData.party1 + '","party_2":"' + JsonData.party2 + '","fir_details":"' + JsonData.firdetail + '","fir_attachment":"' + firattachmentfilepath + '","court_id":"' + JsonData.courtid + '","jurisdiction_court":"' + JsonData.jurisdictionofthecourt + '","comments_recomm":"' + JsonData.comments + '","comments_recomm_attachment":"' + commentfilepath + '","court_status":"' + JsonData.status + '","status_comment":"' + JsonData.statuscomment + '","case_judgement":"' + JsonData.judgement + '","copy_attachment":"' + copyfilepath + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        obj = '{"personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","file_no":"' + req.body.fileno + '","case_subject":"' + req.body.subject + '","party_1":"' + req.body.party1 + '","party_2":"' + req.body.party2 + '","fir_details":"' + req.body.firdetail + '","fir_attachment":"' + firattachmentfilepath + '","court_id":"' + req.body.courtid + '","jurisdiction_court":"' + req.body.jurisdictionofthecourt + '","comments_recomm":"' + req.body.comments + '","comments_recomm_attachment":"' + commentfilepath + '","court_status":"' + req.body.status + '","status_comment":"' + req.body.statuscomment + '","case_judgement":"' + req.body.judgement + '","copy_attachment":"' + copyfilepath + '","commanding_officer":"' + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'court_case_insert');
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
     // console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const getCourtCaseById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"cc_id":"' +JsonData.id +'","court_id":"'+0+'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"cc_id":"' +req.query.id +'","court_id":"'+0+'","personal_no":"'+''+'","command_id":"'+0+'","c_status":"'+''+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+30+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'court_case_select')
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

  export const updateCourtCase = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let firattachmentfilepath=null;
      let copyfilepath=null;
      let commentfilepath=null;
      let copyattachment;
      let commentsattachment;
      let firattachment;
      const statusCode = 0;
      const message = "";
      if (req.files.firattachment != undefined) {
        firattachment = req.files.firattachment[0].filename;
        firattachmentfilepath = 'storage/' + firattachment;
      }
      if (req.files.copyattachment != undefined) {
        copyattachment = req.files.copyattachment[0].filename;
        copyfilepath = 'storage/' + copyattachment;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentfilepath = 'storage/' + commentsattachment;
      }
      
      
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        
        obj = '{"cc_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","case_subject":"' + JsonData.subject + '","party_1":"' + JsonData.party1 + '","party_2":"' + JsonData.party2 + '","fir_details":"' + JsonData.firdetail + '","fir_attachment":"' + firattachmentfilepath + '","court_id":"' + JsonData.courtid + '","jurisdiction_court":"' + JsonData.jurisdictionofthecourt + '","comments_recomm":"' + JsonData.comments + '","comments_recomm_attachment":"' + commentfilepath + '","court_status":"' + JsonData.status + '","status_comment":"' + JsonData.statuscomment + '","case_judgement":"' + JsonData.judgement + '","copy_attachment":"' + copyfilepath + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        obj = '{"cc_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","file_no":"' + req.body.fileno + '","case_subject":"' + req.body.subject + '","party_1":"' + req.body.party1 + '","party_2":"' + req.body.party2 + '","fir_details":"' + req.body.firdetail + '","fir_attachment":"' + firattachmentfilepath + '","court_id":"' + req.body.courtid + '","jurisdiction_court":"' + req.body.jurisdictionofthecourt + '","comments_recomm":"' + req.body.comments + '","comments_recomm_attachment":"' + commentfilepath + '","court_status":"' + req.body.status + '","status_comment":"' + req.body.statuscomment + '","case_judgement":"' + req.body.judgement + '","copy_attachment":"' + copyfilepath + '","commanding_officer":"' + (req.body.commanding_officer==undefined?0:req.body.commanding_officer) + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'court_case_update');
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
     // console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const deleteCourtCase = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"cc_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"cc_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'court_case_delete')
     // console.log(result);
      if (result[0].status == '0') {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
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
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const approvedeclineCourtCase = async (req, res) => {
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
         
          obj = '{"court_id":"' +req.body.id +'","formremark":"' +req.body.remark +'","emp_status":"'+req.body.status+'","app_deci_by":"'+req.user.id+'","dependent_id":"'+req.body.dependentid+'","status":"'+statusCode+'","message":"'+message+'"}';
                
        }
      
       //console.log(obj)
      var result = await callprocMenthod.POST(obj,'court_criminal_app_dec')
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

  export const getCourtCaseActivity = async (req, res) => {
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
      var result = await callprocMenthod.GET(obj, "court_case_activity");
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