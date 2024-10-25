import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getPunishmentReturn= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"p_id":"' +JsonData.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
         let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
      if (req.body.fromdate == "" ||req.body.fromdate == null) {
          obj = '{"p_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","p_unit":"'+req.body.unit+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
      else
      {
        obj = '{"p_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","p_unit":"'+req.body.unit+'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
      }
      }
      var result = await callprocMenthod.GET(obj,'punishment_return_select')
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
  export const getPunishmentReturnById= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"p_id":"' +JsonData +'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"p_id":"' +req.query.id +'","personal_no":"'+''+'","p_unit":"'+''+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+30+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'punishment_return_select')
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
     //  console.log(error)
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


  export const createPunishmentReturn= async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let quarterending;
      const statusCode = 0;
      const message = "";
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        quarterending=convertToISO8601(JsonData.quarterending);
        obj = '{"personal_no":"' + JsonData.personalno + '","sq_unit":"' + JsonData.unit + '","quarte_rending":"' +quarterending + '","warrant_punishment":"' + JsonData.warrantpunishment + '","pun_desertion":"' + JsonData.desertion + '","improper_absence":"' + JsonData.improperabsence + '","insubordinati_onincluding":"' + JsonData.insubordinationincluding + '","other_offences":"' + JsonData.otheroffences + '","pun_total":"' + JsonData.total + '","imp_risonment":"' + JsonData.imprisonment + '","pun_detention":"' + JsonData.detention + '","dismissalnaval_service":"' + JsonData.dismissalnavalservice + '","pun_disrating":"' + JsonData.disrating + '","finerespectcivil_offence":"' + JsonData.finerespectciviloffence + '","reduction_conduct":"' + JsonData.reductionconduct + '","deprivation_conductmedalbadges":"' + JsonData.deprivationconductmedalbadges + '","command_ingofficer":"' + JsonData.commandingofficer + '","is_checkbox":"' + JsonData.ischeckbox + '","command_headquater":"' + JsonData.commandheadquater + '","pun_nhq":"' + JsonData.nhq + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
       
      } else {
        quarterending=convertToISO8601(req.body.quarterending);
        obj = '{"personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","quarte_rending":"' +quarterending + '","warrant_punishment":"' + req.body.warrantpunishment + '","pun_desertion":"' + req.body.desertion + '","improper_absence":"' + req.body.improperabsence + '","insubordinati_onincluding":"' + req.body.insubordinationincluding + '","other_offences":"' + req.body.otheroffences + '","pun_total":"' + req.body.total + '","imp_risonment":"' + req.body.imprisonment + '","pun_detention":"' + req.body.detention + '","dismissalnaval_service":"' + req.body.dismissalnavalservice + '","pun_disrating":"' + req.body.disrating + '","finerespectcivil_offence":"' + req.body.finerespectciviloffence + '","reduction_conduct":"' + req.body.reductionconduct + '","deprivation_conductmedalbadges":"' + req.body.deprivationconductmedalbadges + '","commanding_officer":"' + req.body.commandingofficer + '","is_checkbox":"' + req.body.ischeckbox + '","command_headquater":"' + req.body.commandheadquater + '","pun_nhq":"' + req.body.nhq + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'punishment_return_insert');
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
     console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const updatePunishmentReturn= async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let quarterending;
      const statusCode = 0;
      const message = "";
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        quarterending=convertToISO8601(JsonData.quarterending);
        obj = '{"p_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","sq_unit":"' + JsonData.unit + '","quarte_rending":"' +quarterending + '","warrant_punishment":"' + JsonData.warrantpunishment + '","pun_desertion":"' + JsonData.desertion + '","improper_absence":"' + JsonData.improperabsence + '","insubordinati_onincluding":"' + JsonData.insubordinationincluding + '","other_offences":"' + JsonData.otheroffences + '","pun_total":"' + JsonData.total + '","imp_risonment":"' + JsonData.imprisonment + '","pun_detention":"' + JsonData.detention + '","dismissalnaval_service":"' + JsonData.dismissalnavalservice + '","pun_disrating":"' + JsonData.disrating + '","finerespectcivil_offence":"' + JsonData.finerespectciviloffence + '","reduction_conduct":"' + JsonData.reductionconduct + '","deprivation_conductmedalbadges":"' + JsonData.deprivationconductmedalbadges + '","command_ingofficer":"' + JsonData.commandingofficer + '","is_checkbox":"' + JsonData.ischeckbox + '","command_headquater":"' + JsonData.commandheadquater + '","pun_nhq":"' + JsonData.nhq + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
       
      } else {
        quarterending=convertToISO8601(req.body.quarterending);
        obj = '{"p_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","personal_name":"' + req.body.name + '","personal_rank":"' + req.body.rank + '","personal_branch":"' + req.body.branch + '","personal_command":"' + req.body.command + '","personal_appointment":"' + req.body.appointment + '","type_of_entry":"' + req.body.typeofentry + '","present_unit":"' + req.body.presentunit + '","quarte_rending":"' +quarterending + '","warrant_punishment":"' + req.body.warrantpunishment + '","pun_desertion":"' + req.body.desertion + '","improper_absence":"' + req.body.improperabsence + '","insubordinati_onincluding":"' + req.body.insubordinationincluding + '","other_offences":"' + req.body.otheroffences + '","pun_total":"' + req.body.total + '","imp_risonment":"' + req.body.imprisonment + '","pun_detention":"' + req.body.detention + '","dismissalnaval_service":"' + req.body.dismissalnavalservice + '","pun_disrating":"' + req.body.disrating + '","finerespectcivil_offence":"' + req.body.finerespectciviloffence + '","reduction_conduct":"' + req.body.reductionconduct + '","deprivation_conductmedalbadges":"' + req.body.deprivationconductmedalbadges + '","command_ingofficer":"' + req.body.commandingofficer + '","is_checkbox":"' + req.body.ischeckbox + '","command_headquater":"' + req.body.commandheadquater + '","pun_nhq":"' + req.body.nhq + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'punishment_return_update');
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
     //console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const deletePunishmentReturn = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"p_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"p_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'punishment_return_delete')
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


  export const punishreturnapprovedecline= async (req, res) => {
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
      var result = await callprocMenthod.POST(obj,'punishment_return_app_dec')
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