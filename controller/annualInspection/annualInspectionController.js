import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from "../../helper/datetimeConverter.js";

export const getannualInspection = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    
    if (headerValue == 0) {
      const decryptdate = await encryptDecrypt.decrypt(req.body.body);
      const JsonData=JSON.parse(decryptdate);
      obj = "{\"ai_id\":\"" + JsonData.id + "\",\"page\":\"" + JsonData.page + "\",\"size\":\"" + JsonData.size + "\"}";

    }
    else {
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
         let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
      if (req.body.fromdate == "" ||req.body.fromdate == null) {
      obj = "{\"ai_id\":\"" + req.body.id + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\"" + req.body.page + "\",\"size\":\"" + req.body.size + "\"}";
    }
    else
    {
      obj = "{\"ai_id\":\"" + req.body.id + "\",\"fromdate\":\"" + fromdate+ "\",\"todate\":\"" + todate+ "\",\"created_by\":\"" + req.user.id + "\",\"page\":\"" + req.body.page + "\",\"size\":\"" + req.body.size + "\"}";
    }
  }
    var result = await callprocMenthod.GET(obj, 'annual_inspection_select')
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
export const getannualInspectionById = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
      
      if (headerValue == 0) {
        const decryptdate = await encryptDecrypt.decrypt(req.query.body);
        const JsonData=JSON.parse(decryptdate);
        obj = "{\"ai_id\":\"" + JsonData + "\",\"page\":\"" + 1 + "\",\"size\":\"" + 30+ "\"}";
  
      }
      else {
        obj = "{\"ai_id\":\"" + req.query.id + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\"" + 1 + "\",\"size\":\"" + 30 + "\"}";
      }
      
      var result = await callprocMenthod.GET(obj, 'annual_inspection_select')
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
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result[0]);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result[0]);
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

  export const createAnnualInspection = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let datelastinspection='01/01/1990';
      const statusCode = 0;
      const message = "";
      
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        datelastinspection = convertToISO8601(JsonData.dateoflastinspection);
        obj = '{"date_lastinspection":"' + datelastinspection + '","no_offenders":"' + JsonData.noofoffenders + '","details_offender":"' + JsonData.detailsofoffender + '","general_efficiency":"' + JsonData.generalefficiency + '","no_staffborne":"' + JsonData.noofstaffborne + '","total_accommodation":"' + JsonData.totalaccommodation + '","daily_averagemen":"' + JsonData.dailyaveragemen + '","general_conductmen":"' + JsonData.generalconductmen + '","daily_routine_indq":"' + JsonData.dailyroutine_indq + '","authorised_scale":"' + JsonData.authorisedscale + '","health_mendetention":"' + JsonData.healthofmendetention + '","journals_accountsorder":"' + JsonData.journalsaccountsorder + '","state_sanitary":"' + JsonData.stateofsanitary + '","precaution_againstfire":"' + JsonData.precautionagainstfire + '","general_remarksindq":"' + JsonData.generalremarksindq + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
        datelastinspection = convertToISO8601(req.body.dateoflastinspection);
         const dd=req.body.detailsofoffender;
        const ddd=JSON.stringify(dd)
       
        obj = {date_lastinspection:datelastinspection ,no_offenders: req.body.noofoffenders, p_name:req.body.name ,p_rank:req.body.rank,p_no:req.body.pno,p_unit:req.body.unit,p_offence:req.body.offence,punishment_award:req.body.punishmentward,general_efficiency: req.body.generalefficiency ,no_staffborne:req.body.noofstaffborne ,total_accommodation:req.body.totalaccommodation ,daily_averagemen: req.body.dailyaveragemen ,general_conductmen: req.body.generalconductmen ,daily_routine_indq: req.body.dailyroutine_indq ,authorised_scale: req.body.authorisedscale,health_mendetention:req.body.healthofmendetention ,journals_accountsorder:req.body.journalsaccountsorder ,state_sanitary: req.body.stateofsanitary ,precaution_againstfire:req.body.precautionagainstfire ,general_remarksindq: req.body.generalremarksindq ,created_by:req.user.id,details_offender:ddd ,status: statusCode ,message:message };
      }
      //console.log(obj)
      //var result = await callprocMenthod.POSTXML(obj, 'annual_inspection_insert');
      var result = await callprocMenthod.POSTOBJECT(obj, 'annual_inspection_insert');
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

  export const updateAnnualInspection = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let datelastinspection='01/01/1990';
      const statusCode = 0;
      const message = "";
      
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        datelastinspection = convertToISO8601(JsonData.dateoflastinspection);
        obj = '{"ai_id":"' + JsonData.id + '","date_lastinspection":"' + datelastinspection + '","no_offenders":"' + JsonData.noofoffenders + '","details_offender":"' + JsonData.detailsofoffender + '","general_efficiency":"' + JsonData.generalefficiency + '","no_staffborne":"' + JsonData.noofstaffborne + '","total_accommodation":"' + JsonData.totalaccommodation + '","daily_averagemen":"' + JsonData.dailyaveragemen + '","general_conductmen":"' + JsonData.generalconductmen + '","daily_routine_indq":"' + JsonData.dailyroutine_indq + '","authorised_scale":"' + JsonData.authorisedscale + '","health_mendetention":"' + JsonData.healthofmendetention + '","journals_accountsorder":"' + JsonData.journalsaccountsorder + '","state_sanitary":"' + JsonData.stateofsanitary + '","precaution_againstfire":"' + JsonData.precautionagainstfire + '","general_remarksindq":"' + JsonData.generalremarksindq + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
  
      } else {
        datelastinspection = convertToISO8601(req.body.dateoflastinspection);
       
        
        obj = {aiid:req.body.id, date_lastinspection:datelastinspection ,no_offenders: req.body.noofoffenders ,p_name:req.body.name ,p_rank:req.body.rank,p_no:req.body.pno,p_unit:req.body.unit,p_offence:req.body.offence,punishment_award:req.body.punishmentward,general_efficiency: req.body.generalefficiency ,no_staffborne:req.body.noofstaffborne ,total_accommodation:req.body.totalaccommodation ,daily_averagemen: req.body.dailyaveragemen ,general_conductmen: req.body.generalconductmen ,daily_routine_indq: req.body.dailyroutine_indq ,authorised_scale: req.body.authorisedscale,health_mendetention:req.body.healthofmendetention ,journals_accountsorder:req.body.journalsaccountsorder ,state_sanitary: req.body.stateofsanitary ,precaution_againstfire:req.body.precautionagainstfire ,general_remarksindq: req.body.generalremarksindq ,created_by:req.user.id ,status: statusCode ,message:message };


      }
      
      var result = await callprocMenthod.POSTXML(obj, 'annual_inspection_update');
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

  export const deleteAnnualInspection = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"ai_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"ai_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'annual_inspection_delete')
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

  export const annualinspectionapprovedecline= async (req, res) => {
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
      var result = await callprocMenthod.POST(obj,'annual_inspection_app_dec')
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