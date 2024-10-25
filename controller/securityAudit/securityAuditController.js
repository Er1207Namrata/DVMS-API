import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getSecurityAudit= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"sa_id":"' +JsonData.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
         let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
      if (req.body.fromdate == "" ||req.body.fromdate == null) {
          obj = '{"sa_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
        else
        {
          obj = '{"sa_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
        }
        }
   
      var result = await callprocMenthod.GET(obj,'security_audit_select')
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

  export const getSecurityAuditById= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"sa_id":"' +JsonData +'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"s_id":"' +req.query.id +'","created_by":"' +req.user.id +'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'security_audit_selectbyid')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].security_audit_selectbyid);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].security_audit_selectbyid);
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


  export const createSecurityAudit= async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let dateaudit;
      const statusCode = 0;
      const message = "";
      
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        dateaudit=convertToISO8601(JsonData.dateofaudit);
        obj = '{"personal_no":"' + JsonData.personalno + '","sq_unit":"' + JsonData.unit + '","comm":"' + JsonData.command + '","board_president":"' + JsonData.boardpresident + '","date_audit":"' + dateaudit + '","member_1":"' + JsonData.member1 + '","member_2":"' + JsonData.member2 + '","member_3":"' + JsonData.member3 + '","threat_id":"' + JsonData.threatassessmentid + '","perimeter_protection_id":"' + JsonData.perimeterprotectionid + '","watch_id":"' + JsonData.watchtowersid + '","perimeter_lighting_id":"' + JsonData.perimeterbufferzoneid + '","perimeter_road_id":"' + JsonData.perimeterroadid + '","electronic_id":"' + JsonData.electronicmonitoringid + '","drone_id":"' + JsonData.dronedetectionid + '","access_control_id":"' + JsonData.accesscontrolid + '","vital_areas_id":"' + JsonData.vitalareasid + '","layered_defence":"' + JsonData.layereddefenceid + '","training_status":"' + JsonData.trainingstatusid + '","command_id":"' + JsonData.commandcontrolid + '","patrolling_id":"' + JsonData.patrollingid + '","sop_id":"' + JsonData.sopid + '","liaison_id":"' + JsonData.liaisonobservationid + '","range_training_id":"' + JsonData.rangetrainingid + '","dog_squad_id":"' + JsonData.dogsquadid + '","security_equipment_id":"' + JsonData.securityequipmentid + '","overall_assessment_id":"' + JsonData.overallassessmentid + '","reasons_unsat":"' + JsonData.reasonsunsat + '","following_attention":"' + JsonData.followingissuesmerit + '","following_noteworthy":"' + JsonData.followingnoteworthy + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
       
      } else {
        dateaudit=convertToISO8601(req.body.date_of_audit);
       
        obj = {personal_no:req.body.personalno ,comm_rank:req.body.rank, comm_name: req.body.name ,comm:req.body.command ,present_unit :req.body.presentunit ,personal_branch : req.body.branch ,personal_appointment: req.body.appointment ,commanding_officer: req.body.commandingofficer,type_of_entry : req.body.typeofentry ,board_president: JSON.stringify(req.body.board_president_list) ,date_audit:dateaudit ,board_member: JSON.stringify(req.body.board_member_list) ,threat_id: req.body.threatassessmentid ,perimeter_protection_id:req.body.perimeterprotectionid ,watch_id: req.body.watchtowersid ,perimeter_lighting_id:req.body.perimeterbufferzoneid ,perimeter_road_id: req.body.perimeterroadid ,electronic_id:req.body.electronicmonitoringid ,drone_id: req.body.dronedetectionid ,access_control_id: req.body.accesscontrolid ,vital_areas_id: req.body.vitalareasid ,layered_defence: req.body.layereddefenceid ,training_status: req.body.trainingstatusid ,command_id:req.body.commandcontrolid ,patrolling_id: req.body.patrollingid ,sop_id: req.body.sopid ,liaison_id: req.body.liaisonobservationid ,range_training_id: req.body.rangetrainingid ,dog_squad_id: req.body.dogsquadid ,security_equipment_id: req.body.securityequipmentid ,overall_assessment_id: req.body.overallassessmentid ,reasons_unsat: JSON.stringify(req.body.unsa_to_servation_list ),following_attention: req.body.issues_merit_attention_remarks ,following_noteworthy: req.body.noteworthy_remarks ,created_by: req.user.id ,status: statusCode ,message: message }
      }
      //console.log(obj);
      var result = await callprocMenthod.POSTXML(obj, 'security_audit_insert');
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

  export const updateSecurityAudit= async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let dateaudit;
      const statusCode = 0;
      const message = "";
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        dateaudit=convertToISO8601(JsonData.dateofaudit);
        obj = '{"sa_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","sq_unit":"' + JsonData.rank + '","comm":"' + JsonData.name + '","board_president":"' + JsonData.boardpresident + '","date_audit":"' + dateaudit + '","member_1":"' + JsonData.member1 + '","member_2":"' + JsonData.member2 + '","member_3":"' + JsonData.member3 + '","threat_id":"' + JsonData.threatassessmentid + '","perimeter_protection_id":"' + JsonData.perimeterprotectionid + '","watch_id":"' + JsonData.watchtowersid + '","perimeter_lighting_id":"' + JsonData.perimeterbufferzoneid + '","perimeter_road_id":"' + JsonData.perimeterroadid + '","electronic_id":"' + JsonData.electronicmonitoringid + '","drone_id":"' + JsonData.dronedetectionid + '","access_control_id":"' + JsonData.accesscontrolid + '","vital_areas_id":"' + JsonData.vitalareasid + '","layered_defence":"' + JsonData.layereddefenceid + '","training_status":"' + JsonData.trainingstatusid + '","command_id":"' + JsonData.commandcontrolid + '","patrolling_id":"' + JsonData.patrollingid + '","sop_id":"' + JsonData.sopid + '","liaison_id":"' + JsonData.liaisonobservationid + '","range_training_id":"' + JsonData.rangetrainingid + '","dog_squad_id":"' + JsonData.dogsquadid + '","security_equipment_id":"' + JsonData.securityequipmentid + '","overall_assessment_id":"' + JsonData.overallassessmentid + '","reasons_unsat":"' + JsonData.reasonsunsat + '","following_attention":"' + JsonData.followingissuesmerit + '","following_noteworthy":"' + JsonData.followingnoteworthy + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
       
      } else {
        dateaudit=convertToISO8601(req.body.date_of_audit);
       
        obj = {sa_id: req.body.id ,personal_no:req.body.personalno ,comm_rank:req.body.rank, comm_name: req.body.name ,comm:req.body.command ,present_unit :req.body.presentunit ,personal_branch : req.body.branch ,personal_appointment: req.body.appointment ,commanding_officer: req.body.commandingofficer,type_of_entry : req.body.typeofentry ,board_president: JSON.stringify(req.body.board_president_list) ,date_audit:dateaudit ,board_member: JSON.stringify(req.body.board_member_list) ,threat_id: req.body.threatassessmentid ,perimeter_protection_id:req.body.perimeterprotectionid ,watch_id: req.body.watchtowersid ,perimeter_lighting_id:req.body.perimeterbufferzoneid ,perimeter_road_id: req.body.perimeterroadid ,electronic_id:req.body.electronicmonitoringid ,drone_id: req.body.dronedetectionid ,access_control_id: req.body.accesscontrolid ,vital_areas_id: req.body.vitalareasid ,layered_defence: req.body.layereddefenceid ,training_status: req.body.trainingstatusid ,command_id:req.body.commandcontrolid ,patrolling_id: req.body.patrollingid ,sop_id: req.body.sopid ,liaison_id: req.body.liaisonobservationid ,range_training_id: req.body.rangetrainingid ,dog_squad_id: req.body.dogsquadid ,security_equipment_id: req.body.securityequipmentid ,overall_assessment_id: req.body.overallassessmentid ,reasons_unsat: JSON.stringify(req.body.unsa_to_servation_list ),following_attention: req.body.issues_merit_attention_remarks ,following_noteworthy: req.body.noteworthy_remarks,updated_by:req.user.id ,status: statusCode ,message: message }
      }
      var result = await callprocMenthod.POSTXML(obj, 'security_audit_update');
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

  export const deleteSecurityAudit = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"sa_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"sa_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'security_audit_delete')
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

  export const securityAuditapprovedecline= async (req, res) => {
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
      var result = await callprocMenthod.POST(obj,'security_audit_app_dec')
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

  export const updateSecurityAuditRemark= async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let dateaudit;
      const statusCode = 0;
      const message = "";
      
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        
        obj = '';
       
      } else {
        
       
        obj = {sa_id: req.body.security_audit_report_id,reminder_days:req.body.reminderdays ,issue_meriting_attention:JSON.stringify(req.body.issue_meriting_attention_rows) ,observations_json:JSON.stringify(req.body.observations_rows),updated_by:req.user.id ,status: statusCode ,message: message }
      }
      var result = await callprocMenthod.POSTXML(obj, 'security_audit_remark_update');
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