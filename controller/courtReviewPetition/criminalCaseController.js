import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";

export const getCriminalCase = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"cs_id":"' +JsonData.id +'","personal_no":"'+JsonData.personalno+'","cd_rank":"'+JsonData.rank+'","cs_name":"' +JsonData.name +'","created_by":"' +req.user.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          obj = '{"cs_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","cd_rank":"'+req.body.rank+'","cs_name":"' +req.body.name +'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'criminal_case_select')
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
