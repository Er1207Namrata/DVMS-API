import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getReviewPetition = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
      
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"rp_id":"' +JsonData.id +'","personal_no":"'+JsonData.personalno+'","command_id":"'+JsonData.command+'","fromdate":"' +JsonData.fromdate +'","todate":"' +JsonData.todate +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
         if(req.body.fromdate == "" ||req.body.fromdate == null) {
          obj = '{"rp_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
        else
        {
          obj = '{"rp_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
        }
        }
   // console.log(obj);
      var result = await callprocMenthod.GET(obj,'review_petition_select')
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

  export const createReviewPetition = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let punishmentdate;
      let document;
      let filepath=null;
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          punishmentdate=convertToISO8601(JsonData.punishmentdate);
          if (req.files.documentattchament!=undefined) {
            document = req.files.documentattchament[0].filename;
            filepath = "storage/" + document;
          }

           obj = "{\"personal_no\":\"" + JsonData.personalno + "\",\"rank_name\":\"" + JsonData.rank + "\",\"can_name\":\"" + JsonData.name + "\",\"present_unit\":\"" + JsonData.presentunit + "\",\"comm\":\"" + JsonData.command + "\",\"file_no\":\"" + JsonData.fileno + "\",\"punishment_awarded\":\"" + JsonData.punishmentawarded + "\",\"punishment_date\":\"" + punishmentdate + "\",\"rp_description\":\"" + JsonData.description + "\",\"remedy_sought\":\"" + JsonData.remedysought + "\",\"comments_rec\":\"" + JsonData.commentsrec + "\",\"rp_documents\":\"" + filepath + "\",\"created_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
            if (req.files.documentattchament!=undefined) {
                document = req.files.documentattchament[0].filename;
                filepath = "storage/" + document;
              }
            punishmentdate=convertToISO8601(req.body.punishmentdate);
            obj = "{\"personal_no\":\"" + req.body.personalno + "\",\"comm_rank\":\"" + req.body.rank + "\",\"comm_name\":\"" + req.body.name + "\",\"comm\":\"" + req.body.command + "\",\"present_unit\":\"" + req.body.presentunit + "\",\"personal_branch\":\"" + req.body.branch + "\",\"personal_appointment\":\"" + req.body.appointment + "\",\"commanding_officer\":\"" + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + "\",\"type_of_entry\":\"" + req.body.typeofentry + "\",\"file_no\":\"" + req.body.fileno + "\",\"punishment_awarded\":\"" + req.body.punishmentawarded + "\",\"punishment_date\":\"" + punishmentdate + "\",\"rp_description\":\"" + req.body.description + "\",\"remedy_sought\":\"" + req.body.remedysought + "\",\"comments_rec\":\"" + req.body.commentsrec + "\",\"rp_documents\":\"" + filepath + "\",\"created_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      //console.log(obj)
      var result = await callprocMenthod.POST(obj, 'review_petition_insert')
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

  export const updateReviewPetition = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let punishmentdate;
      let document;
      let filepath=null;
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          punishmentdate=convertToISO8601(JsonData.punishmentdate);
          if (req.files.documentattchament!=undefined) {
            document = req.files.documentattchament[0].filename;
            filepath = "storage/" + document;
          }   
          
           obj = "{\"re_id\":\"" + JsonData.id + "\",\"personal_no\":\"" + JsonData.personalno + "\",\"rank_name\":\"" + JsonData.rank + "\",\"can_name\":\"" + JsonData.name + "\",\"present_unit\":\"" + JsonData.presentunit + "\",\"comm\":\"" + JsonData.command + "\",\"file_no\":\"" + JsonData.fileno + "\",\"punishment_awarded\":\"" + JsonData.punishmentawarded + "\",\"punishment_date\":\"" + punishmentdate + "\",\"rp_description\":\"" + JsonData.description + "\",\"remedy_sought\":\"" + JsonData.remedysought + "\",\"comments_rec\":\"" + JsonData.commentsrec + "\",\"rp_documents\":\"" + filepath + "\",\"updated_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
            if (req.files.documentattchament!=undefined) {
                document = req.files.documentattchament[0].filename;
                filepath = "storage/" + document;
              }
            punishmentdate=convertToISO8601(req.body.punishmentdate);
            obj = "{\"re_id\":\"" + req.body.id + "\",\"personal_no\":\"" + req.body.personalno + "\",\"comm_rank\":\"" + req.body.rank + "\",\"comm_name\":\"" + req.body.name + "\",\"comm\":\"" + req.body.command + "\",\"present_unit\":\"" + req.body.presentunit + "\",\"personal_branch\":\"" + req.body.branch + "\",\"personal_appointment\":\"" + req.body.appointment + "\",\"commanding_officer\":\"" + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + "\",\"type_of_entry\":\"" + req.body.typeofentry + "\",\"file_no\":\"" + req.body.fileno + "\",\"punishment_awarded\":\"" + req.body.punishmentawarded + "\",\"punishment_date\":\"" + punishmentdate + "\",\"rp_description\":\"" + req.body.description + "\",\"remedy_sought\":\"" + req.body.remedysought + "\",\"comments_rec\":\"" + req.body.commentsrec + "\",\"rp_documents\":\"" + filepath + "\",\"updated_by\":\""+req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      //console.log(obj)
      var result = await callprocMenthod.POST(obj, 'review_petition_update')
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

  export const getReviewPetitionById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"rp_id":"' +JsonData +'","personal_no":null,"cd_rank":null,"cs_name":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"rp_id":"' +req.query.id +'","personal_no":"'+''+'","command_id":"'+0+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+10+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'review_petition_select')
     // console.log(result);
      if (!result) {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_NOT_FOUND);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_NOT_FOUND);
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

  export const deleteReviewPetition = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        const statusCode=0;
        const message='';
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"re_id":"' +JsonData +'","deleted_by":"'+req.user.id+'","status":"'+statusCode+'","message":"' +message +'"}';
                    
        }else{ 
          obj = '{"re_id":"' +req.query.id +'","deleted_by":"'+req.user.id+'","status":"'+statusCode+'","message":"' +message +'"}';
                              
        }
      
   
      var result = await callprocMenthod.POST(obj,'review_petition_delete')
      console.log(result);
      if (!result[0].status=='0') {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
          }
      } else {
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 0, result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
          }
      }
    
    } catch (error) {
       console.log(error)
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

  export const approvedeclinereview = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        
        let statusCode=0;
        let message='';
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
                    obj = '{"rp_id":"' +JsonData.id +'","remark":"' +JsonData.remark +'","dps_status":"'+JsonData.status+'","app_deci_by":"'+JsonData.req.user.id+'","status":"'+statusCode+'","message":"'+message+'"}';
        }else{ 
         
          obj = '{"main_id":"' +req.body.id +'","formremark":"' +req.body.remark +'","emp_status":"'+req.body.status+'","app_deci_by":"'+req.user.id+'","dependent_id":"'+req.body.dependentid+'","status":"'+statusCode+'","message":"'+message+'"}';
                
        }
      
       //console.log(obj)
      var result = await callprocMenthod.POST(obj,'review_petition_app_dec')
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

  export const getReviewPetitionActivity = async (req, res) => {
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
      var result = await callprocMenthod.GET(obj, "review_petition_activity");
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