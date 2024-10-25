import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";


export const Login = async (req, res, next) => {
  const headerValue = req.header("isUAT");
  try {
    let obj;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      obj =
        '{"Login_Id":"' +
        JsonData.LoginId +
        '","user_password":"' +
        JsonData.Password +
        '"}';
    } else {
      obj =
        '{"Login_Id":"' +
        req.body.LoginId +
        '","user_password":"' +
        req.body.Password +
        '"}';
    }
    var result = await callprocMenthod.GET(obj, "login");
    console.log(result);
    if (result[0].status=="0") {
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FOUR_ZERO_ZERO,
          0,
          result[0].message
        );
      }
    } else {
     
      const token = sendRes.generateToken(result);
     // console.log(token)
       //menu list procedure call
     obj = '{"user_Id":"' + result[0].id+ '"}';
     var result1 = await callprocMenthod.GET(obj, "permission_user");
     const arr1 = result1;
     const knownSymbolsArr = [];
     const finalArr = [];
     const degroupedArr = arr1.flat();
     degroupedArr.forEach(el => {
       if (knownSymbolsArr.indexOf(el.menuname) === -1) {
         const id = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.id : el.id, 0);
         const menuurl = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.menuurl : el.menuurl, 0);
         const isSubMenu = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isSubMenu : el.isSubMenu, 0);
         const level = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.level : el.level, 0);
         const title = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.title : el.title, 0);
         const cssclass = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.cssclass : el.cssclass, 0);
         const icon = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.icon : el.icon, 0);
         const active = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isactive : el.isactive, 0);
         const isadd = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isadd : el.isadd, 0);
         const isview = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isview : el.isview, 0);
         const isdelete = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isdelete : el.isdelete, 0);
         const isedit = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isedit : el.isedit, 0);
         const isapprovedallow = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isapprovedallow : el.isapprovedallow, 0);
         const isrecommendallow = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isrecommendallow : el.isrecommendallow, 0);
         
         knownSymbolsArr.push(el.menuname);
         finalArr.push({
          menuname: el.menuname,
           id: id,
           menuurl: menuurl,
           isSubMenu: isSubMenu,
           level:level,
           title:title,
           cssclass:cssclass,
           icon:icon,
           isactive:active,
           isadd:isadd,
           isview:isview,
           isdelete:isdelete,
           isedit:isedit,
           isapprovedallow:isapprovedallow,
           isrecommendallow:isrecommendallow
         });
       }
     });
     let listFinal = [];
     let Finallst = [];
     const list = finalArr;
     const list1 = result1;
     for (var i = 0; i <= list.length - 1; i++) {

       let listSFinal = [];
       for (var j = 0; j < list1.length; j++) {
         if (list[i].id == list1[j].id) {
           listSFinal.push({
            path: list1[j].submenuurl,
            officerurl:list1[j].officerurl,
             title: list1[j].submenuname,
             type:'sub',
             submenuid:list1[j].submenuid,
             cssclass:list1[j].subcssclass,
             isadd:list1[j].isadd,
             isview:list1[j].isview,
             isdelete:list1[j].isdelete,
             isedit:list1[j].isedit,
             isapprovedallow:list1[j].isapprovedallow,
             isrecommendallow:list1[j].isrecommendallow,
             totalcount :list1[j].totalcount 
             
           });

         }
       }
       listFinal.push({
        menuid:list[i].id,
        level:list[i].level,
        title: list[i].menuname,
        icon:list[i].icon,
        type: list[i].menuurl == "#" ? 'sub' : 'title',
        active:list[i].isactive,
        path: list[i].menuurl== "#" ? null : list[i].menuurl,
        cssclass:list[i].cssclass,
        isadd:list[i].isadd,
        isview:list[i].isview,
        isdelete:list[i].isdelete,
        isedit:list[i].isedit,
        isapprovedallow:list[i].isapprovedallow,
        isrecommendallow:list[i].isrecommendallow,
        
         children:list[i].menuurl == "#" ? listSFinal : [],
       });

     }
     const Expired= process.env.EXPIRE 
     const username=result[0].name;
     const loginId=result[0].loginid
     const mobileNo=result[0].mobileno;
     const userrole=result[0].usertype;
     const profilePic=result[0].profilepic;
     const role_id=result[0].role_id;
     const personalno=result[0].personalno;
     const unit=result[0].unit;
     const command=result[0].command;
     const commandname=result[0].commandname;
     const rank=result[0].rank;

     const commonResponse = {
      
       username,
       role_id,
       loginId,
       mobileNo,
       userrole,
       profilePic,
       token,
       Expired,
       personalno,
       unit,
       command,
       commandname,
       rank,
       MenuList:listFinal
       };
     // end the menu list logic
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message,
          commonResponse
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.OK,
          1,
          result[0].message,
          commonResponse
        );
      }
    }
  } catch (error) {
   // console.log(error)
    if (headerValue == 0) {
      await sendRes.sendResponse(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        sendRes.statusMessage.SERVER_BUSY
      );
    } else {
      await sendRes.sendResponseUat(
        res,
        sendRes.statusCode.FIVE_ZERO_ZERO,
        0,
        sendRes.statusMessage.SERVER_BUSY
      );
    }
  }
};






export const permission_user = async (req, res, next) => {
  const headerValue = req.header('isUAT');
  try {

    let obj;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.body.body);
      const JsonData = JSON.parse(decryptedData);
      obj = "{\"user_Id\":\"" + '1' + "\"}";
    }
    else {
      obj = "{\"user_Id\":\"" + req.body.user_id + "\"}";
    }
    var result = await callprocMenthod.GET(obj, 'permission_user')
    //console.log(result);
    if (!result) {
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
      }
    }
    else {

      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, token);
      }
      else {
        const arr1 = result;
        const knownSymbolsArr = [];
        const finalArr = [];
        const degroupedArr = arr1.flat();
        degroupedArr.forEach(el => {
          if (knownSymbolsArr.indexOf(el.menuname) === -1) {
            const id = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.id : el.id, 0);
            const menuurl = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.menuurl : el.menuurl, 0);
            const isSubMenu = degroupedArr.reduce((acc, val) => val.menuname === el.menuname ? el.isSubMenu : el.isSubMenu, 0);
            knownSymbolsArr.push(el.menuname);
            finalArr.push({
              menuname: el.menuname,
              id: id,
              menuurl: menuurl,
              isSubMenu: isSubMenu
            });
          }
        });
        let listFinal = [];
        let Finallst = [];
        const list = finalArr;
        const list1 = result;
        for (var i = 0; i <= list.length - 1; i++) {

          let listSFinal = [];
          for (var j = 0; j < list1.length; j++) {
            if (list[i].id == list1[j].id) {
              listSFinal.push({
                subMenuId: list1[j].submenuid,
                submenuname: list1[j].submenuname,
                submenuUrl: list1[j].submenuurl,
                menuid: list1[j].id
              });

            }
          }
          listFinal.push({
            menuname: list[i].menuname,
            menuid: list[i].id,
            menuurl: list[i].menuurl,
            isSubMenu: list[i].menuurl == "#" ? true : false,
            submenulist:list[i].menuurl == "#" ? listSFinal : [],
          });

        }
        const commonResponse={
          MenuList:listFinal
        }
        await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, commonResponse);
      }

    }
  } catch (error) {
    //console.log(error)
    if (headerValue == 0) {
      await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }
    else {
      await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, sendRes.statusMessage.SERVER_BUSY);
    }

  }
};