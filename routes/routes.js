import express from 'express';
import { getAllRole, createRole, getAllRoleById, updateRole, deleteRole } from '../controller/masters/rolemasterController.js'
import { getAllOccupations, createOccupation, getOccupationById, updateOccupation, deleteOccupation }  from '../controller/masters/occupationmasterController.js'
import { getAllDisciplinaryStatus, createDisciplinaryStatus, getDisciplinaryStatusById, updateDisciplinaryStatus, deleteDisciplinaryStatus } from '../controller/masters/disciplinaryStatusMasterController.js'
import {  deleteuserRegistration, getuserRegistration, getuserRegistrationById, userRegistration, userRegistrationUpdate } from '../controller/userRegistrationController.js'
import { getAllUserType, createUserType, getAllUserTypeId, updateUserType, deleteUserType } from '../controller/masters/userTypeMasterController.js'
 
import authHeaderToken from '../validators/auth-token.js'
import { getAllPropertyType, createPropertyType, getPropertyTypeById, updatePropertyType, deletePropertyType } from '../controller/masters/propertyTypeController.js'
import { getVehicleList, createVehicleType, getVehicleTypeById, updateVehicleType, deleteVehicleType } from '../controller/masters/vehicleTypeMasterController.js'
import {  getOrganisationTypeList, createOrganisationType, getOrganisationTypeById, updateorganisationType, deleteorganisationType } from '../controller/masters/organisationTypeMasterController.js'
import { getBoardProceedingTypeList, createBoardProceedingType, getBoardProceedingTypeById, deleteBoardProceedingType, updateBoardProceedingType } from '../controller/masters/boardProceedingTypeMasterController.js'
import { getOownedByList, createownedBy, getownedById, updateownedBy, deleteownedBy } from '../controller/masters/ownedByMasterController.js'
import { getcomplaintTypeList, createComplaintType, getComplaintTypeId, updateComplaintType, deleteComplaintType } from '../controller/masters/complaintTypeMasterController.js'
import { getCourtList, createCourt, getCourtById, updateCourt, deleteCourt } from '../controller/masters/courtMasterController.js'
import { getRangetrainingList, createRangetraining, getRangetrainingById, updatRangetraining, deleteRangetraining } from '../controller/masters/rangeTrainingMasterController.js'
import { getdogSquadList, createdogSquad, getdogSquadById, updatedogSquad, deletedogSquad } from '../controller/masters/dogSquadMasterController.js'
import { getAllSecurityEquipment, createSecurityEquipment, getSecurityEquipmentById, updateSecurityEquipment, deleteSecurityEquipment } from '../controller/masters/securityEquipmentMasterController.js'
import { getOverallAssessmentById, getAllOverallAssessment, createOverallAssessment, updateOverallAssessment, deleteOverallAssessment } from '../controller/masters/overallAssessmentMasterController.js'
import { getAllStatus, createStatus, getStatusById, updateStatus, deleteStatus } from '../controller/masters/statusMasterController.js'
import { getAllPropertyShare, createPropertyShare, getPropertyShareById, updatePropertyShare, deletePropertyShare } from '../controller/masters/propertyShareMasterController.js'
import { getAllSecurityInfrastructure, createSecurityInfrastructure, updateSecurityInfrastructure, deleteSecurityInfrastructure, getSecurityInfrastructureById } from '../controller/masters/securityInfrastructureMasterController.js'
import { getAllReturnType, createReturnType, getReturnTypeById, updateReturnType, deleteReturnType } from '../controller/masters/returnTypeMasterController.js'
import { getAllMinorHead, createMinorHead, getMinorHeadById, updateMinorHead, deleteMinorHead } from '../controller/masters/minorHeadMasterController.js'
import { getAllBoardProceedingApproval, createBoardProceedingApproval, getBoardProceedingApprovalById, updateBoardProceedingApproval, deleteBoardProceedingApproval } from '../controller/masters/boardProceedingApprovalMasterController.js'
import { getAllIncidentType, createIncidentType, getIncidentTypeById, updateIncidentType, deleteIncidentType } from '../controller/masters/incidentTypeMasterController.js'
import { getAllPostMortemStatus, createPostMortemStatus, getPostMortemStatusById, updatePostMortemStatus, deletePostMortemStatus } from '../controller/masters/postMortemStatusMasterController.js'
import { getAllReligion, createreligion, getReligionById,updateReligion,deleteReligion } from '../controller/masters/religionMasterController.js'
import { getAllNationality,createnationality,getnationalityById,updatenationality,deletenationality} from '../controller/masters/nationalityMasterController.js'
import { getAlllanguage,createlangugae,getlangugaeById,updatelangugae,deletelangugae} from '../controller/masters/langugaeMasterController.js'
import { getAllrelationship,createrelationship,getrelationshipById,updaterelationship,deleterelationship} from '../controller/masters/relationshipMasterController.js'


import { format } from 'path';
import { Login,permission_user } from '../controller/auth/loginController.js';
import { forgotpassword } from '../controller/auth/forgotPasswordController.js';
import { changepassword } from '../controller/profile/changePasswordController.js';
import { createDVRecord, deletedvRecord, dvRecordAppDec, getdvRecord, getdvRecordActivity, getdvRecordById, updatedvRecord } from '../controller/dvRecord/dvRecordController.js';
import { updateProfile } from '../controller/profile/updateProfileController.js';
import { SendOtp, otpverify } from '../controller/auth/otpController.js';
import { getMenu } from '../controller/permission/menuController.js';
import { getmenuSubmenu, getofficerdashboard, getSubMenu } from '../controller/permission/submenuController.js';
import { getrolePermission, insertRolePermission } from '../controller/permission/rolePermissionController.js';
import { fileforwardDelete, fileforwardInsert } from '../controller/permission/fileForwardController.js';

import { getUserPermission, insertUserPermission } from '../controller/permission/userPermissionController.js';

import{getpersonalnoinfo} from '../controller/personalnoinfo/getpersonalnoinfoController.js';

import { createdisposalProperty, getDisposaliProperty,deletedisposalProperty, getDisposaliPropertyById, updatedisposalProperty, disposalPropertyAppDec } from '../controller/propertyReturn/disposalPropertyController.js';

import {  getAcquisitionProperty,acqumovableinsert,deleteacquproperty, getAcquisitionPropertyById, updateAcqumovable, acquPropertyAppDec} from '../controller/propertyReturn/acquPropertyController.js';
import { propertyApprDecl } from '../controller/propertyReturn/propertyAppdecController.js';
import { getempaboard ,empaboardinsert,empaboardupdate,empaboarddelete, empAboardRecNonrec, empAboardAppDec, empAboardActivity, getempaboardbyId} from '../controller/empAboard/employeeAboardController.js';

import { initalpropertyinsert,getinitalproperty,deleteinitalproperty, updateInitalProperty, getinitalpropertyById, initalpropertyAppDec } from '../controller/propertyReturn/initalPropertyReturnController.js';

import {getcomplaint,complaintinsert,deletecomplaint,updatecomplaint, getcomplaintById, approvedeclineComplaint, getComplaintActivity} from '../controller/complaint/complaintController.js'

import { createROG, getrog, getROGActivity, getrogById, Rogapprovedecline, rogdelete, rogrec_nonrec, updateROG } from '../controller/complaint/rogController.js';
import { upload } from '../helper/docfile.js';
import { insertMdl } from '../controller/mdl/mdlController.js';
import { getDropdowns, getUser, generate_file_number,createcategory,updatecategory,addsubcategory,updatesubcategory, getActivityLog  } from '../controller/common/commonController.js';
import { getCriminalCase } from '../controller/courtReviewPetition/criminalCaseController.js';
import { approvedeclineBoiOmiTboi, boiomitboidelete, createBoiOmiTboi, getboiomitboi, getboiomitboiActivity, getboiomitboiById, updateBoiOmiTboi } from '../controller/boi_omi_tboi/boiOmiTboiController.js';

import { getCommandingOfficer, getDashboardData } from '../controller/dashboard/dashboardController.js';
import { createNotes, deleteNotes, getNotes, getNotesById, updateNotes } from '../controller/common/noteController.js';
import { approvedeclinereview, createReviewPetition, deleteReviewPetition, getReviewPetition, getReviewPetitionActivity, getReviewPetitionById, updateReviewPetition } from '../controller/courtReviewPetition/reviewPetitionController.js';
import { approvedeclineCourtCase, createCourtCase, deleteCourtCase, getCourtCase, getCourtCaseActivity, getCourtCaseById, updateCourtCase } from '../controller/courtReviewPetition/courtCaseController.js';
import { approvedeclineMaintenanceCase, createMaintenanceCase, deleteMaintenanceCase, getMaintenanceCase, getmaintenancecaseActivity, getMaintenanceCaseById, updateMaintenanceCase } from '../controller/courtReviewPetition/maintenanceCaseController.js';
import { annualinspectionapprovedecline, createAnnualInspection, deleteAnnualInspection, getannualInspection, getannualInspectionById, updateAnnualInspection } from '../controller/annualInspection/annualInspectionController.js';
import { createSecurityAudit, deleteSecurityAudit, getSecurityAudit, getSecurityAuditById, securityAuditapprovedecline, updateSecurityAudit, updateSecurityAuditRemark } from '../controller/securityAudit/securityAuditController.js';
import { createIncidentBrief, deleteIncidentBrief, getIncidentBrief, getIncidentBriefById, incidentBriefapprovedecline, updateIncidentBrief } from '../controller/incidentBrief/incidentBriefController.js';
import { approvedeclineMfn, createMfn, deleteMfn, getMfn, getMfnAddress, getMfnById, updateMfn,getmfnActivity } from '../controller/mfn/mfnController.js';
import { createPunishmentReturn, deletePunishmentReturn, getPunishmentReturn, getPunishmentReturnById, punishreturnapprovedecline, updatePunishmentReturn } from '../controller/punishmentReturn/punishmentReturnController.js';
import { getNotification, updateNotification } from '../controller/notification/notificationController.js';

const allRoutes = express.Router();


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     description: Validate account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password of the user
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Validate successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
allRoutes.post('/login',Login)

//1.Role Master
allRoutes.get('/getallrole',getAllRole)
allRoutes.post('/createrole',createRole)
allRoutes.get('/getallrolebyid',getAllRoleById)
allRoutes.put('/updaterole',updateRole)
allRoutes.delete('/deleterole',deleteRole)
 //2.Occupation Master
 allRoutes.get('/getoccupation',getAllOccupations)
 allRoutes.post('/createoccupation',createOccupation)
 allRoutes.get('/getoccupationbyid',getOccupationById)
 allRoutes.put('/updateoccupation',updateOccupation)
 allRoutes.delete('/deleteoccupation',deleteOccupation)
// 3.DisciplinaryStatus Master

allRoutes.get('/getdisciplinarystatus',getAllDisciplinaryStatus)
allRoutes.post('/createdisciplinarystatus',createDisciplinaryStatus)
allRoutes.get('/getdisciplinarydtatusbyid',getDisciplinaryStatusById)
allRoutes.put('/updatedisciplinarystatus',updateDisciplinaryStatus)
allRoutes.delete('/deletedisciplinarystatus',deleteDisciplinaryStatus)

//4.User Type Master
allRoutes.get('/getallusertype',getAllUserType)
allRoutes.post('/createusertype',createUserType)
allRoutes.get('/getallusertypebyid',getAllUserTypeId)
allRoutes.put('/updateusertype',updateUserType)
allRoutes.delete('/deleteusertype',deleteUserType)

//5.user registration 
// allRoutes.get('/getAllUserList',getAllUserList)
// allRoutes.post('/userRegistration',createUser)
// allRoutes.post('/getAllUserById',getAllUserById)
// allRoutes.put('/updateUser',updateUser)
// allRoutes.delete('/deleteUser',deleteUser)
allRoutes.post('/userregistration',userRegistration)
//6.Property Type master

allRoutes.get('/getallpropertytype',getAllPropertyType)
allRoutes.post('/createpropertytype',createPropertyType)
allRoutes.get('/getpropertytypebyid',getPropertyTypeById)
allRoutes.put('/updateproperttype',updatePropertyType)
allRoutes.delete('/deletepropertytype',deletePropertyType)
 //7. Vehicle Type Master

 allRoutes.get('/getvehiclelist',getVehicleList)
 allRoutes.post('/createvehicletype',createVehicleType)
 allRoutes.get('/getvehicletypebyid',getVehicleTypeById)
 allRoutes.put('/updatevehicletype',updateVehicleType)
 allRoutes.delete('/deletevehicletype',deleteVehicleType)

 // 8.organisationType Master

 allRoutes.get('/getorganisationtypelist',getOrganisationTypeList)
 allRoutes.post('/createorganisationtype',createOrganisationType)
 allRoutes.get('/getorganisationTypebyid',getOrganisationTypeById)
 allRoutes.put('/updateorganisationtype',updateorganisationType)
 allRoutes.delete('/deleteorganisationtype',deleteorganisationType)

 //9.boardProceedingType Master
 allRoutes.get('/getboardproceedingtypelist',getBoardProceedingTypeList)
 allRoutes.post('/createboardproceedingtype',createBoardProceedingType)
 allRoutes.get('/getboardproceedingtypebyid',getBoardProceedingTypeById)
 allRoutes.put('/updateoboardproceedingtype',updateBoardProceedingType)
 allRoutes.delete('/deleteboardproceedingtype',deleteBoardProceedingType)

 //10. Disciplinary Status Master

 allRoutes.get('/getalldisciplinarystatus',getAllDisciplinaryStatus)
 allRoutes.post('/createdisciplinarystatus',createDisciplinaryStatus)
 allRoutes.get('/getdisciplinarystatusbyid',getDisciplinaryStatusById)
 allRoutes.put('/updatedisciplinarystatus',updateDisciplinaryStatus)
 allRoutes.delete('/deletedisciplinarystatus',deleteDisciplinaryStatus)

//11.Owned By Master

allRoutes.get('/getownedbylist',getOownedByList)
allRoutes.post('/createownedby',createownedBy)
allRoutes.get('/getownedbyid',getownedById)
allRoutes.put('/updateownedby',updateownedBy)
allRoutes.delete('/deleteOwnedBy',deleteownedBy)

//12. complaint Type Master

allRoutes.get('/getcomplaintTypeList',getcomplaintTypeList)
allRoutes.post('/createComplaintType',createComplaintType)
allRoutes.get('/getComplaintTypeId',getComplaintTypeId)
allRoutes.put('/updateComplaintType',updateComplaintType)
allRoutes.delete('/deleteComplaintType',deleteComplaintType)

//13. Court Master
allRoutes.get('/getcourtlist',getCourtList)
allRoutes.post('/createcourt',createCourt)
allRoutes.get('/getCourtbyid',getCourtById)
allRoutes.put('/updatecourt',updateCourt)
allRoutes.delete('/deletecourt',deleteCourt)
//14. Rang Training Master

allRoutes.get('/getRangetrainingList',getRangetrainingList)
allRoutes.post('/createRangetraining',createRangetraining)
allRoutes.get('/getRangetrainingById',getRangetrainingById)
allRoutes.put('/updatRangetraining',updatRangetraining)
allRoutes.delete('/deleteRangetraining',deleteRangetraining)


// 15. dog Squad master
allRoutes.get('/getdogSquadList',getdogSquadList)
allRoutes.post('/createdogSquad',createdogSquad)
allRoutes.get('/getdogSquadById',getdogSquadById)
allRoutes.put('/updatedogSquad',updatedogSquad)
allRoutes.delete('/deletedogSquad',deletedogSquad)
//16
allRoutes.get('/getAllSecurityEquipment',getAllSecurityEquipment)
allRoutes.post('/createSecurityEquipment',createSecurityEquipment)
allRoutes.get('/getSecurityEquipmentById',getSecurityEquipmentById)
allRoutes.put('/updateSecurityEquipment',updateSecurityEquipment)
allRoutes.delete('/deleteSecurityEquipment',deleteSecurityEquipment)
//17
allRoutes.get('/getAllOverallAssessment',getAllOverallAssessment)
allRoutes.post('/createOverallAssessment',createOverallAssessment)
allRoutes.get('/getOverallAssessmentById',getOverallAssessmentById)
allRoutes.put('/updateOverallAssessment',updateOverallAssessment)
allRoutes.delete('/deleteOverallAssessment',deleteOverallAssessment)
//18
allRoutes.get('/getAllStatus',getAllStatus)
allRoutes.post('/createStatus',createStatus)
allRoutes.get('/getStatusById',getStatusById)
allRoutes.put('/updateStatus',updateStatus)
allRoutes.delete('/deleteStatus',deleteStatus)
//19
allRoutes.get('/getAllPropertyShare',getAllPropertyShare)
allRoutes.post('/createPropertyShare',createPropertyShare)
allRoutes.get('/getPropertyShareById',getPropertyShareById)
allRoutes.put('/updatePropertyShare',updatePropertyShare)
allRoutes.delete('/deletePropertyShare',deletePropertyShare)
//20

allRoutes.get('/getAllSecurityInfrastructure',getAllSecurityInfrastructure)
allRoutes.post('/createSecurityInfrastructure',createSecurityInfrastructure)
allRoutes.get('/getSecurityInfrastructureById',getSecurityInfrastructureById)
allRoutes.put('/updateSecurityInfrastructure',updateSecurityInfrastructure)
allRoutes.delete('/deleteSecurityInfrastructure',deleteSecurityInfrastructure)

//21
allRoutes.get('/getallreturntype',getAllReturnType)
allRoutes.post('/createreturntype',createReturnType)
allRoutes.get('/getreturntypebyid',getReturnTypeById)
allRoutes.put('/updatereturntype',updateReturnType)
allRoutes.delete('/deletereturntype',deleteReturnType)

//22
allRoutes.get('/getallminorhead',getAllMinorHead)
allRoutes.post('/createminorhead',createMinorHead)
allRoutes.get('/getminorheadbyid',getMinorHeadById)
allRoutes.put('/updateminorhead',updateMinorHead)
allRoutes.delete('/deleteminorhead',deleteMinorHead)

//23
allRoutes.get('/getallboardproceedingapproval',getAllBoardProceedingApproval)
allRoutes.post('/createboardproceedingapproval',createBoardProceedingApproval)
allRoutes.get('/getboardproceedingapprovalbyid',getBoardProceedingApprovalById)
allRoutes.put('/updateboardproceedingapproval',updateBoardProceedingApproval)
allRoutes.delete('/deleteboardproceedingapproval',deleteBoardProceedingApproval)
// 24
allRoutes.get('/getallincidenttype',getAllIncidentType)
allRoutes.post('/createincidenttype',createIncidentType)
allRoutes.get('/getincidenttypebyid',getIncidentTypeById)
allRoutes.put('/updateincidenttype',updateIncidentType)
allRoutes.delete('/deleteincidenttype',deleteIncidentType)

//25
allRoutes.get('/getallpostmortemstatus',getAllPostMortemStatus)
allRoutes.post('/createpostmortemstatus',createPostMortemStatus)
allRoutes.get('/getpostmortemStatusbyid',getPostMortemStatusById)
allRoutes.put('/updatepostmortemstatus',updatePostMortemStatus)
allRoutes.delete('/deletePostmortemstatus',deletePostMortemStatus)

// 26. DiscipleVigilance
// allRoutes.post('/createDiscipleVigilance',createDiscipleVigilance)
// allRoutes.get('/getAllDiscipleVigilance',getAllDiscipleVigilance)

//27. Religion
allRoutes.get('/getAllReligion',getAllReligion)
allRoutes.post('/createreligion',createreligion)
allRoutes.get('/getReligionById',getReligionById)
allRoutes.put('/updateReligion',updateReligion)
allRoutes.delete('/deleteReligion',deleteReligion)

//28. Nationality
allRoutes.get('/getAllNationality',getAllNationality)
allRoutes.post('/createnationality',createnationality)
allRoutes.get('/getnationalityById',getnationalityById)
allRoutes.put('/updatenationality',updatenationality)
allRoutes.delete('/deletenationality',deletenationality)

//29. Langugae
allRoutes.get('/getAlllanguage',getAlllanguage)
allRoutes.post('/createlangugae',createlangugae)
allRoutes.get('/getlangugaeById',getlangugaeById)
allRoutes.put('/updatelangugae',updatelangugae)
allRoutes.delete('/deletelangugae',deletelangugae)

//30. Relationship
allRoutes.get('/getAllrelationship',getAllrelationship)
allRoutes.post('/createrelationship',createrelationship)
allRoutes.get('/getrelationshipById',getrelationshipById)
allRoutes.put('/updaterelationship',updaterelationship)
allRoutes.delete('/deleterelationship',deleterelationship)



allRoutes.put('/forgotpassword',forgotpassword)
allRoutes.post('/changepassword',changepassword)
allRoutes.post('/sendotp',SendOtp)
allRoutes.put('/otpverify',otpverify)
allRoutes.post('/permission_user',permission_user)
allRoutes.post('/createdvrecord',createDVRecord)
allRoutes.post('/getdvrecord',getdvRecord)
allRoutes.put('/updatedvrecord',updatedvRecord)
allRoutes.delete('/deletedvRecord',deletedvRecord)
allRoutes.post('/updateprofile',updateProfile)
allRoutes.post('/createfileforward',fileforwardInsert)
allRoutes.delete('/fileforwarddelete',fileforwardDelete)


allRoutes.get('/getmenu',getMenu)
allRoutes.get('/getsubmenu',getSubMenu)
allRoutes.post('/getrolepermission',getrolePermission)


allRoutes.post('/getuserpermission',getUserPermission)
allRoutes.get('/getpersonalnoinfo',getpersonalnoinfo)
allRoutes.post('/getacquisitionproperty',getAcquisitionProperty)
allRoutes.post('/createacquisitionproperty',acqumovableinsert)
allRoutes.post('/getdisposaliproperty',getDisposaliProperty)
allRoutes.put('/updatedisposalproperty',updatedisposalProperty)
allRoutes.post('/createdisposalproperty',createdisposalProperty)
allRoutes.delete('/deleteacquproperty',deleteacquproperty)
allRoutes.delete('/deletedisposalProperty',deletedisposalProperty)

allRoutes.post('/propertyapprdecl',propertyApprDecl)
allRoutes.put('/updateinitalproperty',updateInitalProperty)
allRoutes.post('/getempaboard',getempaboard)

allRoutes.post('/getcomplaint',getcomplaint)

allRoutes.delete('/deletecomplaint',deletecomplaint)
// Initial Property
allRoutes.post('/createinitalproperty',initalpropertyinsert)
allRoutes.post('/getinitalproperty',getinitalproperty)
allRoutes.delete('/deleteinitalproperty',deleteinitalproperty)
allRoutes.get('/getinitalpropertybyid',getinitalpropertyById)

allRoutes.post('/getrog',getrog)
allRoutes.post('/empaboardinsert',upload.fields([{ name: 'documentattached', maxCount: 1 }]),empaboardinsert)
allRoutes.put('/empaboardupdate',empaboardupdate)
allRoutes.delete('/empaboarddelete',empaboarddelete)
allRoutes.delete('/rogdelete',rogdelete)
allRoutes.post('/empaboardrecnonrec',empAboardRecNonrec)
allRoutes.post('/empaboardappdec',empAboardAppDec)
allRoutes.post('/rogrecnonrec',rogrec_nonrec)
allRoutes.get('/getdvrecordbyid',getdvRecordById)
allRoutes.get('/getacquisitionpropertybyid',getAcquisitionPropertyById)

allRoutes.put('/updateacquisitionproperty',updateAcqumovable)
allRoutes.get('/getdisposalipropertybyid',getDisposaliPropertyById)
allRoutes.post('/insertmdl',upload.fields([{ name: 'drivingtestcertif', maxCount: 1 }, { name: 'certificatemedical', maxCount: 1 }]),insertMdl)

allRoutes.post('/createrog',upload.fields([{ name: 'documentattached', maxCount: 1 }]),createROG)
allRoutes.post('/createcomplaint',upload.fields([{ name: 'complaintcopyattachment',maxCount: 1  },{name:'commentsattachment',maxCount: 1 }]),complaintinsert)
allRoutes.put('/updatecomplaint',upload.fields([{ name: 'complaintcopyattachment',maxCount: 1  },{name:'commentsattachment',maxCount: 1 }]),updatecomplaint)
//allRoutes.get('/getempaboardbyid',getempaboardById)
allRoutes.post

allRoutes.get('/getDropdowns',getDropdowns)
allRoutes.get('/getcomplaintbyid',getcomplaintById)
allRoutes.get('/getrogbyid',getrogById)
allRoutes.post('/getcriminalcase',getCriminalCase)
allRoutes.post('/getboiomitboi',getboiomitboi)
allRoutes.get('/getboiomitboibyid',getboiomitboiById)
allRoutes.delete('/boiomitboidelete',boiomitboidelete)
allRoutes.post('/createboiomitboi',upload.fields([{ name: 'punishmentawarded', maxCount: 1 }, { name: 'approvallatter', maxCount: 1 },{ name: 'narrative', maxCount: 1 },{ name: 'findings', maxCount: 1 },{ name: 'recommendation', maxCount: 1 },{ name: 'mitigatingmeasures', maxCount: 1 },{name:'uploadconveyingorder'}]),createBoiOmiTboi)
allRoutes.put('/updateboiomitboi',upload.fields([{ name: 'punishmentawarded', maxCount: 1 }, { name: 'approvallatter', maxCount: 1 },{ name: 'narrative', maxCount: 1 },{ name: 'findings', maxCount: 1 },{ name: 'recommendation', maxCount: 1 },{ name: 'mitigatingmeasures', maxCount: 1 },{name:'uploadconveyingorder'}]),updateBoiOmiTboi)
allRoutes.post('/approvedeclineboiomitboi',approvedeclineBoiOmiTboi)

//Dashbaord
allRoutes.get('/getdashboarddata',getDashboardData)
allRoutes.get('/getmenusubmenu',getmenuSubmenu)
allRoutes.post('/createnotes',upload.fields([{ name: 'noteattachment', maxCount: 1 }]),createNotes)
allRoutes.put('/updatenotes',upload.fields([{name: 'noteattachment', maxCount: 1 }]),updateNotes)
allRoutes.delete('/deletenotes',deleteNotes)
allRoutes.post('/getnotes',getNotes)
allRoutes.get('/getboiomitboiactivity',getboiomitboiActivity)
allRoutes.get('/getuser',getUser)
allRoutes.get('/getnotesbyid',getNotesById)
allRoutes.post('/createrolepermission',insertRolePermission)
allRoutes.post('/createuserpermission',insertUserPermission)
allRoutes.get('/empaboardactivity',empAboardActivity)
allRoutes.post('/getreviewpetition',getReviewPetition)
allRoutes.get('/generate_file_number',generate_file_number)
allRoutes.post('/createreviewpetition',upload.fields([{ name: 'documentattchament', maxCount: 1 }]),createReviewPetition)
allRoutes.put('/updatereviewpetition',upload.fields([{ name: 'documentattchament', maxCount: 1 }]),updateReviewPetition)
allRoutes.get('/getreviewpetitionbyid',getReviewPetitionById)
allRoutes.delete('/deletereviewpetition',deleteReviewPetition)
allRoutes.post('/approvedeclinereview',approvedeclinereview)
allRoutes.put('/updaterog',upload.fields([{ name: 'documentattached', maxCount: 1 }]),updateROG)

// Court Case
allRoutes.post('/getcourtcase',getCourtCase)
allRoutes.post('/createcourtcase',upload.fields([{ name: 'firattachment', maxCount: 1 },{ name: 'commentsattachment', maxCount: 1 },{ name: 'copyattachment', maxCount: 1 }]),createCourtCase)
allRoutes.get('/getcourtcasebyid',getCourtCaseById)
allRoutes.put('/updatecourtcase',upload.fields([{ name: 'firattachment', maxCount: 1 },{ name: 'commentsattachment', maxCount: 1 },{ name: 'copyattachment', maxCount: 1 }]),updateCourtCase)
allRoutes.delete('/deletecourtcase',deleteCourtCase)
allRoutes.post('/approvedeclinecourtcase',approvedeclineCourtCase)
// Maintenance case

allRoutes.post('/getmaintenancecase',getMaintenanceCase)
allRoutes.get('/getmaintenancecasebyid',getMaintenanceCaseById)
allRoutes.post('/createmaintenancecase',upload.fields([{name:'commentsattachment'},{name:'documentsattachment'}]),createMaintenanceCase)
allRoutes.put('/updatemaintenancecase',upload.fields([{name:'commentsattachment'},{name:'documentsattachment'}]),updateMaintenanceCase)
allRoutes.delete('/deletemaintenancecase',deleteMaintenanceCase)
allRoutes.post('/approvedeclinemaintenancecase',approvedeclineMaintenanceCase)

// Annual Inspection
allRoutes.post('/getannualinspection',getannualInspection)
allRoutes.get('/getannualinspectionbyid',getannualInspectionById)
allRoutes.post('/createannualinspection',createAnnualInspection)
allRoutes.put('/updateannualinspection',updateAnnualInspection)
allRoutes.delete('/deleteannualinspection',deleteAnnualInspection)
// Security Audit
allRoutes.post('/createsecurityaudit',createSecurityAudit)
allRoutes.put('/updatesecurityaudit',updateSecurityAudit)
allRoutes.delete('/deletesecurityaudit',deleteSecurityAudit)
allRoutes.post('/getsecurityaudit',getSecurityAudit)
allRoutes.get('/getsecurityauditbyid',getSecurityAuditById)


//Category and Subcategory
allRoutes.post('/createcategory',createcategory)
allRoutes.put('/updatecategory',updatecategory)
allRoutes.post('/addsubcategory',addsubcategory)
allRoutes.put('/updatesubcategory',updatesubcategory)


//incident Brief
allRoutes.post('/createincidentbrief',upload.fields([{name:'narrativedoc'},{name:'postmortemdoc'},{name:'mediareportdoc'}]),createIncidentBrief)
allRoutes.post('/')
allRoutes.put('/updateincidentbrief',upload.fields([{name:'narrativedoc'},{name:'postmortemdoc'},{name:'mediareportdoc'}]),updateIncidentBrief)
allRoutes.delete('/deleteincidentbrief',deleteIncidentBrief)
allRoutes.post('/getincidentbrief',getIncidentBrief)
allRoutes.get('/getincidentbriefbyid',getIncidentBriefById)

//marrage with forgein


allRoutes.post('/createmfn',upload.fields([{name:'photograph'},{name:'detailsofcitizenship'},{name:'undertakingapplicant'}]),createMfn)
allRoutes.put('/updatemfn',upload.fields([{name:'photograph'},{name:'detailsofcitizenship'},{name:'undertakingapplicant'}]),updateMfn)
allRoutes.get('/getmfnbyid',getMfnById)
allRoutes.post('/getmfn',getMfn)
allRoutes.delete('/deletemfn',deleteMfn)
allRoutes.get('/getmfnActivity',getmfnActivity)

allRoutes.post('/getuserRegistration',getuserRegistration)
allRoutes.get('/getuserRegistrationById',getuserRegistrationById)
allRoutes.delete('/deleteuserRegistration',deleteuserRegistration)
allRoutes.put('/userRegistrationUpdate',userRegistrationUpdate)

//punishment Return 
allRoutes.post('/createpunishmentreturn',createPunishmentReturn)
allRoutes.put('/updatepunishmentreturn',updatePunishmentReturn)
allRoutes.delete('/deletepunishmentreturn',deletePunishmentReturn)
allRoutes.post('/getpunishmentreturn',getPunishmentReturn)
allRoutes.get('/getpunishmentreturnbyid',getPunishmentReturnById)
allRoutes.get('/getmfnaddress',getMfnAddress)
allRoutes.get('/getofficerdashboard',getofficerdashboard)
allRoutes.get('/getempaboardbyid',getempaboardbyId)

allRoutes.post('/getcommandingofficer',getCommandingOfficer)

allRoutes.post('/approvedeclinemfn',approvedeclineMfn)
allRoutes.get('/getnotification',getNotification)
allRoutes.post('/updatenotification',updateNotification)
allRoutes.post('/initalpropertyappdec',initalpropertyAppDec)
allRoutes.post('/acqupropertyappdec',acquPropertyAppDec)
allRoutes.post('/disposalpropertyappdec',disposalPropertyAppDec)
allRoutes.post('/dvrecordappdec',dvRecordAppDec)
allRoutes.post('/approvedeclinecomplaint',approvedeclineComplaint)
allRoutes.post('/rogapprovedecline',Rogapprovedecline)
allRoutes.post('/securityauditapprovedecline',securityAuditapprovedecline)
allRoutes.post('/incidentbriefapprovedecline',incidentBriefapprovedecline)
allRoutes.post('/punishreturnapprovedecline',punishreturnapprovedecline)
allRoutes.post('/annualinspectionapprovedecline',annualinspectionapprovedecline)
allRoutes.get('/getdvrecordactivity',getdvRecordActivity)
allRoutes.get('/getcourtcaseactivity',getCourtCaseActivity)
allRoutes.get('/getmaintenancecaseactivity',getmaintenancecaseActivity)
allRoutes.get('/getcomplaintactivity',getComplaintActivity)
allRoutes.get('/getreviewpetitionactivity',getReviewPetitionActivity)
allRoutes.get('/getrogactivity',getROGActivity)
allRoutes.post('/getactivitylog',getActivityLog)
allRoutes.post('/updatesecurityauditremark',updateSecurityAuditRemark)
export default allRoutes;