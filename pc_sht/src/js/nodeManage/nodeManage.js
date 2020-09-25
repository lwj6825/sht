import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import {
    queryNodeTypeInfoForType, queryTraceabilityType, querySourceWay, getCode, updateNodeState, getNodeInfo1, insertBasicInfo,
    queryProvinceToSelect, updateBasicInfo, toBasicUpdate, notReportedMonitoring, insertCommunicationRecord, queryCommunicationRecord,
    queryInfoType, querygroupName, downloadNodeInfo, queryNodeDetailType2, downloadNotReportedMonitoring, queryBusinessStateSelect, 
    queryBusinessTypeSelect, queryBusiness2, queryNodeSelect, querypropertySelect, getBizIdByCondition, insertBusiness, updateBusiness,
    updateBusinessState, updateBusinessIsPay, downloadBusiness, getNodeTagInfo
} from '../address/url.js';

export const QuerygroupName  = function(params) {
    return ajaxPost(querygroupName,params)
}
//连续未上报监控查询
export const NotReportedMonitoring  = function(params) {
    return ajaxPost(notReportedMonitoring,params)
}
//添加沟通记录
export const InsertCommunicationRecord  = function(params) {
    return ajaxPost(insertCommunicationRecord,params)
}
//沟通记录详情
export const QueryCommunicationRecord  = function(params) {
    return ajaxPost(queryCommunicationRecord,params)
}
//条件查询
export const QueryInfoType  = function(params) {
    return ajaxPost(queryInfoType,params)
}

  // 企业类型查询
export const QueryNodeTypeInfoForType  = function(params) {
    return ajaxGet(queryNodeTypeInfoForType+'?'+params)
}
//可追溯品类查询
export const QueryTraceabilityType  = function(params) {
    return ajaxGet(queryTraceabilityType+'?'+params)
}
//流水来源方式查询
export const QuerySourceWay  = function(params) {
    return ajaxGet(querySourceWay+'?'+params)
}
//查询省
export const QueryProvinceToSelect  = function(params) {
    return ajaxGet(queryProvinceToSelect+'?'+params)
}
//查询省市县下拉框
export const GetCode  = function(params) {
    return ajaxGet(getCode+'?'+params)
}
//根据节点ID修改节点的启用停用状态
export const UpdateNodeState  = function(params) {
    return ajaxGet(updateNodeState+'?'+params)
}

//查询所有节点
export const GetNodeInfo  = function(params) {
    return ajaxPost(getNodeInfo1,params)
}
//添加节点信息
export const InsertBasicInfo  = function(params) {
    return ajaxPost(insertBasicInfo,params)
}
//编辑节点信息
export const UpdateBasicInfo  = function(params) {
    return ajaxPost(updateBasicInfo,params)
}
//查看节点信息
export const ToBasicUpdate = function(params) {
    return ajaxPost(toBasicUpdate,params)
}

export const QueryNodeDetailType = function(params) {
    return ajaxPost(queryNodeDetailType2,params)
}
//节点导出
export const DownloadNodeInfo = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadNodeInfo, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 连续未上报监控导出
export const DownloadNotReportedMonitoring = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadNotReportedMonitoring, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 查询得到启用停用信息
export const QueryBusinessStateSelect  = function(params) {
    return ajaxGet(queryBusinessStateSelect+'?' + params)
}
// 查询得到经营类型下拉框信息
export const QueryBusinessTypeSelect  = function(params) {
    return ajaxGet(queryBusinessTypeSelect+'?' + params)
}
// 商户备案查询
export const QueryBusiness  = function(params) {
    return ajaxPost(queryBusiness2, params)
}
// 查询企业
export const QueryNodeSelect  = function(params) {
    return ajaxGet(queryNodeSelect+'?' + params)
}
// 查询得到经营者性质（个人企业）下拉框信息
export const QuerypropertySelect  = function(params) {
    return ajaxGet(querypropertySelect+'?' + params)
}
// 根据node_id获得biz_id
export const GetBizIdByCondition  = function(params) {
    return ajaxGet(getBizIdByCondition+'?' + params)
}
// 添加商户备案
export const InsertBusiness  = function(params) {
    return ajaxPost(insertBusiness, params)
}
// 编辑商户备案
export const UpdateBusiness  = function(params) {
    return ajaxPost(updateBusiness, params)
}
// 修修改商户状态（启用，停用）
export const UpdateBusinessState  = function(params) {
    return ajaxGet(updateBusinessState+'?' + params)
}
// 改商户支付状态（启用，停用）
export const UpdateBusinessIsPay  = function(params) {
    return ajaxGet(updateBusinessIsPay+'?' + params)
}
// 商户备案下载
export const DownloadBusiness = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadBusiness, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 节点详细类型
export const GetNodeTagInfo  = function(params) {
    return ajaxGet(getNodeTagInfo+'?' + params)
}