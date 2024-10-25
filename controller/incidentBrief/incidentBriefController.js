import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getIncidentBrief = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"ib_id":"' +JsonData.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
         let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
      if (req.body.fromdate == "" ||req.body.fromdate == null) {
          obj = '{"ib_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","postmorte_id":"' +req.body.postmortemstatusid +'","incidenttype_id":"'+req.body.incidenttypeid+'","outin_living":"'+req.body.out_in_living+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
        else
        {
          obj = '{"ib_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","postmorte_id":"' +req.body.postmortemstatusid +'","incidenttype_id":"'+req.body.incidenttypeid+'","outin_living":"'+req.body.out_in_living+'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
        }
        }
   
      var result = await callprocMenthod.GET(obj,'incident_brief_select')
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

  export const createIncidentBrief = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let mediareportdocfilepath=null;
      let postmortemdocpath=null;
      let narrativedocfilepath=null;
      let narrativedoc;
      let mediareportdoc;
      let postmortemdoc;
      let dateofoccurance;
      const statusCode = 0;
      const message = "";
      if (req.files.postmortemdoc != undefined) {
        postmortemdoc = req.files.postmortemdoc[0].filename;
        postmortemdocpath = 'storage/' + postmortemdoc;
      }
      if (req.files.mediareportdoc != undefined) {
        mediareportdoc = req.files.mediareportdoc[0].filename;
        mediareportdocfilepath = 'storage/' + mediareportdoc;
      }
      if (req.files.narrativedoc != undefined) {
        narrativedoc = req.files.narrativedoc[0].filename;
        narrativedocfilepath = 'storage/' + narrativedoc;
      }
      
      
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
         dateofoccurance = convertToISO8601(JsonData.occurancedate);
        obj = '{"personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","comm_nok":"' + JsonData.nok + '","family_detail":"' + JsonData.familydetails + '","is_punishment":"' + JsonData.ispunishment + '","punishment_any":"' + JsonData.punishment + '","leave_details":"' + JsonData.leavedetails + '","previous_unit":"' + JsonData.previousunit + '","outin_living":"' + JsonData.out_in_living + '","home_address":"' + JsonData.homeaddress + '","incident_type_id":"' + JsonData.incidenttypeid + '","date_occurrence":"' + JsonData.occurancedate + '","fir_case_diary":"' + JsonData.fircasedetails + '","post_mortem_status_id":"' + JsonData.postmortemstatus + '","post_mortem_attachment":"' + postmortemdocpath + '","last_rites":"' + JsonData.lastritesperformed + '","narrative_incident":"' + JsonData.incidentnarrative + '","narative_attachament":"' + narrativedocfilepath + '","action_taken":"' + JsonData.actiontaken + '","present_status":"' + JsonData.presentstatus + '","media_report_attachemnt":"' + mediareportdocfilepath + '","addition_information":"' + JsonData.additionalinfo + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
        dateofoccurance = convertToISO8601(req.body.occurancedate);
        obj = '{"personal_no":"' + req.body.personalno + '","rank_name":"' + req.body.rank + '","can_name":"' + req.body.name + '","comm":"' + req.body.command + '","present_unit":"' + req.body.presentunit + '","comm_nok":"' + req.body.nok + '","personal_appointment":"' + req.body.appointment + '","personal_branch":"' + req.body.branch + '","type_of_entry":"' + req.body.typeofentry + '","family_detail":"' + req.body.familydetails + '","is_punishment":"' + req.body.ispunishment + '","punishment_any":"' + req.body.punishment + '","leave_details":"' + req.body.leavedetails + '","previous_unit":"' + req.body.previousunit + '","outin_living":"' + req.body.out_in_living + '","home_address":"' + req.body.homeaddress + '","incident_type_id":"' + req.body.incidenttypeid + '","date_occurrence":"' + dateofoccurance + '","fir_case_diary":"' + req.body.fircasedetails + '","post_mortem_status_id":"' + req.body.postmortemstatusid + '","post_mortem_attachment":"' + postmortemdocpath + '","last_rites":"' + req.body.lastritesperformed + '","narrative_incident":"' + req.body.incidentnarrative + '","narative_attachament":"' + narrativedocfilepath + '","action_taken":"' + req.body.actiontaken + '","present_status":"' + req.body.presentstatus + '","media_report_attachemnt":"' + mediareportdocfilepath + '","addition_information":"' + req.body.additionalinfo + '","any_others":"' + req.body.anyothers + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'incident_brief_insert');
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

  export const getIncidentBriefById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"ib_id":"' +JsonData.id +'","page":"'+1+'","size":"'+30+'"}';
                    
        }else{ 
          obj = '{"ib_id":"' +req.query.id +'","personal_no":"'+''+'","command_id":"'+0+'","postmorte_id":"' +0 +'","incidenttype_id":"'+0+'","outin_living":"'+''+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+1+'","size":"'+1+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'incident_brief_select')
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

  export const updateIncidentBrief = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
        let obj;
        let mediareportdocfilepath=null;
        let postmortemdocpath=null;
        let narrativedocfilepath=null;
        let narrativedoc;
        let mediareportdoc;
        let postmortemdoc;
        let dateofoccurance;
        const statusCode = 0;
        const message = "";
        if (req.files.postmortemdoc != undefined) {
          postmortemdoc = req.files.postmortemdoc[0].filename;
          postmortemdocpath = 'storage/' + postmortemdoc;
        }
        if (req.files.mediareportdoc != undefined) {
          mediareportdoc = req.files.mediareportdoc[0].filename;
          mediareportdocfilepath = 'storage/' + mediareportdoc;
        }
        if (req.files.narrativedoc != undefined) {
          narrativedoc = req.files.narrativedoc[0].filename;
          narrativedocfilepath = 'storage/' + narrativedoc;
        }
        
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        dateofoccurance = convertToISO8601(JsonData.occurancedate);
        obj = '{"ib_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","comm_nok":"' + JsonData.nok + '","family_detail":"' + JsonData.familydetails + '","is_punishment":"' + JsonData.ispunishment + '","punishment_any":"' + JsonData.punishment + '","leave_details":"' + JsonData.leavedetails + '","previous_unit":"' + JsonData.previousunit + '","outin_living":"' + JsonData.out_in_living + '","home_address":"' + JsonData.homeaddress + '","incident_type_id":"' + JsonData.incidenttypeid + '","date_occurrence":"' + JsonData.occurancedate + '","fir_case_diary":"' + JsonData.fircasedetails + '","post_mortem_status_id":"' + JsonData.postmortemstatusid + '","post_mortem_attachment":"' + postmortemdocpath + '","last_rites":"' + JsonData.lastritesperformed + '","narrative_incident":"' + JsonData.incidentnarrative + '","narative_attachament":"' + narrativedocfilepath + '","action_taken":"' + JsonData.actiontaken + '","present_status":"' + JsonData.presentstatus + '","media_report_attachemnt":"' + mediareportdocfilepath + '","addition_information":"' + JsonData.additionalinfo + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
       
        dateofoccurance = convertToISO8601(req.body.occurancedate);
        obj = '{"ib_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","rank_name":"' + req.body.rank + '","can_name":"' + req.body.name + '","comm":"' + req.body.command + '","present_unit":"' + req.body.presentunit + '","comm_nok":"' + req.body.nok + '","personal_appointment":"' + req.body.appointment + '","personal_branch":"' + req.body.branch + '","type_of_entry":"' + req.body.typeofentry + '","family_detail":"' + req.body.familydetails + '","is_punishment":"' + req.body.ispunishment + '","punishment_any":"' + req.body.punishment + '","leave_details":"' + req.body.leavedetails + '","previous_unit":"' + req.body.previousunit + '","outin_living":"' + req.body.out_in_living + '","home_address":"' + req.body.homeaddress + '","incident_type_id":"' + req.body.incidenttypeid + '","date_occurrence":"' + dateofoccurance + '","fir_case_diary":"' + req.body.fircasedetails + '","post_mortem_status_id":"' + req.body.postmortemstatusid + '","post_mortem_attachment":"' + postmortemdocpath + '","last_rites":"' + req.body.lastritesperformed + '","narrative_incident":"' + req.body.incidentnarrative + '","narative_attachament":"' + narrativedocfilepath + '","action_taken":"' + req.body.actiontaken + '","present_status":"' + req.body.presentstatus + '","media_report_attachemnt":"' + mediareportdocfilepath + '","addition_information":"' + req.body.additionalinfo + '","any_others":"' + req.body.anyothers + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
      }
      var result = await callprocMenthod.POST(obj, 'incident_brief_update');
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

  export const deleteIncidentBrief = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"ib_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"ib_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'incident_brief_delete')
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

  export const incidentBriefapprovedecline= async (req, res) => {
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
      var result = await callprocMenthod.POST(obj,'incident_brief_app_dec')
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