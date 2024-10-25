import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getempaboard = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      let obj;
      if(headerValue==0)
        {
          const decryptData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.page(decryptData);
          
           obj = "{\"emp_id\":\"" +JsonData.id+"\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+ JsonData.page+"\",\"size\":\""+JsonData.size+"\"}";
           
        }
     else
     {
       
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
          if(req.body.fromdate == "" ||req.body.fromdate == null) 
            {
              obj = "{\"emp_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"org_type\":\"" + req.body.orgtypeid + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\""+req.body.page+"\",\"size\":\""+req.body.size+"\"}";
            }
            else
            {
              obj = "{\"emp_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"org_type\":\"" + req.body.orgtypeid + "\",\"fromdate\":\"" +fromdate + "\",\"todate\":\"" +todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+page+"\",\"size\":\""+size+"\"}";
            }
      
     }
     
      var result = await callprocMenthod.GET(obj,'emp_aboard_select')
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
  export const empaboardinsert = async (req, res) => {
   // console.log(req);
    const headerValue = req.header("isUAT");
      try {
        let obj;
        
        let DateofSought;
        const statusCode = 0;
        const Emp_Id=0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          
          DateofSought=convertToISO8601(JsonData.dateofempsought);
          othertypes_organisation
          obj = '{"personal_no":"' +JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","branch_name":"' +JsonData.branch +'","present_unit":"'+JsonData.presentunit+'","mission_unitname":"'+JsonData.missionunitname+'","name_desig_india":"'+JsonData.namedesig_india+'","emp_permisought":"'+JsonData.emp_permi_sought+'","eduqualidep":"'+JsonData.edu_quali_dep+'","relation_official_dep":"'+JsonData.relation_offi_dep+'","empdetail_family":"'+JsonData.emp_detail_family+'","name_address_org":"'+JsonData.nameaddress_org+'","orgtype_id":"'+JsonData.orgtypeid+'","ismissioncomm":"'+JsonData.ismission_comm+'","is_emplaw":"'+JsonData.isemplaw+'","is_changestatus":"'+JsonData.ischangestatus+'","nature_emp_duties":"'+JsonData.nature_empduties+'","dateofemp_sought":"'+DateofSought+'","othertypes_organisation":"'+JsonData.othertypesoforganisation+'","created_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
       
        }else{
         // const jsonString = JSON.stringify(req.body.detailofmembers);
         obj = {empabdid:req.body.id,
          personal_no:req.body.personalno,
          personal_name:req.body.name,
          entry_type:req.body.entrytype,
          personal_rank:req.body.rank,
          personal_branch:req.body.branch,
          personal_appointment:req.body.appointment,
          present_unit:req.body.presentunit,
          personal_command:req.body.command,
          dependentdetails:JSON.stringify(req.body.detailofmembers),
          educationalqualification:req.body.educationalqualification,
          commanding_officer:req.body.commandingofficer,
          created_by:req.user.id,
          status:statusCode,
          message:message ,
          Emp_Id:Emp_Id
        };
  
        }
     
        var result = await callprocMenthod.POSTOBJECT(obj, "emp_aboard_insert");
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                result[0].message
              );
            }
            else{
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                result[0].message
              );
            }
          
        } else {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.OK,
                1,
                result[0].message
                
              );
            }
            else
            {
              
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.OK,
                1,
                result[0].message,
               
              );
            }
          
        }
      } catch (error) {
       //console.log(error);
        if(headerValue==0)
          {
            await sendRes.sendResponse(
              res,
              sendRes.statusCode.FIVE_ZERO_ZERO,
              0,
              error
            );
          }
          else
          {
            await sendRes.sendResponseUat(
              res,
              sendRes.statusCode.FIVE_ZERO_ZERO,
              0,
              error
            );
          }
      
      }
  };

  export const empaboardupdate = async (req, res) => {
    
    const headerValue = req.header("isUAT");
      try {
        let obj;
        
        let DateofSought;
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          
          DateofSought=convertToISO8601(JsonData.dateofempsought);
          obj = '{"emp_id":"' +JsonData.id +'","personal_no":"' +JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","branch_name":"' +JsonData.branch +'","present_unit":"'+JsonData.presentunit+'","mission_unitname":"'+JsonData.missionunitname+'","name_desig_india":"'+JsonData.namedesig_india+'","emp_permisought":"'+JsonData.emp_permi_sought+'","eduqualidep":"'+JsonData.edu_quali_dep+'","relation_official_dep":"'+JsonData.relation_offi_dep+'","empdetail_family":"'+JsonData.emp_detail_family+'","name_address_org":"'+JsonData.nameaddress_org+'","orgtype_id":"'+JsonData.orgtypeid+'","ismissioncomm":"'+JsonData.ismission_comm+'","is_emplaw":"'+JsonData.isemplaw+'","is_changestatus":"'+JsonData.ischangestatus+'","nature_emp_duties":"'+JsonData.nature_empduties+'","dateofemp_sought":"'+DateofSought+'","is_declared":"'+'Yes'+'","othertypes_organisation":"'+JsonData.othertypesoforganisation+'","updated_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
       
        }else{
          
          DateofSought=convertToISO8601(req.body.dateofempsought);
          obj = '{"emp_id":"' +req.body.id +'","personal_no":"' +req.body.personalno +'","rank_name":"'+req.body.rank+'","can_name":"'+req.body.name+'","branch_name":"' +req.body.branch +'","present_unit":"'+req.body.presentunit+'","command":"'+req.body.command+'","mission_unitname":"'+req.body.missionunitname+'","name_desig_india":"'+req.body.namedesig_india+'","emp_permisought":"'+req.body.emp_permi_sought+'","eduqualidep":"'+req.body.edu_quali_dep+'","relation_official_dep":"'+req.body.relation_offi_dep+'","empdetail_family":"'+req.body.emp_detail_family+'","name_address_org":"'+req.body.nameaddress_org+'","orgtype_id":"'+req.body.orgtypeid+'","ismissioncomm":"'+req.body.ismission_comm+'","details_missioncomm":"'+req.body.detailsmissioncomm+'","is_emplaw":"'+req.body.isemplaw+'","is_changestatus":"'+req.body.ischangestatus+'","details_visachange":"'+req.body.detailsvisachange+'","nature_emp_duties":"'+req.body.nature_empduties+'","dateofemp_sought":"'+DateofSought+'","othertypes_organisation":"'+req.body.othertypesoforganisation+'","updated_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
        }
        console.log(obj);
        var result = await callprocMenthod.POST(obj, "emp_aboard_update");
        //console.log(result);
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                sendRes.statusMessage.NOT_UPDATE
              );
            }
            else{
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                sendRes.statusMessage.NOT_UPDATE
              );
            }
          
        } else {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.OK,
                1,
                result[0].message
                
              );
            }
            else
            {
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.OK,
                1,
                result[0].message
                
              );
            }
          
        }
      } catch (error) {
      // console.log(error);
        if(headerValue==0)
          {
            await sendRes.sendResponse(
              res,
              sendRes.statusCode.FIVE_ZERO_ZERO,
              0,
              error
            );
          }
          else
          {
            await sendRes.sendResponseUat(
              res,
              sendRes.statusCode.FIVE_ZERO_ZERO,
              0,
              error
            );
          }
      
      }
  };

  export const empaboarddelete= async (req, res) => {
   // console.log(req);
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          obj = "{\"emp_id\":\"" +await encryptDecrypt.decrypt(req.query.id)+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
          obj = "{\"emp_id\":\"" +req.query.id+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      
      var result = await callprocMenthod.POST(obj, 'emp_aboard_Delete')
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

  export const empAboardRecNonrec= async (req, res) => {
    // console.log(req);
     const headerValue = req.header("isUAT");
     
     try {
       const statusCode=0;
       const message='';
       let obj;
       if(headerValue==0)
         {
           const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
           obj = "{\"emp_id\":\"" +JsonData.id+"\",\"remark\":\""+ JsonData.remark+"\",\"rec_status\":\""+JsonData.status+"\",\"rec_nonrec_by\":\"" + req.user.id + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
         else
         {
          obj = "{\"rogid\":\"" +req.body.id+"\",\"remark\":\""+ req.body.remark+"\",\"rec_status\":\""+req.body.status+"\",\"rec_nonrec_by\":\"" + req.user.id + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
        console.log(obj)
       var result = await callprocMenthod.POST(obj, 'rog_rec_nonrec')
       console.log(result);
       if (result[0].status=='0') {
         if(headerValue==0)
           {
         await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
           }
           else
           {
             await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
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
        console.log(error)
        if(headerValue==0)
         {
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
         }
         else
         {
           await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
         }
     }
   };
   export const empAboardAppDec= async (req, res) => {
    // console.log(req);
     const headerValue = req.header("isUAT");
     
     try {
       const statusCode=0;
       const message='';
       let obj;
       if(headerValue==0)
         {
           const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
           obj = "{\"emp_id\":\"" +JsonData.id+"\",\"formremark\":\""+ JsonData.remark+"\",\"emp_status\":\""+JsonData.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
         else
         {
          obj = "{\"emp_id\":\"" +req.body.id+"\",\"formremark\":\""+ req.body.remark+"\",\"emp_status\":\""+req.body.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"dependent_id\":\"" + req.body.dependentid + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
        console.log(obj)
       var result = await callprocMenthod.POST(obj, 'emp_app_dec')
       
       if (result[0].status=='0') {
         if(headerValue==0)
           {
         await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
           }
           else
           {
             await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
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
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
         }
         else
         {
           await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
         }
     }
   };
 
  export const empAboardActivity = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
        
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"emp_id":"' +JsonData +'"}';
                    
        }else{ 

       
          obj = '{"emp_id":"' +req.query.id +'"}';
                              
        }
      
   //console.log(obj)
      var result = await callprocMenthod.GET(obj,'emp_aboard_activity')
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


  export const getempaboardbyId = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
      let obj;
      if(headerValue==0)
        {
          const decryptData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.page(decryptData);
          
           obj = "{\"emp_id\":\"" +JsonData.id+"\"}";
           
        }
     else
     {
       
      obj = "{\"emp_id\":\"" +req.query.id+"\",\"created_by\":\"" +req.user.id+"\"}";
     
      
     }
     
      var result = await callprocMenthod.GET(obj,'emp_abroad_selectbyid')
      console.log(result[0].emp_abroad_selectbyid);
     
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].emp_abroad_selectbyid);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].emp_abroad_selectbyid);
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