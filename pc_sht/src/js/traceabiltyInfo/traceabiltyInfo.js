import axios from 'axios';
import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryDecodeRule,queryCodeTypeSelect,queryNodeSelect,insertDecodeRule,updateDecodeRule,deleteDecodeRule,downloadDecodeRule,importDecodeRule,
    queryTraceabilityCode,insertTraceabilityCode,updateTraceabilityCode,deleteTraceabilityCode,downloadTraceabilityCode,importTraceabilityCode,querySupplierSelect,
    queryTraceInfo,insertTraceInfo,updateTraceInfo,deleteTraceInfo,downloadTraceInfo,importTraceInfo, queryRuleTypeSelect, queryEtraceLog,
    queryResultTypeSelect, downloadEtraceLog, queryTraceCode
} from '../address/url.js';

//解码规则管理
export const  QueryDecodeRule  = function(params) {
    return ajaxPost(queryDecodeRule,params)
}
// 码类型
export const QueryCodeTypeSelect = function(params) {
    return ajaxGet(queryCodeTypeSelect +'?'+ params)
}
// 规则类型
export const QueryRuleTypeSelect = function(params) {
    return ajaxGet(queryRuleTypeSelect +'?'+ params)
}
// 企业名称
export const QueryNodeSelect = function(params) {
    return ajaxGet(queryNodeSelect +'?'+ params)
}
// 新增解码规则
export const  InsertDecodeRule  = function(params) {
    return ajaxPost(insertDecodeRule,params)
}
// 编辑解码规则
export const  UpdateDecodeRule  = function(params) {
    return ajaxPost(updateDecodeRule,params)
}
// 删除解码规则
export const  DeleteDecodeRule  = function(params) {
    return ajaxPost(deleteDecodeRule,params)
}
// 下载解码规则
export const DownloadDecodeRule = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadDecodeRule, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 导入解码规则
export const  ImportDecodeRule  = function(params) {
    return ajaxPost(importDecodeRule,params)
}
// 物品码管理
export const  QueryTraceabilityCode  = function(params) {
    return ajaxPost(queryTraceabilityCode,params)
}
// 新增物品码
export const  InsertTraceabilityCode  = function(params) {
    return ajaxPost(insertTraceabilityCode,params)
}
// 编辑物品码
export const  UpdateTraceabilityCode  = function(params) {
    return ajaxPost(updateTraceabilityCode,params)
}
// 删除物品码
export const  DeleteTraceabilityCode  = function(params) {
    return ajaxPost(deleteTraceabilityCode,params)
}
// 下载物品码
export const DownloadTraceabilityCode = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadTraceabilityCode, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 导入物品码
export const  ImportTraceabilityCode  = function(params) {
    return ajaxPost(importTraceabilityCode,params)
}
// 查询所有供货单位  
export const QuerySupplierSelect = function(params) {
    return ajaxGet(querySupplierSelect +'?'+ params)
}
//追溯信息管理
export const QueryTraceInfo = function(params) {
    return ajaxPost(queryTraceInfo, params)
}
// 新增追溯信息
export const InsertTraceInfo = function(params) {
    return ajaxPost(insertTraceInfo, params)
}
// 编辑追溯信息
export const UpdateTraceInfo = function(params) {
    return ajaxPost(updateTraceInfo, params)
}
// 删除追溯信息
export const DeleteTraceInfo = function(params) {
    return ajaxPost(deleteTraceInfo, params)
}
// 下载追溯信息
export const DownloadTraceInfo = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadTraceInfo, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 追溯查询日志
export const QueryEtraceLog = function(params) {
    return ajaxPost(queryEtraceLog, params)
}
// 查询结果  
export const QueryResultTypeSelect = function(params) {
    return ajaxGet(queryResultTypeSelect +'?'+ params)
}
// 下载追溯日志
export const DownloadEtraceLog = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadEtraceLog, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 追溯查询日志
export const QueryTraceCode = function(params) {
    return ajaxPost(queryTraceCode, params)
}