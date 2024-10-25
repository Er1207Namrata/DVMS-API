import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const getSubMenu = async (req, res) => {
    const headerValue = req.header("isUAT");
    let obj;
    try {
        if(headerValue==0)
            {
              const decryptedData = await encryptDecrypt.decrypt(req.body.body);
              const JsonData = JSON.parse(decryptedData);
               obj = "{\"menu_id\":\"" + JsonData.menuid + "\"}";
            }
            else
            {
               obj = "{\"menu_id\":\"" + req.body.menuid + "\"}";
            }
          
      var result = await callprocMenthod.GET(obj,'submenu_select')
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


  export const getmenuSubmenu = async (req, res) => {
    const headerValue = req.header("isUAT");
    let obj;
    try {
      var result = await callprocMenthod.GETWITHPEARA('menu_submenu_select')
      //console.log(result)
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
        const arr1 = result;
        const knownSymbolsArr = [];
        const finalArr = [];
        const degroupedArr = arr1.flat();
        degroupedArr.forEach(el => {
          if (knownSymbolsArr.indexOf(el.menuname) === -1) {
            const menuid = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.menuid : el.menuid, 0);
            const menuurl = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.menuurl : el.menuurl, 0);
            const isSubMenu = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.issubmenu : el.issubmenu, 0);
          
            knownSymbolsArr.push(el.menuname);
            finalArr.push({
              menuname: el.menuname,
              menuid: menuid,
              menuurl:menuurl,
              isSubMenu: isSubMenu
              
            });
          }
        });
        let listFinal = [];
        let Finallst = [];
        const list = finalArr;
        //console.log(list);
        const list1 = result;
        for (var i = 0; i <= list.length - 1; i++) {

          let listSFinal = [];
          for (var j = 0; j < list1.length; j++) {
            if (list[i].menuid == list1[j].menuid) {
              listSFinal.push({
                submenuid: list1[j].submenuid,
                submenuname: list1[j].submenuname,
                menuid: list1[j].menuid
                
              });

            }
          }
          listFinal.push({
            menuname: list[i].menuname,
            menuid: list[i].menuid,
            issubmenu: list[i].menuurl == "#" ? true : false,
            children:list[i].menuurl == "#" ? listSFinal : [],
          });

        }
       // console.log(listFinal)
        const commonResponse={
          MenuList:listFinal
        }
       // console.log(commonResponse)
        if(headerValue==0)
          {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,commonResponse);
          }
          else
          {
            //console.log(commonResponse)
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,commonResponse);
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


  export const getofficerdashboard = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj;
      if(req.user==undefined)
      {
        obj = '{"user_id":"' + 0+ '"}';
      }
       else
       {
        obj = '{"user_id":"' + req.user.id+ '"}';
       }
       
       var result = await callprocMenthod.GET(obj, "officer_dashboard");
       if (!result) {
          await sendRes.sendResponseUat( res,sendRes.statusCode.OK, 0, sendRes.statusMessage.Data);
        
      }
      else
      {
        await sendRes.sendResponseUat( res,sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result);
        
      }
    } catch (error) {
      //console.log(error)
      
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      
    }
  };