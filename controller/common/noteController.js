import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const getNotes = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      let opcode;
      if(headerValue==0)
        {
            const decryptedData = await encryptDecrypt.decrypt(req.body.body);
            const JsonData = JSON.parse(decryptedData);
            obj = "{\"note_id\":\"" +JsonData.id+"\",\"page_id\":\"" +JsonData.formid+"\",\"record_id\":\"" +JsonData.recordid+"\"}";
        }
     else
     {
        obj = "{\"note_id\":\"" +req.body.id+"\",\"page_id\":\"" +req.body.formid+"\",\"record_id\":\"" +req.body.recordid+"\"}";
     }
      
      var result = await callprocMenthod.GET(obj,'notes_select')
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


  export const createNotes = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        let filepath=null;
        let uploadfile;
        let statusCode=0;
        let message='';
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
          if (req.files.noteattachment != undefined) {
            uploadfile = req.files.noteattachment[0].filename;
            filepath = "storage/" + uploadfile;
          }
         
         
                    obj = '{"page_id":"' +JsonData.formid +'","record_id":"' +JsonData.recordid +'","notes_title":"'+JsonData.title+'","subject_summary":"' +JsonData.subjectsummary +'","file_upload":"'+filepath+'","created_By":"'+req.user.id+'","message":"'+message+'","status":"'+statusCode+'"}';
               
                    
        }else{ 
          
          if (req.files.noteattachment != undefined) {
            uploadfile = req.files.noteattachment[0].filename;
            filepath = "storage/" + uploadfile;
          }
        
          obj = '{"page_id":"' +req.body.formid +'","record_id":"' +req.body.recordid +'","notes_title":"'+req.body.title+'","subject_summary":"' +req.body.subjectsummary +'","file_upload":"'+filepath+'","created_By":"'+req.user.id+'","message":"'+message+'","status":"'+statusCode+'"}';
                
        }
      
      //console.log(obj)
      var result = await callprocMenthod.POST(obj,'notes_insert')
      //console.log(result);
      if (result[0].status == "0") {
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

  export const updateNotes = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        let filepath=null;
        let uploadfile;
        let statusCode=0;
        let message='';
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
          if (JsonData.noteattachment != undefined) {
            uploadfile = req.files.noteattachment[0].filename;
            filepath = "storage/" + uploadfile;
          }
         
         
                    obj = '{"note_id":"' +JsonData.id +'","page_id":"' +JsonData.formid +'","record_id":"' +JsonData.recordid +'",,"notes_title":"'+JsonData.title+'","subject_summary":"' +JsonData.subjectsummary +'","file_upload":"'+filepath+'","updated_By":"'+req.user.id+'","message":"'+message+'","status":"'+statusCode+'"}';
               
                    
        }else{ 
          
          if (req.files.noteattachment != undefined) {
            uploadfile = req.files.noteattachment[0].filename;
            filepath = "storage/" + uploadfile;
          }
        
          obj = '{"note_id":"' +req.body.id +'","page_id":"' +req.body.formid +'","record_id":"' +req.body.recordid +'","notes_title":"'+req.body.title+'","subject_summary":"' +req.body.subjectsummary +'","file_upload":"'+filepath+'","updated_By":"'+req.user.id+'","message":"'+message+'","status":"'+statusCode+'"}';
                
        }
      
      //console.log(obj)
      var result = await callprocMenthod.POST(obj,'notes_update')
      //console.log(result);
      if (result[0].status == "0") {
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

  export const deleteNotes= async (req, res) => {
    // console.log(req);
     const headerValue = req.header("isUAT");
     
     try {
       const statusCode=0;
       const message='';
       let obj;
       if(headerValue==0)
         {
           obj = "{\"note_id\":\"" +await encryptDecrypt.decrypt(req.query.id)+"\",\"deleted_By\":\""+ req.user.id+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\"}";
         }
         else
         {
           obj = "{\"note_id\":\"" +req.query.id+"\",\"deleted_By\":\""+ req.user.id+"\",\"message\":\"" + message + "\",\"status\":\""+statusCode+"\"}";
         }
       
       var result = await callprocMenthod.POST(obj, 'notes_delete')
       //console.log(result);
       if (result[0].status=='0') {
         if(headerValue==0)
           {
         await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
           }
           else
           {
             await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.NOT_DELETE_DATA);
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

   
export const getNotesById = async (req, res) => {
  const headerValue = req.header("isUAT");
  
  try {
    let obj;
    let opcode;
    if(headerValue==0)
      {
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          
          const JsonData = JSON.parse(decryptedData);
         
          obj = "{\"note_id\":\"" +JsonData+"\",\"page_id\":0,\"record_id\":0}";
      }
   else
   {
      obj = "{\"note_id\":\"" +req.query.id+"\",\"page_id\":0,\"record_id\":0}";
   }
    
    var result = await callprocMenthod.GET(obj,'notes_select')
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