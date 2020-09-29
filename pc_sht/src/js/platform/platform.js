import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryRegionNodeTypeInfo,queryNodeTypeInfoTwo,queryNodeTypeDetailInfo,queryTraceNode,queryModeInfo,
  traceEnterpriseType,queryNodeDataTj,queryNodeDataNum,queryNodeDataNumRateView,queryNodeDataNumRate,queryNodeDataByNodeType,
  queryBizType,queryTodayBiz,queryBizOnlineMonitor,queryBizOnlineNodeTypeMonitor,queryBizOnlineNodeTypeMonitorList,
  queryBizNotReportedMonitor,notReportedMonitoringType,queryNotReportedMonitoring,queryMachineTimeliness,queryMachineType,
  queryMachineNotOnline,queryMinMachineDate,queryMachine,queryTraceResultType,queryTraceResult,queryTraceSuccessError,
  queryTraceResultDetail,queryTraceErrorResult,queryTraceErrorResultDetail,queryTraceNodeQuantityReported,queryQuantityReported,
  quantityReportedType,
  queryTraceNodeTypeQuantityReported,
  querytraceNodeTypeGroupQuantityReported,
  queryQuantityReportedContrast,
  querytraceNodeQuantityReported,
  queryNodeMonthType,queryNodeMonthStranded,queryNodeMonthStrandedNumAndWeight,queryNodeMonthStrandedDay,queryMoreBusinessMonthDay,
  queryMoreBusinessMonthStrandedDay,queryMoreNodeTrace,queryMoreNodeTraceDetail,getPriceTransactionType,getGoodsAvg,
  queryPriceDistrictProportion,queryPriceNodeTypeProportion,queryPriceGroupProportion,wholesaleMeatSource,vegetableWholesaleSource,
  supermarketMeatSource,MeatVegTransactionStatistics,supermarketVegProvince} from '../address/url.js';
  
// 大区和区县条件查询
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
// 1、追溯体系运行考核 查询总数据量
export const  getQueryNodeDataTj  = function(params) {
  return ajaxGet(queryNodeDataTj+'?'+ params)
}
// 2、查询某个环节的节点数量
export const  getQueryNodeDataNum  = function(params) {
  return ajaxGet(queryNodeDataNum+'?'+ params)
}
// 3 查询某个环节的节点数量 柱状图（节点在线率）
export const  getQueryNodeDataNumRateView  = function(params) {
  return ajaxGet(queryNodeDataNumRateView+'?'+ params)
}
//4查询某个环节的节点运行数量 和比例
export const  getQueryNodeDataNumRate  = function(params) {
  return ajaxGet(queryNodeDataNumRate+'?'+ params)
}
//5 查询某个环节的报送企业数据详情
export const  getQueryNodeDataByNodeType  = function(params) {
  return ajaxGet(queryNodeDataByNodeType+'?'+ params)
}
//商户在线监控筛选
export const  getQueryBizType  = function() {
  return ajaxGet(queryBizType)
}
export const  getQueryTodayBiz  = function() {
  return ajaxGet(queryTodayBiz)
}
export const getQueryBizOnlineMonitor = function(params) {
  return ajaxPost(queryBizOnlineMonitor,params)
}
export const getQueryBizOnlineNodeTypeMonitor = function(params) {
  return ajaxPost(queryBizOnlineNodeTypeMonitor,params)
}
export const getQueryBizOnlineNodeTypeMonitorList = function(params) {
  return ajaxPost(queryBizOnlineNodeTypeMonitorList,params)
}
export const getQueryBizNotReportedMonitor = function(params) {
  return ajaxPost(queryBizNotReportedMonitor,params)
}
export const getNotReportedMonitoringType = function() {
  return ajaxGet(notReportedMonitoringType)
}
export const getQueryNotReportedMonitoring = function(params) {
  return ajaxPost(queryNotReportedMonitoring,params)
}
export const getQueryMachineTimeliness = function() {
  return ajaxGet(queryMachineTimeliness)
}
export const getQueryMachineType = function() {
  return ajaxGet(queryMachineType)
}
export const getQueryMachineNotOnline = function(params) {
  return ajaxPost(queryMachineNotOnline,params)
}
export const getQueryMinMachineDate = function(params) {
  return ajaxPost(queryMinMachineDate,params)
}
export const getQueryMachine = function(params) {
  return ajaxPost(queryMachine,params)
}
export const getQueryTraceResultType = function() {
  return ajaxGet(queryTraceResultType)
}
export const getQueryTraceResult = function(params) {
  return ajaxPost(queryTraceResult,params)
}
export const getQueryTraceSuccessError = function(params) {
  return ajaxPost(queryTraceSuccessError,params)
}
export const getQueryTraceResultDetail = function(params) {
  return ajaxPost(queryTraceResultDetail,params)
}
export const getQueryTraceErrorResult = function(params) {
  return ajaxPost(queryTraceErrorResult,params)
}
export const getQueryTraceErrorResultDetail = function(params) {
  return ajaxPost(queryTraceErrorResultDetail,params)
}
export const getQueryNodeMonthType = function(params) {
  return ajaxGet(queryNodeMonthType+'?'+ params)
}
export const getQueryNodeMonthStranded = function(params) {
  return ajaxGet(queryNodeMonthStranded+'?'+ params)
}
export const getQueryNodeMonthStrandedNumAndWeight = function(params) {
  return ajaxGet(queryNodeMonthStrandedNumAndWeight+'?'+ params)
}
export const getQueryNodeMonthStrandedDay = function(params) {
  return ajaxGet(queryNodeMonthStrandedDay+'?'+ params)
}
export const getQueryMoreBusinessMonthDay = function(params) {
  return ajaxGet(queryMoreBusinessMonthDay+'?'+ params)
}
export const getQueryMoreBusinessMonthStrandedDay = function(params) {
  return ajaxGet(queryMoreBusinessMonthStrandedDay+'?'+ params)
}
export const getQueryMoreNodeTrace = function(params) {
  return ajaxGet(queryMoreNodeTrace+'?'+ params)
}
export const getQueryMoreNodeTraceDetail = function(params) {
  return ajaxGet(queryMoreNodeTraceDetail+'?'+ params)
}
export const queryGetPriceTransactionType = function() {
  return ajaxGet(getPriceTransactionType)
}
export const queryGetGoodsAvg = function(params) {
  return ajaxPost(getGoodsAvg,params)
}
export const getQueryPriceDistrictProportion = function(params) {
  return ajaxPost(queryPriceDistrictProportion,params)
}
export const getQueryPriceNodeTypeProportion = function(params) {
  return ajaxPost(queryPriceNodeTypeProportion,params)
}
export const getQueryPriceGroupProportion = function(params) {
  return ajaxPost(queryPriceGroupProportion,params)
}
export const getWholesaleMeatSource = function(params) {
  return ajaxPost(wholesaleMeatSource,params)
}
export const getVegetableWholesaleSource = function(params) {
  return ajaxPost(vegetableWholesaleSource,params)
}
export const getSupermarketMeatSource = function(params) {
  return ajaxPost(supermarketMeatSource,params)
}
export const getMeatVegTransactionStatistics = function(params) {
  return ajaxPost(MeatVegTransactionStatistics,params)
}
export const getSupermarketVegProvince = function(params) {
  return ajaxPost(supermarketVegProvince,params)
}

export const getQueryQuantityReported = function(params) {
  return ajaxPost(queryQuantityReported,params)
}
//追溯数据上报量及企业走势
export const getQueryTraceNodeQuantityReported = function(params) {
  return ajaxPost(queryTraceNodeQuantityReported,params)
}
//追溯数据上报量及企业走势-钻取企业类型
export const getQueryTraceNodeTypeQuantityReported = function(params) {
  return ajaxPost(queryTraceNodeTypeQuantityReported,params)
}
//追溯数据上报量及企业走势-钻取企业
export const getQuerytraceNodeTypeGroupQuantityReported = function(params) {
  return ajaxPost(querytraceNodeTypeGroupQuantityReported,params)
}

// 获取查询条件列表
export const getQuantityReportedType = function(params) {
  return ajaxGet(quantityReportedType,params)
}

//数据量上报对比 - 表
export const getQueryQuantityReportedContrast = function(params) {
  return ajaxPost(queryQuantityReportedContrast,params)
}

//追溯数据上报查询
export const getQuerytraceNodeQuantityReported = function(params) {
  return ajaxPost(querytraceNodeQuantityReported,params)
}