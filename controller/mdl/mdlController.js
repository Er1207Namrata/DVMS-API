import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';


export const insertMdl = async (req, res) => {
    
    const headerValue = req.header("isUAT");
    try
    {
        let obj;  
        let DOB;  
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
          DOB= convertToISO8601(JsonData.dob);
          //console.log(moveAquDate)
            obj = '{"personal_no":"' +JsonData.personalno +'","rank_name":"'+JsonData.rank+'","can_name":"'+JsonData.name+'","unit_name":"' +JsonData.unitname +'","comm":"'+JsonData.command+'","date_of_birth":"'+DOB+'","mobile_no":"'+JsonData.mobileno+'","ismtdqualified":"'+JsonData.ismtdqualified+'","vehile_type":"'+JsonData.vehiletypeid+'","cdl_no":"'+JsonData.cdlno+'","cdl_issuedby":"'+JsonData.acquaddress+'","cdl_validdate":"'+JsonData.acqustatus+'","certificate_medical":"'+JsonData.certificatemedical+'","self_declartion":"'+JsonData.selfdeclartion+'","driving_test":"'+JsonData.drivingtest+'","drivingtest_certif":"'+JsonData.drivingtestcertif+'","mdl_status":"'+JsonData.mdlstatus+'","mdl_no":"'+JsonData.mdlno+'","mdl_validdate":"'+JsonData.mdlvaliddate+'","created_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                    
        }else{ 
          console.log(req.body.body);
          const reqjson= JSON.parse(reqjson);
          console.log(reqjson);
          console.log(reqjson.personalno)
           console.log(req.files.drivingtestcertif[0].filename)
           console.log(req.files.certificatemedical[0].filename)
           const drivingtestcertif=req.files.drivingtestcertif[0].filename;
           const certificatemedical=req.files.certificatemedical[0].filename;
            DOB= convertToISO8601(reqjson.dob);
            mdlvaliddate=convertToISO8601(reqjson.mdlvaliddate);
            cdlvaliddate=convertToISO8601(reqjson.cdlvaliddate);
            obj = '{"personal_no":"' +reqjson.personalno +'","rank_name":"'+reqjson.rank+'","can_name":"'+reqjson.name+'","unit_name":"' +reqjson.unitname +'","comm":"'+reqjson.command+'","date_of_birth":"'+DOB+'","mobile_no":"'+reqjson.mobileno+'","ismtdqualified":"'+req/body.body.ismtdqualified+'","vehile_type":"'+reqjson.vehiletypeid+'","cdl_no":"'+reqjson.cdlno+'","cdl_issuedby":"'+reqjson.cdlissuedby+'","cdl_validdate":"'+cdlvaliddate+'","certificate_medical":"'+certificatemedical+'","self_declartion":"'+reqjson.selfdeclartion+'","driving_test":"'+reqjson.drivingtest+'","drivingtest_certif":"'+drivingtestcertif+'","mdl_status":"'+reqjson.mdlstatus+'","mdl_no":"'+reqjson.mdlno+'","mdl_validdate":"'+mdlvaliddate+'","created_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                              
        }
        console.log(obj);
        var result = await callprocMenthod.POST(obj, "mdl_insert");
       // console.log(result);
        if (result[0].status == "0") {
          if(headerValue==0)
            {
              await sendRes.sendResponse(res,sendRes.statusCode.FOUR_ZERO_ZERO, 0,sendRes.statusMessage.FAILD_CREATE);
            }
            else{
              await sendRes.sendResponseUat(res,sendRes.statusCode.FOUR_ZERO_ZERO,0,sendRes.statusMessage.FAILD_CREATE);
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
      console.log(error);
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