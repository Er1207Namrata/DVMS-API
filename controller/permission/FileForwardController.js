import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";



export const fileforwardInsert = async (req, res) => {
    
     const headerValue = req.header("isUAT");
       try {
         let obj;
         const statusCode = 0;
         const message = "";
         if(headerValue == 0){
           const decryptedData = await encryptDecrypt.decrypt(req.body.body);
           const JsonData = JSON.parse(decryptedData);
          
           obj =
           '{"menu_id":"' +
           JsonData.MenuId +
           '","submenu_id":"' +
           JsonData.SubMenuId +
           '","role_id":"'+JsonData.RolId+'","priority":"'+JsonData.Priority+'","created_by":"'+req.user.id+'","message":"' +
           message +
           '","status":"' +
           statusCode +
           '"}';
        
         }else{
            obj =
           '{"menu_id":"' +
           req.body.MenuId +
           '","submenu_id":"' +
           req.body.SubMenuId +
           '","role_id":"'+ req.body.RolId+'","priority":"'+ req.body.Priority+'","created_by":"'+ req.user.id+'","message":"' +
           message +
           '","status":"' +
           statusCode +
           '"}';
       
         }
         //console.log(obj);
         var result = await callprocMenthod.POST(obj, "forwardfile_insert");
        // console.log(result);
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
                 sendRes.statusMessage.OLD_PASS
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
export const fileforwardDelete = async (req, res) => {
    
        const headerValue = req.header("isUAT");
          try {
            let obj;
            const statusCode = 0;
            const message = "";
            if(headerValue == 0){
              const decryptedData = await encryptDecrypt.decrypt(req.body.body);
              const JsonData = JSON.parse(decryptedData);
             
              obj =
              '{"permissionid":"' +
              JsonData.PermissionId +
              '","deleted_by":"' +
              req.user.id +
              '","message":"' +
              message +
              '","status":"' +
              statusCode +
              '"}';
           
            }else{
                obj =
                '{"permissionid":"' +
                req.body.PermissionId +
                '","deleted_by":"' +
                req.user.id +
                '","message":"' +
                message +
                '","status":"' +
                statusCode +
                '"}';

            }
            //console.log(obj);
            var result = await callprocMenthod.POST(obj, "forwardfile_delete");
           // console.log(result);
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
                    sendRes.statusMessage.OLD_PASS
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
         //  console.log(error);
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
