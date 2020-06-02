import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryRegionNodeTypeInfo,queryNodeTypeInfoTwo,queryNodeTypeDetailInfo,queryTraceNode,queryModeInfo,traceEnterpriseType} from '../address/url.js';
// 大区和区县条件查询
export const  getQueryRegionNodeTypeInfo  = function() {
  return ajaxGet(queryRegionNodeTypeInfo)
}
// 节点类型条件查询
export const  getQueryNodeTypeInfo  = function(params) {
  return ajaxGet(queryNodeTypeInfoTwo+'?'+ params)
}
// 节点详细类型条件查询
export const  getQueryNodeTypeDetailInfo  = function(params) {
  return ajaxGet(queryNodeTypeDetailInfo+'?'+ params)
}
// 查询建设模式
export const  getQueryModeInfo  = function(params) {
  return ajaxGet(queryModeInfo)
}
// 追溯企业/环节覆盖分析总数据
export const  getQueryTraceNode  = function(params) {
  return ajaxPost(queryTraceNode,params)
}

export const getTraceEnterpriseType = function(params) {
  return ajaxGet(traceEnterpriseType)
}
