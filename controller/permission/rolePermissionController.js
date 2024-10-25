import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import xml2js from 'xml2js';



export const getrolePermission = async (req, res) => {
    const headerValue = req.header("isUAT");
    let obj;
    try {
        if(headerValue==0)
            {
              const decryptedData = await encryptDecrypt.decrypt(req.body.body);
              const JsonData = JSON.parse(decryptedData);
               obj = "{\"menu_id\":\"" + JsonData.menuid + "\",\"submenu_id\":\"" + JsonData.submenuid + "\",\"role_id\":\"" + JsonData.roleid + "\"}";
            }
            else
            {
                let menuid;
                let submenuid;
                let menu_id=req.body.menuid;
                let submenu_id=req.body.submenuid
                if(menu_id==undefined || submenu_id==undefined)
                    {
                         menuid=null;
                         submenuid=null;
                    }
               obj = "{\"menu_id\":\"" + 0 + "\",\"submenu_id\":\"" + 0 + "\",\"role_id\":\"" + req.body.roleid + "\"}";
              // console.log(obj)
            }
         
      var result = await callprocMenthod.GET(obj,'role_permission_select')
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
            const isadd=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isadd : el.isadd, 0);
            const isedit=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isedit : el.isedit, 0);
            const isview=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isview : el.isview, 0);
            const isdelete=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isdelete : el.isdelete, 0);
            const isapproved =degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isapproved : el.isapproved, 0);
            const isdeclined=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isdeclined : el.isdeclined, 0);
            const isrecommended=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isrecommended : el.isrecommended, 0);
            const isnonrecommended=degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isnonrecommended : el.isnonrecommended, 0);
            knownSymbolsArr.push(el.menuname);
            finalArr.push({
              menuname: el.menuname,
              menuid: menuid,
              menuurl:menuurl,
              isSubMenu: isSubMenu,
              isadd:isadd,
              isedit:isedit,
              isdelete:isdelete,
              isview:isview,
              isapproved:isapproved,
              isdeclined:isdeclined,
              isrecommended:isrecommended,
              isnonrecommended:isnonrecommended
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
                menuid: list1[j].menuid,
                isadd: list1[j].isadd,
                isview :list1[j].isview,
                isedit:list1[j].isedit,
                isdelete:list1[j].isdelete,
                isapproved:list1[j].isapproved,
                isdeclined:list1[j].isdeclined,
                isrecommended:list1[j].isrecommended,
                isnonrecommended:list1[j].isnonrecommended
              });

            }
          }
          listFinal.push({
            menuname: list[i].menuname,
            menuid: list[i].menuid,
            isadd:list[i].isadd,
              isedit:list[i].isedit,
              isdelete:list[i].isdelete,
              isview:list[i].isview,
              isapproved:list[i].isapproved,
              isdeclined:list[i].isdeclined,
              isrecommended:list[i].isrecommended,
              isnonrecommended:list[i].isnonrecommended,
            isSubMenu: list[i].menuurl == "#" ? true : false,
            submenulist:list[i].menuurl == "#" ? listSFinal : [],
          });

        }
        const commonResponse={
          MenuList:listFinal
        }
        console.log(listFinal)
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



  
export const insertRolePermission = async (req, res) => {
  const headerValue = req.header("isUAT");
  let obj;
  let builder;
  let xml;
  let statusCode=0;
  let message='';
  try {
      if(headerValue==0)
          {
            const decryptedData = await encryptDecrypt.decrypt(req.body.body);
            const JsonData = JSON.parse(decryptedData);
            builder = new xml2js.Builder();
            xml = builder.buildObject(JsonData);
            }
          else
          {
            builder = new xml2js.Builder();
            xml = builder.buildObject(req.body);
            console.log(xml)
            
        }
        obj = {
          xml_input: xml,
          created_by:req.user.id,
          message: message,
          status: statusCode,
          
        };
    var result = await callprocMenthod.POSTXML(obj,'role_permission_insert')
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
      
      
      if(headerValue==0)
        {
      await sendRes.sendResponse(res, sendRes.statusCode.OK, 1,result[0].message);
        }
        else
        {
          //console.log(commonResponse)
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1,result[0].message);
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