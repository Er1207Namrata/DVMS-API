import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const getDropdowns = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      let opcode;
      let value=0;
      let userid=0;
      if(headerValue==0)
        {
           opcode = await encryptDecrypt.decrypt(req.query.code);
           if(value!=0)
            {
           value = await encryptDecrypt.decrypt(req.query.value);
            }
        }
     else
     {
        opcode = req.query.code;
        if(req.query.value==undefined)
        {
          value = 0;
        }
        else
        {
          value = req.query.value;
        }
        if(req.query.userid==undefined)
          {
            value = 0;
          }
          else
          {
            value = req.query.userid;
          }
        
     }
      obj = "{\"opcode\":\"" +opcode+"\",\"value_id\":\"" +value+"\",\"user_id\":\"" +userid+"\"}";
      var result = await callprocMenthod.GET(obj,'get_dropdown')
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

 

export const getUser = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    let roleid;
    if (headerValue == 0) {
      roleid = await encryptDecrypt.decrypt(req.query.id);
    }
    else {
      roleid = req.query.id;
    }
    obj = "{\"role_id\":\"" + roleid + "\"}";
    var result = await callprocMenthod.GET(obj, 'get_user')
    // console.log(result);
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
    if (headerValue == 0) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
    else {
      await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  }
};


export const generate_file_number = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;
    let form_id;
    if (headerValue == 0) {
      form_id = await encryptDecrypt.decrypt(req.query.form_id);
    }
    else {
      form_id = req.query.form_id;
    }
    obj = "{\"p_form_id\":\"" + form_id + "\"}";
    var result = await callprocMenthod.GET(obj, 'fn_generate_file_number');
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
        await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result[0].fn_generate_file_number);
      }
    }

  } catch (error) {
    if (headerValue == 0) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
    else {
      await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
    }
  }
};


export const createcategory = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  const statusCode = 0;
  let message = "";
  try {
    let p_category, p_addedby;
    if (headerValue == 0) {
      const JsonData = JSON.parse(await encryptDecrypt.decrypt(JSON.parse(req.body.body)));
      p_category = JsonData.category;
    } else {
      p_category = req.body.category;
    }
    p_addedby = req.user.id;
    const obj = {
      p_category,
      p_addedby,
      status: 0,
      message: ''
    };
    const result = await callprocMenthod.POST(JSON.stringify(obj), 'add_category');
    const statusCodeToSend = result[0].status == "0" ? sendRes.statusCode.FOUR_ZERO_ZERO : sendRes.statusCode.OK;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, result[0].status, result[0].message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, result[0].status, result[0].message);
    }
  } catch (error) {
    message = error;
    const statusCodeToSend = headerValue == 0 ? sendRes.statusCode.FIVE_ZERO_ZERO : sendRes.statusCode.FOUR_ZERO_ZERO;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, statusCode, message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, statusCode, message);
    }
  }
};

export const updatecategory = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  const statusCode = 0;
  let message = "";
  try {
    let p_categoryid, p_category, p_addedby;
    if (headerValue == 0) {
      const JsonData = JSON.parse(await encryptDecrypt.decrypt(JSON.parse(req.body.body)));
      p_categoryid = JsonData.categoryid;
      p_category = JsonData.category;
    } else {
      p_categoryid = req.body.categoryid;
      p_category = req.body.category;
    }
    p_addedby = req.user.id;
    const obj = {
      p_categoryid,
      p_category,
      p_addedby,
      status: 0,
      message: ''
    };
    const result = await callprocMenthod.POST(JSON.stringify(obj), 'update_category');
    const statusCodeToSend = result[0].status == "0" ? sendRes.statusCode.FOUR_ZERO_ZERO : sendRes.statusCode.OK;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, result[0].status, result[0].message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, result[0].status, result[0].message);
    }
  } catch (error) {
    message = error;
    const statusCodeToSend = headerValue == 0 ? sendRes.statusCode.FIVE_ZERO_ZERO : sendRes.statusCode.FOUR_ZERO_ZERO;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, statusCode, message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, statusCode, message);
    }
  }
};


export const addsubcategory = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  const statusCode = 0;
  let message = "";
  try {
    let p_categoryid, p_subcategory, p_addedby;
    if (headerValue == 0) {
      const JsonData = JSON.parse(await encryptDecrypt.decrypt(JSON.parse(req.body.body)));
      p_categoryid = JsonData.categoryid;
      p_subcategory = JsonData.subcategory;
    } else {
      p_categoryid = req.body.categoryid;
      p_subcategory = req.body.subcategory;
    }
    p_addedby = req.user.id;
    const obj = {
      p_categoryid,
      p_subcategory,
      p_addedby,
      status: 0,
      message: ''
    };
    const result = await callprocMenthod.POST(JSON.stringify(obj), 'add_subcategory');
    const statusCodeToSend = result[0].status == "0" ? sendRes.statusCode.FOUR_ZERO_ZERO : sendRes.statusCode.OK;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, result[0].status, result[0].message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, result[0].status, result[0].message);
    }
  } catch (error) {
    message = error;
    const statusCodeToSend = headerValue == 0 ? sendRes.statusCode.FIVE_ZERO_ZERO : sendRes.statusCode.FOUR_ZERO_ZERO;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, statusCode, message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, statusCode, message);
    }
  }
};


export const updatesubcategory = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  const statusCode = 0;
  let message = "";
  try {
    let p_subcategoryid, p_categoryid, p_subcategory, p_addedby;
    if (headerValue == 0) {
      const JsonData = JSON.parse(await encryptDecrypt.decrypt(JSON.parse(req.body.body)));
      p_subcategoryid = JsonData.subcategoryid;
      p_categoryid = JsonData.categoryid;
      p_subcategory = JsonData.subcategory;
    } else {
      p_subcategoryid = req.body.subcategoryid;
      p_categoryid = req.body.categoryid;
      p_subcategory = req.body.subcategory;
    }
    p_addedby = req.user.id;
    const obj = {
      p_subcategoryid,
      p_categoryid,
      p_subcategory,
      p_addedby,
      status: 0,
      message: ''
    };
    const result = await callprocMenthod.POST(JSON.stringify(obj), 'update_subcategory');
    const statusCodeToSend = result[0].status == "0" ? sendRes.statusCode.FOUR_ZERO_ZERO : sendRes.statusCode.OK;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, result[0].status, result[0].message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, result[0].status, result[0].message);
    }
  } catch (error) {
    message = error;
    const statusCodeToSend = headerValue == 0 ? sendRes.statusCode.FIVE_ZERO_ZERO : sendRes.statusCode.FOUR_ZERO_ZERO;
    if (headerValue == 0) {
      await sendRes.sendResponse(res, statusCodeToSend, statusCode, message);
    } else {
      await sendRes.sendResponseUat(res, statusCodeToSend, statusCode, message);
    }
  }
};


export const getActivityLog = async (req, res) => {
  const headerValue = req.header("isUAT");

  try {
    let obj;

    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.id);
      const JsonData = JSON.parse(decryptedData);

      obj = '{"bo_id":"' + JsonData + '"}';
    } else {
      obj = '{"dv_id":"' + req.body.id + '","form_id":"' + req.body.formid + '"}';
    }

    //console.log(obj)
    var result = await callprocMenthod.GET(obj, "activity_log");
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