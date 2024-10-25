import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";

export const getrog = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;

    if (headerValue == 0) {
      const decryptdate = await encryptDecrypt.decrypt(req.body.id);
      const JsonData = JSON.parse(decryptdate);
      obj = "{\"rog_id\":\"" + JsonData.id + "\",\"page\":\"" + JsonData.page + "\",\"size\":\"" + JsonData.size + "\"}";

    }
    else {
      let fromdate = req.body.fromdate != "" ? convertToISO8601(req.body.fromdate) : null;
      let todate = req.body.todate != "" ? convertToISO8601(req.body.todate) : null;
      if (req.body.fromdate == "" || req.body.fromdate == null) {
        obj = "{\"rid\":\"" + req.body.id + "\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\"" + req.body.page + "\",\"size\":\"" + req.body.size + "\"}";

      }
      else {
        obj = "{\"rid\":\"" + req.body.id + "\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":\"" + fromdate + "\",\"todate\":\"" + todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\"" + req.body.page + "\",\"size\":\"" + req.body.size + "\"}";

      }

    }

    var result = await callprocMenthod.GET(obj, 'rog_select')
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

export const rogdelete = async (req, res) => {
  console.log(req);
  const headerValue = req.header("isUAT");

  try {
    const statusCode = 0;
    const message = '';
    let obj;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);
      obj = "{\"rog_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
    }
    else {
      obj = "{\"rog_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
    }

    var result = await callprocMenthod.POST(obj, 'rog_delete')
    console.log(result);
    if (result[0].status == '0') {
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
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
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
    else {
      await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
  }
};

export const rogrec_nonrec = async (req, res) => {

  const headerValue = req.header("isUAT");
  try {
    let obj;
    const statusCode = 0;
    const message = "";
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);

      obj = "{\"rogid\":\"" + JsonData.id + "\",\"remark\":\"" + JsonData.remark + "\",\"rec_status\":\"" + JsonData.status + "\",\"rec_nonrec_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";

    } else {
      obj = "{\"rogid\":\"" + req.body.id + "\",\"remark\":\"" + req.body.remak + "\",\"rec_status\":\"" + req.body.status + "\",\"rec_nonrec_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
    }
    //console.log(obj);
    var result = await callprocMenthod.POST(obj, "rog_rec_nonrec");
    //console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      }
      else {
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
      }
      else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message

        );
      }

    }
  } catch (error) {
    //console.log(error);
    if (headerValue == 0) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        error
      );
    }
    else {
      await sendRes.sendResponseUat(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        error
      );
    }

  }
};

export const createROG = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    let attached_file;
    let filepath = null;
    const statusCode = 0;
    const message = "";
    if (headerValue == 0) {
      const reqjson = JSON.parse(req.body.body);
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      if (req.files.documentattached != undefined) {
        attached_file = req.files.documentattached[0].filename;
      }
      filepath = 'storage/' + attached_file;
      obj = '{"personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","remedy_sought_from":"' + JsonData.remedysoughtfrom + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","type_id":"' + JsonData.typeid + '","grievance":"' + JsonData.grievances + '","remedy_sought":"' + JsonData.remedysought + '","comments_recommendations":"' + JsonData.commentsrecommendations + '","rog_doc":"' + filepath + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';

    } else {
      if (req.files.documentattached != undefined) {
        attached_file = req.files.documentattached[0].filename;
      }
      filepath = 'storage/' + attached_file;
      obj = '{"personal_no":"' + req.body.personalno + '","comm_rank":"' + req.body.rank + '","can_name":"' + req.body.name + '","comm":"' + req.body.command + '", "present_unit":"' + req.body.presentunit + '", "personal_branch":"' + req.body.branch + '","personal_appointment ":"' + req.body.appointment + '","commanding_officer":"' + (req.body.commandingofficer == undefined ? 0 : req.body.commandingofficer) + '", "type_of_entry":"' + req.body.typeofentry + '","remedy_sought_from":"' + req.body.remedysoughtfrom + '","file_no":"' + req.body.fileno + '","type_id":"' + req.body.typeid + '","grievance":"' + req.body.grievances + '","remedy_sought":"' + req.body.remedysought + '","comments_recommendations":"' + req.body.commentsrecommendations + '","rog_doc":"' + filepath + '","created_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
    }
    console.log(obj);
    var result = await callprocMenthod.POST(obj, 'rog_insert');
    console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.FAILD_CREATE);
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


export const getrogById = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    let id = 0;
    let page = 1;
    let size = 30;
    if (headerValue == 0) {
      id = await encryptDecrypt.decrypt(req.query.id);
      obj = "{\"rid\":\"" + id + "\",\"page\":\"" + page + "\",\"size\":\"" + size + "\"}";
    }
    else {

      obj = "{\"rid\":\"" + req.query.id + "\",\"personal_no\":\"" + '' + "\",\"command_id\":\"" + 0 + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\"" + 1 + "\",\"size\":\"" + 30 + "\"}";

    }

    var result = await callprocMenthod.GET(obj, 'rog_select')
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


export const updateROG = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    let attached_file;
    let filepath = null;
    const statusCode = 0;
    const message = "";
    if (headerValue == 0) {
      const reqjson = JSON.parse(req.body.body);
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      if (req.files.documentattached != undefined) {
        attached_file = req.files.documentattached[0].filename;
      }
      filepath = 'storage/' + attached_file;
      obj = '{"rog_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","rank_name":"' + JsonData.rank + '","can_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","remedy_sought_from":"' + JsonData.remedysoughtfrom + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","type_id":"' + JsonData.typeid + '","grievance":"' + JsonData.grievances + '","remedy_sought":"' + JsonData.remedysought + '","comments_recommendations":"' + JsonData.commentsrecommendations + '","rog_doc":"' + filepath + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';

    } else {
      if (req.files.documentattached != undefined) {
        attached_file = req.files.documentattached[0].filename;
      }
      filepath = 'storage/' + attached_file;
      obj = '{"rog_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","comm_rank":"' + req.body.rank + '","can_name":"' + req.body.name + '","comm":"' + req.body.command + '", "present_unit":"' + req.body.presentunit + '", "personal_branch":"' + req.body.branch + '","personal_appointment ":"' + req.body.appointment + '","commanding_officer":"' + (req.body.commandingofficer == undefined ? 0 : req.body.commandingofficer) + '", "type_of_entry":"' + req.body.typeofentry + '","remedy_sought_from":"' + req.body.remedysoughtfrom + '","file_no":"' + req.body.fileno + '","type_id":"' + req.body.typeid + '","grievance":"' + req.body.grievances + '","remedy_sought":"' + req.body.remedysought + '","comments_recommendations":"' + req.body.commentsrecommendations + '","rog_doc":"' + filepath + '","updated_by":"' + req.user.id + '","status":"' + statusCode + '","message":"' + message + '"}';
    }
    var result = await callprocMenthod.POST(obj, 'rog_update');
    console.log(result);
    if (result[0].status == "0") {
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
    console.log(error);
    if (headerValue == 0) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
    else {
      await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  }
};

export const Rogapprovedecline = async (req, res) => {
  const headerValue = req.header("isUAT");
  
  try {
      let obj;  
      
      let statusCode=0;
      let message='';
      if(headerValue == 0){
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
       
                  obj = '{"complaint_id":"' +JsonData.id +'","remark":"' +JsonData.remark +'","complaint_status":"'+JsonData.status+'","app_deci_by":"'+JsonData.req.user.id+'","status":"'+statusCode+'","message":"'+message+'"}';
      }else{ 
       
        obj = '{"main_id":"' +req.body.id +'","formremark":"' +req.body.remark +'","emp_status":"'+req.body.status+'","app_deci_by":"'+req.user.id+'","dependent_id":"'+req.body.dependentid+'","status":"'+statusCode+'","message":"'+message+'"}';
              
      }
    
     //console.log(obj)
    var result = await callprocMenthod.POST(obj,'rog_app_dec')
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

export const getROGActivity = async (req, res) => {
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
    var result = await callprocMenthod.GET(obj, "rog_activity");
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
