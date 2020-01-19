import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getAllWarning,WarningState,getAllLogWarning,insertWarning,updateWarning,executeWarning,downloadLogWarning,
    queryLoseDataNode,queryNodeTypeInfo
} from '../address/url.js';

export const  GetAllWarning  = function(params) { //预警管理查询
    return ajaxPost(getAllWarning,params)
}

export const  warningState  = function(params) { //预警状态开启/关闭
    return ajaxPost(WarningState,params)
}

export const  GetAllLogWarning  = function(params) { //查询预警日志
    return ajaxPost(getAllLogWarning,params)
}

export const  InsertWarning  = function(params) {//添加预警工作
    return ajaxPost(insertWarning,params)
}

export const  UpdateWarning  = function(params) { //编辑预警工作
    return ajaxPost(updateWarning,params)
}

export const  ExecuteWarning  = function(params) { //主动执行
    return ajaxPost(executeWarning,params)
}

export const  DownloadLogWarning  = function(params) { //下载日志附件
    return ajaxGet(downloadLogWarning + '?' + params)
}

export const QueryLoseDataNode = function(params) { // 缺失对照企业
    return ajaxPost(queryLoseDataNode,params)
}

export const QueryNodeTypeInfo = function(params) {
    return ajaxGet(queryNodeTypeInfo + '?' + params)
}