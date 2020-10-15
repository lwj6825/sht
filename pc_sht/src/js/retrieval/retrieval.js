import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getJdhyd, getNodeTzInfoGroupForJg, getGoodsTzInfoGroupForJg, getBusinessTzInfoGroupForJg, getTzcyInfo, queryInTzDetailBySjjgjg, 
    jcqueryRegion, querybizByNodeId, getAllTzGys, getSuperMeatIn, queryTtxfjcxxDetailApi, queryOriginalDocAPI, jsqueryInTzDetailByTzId,
    getAllOriginalDoc, queryMeatOriginalDoc, queryAllWsSupplierName, queryNodeTagTree} from '../address/url.js';

// 企业活跃度
export const  GetJdhyd  = function(params) {
    return ajaxGet(getJdhyd +'?'+ params)
}
// 企业类型为餐饮 台账列表
export const  GetNodeTzInfoGroupForJg  = function(params) {
    return ajaxPost(getNodeTzInfoGroupForJg,params)
}
// 企业类型为零售市场 台账列表
export const  QueryInTzDetailBySjjgjg  = function(params) {
    return ajaxPost(queryInTzDetailBySjjgjg,params)
}
// 企业类型为超市 台账列表
export const  GetSuperMeatIn  = function(params) {
    return ajaxGet(getSuperMeatIn + params)
}
// 按商品查询
export const  GetGoodsTzInfoGroupForJg  = function(params) {
    return ajaxPost(getGoodsTzInfoGroupForJg,params)
}
// 按企业查询
export const  GetBusinessTzInfoGroupForJg  = function(params) {
    return ajaxPost(getBusinessTzInfoGroupForJg,params)
}
// 查看台账
export const  GetTzcyInfo  = function(params) {
    return ajaxPost(getTzcyInfo,params)
}
// 所属区域
export const  JcqueryRegion  = function(params) {
    return ajaxPost(jcqueryRegion,params)
}
// 商户名称
export const  QuerybizByNodeId  = function(params) {
    return ajaxPost(querybizByNodeId,params)
}
// 供应商
export const  GetAllTzGys  = function(params) {
    return ajaxPost(getAllTzGys,params)
}
// 餐饮详情
export const  QueryTtxfjcxxDetailApi  = function(params) {
    return ajaxGet(queryTtxfjcxxDetailApi + params)
}
// 餐饮查看单据
export const  QueryOriginalDocAPI  = function(params) {
    return ajaxGet(queryOriginalDocAPI + params)
}
// 零售市场详情
export const  JsqueryInTzDetailByTzId  = function(params) {
    return ajaxPost(jsqueryInTzDetailByTzId, params)
}
// 零售市场查看单据
export const  GetAllOriginalDoc  = function(params) {
    return ajaxPost(getAllOriginalDoc, params)
}
// 超市查看单据
export const  QueryMeatOriginalDoc  = function(params) {
    return ajaxGet(queryMeatOriginalDoc + params)
}
// 来源市场
export const  QueryAllWsSupplierName  = function(params) {
    return ajaxGet(queryAllWsSupplierName + '?' + params)
}
// 企业标签 ==>  类别，属性...
export const  QueryNodeTagTree  = function(params) {
    return ajaxGet(queryNodeTagTree + '?' + params)
}