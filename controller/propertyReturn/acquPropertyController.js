import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getAcquisitionProperty = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
      if(headerValue==0)
        {
           const descrypData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData=JSON.parse(descrypData);
           obj = "{\"aqcu_id\":\"" +JsonData.id+"\",\"page\":\""+ JsonData.page+"\",\"size\":\""+JsonData.size+"\"}";
          
        }
     else
     {
      let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
      let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;

      if(req.body.fromdate == "" ||req.body.fromdate == null) 
        {
          obj = "{\"aqcu_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":null,\"todate\":null,\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";

        }
        else
        {
          obj = "{\"aqcu_id\":\"" +req.body.id+"\",\"personal_no\":\"" + req.body.personalno + "\",\"command_id\":\"" + req.body.command + "\",\"fromdate\":\"" +fromdate + "\",\"todate\":\"" +todate + "\",\"created_by\":\"" + req.user.id + "\",\"page\":\""+ req.body.page+"\",\"size\":\""+req.body.size+"\"}";
        }
      
     }
      
      var result = await callprocMenthod.GET(obj,'acquisition_select')            
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

  export const acqumovableinsert = async (req, res) => {
    
    const headerValue = req.header("isUAT");
    try
    {
        let obj;  
        let AppoinDate;  
        let moveAquDate; 
        let  AquDate;
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         if(JsonData.propertytypeid==2)
          {
            JsonData.dateofacquisition=='01/01/1990'; 
            JsonData.move_propertydetails==null;             
            JsonData.acqucost=='0.0';
            JsonData.sourcefinance==null;
            JsonData.nameaddressparty==null;
            JsonData.nameaddressdealer==null;
            JsonData.selfdeclaration==null;  
            JsonData.movacqucost==null;         
          }
          else
          {
            JsonData.dateofacquisition=='01/01/1990'; 
            JsonData.modeofacquisition==null; 
            JsonData.acquaddress==null; 
            JsonData.shareprouserdetail==null; 

           
                                                  
          }
          
          //console.log(AppoinDate)
          AquDate= convertToISO8601(JsonData.dateofacquisition);
        // console.log(AquDate)
          moveAquDate=convertToISO8601(JsonData.dateofacquisition);
          //console.log(moveAquDate)
          obj = '{"personal_no":"'+JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","present_unit":"'+JsonData.presentunit+'","properttype_id":"'+JsonData.propertytypeid+'","property_details":"'+JsonData.propertydetails+'","acquisition_mode":"'+JsonData.modeofacquisition+'","acquisition_date":"'+AquDate+'","acqu_address":"'+JsonData.acquaddress+'","acqu_status":"'+JsonData.acqustatus+'","share_prop_id":"'+JsonData.shareproid+'","share_prop_details":"'+JsonData.shareprouserdetail+'","name_address":"'+JsonData.nameaddress+'","is_relation":"'+JsonData.isrelationship+'","relation_details":"'+JsonData.relationshipdetail+'","other_official":"'+JsonData.otherofficial+'","other_official_detail":"'+JsonData.otherofficialdetail+'","other_info":"'+JsonData.otherinfo+'","move_acquisition_date":"'+moveAquDate+'","move_property_detail":"'+JsonData.move_propertydetails+'","acqu_cost":"'+JsonData.acqucost+'","mov_acqu_cost":"'+JsonData.acqucost+'","source_finance":"'+JsonData.sourcefinance+'","name_address_party":"'+JsonData.nameaddressparty+'","name_address_dealer":"'+JsonData.nameaddressdealer+'","self_declaration":"'+true+'","created_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                    
        }else{ 
         
         
            var property_detail= JSON.stringify(req.body.property_detail);
         
            obj = {personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,per_branch:req.body.branch,property_detail:property_detail,commanding_officer:req.body.commandingofficer,created_by:req.user.id,status:statusCode , message:message}
                              
        }
        //console.log(obj);
        var result = await callprocMenthod.POSTXML(obj, "acquisitionproperty_insert");
       // console.log(result);
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(res,sendRes.statusCode.OK, 0,result[0].message);
            }
            else{
              await sendRes.sendResponseUat(res,sendRes.statusCode.OK,0,sendRes.statusMessage.FAILD_CREATE);
            }
          
        } else {
          if(headerValue==0)
            {
              await sendRes.sendResponse(res,sendRes.statusCode.OK,1,result[0].message);
            }
            else
            {
              await sendRes.sendResponseUat(res,sendRes.statusCode.OK,1,result[0].message);
            }   
        }
    } catch (error) 
    {
      //console.log(error);
        if(headerValue==0)
        {
            await sendRes.sendResponse(res,sendRes.statusCode.FIVE_ZERO_ZERO,0,error);
        }
        else
        {
            await sendRes.sendResponseUat(res,sendRes.statusCode.FIVE_ZERO_ZERO,0,error);
        }
    }
};
export const deleteacquproperty= async (req, res) => {
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
    
    var result = await callprocMenthod.POST(obj, 'acquisitionproperty_delete')
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
  

export const getAcquisitionPropertyById = async (req, res) => {
  const headerValue = req.header("isUAT");
  
  try {
    let obj;
    
    if(headerValue==0)
      {
         const decrypData = await encryptDecrypt.decrypt(req.query.id);
         const JsonData=JSON.parse(decrypData);
         obj = "{\"aqcu_id\":\"" +JsonData+"\",\"created_by\":\""+ req.user.id+"\",\"page\":\""+ 1+"\",\"size\":\""+30+"\"}";
      }
   else
   {
    obj = "{\"aqcu_id\":\"" +req.query.id+"\",\"created_by\":\""+ req.user.id+"\"}";
    
   }
    
    var result = await callprocMenthod.GET(obj,'acquisition_selectbyid')
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
      await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].acquisition_selectbyid);
        }
        else
        {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0].acquisition_selectbyid);
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


export const updateAcqumovable = async (req, res) => {
    
  const headerValue = req.header("isUAT");
  try
  {
      let obj;  
      let AppoinDate;  
        let moveAquDate; 
        let  AquDate;    
      const statusCode = 0;
      const message = "";
      if(headerValue == 0){
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        if(JsonData.propertytypeid==2)
          {
            JsonData.dateofacquisition=='01/01/1990'; 
            JsonData.move_propertydetails==null;             
            JsonData.acqucost=='0.0';
            JsonData.sourcefinance==null;
            JsonData.nameaddressparty==null;
            JsonData.nameaddressdealer==null;
            JsonData.selfdeclaration==null;  
            JsonData.move_acqucost==null;         
          }
          else
          {
            JsonData.dateofacquisition=='01/01/1990'; 
            JsonData.modeofacquisition==null; 
            JsonData.acquaddress==null; 
            JsonData.shareprouserdetail==null;                                     
          }
          
          //console.log(AppoinDate)
          AquDate= convertToISO8601(JsonData.dateofacquisition);
        // console.log(AquDate)
          moveAquDate=convertToISO8601(JsonData.dateofacquisition);
          obj = '{"acqu_id":"' +JsonData.id +'","personal_no":"'+req.body.personalno +'","rank_name":"'+req.body.rank+'","can_name":"'+req.body.name+'","present_unit":"'+req.body.presentunit+'","properttype_id":"'+req.body.propertytypeid+'","property_details":"'+req.body.propertydetails+'","acquisition_mode":"'+req.body.modeofacquisition+'","acquisition_date":"'+AquDate+'","acqu_address":"'+req.body.acquaddress+'","acqu_status":"'+req.body.acqustatus+'","share_prop_id":"'+req.body.shareproid+'","share_prop_details":"'+req.body.shareprouserdetail+'","name_address":"'+req.body.nameaddress+'","is_relation":"'+req.body.isrelationship+'","relation_details":"'+req.body.relationshipdetail+'","other_official":"'+req.body.otherofficial+'","other_official_detail":"'+req.body.otherofficialdetail+'","other_info":"'+req.body.otherinfo+'","move_acquisition_date":"'+moveAquDate+'","move_property_detail":"'+req.body.move_propertydetails+'","acqu_cost":"'+req.body.acqucost+'","mov_acqu_cost":"'+req.body.move_acqucost+'","source_finance":"'+req.body.sourcefinance+'","name_address_party":"'+req.body.nameaddressparty+'","name_address_dealer":"'+req.body.nameaddressdealer+'","self_declaration":"'+true+'","updated_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                  
      }else{ 
       
          var property_detail= JSON.stringify(req.body.property_detail);
         
          obj = {acqu_id:req.body.id,personal_no: req.body.personalno ,rank_name:req.body.rank,can_name:req.body.name,present_unit:req.body.presentunit,comm:req.body.command,per_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,per_branch:req.body.branch,property_detail:property_detail,commanding_officer:req.body.commandingofficer,updated_by:req.user.id,status:statusCode , message:message}
        }
      //console.log(obj);
      var result = await callprocMenthod.POSTXML(obj, "acquisitionproperty_update");
    // console.log(result);
      if (result[0].status == "0") {
        if(headerValue==0)
          {
            await sendRes.sendResponse(res,sendRes.statusCode.FOUR_ZERO_ZERO, 0,result[0].message);
          }
          else{
            await sendRes.sendResponseUat(res,sendRes.statusCode.FOUR_ZERO_ZERO,0,result[0].message);
          }
        
      } else {
        if(headerValue==0)
          {
            await sendRes.sendResponse(res,sendRes.statusCode.OK,1,result[0].message);
          }
          else
          {
            await sendRes.sendResponseUat(res,sendRes.statusCode.OK,1,result[0].message);
          }   
      }
  } catch (error) 
  {
    //console.log(error);
      if(headerValue==0)
      {
          await sendRes.sendResponse(res,sendRes.statusCode.FIVE_ZERO_ZERO,0,error);
      }
      else
      {
          await sendRes.sendResponseUat(res,sendRes.statusCode.FIVE_ZERO_ZERO,0,error);
      }
  }
};



export const acquPropertyAppDec= async (req, res) => {
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
     var result = await callprocMenthod.POST(obj, 'acquisition_property_app_dec')
     
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