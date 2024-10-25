import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';
import xml2js from 'xml2js';

export const getMfn = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.body.body);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"ib_id":"' +JsonData.id +'","page":"'+JsonData.page+'","size":"'+JsonData.size+'"}';
                    
        }else{ 
          let fromdate =req.body.fromdate!=""? convertToISO8601(req.body.fromdate):null;
          let todate=req.body.todate!=""? convertToISO8601(req.body.todate):null;
          if(req.body.fromdate == "" ||req.body.fromdate == null) 
            {
              obj = '{"ib_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","marital_status":"'+req.body.martitalstatus+'","fromdate":null,"todate":null,"created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';

            }
            else
            {
              obj = '{"ib_id":"' +req.body.id +'","personal_no":"'+req.body.personalno+'","command_id":"'+req.body.command+'","marital_status":"'+req.body.martitalstatus+'","fromdate":"'+fromdate+'","todate":"'+todate+'","created_by":"' +req.user.id +'","page":"'+req.body.page+'","size":"'+req.body.size+'"}';
            }
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'mfn_select')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result);
          }
          else
          {
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result);
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

  export const createMfn = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let photographfilepath=null;
      let detailsofcitizenshippath=null;
      let undertakingapplicantpath=null;
      let photograph;
      let detailsofcitizenship;
      let undertakingapplicant;
      let foreigndob;
      let dateoffirstcontact;
      let dateofmarriage;
      let partnerdob;
      let dob;
      const statusCode = 0;
      const message = "";
      if (req.files.photograph != undefined) {
        photograph = req.files.photograph[0].filename;
        photographfilepath = 'storage/' + photograph;
      }
      if (req.files.detailsofcitizenship != undefined) {
        detailsofcitizenship = req.files.detailsofcitizenship[0].filename;
        detailsofcitizenshippath = 'storage/' + detailsofcitizenship;
      }
      if (req.files.undertakingapplicant != undefined) {
        undertakingapplicant = req.files.undertakingapplicant[0].filename;
        undertakingapplicantpath = 'storage/' + undertakingapplicant;
      }
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        date = convertToISO8601(JsonData.date);
        dateofmarriage=convertToISO8601(JsonData.dateofmarriage);
        dateoffirstcontact=convertToISO8601(JsonData.dateoffirstcontact);
        partnerdob=convertToISO8601(JsonData.partnerdob);
        obj ={personal_no:JsonData.personalno ,rank_name:JsonData.rank ,can_name: JsonData.name ,comm: JsonData.command ,present_unit: JsonData.presentunit,mfn_date: date ,place_of_birth:JsonData.placeofbirth,mfn_religion: JsonData.religion ,father_name:JsonData.fathername,mother_name: JsonData.mothername ,permanent_home_add: JsonData.permanentaddress ,name_of_foreign: JsonData.foreignnationname,marriage_date:dateofmarriage,mfn_nationality:JsonData.nationality ,partner_religion:JsonData.partnerreligion ,partner_dob:partnerdob,partner_placeofbirth:JsonData.partnerplaceofbirth,academic_professional_quali:JsonData.academicqualification ,proficiency_lang: JsonData.proficiencylang ,occupationxml: JsonData.occupationjson,marital_status:JsonData.martitalstatus ,is_pre_marrgae: JsonData.ispreviousmarriage ,pre_husband_wife: JsonData.pre_husbandwife,pre_children:JsonData.pre_childrendetails,prefathename: JsonData.pre_fathername ,premothername: JsonData.pre_mothername ,preoccupation: JsonData.pre_occupation ,prenationality: JsonData.pre_nationality,prerelision: JsonData.pre_religion ,prepresentaddress: JsonData.pre_presentaddress ,pre_permananent_adressown:JsonData.pre_permanentaddressown ,residential_addresse: JsonData.residential_addresse ,preaddress_abroad: JsonData.pre_presentaddressabroad,visitingdetails_xml: JsonData.visitingdetails_json ,knownPersonaldetails_xml: JsonData.knownPersonaldetails_json,date_first_contact: dateoffirstcontact,undertaking_applicate:JsonData.undertakingapplicant ,photo_graph:photographfilepath ,intimation_spouse: JsonData.intimationspouse ,created_by: req.user.id,status: statusCode,message:message }
  
      } else {
          
        foreigndob = convertToISO8601(req.body.foreigndob);
        //dateofmarriage=convertToISO8601(req.body.dateofmarriage);
        dateoffirstcontact=convertToISO8601(req.body.dateoffirstcontact);
        dob=convertToISO8601(req.body.dob);
       

        obj ={personal_no:req.body.personalno ,rank_name:req.body.rank ,can_name: req.body.name ,comm: req.body.command ,present_unit: req.body.presentunit,personal_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,personal_branch:req.body.branch,per_dob:dob,place_ofbirth:req.body.placeofbirth,per_religion:req.body.religion,name_offather:req.body.nameoffather,name_ofmother:req.body.nameofmother,per_homeaddress:req.body.perhomeaddress,foreign_name: req.body.foreignname ,foreign_nationality:req.body.foreignnationality,foreign_religion: req.body.foreignreligion ,foreign_dob:foreigndob,foreign_placeofbirth: req.body.foreignplaceofbirth ,foreign_occupation: req.body.foreignoccupation ,foreign_martitalstatus: req.body.foreignmartitalstatus,foreign_ispreviousmarriage:req.body.foreignispreviousmarriage,aca_qualification:req.body.aca_qualification ,foreign_language:req.body.language ,spouse_fname:req.body.spousefname,spouse_foccupation:req.body.spousefoccupation,spouse_fnationality:req.body.spousefnationality ,spouse_freligion: req.body.spousefreligion ,spouse_fpresentaddress: req.body.spousefpresentaddress,spouse_fpermanentaddressown:req.body.spousefpermanentaddressown ,spouse_mname: req.body.spousemname ,spouse_moccupation : req.body.spousemoccupation,spouse_mnationality:req.body.spousemnationality,spouse_mreligion: req.body.spousemreligion ,spouse_mpresentaddress: req.body.spousempresentaddress ,spouse_mpermanentaddressown : req.body.spouse_mpermanentaddressown ,residential_addresse : req.body.residential_addresses,visiting_details : req.body.visitingdetails ,known_personaldetails : req.body.knownpersonaldetails ,date_firstcontact:dateoffirstcontact ,under_takingapplicate:undertakingapplicantpath ,photo_graph:photographfilepath ,declaration_ofcitizenship: req.body.declarationofcitizenship,details_ofcitizenship:detailsofcitizenshippath,spousedetail:req.body.spousedetail,commanding_officer:req.body.commandingofficer ,created_by: req.user.id,status: statusCode,message:message }
      }
      var result = await callprocMenthod.POSTXML(obj, 'mfn_insert');
      //console.log(result);
      if (result[0].status == "0") {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 0,  result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 0, result[0].message);
        }
  
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
        }
  
      }
    } catch (error) {
      //console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const getMfnById = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
        let obj;  
       
        if(headerValue == 0){
          const decryptedData = await encryptDecrypt.decrypt(req.query.id);
          const JsonData = JSON.parse(decryptedData);

            obj = '{"m_id":"' +JsonData +'"}';
                    
        }else{ 
          obj = '{"m_id":"' +req.query.id +'","created_by":"'+req.user.id+'"}';
                              
        }
      
   
      var result = await callprocMenthod.GET(obj,'mfn_selectbyid')
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
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
          }
          else
          {
            var listaddress ={};
            listaddress=(JSON.parse(result[0].residential_addresses))
            result[0].residential_addresses=listaddress;
            var listspouse ={};
            listspouse=(JSON.parse(result[0].spousedetail))
            result[0].spousedetail=listspouse;
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
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

  export const updateMfn = async (req, res, next) => {
    const headerValue = req.header("isUAT");
    try {
      let obj; 
      let photographfilepath=null;
      let detailsofcitizenshippath=null;
      let undertakingapplicantpath=null;
      let photograph;
      let detailsofcitizenship;
      let undertakingapplicant;
      let foreigndob;
      let dateoffirstcontact;
      let dateofmarriage;
      let partnerdob;
      let dob;
      const statusCode = 0;
      const message = "";
      if (req.files.photograph != undefined) {
        photograph = req.files.photograph[0].filename;
        photographfilepath = 'storage/' + photograph;
      }
      if (req.files.detailsofcitizenship != undefined) {
        detailsofcitizenship = req.files.detailsofcitizenship[0].filename;
        detailsofcitizenshippath = 'storage/' + detailsofcitizenship;
      }
      if (req.files.undertakingapplicant != undefined) {
        undertakingapplicant = req.files.undertakingapplicant[0].filename;
        undertakingapplicantpath = 'storage/' + undertakingapplicant;
      }
      
      if (headerValue == 0) {
        const reqjson = JSON.parse(req.body.body);
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
        date = convertToISO8601(JsonData.date);
        dateofmarriage=convertToISO8601(JsonData.dateofmarriage);
        dateoffirstcontact=convertToISO8601(JsonData.dateoffirstcontact);
        partnerdob=convertToISO8601(JsonData.partnerdob);

        obj ={mfn_id:JsonData.id,personal_no:JsonData.personalno ,rank_name:JsonData.rank ,can_name: JsonData.name ,comm: JsonData.command ,present_unit: JsonData.presentunit,mfn_date: date ,place_of_birth:JsonData.placeofbirth,mfn_religion: JsonData.religion ,father_name:JsonData.fathername,mother_name: JsonData.mothername ,permanent_home_add: JsonData.permanentaddress ,name_of_foreign: JsonData.foreignnationname,marriage_date:dateofmarriage,mfn_nationality:JsonData.nationality ,partner_religion:JsonData.partnerreligion ,partner_dob:partnerdob,partner_placeofbirth:JsonData.partnerplaceofbirth,academic_professional_quali:JsonData.academicqualification ,proficiency_lang: JsonData.proficiencylang ,occupationxml: JsonData.occupationjson,marital_status:JsonData.martitalstatus ,is_pre_marrgae: JsonData.ispreviousmarriage ,pre_husband_wife: JsonData.pre_husbandwife,pre_children:JsonData.pre_childrendetails,prefathename: JsonData.pre_fathername ,premothername: JsonData.pre_mothername ,preoccupation: JsonData.pre_occupation ,prenationality: JsonData.pre_nationality,prerelision: JsonData.pre_religion ,prepresentaddress: JsonData.pre_presentaddress ,pre_permananent_adressown:JsonData.pre_permanentaddressown ,residential_addresse: JsonData.residential_addresse ,preaddress_abroad: JsonData.pre_presentaddressabroad,visitingdetails_xml: JsonData.visitingdetails_json ,knownPersonaldetails_xml: JsonData.knownPersonaldetails_json,date_first_contact: dateoffirstcontact,undertaking_applicate:JsonData.undertakingapplicant ,photo_graph:photographfilepath ,intimation_spouse: JsonData.intimationspouse ,updated_by: req.user.id,status: statusCode,message:message }
  
      } else {
       
        foreigndob = convertToISO8601(req.body.foreigndob);
        //dateofmarriage=convertToISO8601(req.body.dateofmarriage);
        dateoffirstcontact=convertToISO8601(req.body.dateoffirstcontact);
        dob=convertToISO8601(req.body.dob);
       

        obj ={m_id:req.body.id,personal_no:req.body.personalno ,rank_name:req.body.rank ,can_name: req.body.name ,comm: req.body.command ,present_unit: req.body.presentunit,personal_appointment:req.body.appointment,type_of_entry:req.body.typeofentry,personal_branch:req.body.branch,per_dob:dob,place_ofbirth:req.body.placeofbirth,per_religion:req.body.religion,name_offather:req.body.nameoffather,name_ofmother:req.body.nameofmother,per_homeaddress:req.body.perhomeaddress,foreign_name: req.body.foreignname ,foreign_nationality:req.body.foreignnationality,foreign_religion: req.body.foreignreligion ,foreign_dob:foreigndob,foreign_placeofbirth: req.body.foreignplaceofbirth ,foreign_occupation: req.body.foreignoccupation ,foreign_martitalstatus: req.body.foreignmartitalstatus,foreign_ispreviousmarriage:req.body.foreignispreviousmarriage,aca_qualification:req.body.aca_qualification ,foreign_language:req.body.language ,spouse_fname:req.body.spousefname,spouse_foccupation:req.body.spousefoccupation,spouse_fnationality:req.body.spousefnationality ,spouse_freligion: req.body.spousefreligion ,spouse_fpresentaddress: req.body.spousefpresentaddress,spouse_fpermanentaddressown:req.body.spousefpermanentaddressown ,spouse_mname: req.body.spousemname ,spouse_moccupation : req.body.spousemoccupation,spouse_mnationality:req.body.spousemnationality,spouse_mreligion: req.body.spousemreligion ,spouse_mpresentaddress: req.body.spousempresentaddress ,spouse_mpermanentaddressown : req.body.spouse_mpermanentaddressown ,residential_addresse : req.body.residential_addresses,visiting_details : req.body.visitingdetails ,known_personaldetails : req.body.knownpersonaldetails ,date_firstcontact:dateoffirstcontact ,under_takingapplicate:undertakingapplicantpath ,photo_graph:photographfilepath ,declaration_ofcitizenship: req.body.declarationofcitizenship,details_ofcitizenship:detailsofcitizenshippath,spousedetail:req.body.spousedetail,commanding_officer:req.body.commandingofficer ,updated_by: req.user.id,status: statusCode,message:message }
      
      }
      var result = await callprocMenthod.POSTXML(obj, 'mfn_update');
      //console.log(result);
      if (result[0].status == "0") {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0,  result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
        }
  
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
        }
  
      }
    } catch (error) {
     // console.log(error);
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };

  export const deleteMfn = async (req, res) => {
    //console.log(req);
    const headerValue = req.header("isUAT");
  
    try {
      const statusCode = 0;
      const message = '';
      let obj;
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
        obj = "{\"m_id\":\"" + JsonData + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
      else {
        obj = "{\"m_id\":\"" + req.query.id + "\",\"deleted_by\":\"" + req.user.id + "\",\"status\":\"" + statusCode + "\",\"message\":\"" + message + "\"}";
      }
  
      var result = await callprocMenthod.POST(obj, 'mfn_delete')
     // console.log(result);
      if (result[0].status == '0') {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, result[0].message);
        }
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, result[0].message);
        }
        else {
          await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, result[0].message);
        }
      }
  
    } catch (error) {
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
      else {
        await sendRes.sendResponseUat(res, sendRes.statusCode.FIVE_ZERO_ZERO, 0, error);
      }
    }
  };



  export const getMfnAddress = async (req, res) => {
    const headerValue = req.header("isUAT");
    
    try {
      let obj;
    if (headerValue == 0) {
      const decryptedData = await encryptDecrypt.decrypt(req.query.personalno);
      const JsonData = JSON.parse(decryptedData);
      obj =
        '{"personal_no":"' +
        JsonData.personalno +'"}';
    } else {
      obj =
        '{"personal_no":"' +
        req.query.personalno +'"}';
    }
      var result = await callprocMenthod.GET(obj,'mfn_personal_add_select')
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
            
        await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
          }
          else
          {
            var listaddress ={};
            listaddress=(JSON.parse(result[0].residentialadd))
            result[0].residentialadd=listaddress;
            await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND,result[0]);
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


  export const approvedeclineMfn = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
  
      let statusCode = 0;
      let message = "";
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.body.body);
        const JsonData = JSON.parse(decryptedData);
  
        obj =
          '{"boi_omi_id":"' +
          JsonData.id +
          '","formremark":"' +
          JsonData.remark +
          '","dps_status":"' +
          JsonData.status +
          '","app_deci_by":"' +
          JsonData.req.user.id +
          '","status":"' +
          statusCode +
          '","message":"' +
          message +
          '"}';
      } else {
        obj =
          '{"mfnid":"' +
          req.body.id +
          '","remark":"' +
          req.body.remark +
          '","formstatus":"' +
          req.body.status +
          '","app_deci_by":"' +
          req.user.id +
          '","dependent_id":"' +
          req.body.dependentid +
          '","status":"' +
          statusCode +
          '","message":"' +
          message +
          '"}';
      }
  
      //console.log(obj)
      var result = await callprocMenthod.POST(obj, "mfn_app_dec");
      // console.log(result);
      if (result[0].status == "0") {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            0,
            result[0].message
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.OK,
            0,
            result[0].message
          );
        }
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            result[0].message
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.OK,
            1,
            result[0].message
          );
        }
      }
    } catch (error) {
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      }
    }
  };

 
  
  export const getmfnActivity = async (req, res) => {
    const headerValue = req.header("isUAT");
  
    try {
      let obj;
  
      if (headerValue == 0) {
        const decryptedData = await encryptDecrypt.decrypt(req.query.id);
        const JsonData = JSON.parse(decryptedData);
  
        obj = '{"bo_id":"' + JsonData + '"}';
      } else {
        obj = '{"bo_id":"' + req.query.id + '"}';
      }
  
      //console.log(obj)
      var result = await callprocMenthod.GET(obj, "mfn_activity");
      //console.log(result);
      if (!result) {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.FOUR_ZERO_ZERO,
            0,
            sendRes.statusMessage.DATA_NOT_FOUND
          );
        }
      } else {
        if (headerValue == 0) {
          await sendRes.sendResponse(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result
          );
        } else {
          await sendRes.sendResponseUat(
            res,
            sendRes.statusCode.OK,
            1,
            sendRes.statusMessage.DATA_GET_FOUND,
            result
          );
        }
      }
    } catch (error) {
      //console.log(error)
      if (headerValue == 0) {
        await sendRes.sendResponse(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      } else {
        await sendRes.sendResponseUat(
          res,
          sendRes.statusCode.FIVE_ZERO_ZERO,
          0,
          error
        );
      }
    }
  };