import sendRes from "../../helper/commonResponse.js";
import encryptDecrypt from "../../helper/encrypt-decrypt.js";
import callprocMenthod from "../../config/callProcedure.js";
import { convertToISO8601 } from '../../helper/datetimeConverter.js';

export const getDashboardData = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
        let id = req.user.id;
        var obj = "{\"userid\":\"" + req.user.id + "\"}";
        var result = await callprocMenthod.GET(obj, 'getsummarylist');
        var summarystatus_result = await callprocMenthod.GET(obj, 'getsummarystatus ');
        const _responsedata = {
            summarylist: result,
            summarystatuslist: summarystatus_result,
            month_wise_complainant: result,
            recent_cases: result
        };

        if (!_responsedata) {
            if (headerValue == 0) {
                await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
            }
            else {
                await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
            }
        } else {
            if (headerValue == 0) {
                await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, _responsedata);
            }
            else {
                await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, _responsedata);
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

export const getCommandingOfficer = async (req, res) => {
    const headerValue = req.header("isUAT");
    try {
        
        var obj = "{\"recordid\":\"" + req.body.recordid + "\",\"menuid\":\"" + req.body.menuid + "\",\"present_unit\":\"" + req.body.presentunit + "\",\"index\":\"" + req.body.index + "\"}";
        var result = await callprocMenthod.GET(obj, 'get_comanding_officer');
       
        if (!result) {
            if (headerValue == 0) {
                await sendRes.sendResponse(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
            }
            else {
                await sendRes.sendResponseUat(res, sendRes.statusCode.FOUR_ZERO_ZERO, 0, sendRes.statusMessage.DATA_NOT_FOUND);
            }
        } else {
            if (headerValue == 0) {
                await sendRes.sendResponse(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result);
            }
            else {
                await sendRes.sendResponseUat(res, sendRes.statusCode.OK, 1, sendRes.statusMessage.DATA_GET_FOUND, result);
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