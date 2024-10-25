import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from "../../helper/datetimeConverter.js";

export const getboiomitboi = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;

    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      if (
        JsonData.tocommpncementdate == "" ||
        JsonData.tocommpncementdate == null
      ) {
        obj =
          '{"boi_id":"' +
          JsonData.id +
          '","orderby_id":"' +
          JsonData.orderbyid +
          '","approvalby_id":"' +
          JsonData.approvedbyid +
          '","boi_place":"' +
          JsonData.place +
          '","punish_awarded":"' +
          JsonData.punishmentawarded +
          '","from_commpncementdate":null,"to_commpncementdate":null,"created_by":"' +req.user.id +'","page":"' + 
          JsonData.page +
          '","size":"' +
          JsonData.size +
          '"}';
      } else {
        obj =
          '{"boi_id":"' +
          JsonData.id +
          '","orderby_id":"' +
          JsonData.orderbyid +
          '","approvalby_id":"' +
          JsonData.approvedbyid +
          '","boi_place":"' +
          JsonData.place +
          '","punish_awarded":"' +
          JsonData.punishmentawarded +
          '","from_commpncementdate":"' +
          JsonData.fromcommpncementdate +
          '","to_commpncementdate":"' +
          JsonData.tocommpncementdate +
          '","created_by":"' +req.user.id +'","page":"' +
          JsonData.page +
          '","size":"' +
          JsonData.size +
          '"}';
      }
    } else {
      
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
      let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
      if (
        req.body.fromdate == "" ||req.body.fromdate == null) {
        obj ='{"boi_id":"' +req.body.id +'","orderby_id":"' +req.body.orderbyid +'","approvalby_id":"' +req.body.approvedbyid +'","boi_place":"' +req.body.place +
        '","punish_awarded":"' +req.body.punishmentawarded +'","from_commpncementdate":null,"to_commpncementdate":null,"boi_type":"' +req.body.type +
        '","boi_categoryid":"' +req.body.categoryid +'","typeofincidentid":"' +req.body.typeofincidentid +'","casulity":"' +req.body.iscasulity +
        '","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"' +req.body.page +'","size":"' +req.body.size +'"}';
      } else {
      obj ='{"boi_id":"' +req.body.id +'","orderby_id":"' +req.body.orderbyid +'","approvalby_id":"' +req.body.approvedbyid +'","boi_place":"' +req.body.place +
          '","punish_awarded":"' +req.body.punishmentawarded +'","from_commpncementdate":null,"to_commpncementdate":null,"boi_type":"' +req.body.type +'","boi_categoryid":"' +req.body.categoryid +'","typeofincidentid":"' +req.body.typeofincidentid +
          '","casulity":"' +req.body.iscasulity +'","fromdate":"' +fromdate +'","todate":"' +todate +'","created_by":"' +req.user.id +'","page":"' +req.body.page +'","size":"' +req.body.size +'"}';
      }
    }
   console.log(obj);
    var result = await callprocMenthod.GET(obj, "boi_omi_tboi_select");
    console.log(result);
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
     console.log(error)
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

export const getboiomitboiById = async (req, res) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    let orderbyid = 0;
    let approvedbyid = 0;
    let place = "";
    let punishmentawarded = "";
    let fromcommpncementdate = "";
    let tocommpncementdate = "";
    let page = 1;
    let size = 30;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);
      obj ='{"bo_id":"' +JsonData +'"}';
    } 
    else {
      obj ='{"bo_id":"' +req.query.id +'","viewby":"' +req.user.id  +'"}';
    }

    console.log(obj)
    var result = await callprocMenthod.GET(obj, "boi_omi_tboi_selectById");
    console.log(result);
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
          JSON.parse(result[0].personnelindicted)
        );
      } else {

        var listpersonnelindicted = {};
        listpersonnelindicted = (JSON.parse(result[0].personnelindicted));
        var lstPunishmentawrded = {};
        lstPunishmentawrded = (JSON.parse(result[0].punishmentawardeddetail));



        result[0].punishmentawardeddetail = lstPunishmentawrded;
        result[0].personnelindicted = listpersonnelindicted;

        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.OK,
          1,
          sendRes.statusMessage.DATA_GET_FOUND,
          result[0]
        );
      }
    }
  } catch (error) {
    console.log(error)
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
        error.message
      );
    }
  }
};

export const boiomitboidelete = async (req, res) => {
  // console.log(req);
  const headerValue = req.header("isUAT");

  try {
    const statusCode = 0;
    const message = "";
    let obj;
    if (headerValue == 0) {
      obj =
        '{"bo_id":"' +
        (await encryptDecrypt.decrypt(req.query.id)) +
        '","deleted_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    } else {
      obj =
        '{"bo_id":"' +
        req.query.id +
        '","deleted_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    }

    var result = await callprocMenthod.POST(obj, "boi_omi_tboi_delete");
    console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.NOT_DELETE_DATA
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.NOT_DELETE_DATA
        );
      }
    } else {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message
        );
      } else {
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

export const createBoiOmiTboi = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    let commpdate;
    let punishmentfilepath = null;
    let approvalfilepath = null;
    let narrativefilepath = null;
    let recfilepath = null;
    let findingfilepath = null;
    let mitigatingfilepath = null;
    let convenyingattachamentfilepath = null;
    let approvallatter;
    let punishmentawarded;
    let narrative;
    let findings;
    let recommendation;
    let mitigatingmeasures;
    let convenyingattachament;
    let statusCode = 0;
    let boi_id = 0;
    let message = "";
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      commpdate = convertToISO8601(JsonData.commpncementdate);
      if (req.files != null || req.files != undefined) {
        approvallatter = req.files.approvallatter[0].filename;
        approvalfilepath = "storage/" + approvallatter;
      }
      if (req.files != null || req.files != undefined) {
        punishmentawarded = req.files.punishmentawarded[0].filename;
        punishmentfilepath = "storage/" + punishmentawarded;
      }
      if (req.files != null || req.files != undefined) {
        narrative = req.files.narrative[0].filename;
        narrativefilepath = "storage/" + narrative;
      }
      if (req.files != null || req.files != undefined) {
        findings = req.files.findings[0].filename;
        findingfilepath = "storage/" + findings;
      }
      if (req.files != null || req.files != undefined) {
        recommendation = req.files.recommendation[0].filename;
        recfilepath = "storage/" + recommendation;
      }
      if (req.files != null || req.files != undefined) {
        mitigatingmeasures = req.files.mitigatingmeasures[0].filename;
        mitigatingfilepath = "storage/" + mitigatingmeasures;
      }
      obj =
        '{"boi_subject":"' +
        JsonData.subject +
        '","boi_type":"' +
        JsonData.type +
        '","orderby_id":"' +
        JsonData.orderbyid +
        '","commpncement_date":"' +
        commpdate +
        '","boi_place":"' +
        JsonData.place +
        '","is_casulity":"' +
        JsonData.iscasulity +
        '","casulity_details":"' +
        JsonData.casulitydetail +
        '","boi_narrative":"' +
        narrativefilepath +
        '","boi_findings":"' +
        findingfilepath +
        '","personnel_indicted":"' +
        JsonData.personnelindicted +
        '","recomm":"' +
        recfilepath +
        '","mitigation_measures":"' +
        mitigatingfilepath +
        '","approved_by_id":"' +
        JsonData.approvedbyid +
        '","approval_letter":"' +
        approvalfilepath +
        '","punishment_awarded":"' +
        punishmentfilepath +
        '","punishmentawarded_detail":"' +
        JsonData.punishmentawardeddetail +
        '","created_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    } else {
      //console.log(req.files)
      commpdate = convertToISO8601(req.body.commpncementdate);
      if (req.files.approvallatter != undefined) {
        approvallatter = req.files.approvallatter[0].filename;
        approvalfilepath = "storage/" + approvallatter;
      }
      if (req.files.punishmentawarded != undefined) {
        punishmentawarded = req.files.punishmentawarded[0].filename;
        punishmentfilepath = "storage/" + punishmentawarded;
      }
      if (req.files.narrative != undefined) {
        narrative = req.files.narrative[0].filename;
        narrativefilepath = "storage/" + narrative;
      }
      if (req.files.findings != undefined) {
        findings = req.files.findings[0].filename;
        findingfilepath = "storage/" + findings;
      }
      if (req.files.recommendation != undefined) {
        recommendation = req.files.recommendation[0].filename;
        recfilepath = "storage/" + recommendation;
      }
      if (req.files.mitigatingmeasures != undefined) {
        mitigatingmeasures = req.files.mitigatingmeasures[0].filename;
        mitigatingfilepath = "storage/" + mitigatingmeasures;
      }
      if (req.files.uploadconveyingorder != undefined) {
        convenyingattachament = req.files.uploadconveyingorder[0].filename;
        convenyingattachamentfilepath = "storage/" + convenyingattachament;
      }
      obj = {
        boi_subject: req.body.subject,
        boi_type: req.body.type,
        orderby_id: req.body.orderbyid,
        category_id: req.body.categoryid,
        incident_type_id: req.body.typeofincidentid,
        commpncement_date: commpdate,
        boi_place: req.body.place,
        is_casulity: req.body.iscasulity,
        casulity_details: req.body.detailofcasualty,
        boi_narrative: narrativefilepath,
        boi_findings: findingfilepath,
        personnel_indicted: req.body.personnelindicted,
        recomm: recfilepath,
        mitigation_measures: mitigatingfilepath,
        approved_by_id: req.body.approvedbyid,
        approval_letter: approvalfilepath,
        punishment_awarded: punishmentfilepath,
        punishmentawarded_detail: req.body.punishmentawardeddetail,
        convenying_attachament: convenyingattachamentfilepath,
        board_member: req.body.detailsofboardmembers,
        level: req.body.level,
        bo_id: req.body.id,
        created_by: req.user.id,
        statuscode: statusCode,
        message: message,
        boiid: boi_id
      };
    }

    //(obj)
    var result = await callprocMenthod.POSTXML(obj, "boi_omi_tboi_insert");
    // console.log(result);
    if (result[0].statuscode == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      }
    } else {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message, result[0].boiid
        );
      } else {
        await sendRes.sendResponseUatStep(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message,
          result[0].boiid
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

export const updateBoiOmiTboi = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    let commpdate;
    let punishmentfilepath = null;
    let approvalfilepath = null;
    let narrativefilepath = null;
    let recfilepath = null;
    let findingfilepath = null;
    let mitigatingfilepath = null;
    let approvallatter;
    let punishmentawarded;
    let narrative;
    let findings;
    let recommendation;
    let mitigatingmeasures;
    let statusCode = 0;
    let message = "";
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      commpdate = convertToISO8601(JsonData.commpncementdate);
      if (req.files.approvallatter != undefined) {
        approvallatter = req.files.approvallatter[0].filename;
        approvalfilepath = "storage/" + approvallatter;
      }
      if (req.files.punishmentawarded != undefined) {
        punishmentawarded = req.files.punishmentawarded[0].filename;
        punishmentfilepath = "storage/" + punishmentawarded;
      }
      if (req.files.narrative != undefined) {
        narrative = req.files.narrative[0].filename;
        narrativefilepath = "storage/" + narrative;
      }
      if (req.files.findings != undefined) {
        findings = req.files.findings[0].filename;
        findingfilepath = "storage/" + findings;
      }
      if (req.files.recommendation != undefined) {
        recommendation = req.files.recommendation[0].filename;
        recfilepath = "storage/" + recommendation;
      }
      if (req.files.mitigatingmeasures != undefined) {
        mitigatingmeasures = req.files.mitigatingmeasures[0].filename;
        mitigatingfilepath = "storage/" + mitigatingmeasures;
      }
      obj =
        '{"boi_omi_id":"' +
        JsonData.id +
        '","boi_subject":"' +
        JsonData.subject +
        '","boi_type":"' +
        JsonData.type +
        '","orderby_id":"' +
        JsonData.orderbyid +
        '","commpncement_date":"' +
        commpdate +
        '","boi_place":"' +
        JsonData.place +
        '","is_casulity":"' +
        JsonData.iscasulity +
        '","casulity_details":"' +
        JsonData.casulitydetail +
        '","boi_narrative":"' +
        narrativefilepath +
        '","boi_findings":"' +
        findingfilepath +
        '","personnel_indicted":"' +
        JsonData.personnelindicted +
        '","recomm":"' +
        recfilepath +
        '","mitigation_measures":"' +
        mitigatingfilepath +
        '","approved_by_id":"' +
        JsonData.approvedbyid +
        '","approval_letter":"' +
        approvalfilepath +
        '","punishment_awarded":"' +
        punishmentfilepath +
        '","punishmentawarded_detail":"' +
        JsonData.punishmentawardeddetail +
        '","updated_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    } else {
      // console.log(req.files.approvallatter)
      commpdate = convertToISO8601(req.body.commpncementdate);
      if (req.files.approvallatter != undefined) {
        approvallatter = req.files.approvallatter[0].filename;
        approvalfilepath = "storage/" + approvallatter;
      }
      if (req.files.punishmentawarded != undefined) {
        punishmentawarded = req.files.punishmentawarded[0].filename;
        punishmentfilepath = "storage/" + punishmentawarded;
      }
      if (req.files.narrative != undefined) {
        narrative = req.files.narrative[0].filename;
        narrativefilepath = "storage/" + narrative;
      }
      if (req.files.findings != undefined) {
        findings = req.files.findings[0].filename;
        findingfilepath = "storage/" + findings;
      }
      if (req.files.recommendation != undefined) {
        recommendation = req.files.recommendation[0].filename;
        recfilepath = "storage/" + recommendation;
      }
      if (req.files.mitigatingmeasures != undefined) {
        mitigatingmeasures = req.files.mitigatingmeasures[0].filename;
        mitigatingfilepath = "storage/" + mitigatingmeasures;
      }
      obj =
        '{"boi_omi_id":"' +
        req.body.id +
        '","boi_subject":"' +
        req.body.subject +
        '","boi_type":"' +
        req.body.type +
        '","orderby_id":"' +
        req.body.orderbyid +
        '","commpncement_date":"' +
        commpdate +
        '","boi_place":"' +
        req.body.place +
        '","is_casulity":"' +
        req.body.iscasulity +
        '","casulity_details":"' +
        req.body.casulitydetail +
        '","boi_narrative":"' +
        narrativefilepath +
        '","boi_findings":"' +
        findingfilepath +
        '","personnel_indicted":"' +
        req.body.personnelindicted +
        '","recomm":"' +
        recfilepath +
        '","mitigation_measures":"' +
        mitigatingfilepath +
        '","approved_by_id":"' +
        req.body.approvedbyid +
        '","approval_letter":"' +
        approvalfilepath +
        '","punishment_awarded":"' +
        punishmentfilepath +
        '","punishmentawarded_detail":"' +
        req.body.punishmentawardeddetail +
        '","updated_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    }

    // console.log(obj)
    var result = await callprocMenthod.POST(obj, "boi_omi_tboi_update");
    // console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      }
    } else {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message
        );
      }
    }
  } catch (error) {
    // console.log(error)
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



export const approvedeclineBoiOmiTboi= async (req, res) => {
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
    var result = await callprocMenthod.POST(obj,'boi_omi_tboi_app_dec')
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


export const getboiomitboiActivity = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;

    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);

      obj = '{"bo_id":"' + JsonData + '"}';
    } else {
      obj = '{"bo_id":"' + req.query.id + '"}';
    }

    //console.log(obj)
    var result = await callprocMenthod.GET(obj, "boi_omi_tboi_activity");
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
