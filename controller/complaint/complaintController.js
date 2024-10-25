import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from "../../helper/datetimeConverter.js";


export const getcomplaint = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
  
    if (headerValue == 0) {
      const decryptData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.page(decryptData);
      obj='{"comp_id":"' + JsonData.id + '","page":"' + JsonData.page + '","size":"' + JsonData.size + '"}';
    } else {
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;

      if(req.body.fromdate == "" ||req.body.fromdate == null) 
        {
          obj ='{"comp_id":"' + req.body.id + '","command_id":"'+req.body.command+'","personal_no":"'+req.body.personalno+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"' + req.body.page + '","size":"' + req.body.size + '"}';

        }else
        {
          obj ='{"comp_id":"' + req.body.id + '","command_id":"'+req.body.command+'","personal_no":"'+req.body.personalno+'","fromdate":"'+fromdate+'","todate":"'+todate+'","created_by":"' +req.user.id +'","page":"' + req.body.page + '","size":"' + req.body.size + '"}';
        }
                  
    }
    
    var result = await callprocMenthod.GET(obj, "complaint_select");
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
export const complaintinsert = async (req, res) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    let ComplaintCopy;
    let commentsattachment;
    let filepath=null;
    let commentsattachmentfilepath=null;
    const statusCode = 0;
    const message = "";
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      
      if (req.files.complaintcopyattachment != undefined) {
        ComplaintCopy = req.files.complaintcopyattachment[0].filename;
        filepath = "storage/" + ComplaintCopy;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentsattachmentfilepath = "storage/" + commentsattachment;
      }
      obj = '{"personal_no":"' + JsonData.personalno + '","comm_rank":"' + JsonData.rank + '","comm_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","complaint_type_id":"' + JsonData.complainttypeid + '","comp_againt":"' + JsonData.complaintagaint   + '","comp_copy":"' + filepath + '","comp_recived":"' + JsonData.complaintrecived  + '","forwarted_to":"' + JsonData.forwartedto   + '","comments_recc":"' + JsonData.comments  + '","comment_attachment":"' + commentsattachmentfilepath + '","cmp_status":"' + JsonData.status  + '","status_comment":"' + JsonData.statuscomment + '","created_by":"' + req.user.id + '","message":"' + message + '","status":"' + statusCode + '"}';
      console.log(obj)
   
    } else {
      
      if (req.files.complaintcopyattachment != undefined) {
        ComplaintCopy = req.files.complaintcopyattachment[0].filename;
        filepath = "storage/" + ComplaintCopy;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentsattachmentfilepath = "storage/" + commentsattachment;
      }

      
      obj = '{"personal_no":"' + req.body.personalno + '","comm_rank":"' + req.body.rank + '","comm_name":"' + req.body.name + '","comm":"' + req.body.command + '","present_unit":"' + req.body.presentunit + '","personal_branch":"' + req.body.branch + '","personal_appointment":"' + req.body.appointment + '","commanding_officer":"' + ( req.body.commandingofficer==undefined?0:req.body.commandingofficer) + '","type_of_entry":"' + req.body.typeofentry + '","file_no":"' + req.body.fileno + '","complaint_type_id":"' + req.body.complainttypeid + '","comp_againt":"' + req.body.complaintagaint   + '","comp_copy":"' + filepath  + '","comp_recived":"' + req.body.complaintrecived  + '","forwarted_to":"' + req.body.forwartedto   + '","comments_recc":"' + req.body.comments  + '","comment_attachment":"' + commentsattachmentfilepath + '","cmp_status":"' + req.body.status  + '","status_comment":"' + req.body.statuscomment + '","created_by":"' + req.user.id + '","message":"' + message + '","status":"' + statusCode + '"}';
    }
    console.log(obj);
    var result = await callprocMenthod.POST(obj, "complaint_insert");
    console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.FAILD_CREATE
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.FAILD_CREATE
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

export const deletecomplaint = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    const statusCode = 0;
    const message = "";
    let obj;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);
      obj =
        '{"comp_id":"' +
        JsonData +
        '","deleted_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    } else {
      obj =
        '{"comp_id":"' +
        req.query.id +
        '","deleted_by":"' +
        req.user.id +
        '","status":"' +
        statusCode +
        '","message":"' +
        message +
        '"}';
    }

    var result = await callprocMenthod.POST(obj, "complaint_delete");
    //console.log(result);
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
    // console.log(error)
    if (headerValue == 0) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        sendRes.statusMessage.SERVER_BUSY
      );
    } else {
      await sendRes.sendResponseUat(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        sendRes.statusMessage.SERVER_BUSY
      );
    }
  }
};
export const updatecomplaint = async (req, res) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    let ComplaintCopy;
    let commentsattachment;
    let filepath=null;
    let commentsattachmentfilepath=null;
    const statusCode = 0;
    const message = "";
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      if (req.files.complaintcopyattachment != undefined) {
        ComplaintCopy = req.files.complaintcopyattachment[0].filename;
        filepath = "storage/" + ComplaintCopy;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentsattachmentfilepath = "storage/" + commentsattachment;
      }
      obj = '{"cp_id":"' + JsonData.id + '","personal_no":"' + JsonData.personalno + '","comm_rank":"' + JsonData.rank + '","comm_name":"' + JsonData.name + '","comm":"' + JsonData.command + '","present_unit":"' + JsonData.presentunit + '","file_no":"' + JsonData.fileno + '","complaint_type_id":"' + JsonData.complainttypeid + '","comp_againt":"' + JsonData.complaintagaint   + '","comp_copy":"' + filepath + '","comp_recived":"' + JsonData.complaintrecived  + '","forwarted_to":"' + JsonData.forwartedto   + '","comments_recc":"' + JsonData.comments  + '","comment_attachment":"' + commentsattachmentfilepath + '","cmp_status":"' + JsonData.status  + '","status_comment":"' + JsonData.statuscomment + '","updated_by":"' + req.user.id + '","message":"' + message + '","status":"' + statusCode + '"}';
      console.log(obj)
    } else {
     

      if (req.files.complaintcopyattachment != undefined) {
        ComplaintCopy = req.files.complaintcopyattachment[0].filename;
        filepath = "storage/" + ComplaintCopy;
      }
      if (req.files.commentsattachment != undefined) {
        commentsattachment = req.files.commentsattachment[0].filename;
        commentsattachmentfilepath = "storage/" + commentsattachment;
      }

      
      obj = '{"cp_id":"' + req.body.id + '","personal_no":"' + req.body.personalno + '","comm_rank":"' + req.body.rank + '","comm_name":"' + req.body.name + '","comm":"' + req.body.command + '","present_unit":"' + req.body.presentunit + '","personal_branch":"' + req.body.branch + '","personal_appointment":"' + req.body.appointment + '","commanding_officer":"' + (req.body.commandingofficer==undefined?0:req.body.commandingofficer) + '","type_of_entry":"' + req.body.typeofentry + '","file_no":"' + req.body.fileno + '","complaint_type_id":"' + req.body.complainttypeid + '","comp_againt":"' + req.body.complaintagaint   + '","comp_copy":"' + filepath  + '","comp_recived":"' + req.body.complaintrecived  + '","forwarted_to":"' + req.body.forwartedto   + '","comments_recc":"' + req.body.comments  + '","comment_attachment":"' + commentsattachmentfilepath + '","cmp_status":"' + req.body.status  + '","status_comment":"' + req.body.statuscomment + '","updated_by":"' + req.user.id + '","message":"' + message + '","status":"' + statusCode + '"}';
    }
    //console.log(obj)
    var result = await callprocMenthod.POST(obj, "complaint_update");
    // console.log(result);
    if (result[0].status == "0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.NOT_UPDATE
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          sendRes.statusMessage.NOT_UPDATE
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
    //console.log(error);
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

export const getcomplaintById = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    
    if (headerValue == 0) {
      const descryptData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData= JSON.parse(descryptData);
      obj = '{"comp_id":"' + JsonData + '","page":"' + 1 + '","size":"' + 30 + '"}';
    } else {
      obj ='{"comp_id":"' + req.query.id + '","command_id":"'+0+'","personal_no":"'+''+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"' +1 + '","size":"' +30+ '"}';

    }
    
    var result = await callprocMenthod.GET(obj, "complaint_select");
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
          result[0]
        );
      } else {
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

export const approvedeclineComplaint = async (req, res) => {
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
    var result = await callprocMenthod.POST(obj,'complaint_app_dec')
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

export const getComplaintActivity = async (req, res) => {
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
    var result = await callprocMenthod.GET(obj, "complaint_activity");
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
