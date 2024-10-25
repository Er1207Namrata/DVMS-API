import sendRes from '../../helper/commonResponse.js';
import encryptDecrypt from '../../helper/encrypt-decrypt.js'
import callprocMenthod from "../../config/callProcedure.js";


export const propertyApprDecl= async (req, res) => {
    
    const headerValue = req.header("isUAT");
    try
    {
        let obj;      
        const statusCode = 0;
        const message = "";
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);
         
            obj = '{"prop_id":"' +JsonData.id +'","type":"' +JsonData.type +'","remark":"' +JsonData.remark +'","prop_status":"' +JsonData.status +'","app_decl_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                    
        }else{ 
          
            obj = '{"prop_id":"' +req.body.id +'","type":"' +req.body.type +'","remark":"' +req.body.remark +'","prop_status":"' +req.body.status +'","app_decl_by":"'+ req.user.id +'","status":"' +statusCode +'","message":"' +message +'"}';
                              
        }
        //console.log(obj);
        var result = await callprocMenthod.POST(obj, "property_app_decl");
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