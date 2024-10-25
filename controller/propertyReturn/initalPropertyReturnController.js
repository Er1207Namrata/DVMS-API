import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';



export const getinitalproperty = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
     
      if(headerValue==0)
        {
           const decryptData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptData);
           obj = "{\"ip_id\":\"" +JsonData.id+"\",\"page\":\""+ JsonData.page+"\",\"size\":\""+JsonData.size+"\"}";
          
        }
     else
     {
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
      let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;

      if(req.body.fromdate == "" ||req.body.fromdate == null) 
        {
      obj = "{\"ip_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
        }
        else{
          obj = "{\"ip_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":\"" +fromdate + "\",\"todate\":\"" +todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
          
        }
               
     }
      
      var result = await callprocMenthod.GET(obj,'initalproperty_select')
      console.log(result);
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

  export const initalpropertyinsert = async (req, res) => {
    
    const headerValue = req.header("isUAT");
      try {
        let obj;
        let AppoinDate;
        let AquDate;
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
           AquDate= convertToISO8601(JsonData.acquisitiondate);
           obj = '{"personal_no":"' + JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","present_unit":"'+JsonData.presentunit+'","comm":"'+JsonData.command+'","properttype_id":"'+JsonData.propertytypeid+'","property_details":"'+JsonData.propertydetails+'","present_value":"'+JsonData.presentvalue+'","owned_by":"'+JsonData.ownedbyid+'","acquisition_mode":"'+JsonData.acquisitionmode+'","acquisition_date":"'+AquDate+'","acquired_from":"'+JsonData.acquiredfrom+'","annualincome_property":"'+JsonData.annualincomeproperty+'","financial_liabilities":"'+JsonData.financialliabilities+'","remark":"'+JsonData.remarks+'","ownedby_detail":"'+JsonData.ownedydetail+'","created_by":"'+ req.user.id +'","status":"' +statusCode + '","message":"' +message +'"}';
       
        }else{
          
        
          var property_detail= JSON.stringify(req.body.property_detail);
         
            obj = {personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_branch:req.body.branch,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,property_detail:property_detail,commanding_officer:req.body.commandingofficer,created_by:req.user.id,status:statusCode , message:message}
        }
       console.log(obj);
        var result = await callprocMenthod.POSTXML(obj, "initalproperty_insert");
       //console.log(result);
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                sendRes.statusMessage.FAILD_CREATE
              );
            }
            else{
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.FOUR_ZERO_ZERO,
                0,
                sendRes.statusMessage.FAILD_CREATE
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

  export const deleteinitalproperty = async (req, res) => {
    const headerValue = req.header("isUAT");   
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.query.body);
          const JsonData = JSON.parse(decryptedData);
          obj = "{\"prop_id\":\"" +JsonData+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
          obj = "{\"prop_id\":\"" +req.query.id+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      
      var result = await callprocMenthod.POST(obj, 'initialproperty_delete')
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
      // console.log(error)
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

  export const updateInitalProperty = async (req, res) => {
    
    const headerValue = req.header("isUAT");
      try {
        let obj;
        
        let AquDate;
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          AquDate= convertToISO8601(JsonData.acquisitiondate);
           obj = '{"ip_id":"' + JsonData.id +'","personal_no":"' + JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","present_unit":"'+JsonData.presentunit+'","comm":"'+JsonData.command+'","properttype_id":"'+JsonData.propertytypeid+'","property_details":"'+JsonData.propertydetails+'","present_value":"'+JsonData.presentvalue+'","owned_by":"'+JsonData.ownedbyid+'","acquisition_mode":"'+JsonData.acquisitionmode+'","acquisition_date":"'+AquDate+'","acquired_from":"'+JsonData.acquiredfrom+'","annualincome_property":"'+JsonData.annualincomeproperty+'","financial_liabilities":"'+JsonData.financialliabilities+'","remark":"'+JsonData.remarks+'","ownedby_detail":"'+JsonData.ownedydetail+'","updated_by":"'+ req.user.id +'","status":"' +statusCode + '","message":"' +message +'"}';
       
        }else{
          
          var property_detail= JSON.stringify(req.body.property_detail);
         
          obj = {ip_id:req.body.id,personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_branch:req.body.branch,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,property_detail:property_detail,commanding_officer:req.body.commandingofficer,updated_by:req.user.id,status:statusCode , message:message}
      }
        
       // console.log(obj);
        var result = await callprocMenthod.POSTXML(obj, "initalproperty_update");
       //console.log(result);
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(
                res,
                sendRes.statusCode.OK,
                0,
                result[0].message
              );
            }
            else{
              await sendRes.sendResponseUat(
                res,
                sendRes.statusCode.OK,
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
                result[0].message
                
              );
            }
          
        }
      } catch (error) {
       console.log(error);
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

  export const getinitalpropertyById = async (req, res) => {
    
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      
      if(headerValue==0)
        {
           const decryptdata = await encryptDecrypt.decrypt(req.query.id);
           const jsonData=JSON.parse(decryptdata);
           obj = "{\"ip_id\":\"" +jsonData+"\",\"page\":\""+ 1+"\",\"size\":\""+30+"\"}";
           
        }
     else
     {
      obj = "{\"dis_id\":\"" +req.query.id+"\",\"created_by\":\"" +req.user.id+"\"}";

      
     }
      
     // console.log(obj)
      var result = await callprocMenthod.GET(obj,'initialproperty_selectbyid')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].initialproperty_selectbyid);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].initialproperty_selectbyid);
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

  export const initalpropertyAppDec= async (req, res) => {
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
          obj = "{\"int_id\":\"" +req.body.id+"\",\"formremark\":\""+ req.body.remark+"\",\"emp_status\":\""+req.body.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"dependent_id\":\"" + req.body.dependentid + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
        console.log(obj)
       var result = await callprocMenthod.POST(obj, 'initial_propert_app_dec')
       
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