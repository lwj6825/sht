import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryDecodeRule,queryCodeTypeSelect,queryNodeSelect,insertDecodeRule,updateDecodeRule,deleteDecodeRule,downloadDecodeRule,importDecodeRule,
    queryTraceabilityCode,insertTraceabilityCode,updateTraceabilityCode,deleteTraceabilityCode,downloadTraceabilityCode,importTraceabilityCode,querySupplierSelect,
    queryTraceInfo,insertTraceInfo,updateTraceInfo,deleteTraceInfo,downloadTraceInfo,importTraceInfo
} from '../address/url.js';

//解码规则管理
export const  QueryDecodeRule  = function(params) {
    return ajaxPost(queryDecodeRule,params)
  }
export const QueryCodeTypeSelect = function(params) {
    return ajaxGet(queryCodeTypeSelect +'?'+ params)
}
export const QueryNodeSelect = function(params) {
    return ajaxGet(queryNodeSelect +'?'+ params)
}
export const  InsertDecodeRule  = function(params) {
    return ajaxPost(insertDecodeRule,params)
}
export const  UpdateDecodeRule  = function(params) {
    return ajaxPost(updateDecodeRule,params)
}
export const  DeleteDecodeRule  = function(params) {
    return ajaxPost(deleteDecodeRule,params)
}
export const  DownloadDecodeRule  = function(params) {
    return ajaxPost(downloadDecodeRule,params)
}
export const  ImportDecodeRule  = function(params) {
    return ajaxPost(importDecodeRule,params)
}
//物品码管理
export const  QueryTraceabilityCode  = function(params) {
    return ajaxPost(queryTraceabilityCode,params)
}
export const  InsertTraceabilityCode  = function(params) {
    return ajaxPost(insertTraceabilityCode,params)
}
export const  UpdateTraceabilityCode  = function(params) {
    return ajaxPost(updateTraceabilityCode,params)
}
export const  DeleteTraceabilityCode  = function(params) {
    return ajaxPost(deleteTraceabilityCode,params)
}
export const  DownloadTraceabilityCode  = function(params) {
    return ajaxPost(downloadTraceabilityCode,params)
}
export const  ImportTraceabilityCode  = function(params) {
    return ajaxPost(importTraceabilityCode,params)
}
export const QuerySupplierSelect = function(params) {
    return ajaxGet(querySupplierSelect +'?'+ params)
}
//追溯信息管理
export const QueryTraceInfo = function(params) {
    return ajaxGet(queryTraceInfo +'?'+ params)
}
export const InsertTraceInfo = function(params) {
    return ajaxGet(insertTraceInfo +'?'+ params)
}
export const UpdateTraceInfo = function(params) {
    return ajaxGet(updateTraceInfo +'?'+ params)
}
export const DeleteTraceInfo = function(params) {
    return ajaxGet(deleteTraceInfo +'?'+ params)
}
export const DownloadTraceInfo = function(params) {
    return ajaxGet(downloadTraceInfo +'?'+ params)
}
export const ImportTraceInfo = function(params) {
    return ajaxGet(importTraceInfo +'?'+ params)
}