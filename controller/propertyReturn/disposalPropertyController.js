import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getDisposaliProperty = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      
      if(headerValue==0)
        {
           const decryptData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptData);
           obj = "{\"dis_id\":\"" +JsonData.id+"\",\"page\":\""+ JsonData.page+"\",\"size\":\""+JsonData.size+"\"}";
          
        }
     else
     {
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
      let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;

      if(req.body.fromdate == "" ||req.body.fromdate == null) 
        {
      obj = "{\"dis_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
        }
        else{
          obj = "{\"dis_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":\"" +fromdate + "\",\"todate\":\"" +todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
        }
     }
     
      var result = await callprocMenthod.GET(obj,'disposal_select')
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


  export const createdisposalProperty = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      let AppoinDate;  
        let moveAquDate; 
        let  AquDate;
        let moveAquisationDate;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          if(JsonData.properttypeid==2)
            {
              JsonData.move_acquisition_date=null ;
	            JsonData.move_property_detail=null ;
              JsonData.acqu_cost =null;
	            JsonData.source_finance=null;
              JsonData.move_name_address_party =null;
              JsonData.move_aqu_date =null;
	            JsonData.move_pay_detail=null;
            }
            else
            {
              JsonData.acquisition_date =null;
	            JsonData.dis_address =null;
	            JsonData.propertyshare_id =null;
	            JsonData.share_prop_details =null;
	            JsonData.pro_value =null;
	            JsonData.mode_disposal =null;
	            JsonData.name_address_party =null;
	            JsonData.mode_pay_details =null;
	            JsonData.isproperty_declared =null;
	            JsonData.property_declared_detail =null;
            }
            
          AquDate= convertToISO8601(JsonData.acquisitiondate);
          moveAquisationDate=convertToISO8601(JsonData.move_acquisition_date);
          moveAquDate=convertToISO8601(JsonData.move_aqu_date);

           obj = "{\"personal_no\":\"" + JsonData.personalno + "\",\"rank_name\":\"" + JsonData.rank + "\",\"can_name\":\"" + JsonData.name + "\",\"present_unit\":\"" + JsonData.presentunit + "\",\"properttype_id\":\"" + JsonData.properttypeid + "\",\"acquisition_date\":\"" + AquDate + "\",\"dis_address\":\""+JsonData.address+"\",\"propertyshare_id\":\""+JsonData.propertyshareid+"\",\"share_prop_details\":\"" + JsonData.share_prop_details + "\",\"pro_value\":\"" + JsonData.propertyvalue + "\",\"mode_disposal\":\"" + JsonData.mode_disposal + "\",\"name_address_party\":\"" + JsonData.name_address_party + "\",\"mode_pay_details\":\"" + JsonData.mode_pay_details + "\",\"isproperty_declared\":\"" + JsonData.isproperty_declared + "\",\"property_declared_detail\":\"" + JsonData.property_declared_detail + "\",\"move_acquisition_date\":\"" + moveAquisationDate + "\",\"move_property_detail\":\"" + JsonData.move_property_detail + "\",\"acqu_cost\":\"" + JsonData.acqu_cost + "\",\"source_finance\":\"" + JsonData.source_finance + "\",\"move_name_address_party\":\"" + JsonData.move_name_address_party + "\",\"move_aqu_date\":\"" + moveAquDate + "\",\"move_pay_detail\":\"" + JsonData.move_pay_detail + "\",\"self_declaration\":\"" + 'true' + "\",\"created_by\":\"" + user.req.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
        }
        else
        {
         
          var property_detail= JSON.stringify(req.body.property_detail);
         
            obj = {personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,per_branch:req.body.branch,property_detail:property_detail,commanding_officer:req.body.commandingofficer,created_by:req.user.id,status:statusCode , message:message}
        }
      //console.log(obj)
      var result = await callprocMenthod.POSTXML(obj, 'disposalproperty_insert')
      //console.log(result);
      if (result[0].status=='0') {
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

  export const deletedisposalProperty= async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);
          obj = "{\"prop_id\":\"" +JsonData+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
        else
        {
          obj = "{\"prop_id\":\"" +req.query.id+"\",\"deleted_by\":\""+ req.user.id+"\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
        }
      
      var result = await callprocMenthod.POST(obj, 'disposalproperty_delete')
      console.log(result);
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
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
        }
    }
  };


  export const updatedisposalProperty = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      const statusCode=0;
      const message='';
      let obj;
      let AppoinDate;  
      let moveAquDate; 
      let  AquDate;
      let moveAquisationDate;
      if(headerValue==0)
        {
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
          if(JsonData.properttypeid==2)
            {
              JsonData.move_acquisition_date=null ;
	            JsonData.move_property_detail=null ;
              JsonData.acqu_cost =null;
	            JsonData.source_finance=null;
              JsonData.move_name_address_party =null;
              JsonData.move_aqu_date =null;
	            JsonData.move_pay_detail=null;
            }
            else
            {
              JsonData.acquisition_date =null;
	            JsonData.dis_address =null;
	            JsonData.propertyshare_id =null;
	            JsonData.share_prop_details =null;
	            JsonData.pro_value =null;
	            JsonData.mode_disposal =null;
	            JsonData.name_address_party =null;
	            JsonData.mode_pay_details =null;
	            JsonData.isproperty_declared =null;
	            JsonData.property_declared_detail =null;
              JsonData.move_acquisition_date='01/01/1990'
            }
            
          AquDate= convertToISO8601(JsonData.acquisitiondate);
          moveAquDate=convertToISO8601(JsonData.move_acquisition_date);
           obj = "{\"dis_id\":\"" + JsonData.id + "\",\"personal_no\":\"" + JsonData.personalno + "\",\"rank_name\":\"" + JsonData.rank + "\",\"can_name\":\"" + JsonData.name + "\",\"present_unit\":\"" + JsonData.presentunit + "\",\"properttype_id\":\"" + JsonData.properttypeid + "\",\"acquisition_date\":\"" + AquDate + "\",\"dis_address\":\""+JsonData.address+"\",\"propertyshare_id\":\""+JsonData.propertyshareid+"\",\"share_prop_details\":\"" + JsonData.share_prop_details + "\",\"pro_value\":\"" + JsonData.propertyvalue + "\",\"mode_disposal\":\"" + JsonData.mode_disposal + "\",\"name_address_party\":\"" + JsonData.name_address_party + "\",\"mode_pay_details\":\"" + JsonData.mode_pay_details + "\",\"isproperty_declared\":\"" + JsonData.isproperty_declared + "\",\"property_declared_detail\":\"" + JsonData.property_declared_detail + "\",\"move_acquisition_date\":\"" + moveAquDate + "\",\"move_property_detail\":\"" + JsonData.move_property_detail + "\",\"acqu_cost\":\"" + JsonData.acqu_cost + "\",\"source_finance\":\"" + JsonData.source_finance + "\",\"move_name_address_party\":\"" + JsonData.move_name_address_party + "\",\"move_aqu_date\":\"" + JsonData.move_aqu_date + "\",\"move_pay_detail\":\"" + JsonData.move_pay_detail + "\",\"self_declaration\":\"" + JsonData.self_declaration + "\",\"created_by\":\"" + user.req.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
        }
        else
        {
          
            

          var property_detail= JSON.stringify(req.body.property_detail);
         
            obj = {dis_id:req.body.id,personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,per_branch:req.body.branch,property_detail:property_detail,commanding_officer:req.body.commandingofficer,updated_by:req.user.id,status:statusCode , message:message}
        }
     // console.log(obj)
      var result = await callprocMenthod.POSTXML(obj, 'disposalproperty_update')
     // console.log(result);
      if (result[0].status=='0') {
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

  export const getDisposaliPropertyById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
     
      if(headerValue==0)
        {
           const decryptData = await encryptDecrypt.decrypt(req.query.id);
           const JsonData=JSON.parse(decryptData);
           obj = "{\"dis_id\":\"" +JsonData+"\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+ 1+"\",\"size\":\""+30+"\"}";
          
        }
     else
     {
      
      obj = "{\"dis_id\":\"" +req.query.id+"\",\"created_by\":\"" +req.user.id+"\"}";

     }
      
      var result = await callprocMenthod.GET(obj,'disposal_selectbyid')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].disposal_selectbyid);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].disposal_selectbyid);
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
    

  export const disposalPropertyAppDec= async (req, res) => {
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
           obj = "{\"int_id\":\"" +JsonData.id+"\",\"formremark\":\""+ JsonData.remark+"\",\"emp_status\":\""+JsonData.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
         else
         {
          obj = "{\"int_id\":\"" +req.body.id+"\",\"formremark\":\""+ req.body.remark+"\",\"emp_status\":\""+req.body.status+"\",\"app_dec_by\":\"" + req.user.id + "\",\"dependent_id\":\"" + req.body.dependentid + "\",\"status\":\""+statusCode+"\",\"message\":\"" + message + "\"}";
         }
        //console.log(obj)
       var result = await callprocMenthod.POST(obj, 'disposal_property_app_dec')
       
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
       await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
         }
         else
         {
           await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
         }
     }
   };
  