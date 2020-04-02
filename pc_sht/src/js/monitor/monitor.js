import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {traceDataReporting, getNodeCount, getJdhydPc, quantityReportedNew, getGoodsAvgPc, getWsPriceIndexPc, vegMeatProvince,   
    vegetableProvince, getGoodsType, getNodeJgInfoType} from '../address/url.js';

// 企业数量?node_id=110114311
export const  GetNodeCount  = function(params) {
    return ajaxGet(getNodeCount +'?'+ params)
}
// 企业数量已上报企业
export const  GetJdhydPc  = function(params) {
    return ajaxGet(getJdhydPc +'?'+ params)
}
// 上报数据量?type=year&node_id=110114311
export const  QuantityReportedNew  = function(params) {
    return ajaxGet(quantityReportedNew +'?'+ params)
}
// 各类型企业上报数据量?date=2020-02-29&node_id=110114311&type=month
export const  TraceDataReporting  = function(params) {
    return ajaxGet(traceDataReporting +'?'+ params)
}
// 生活必需品价格走势?date=2020-02-29&node_type=零售市场&goods_type=蔬菜&node_id=110114311&type=month&goods_name=圆白菜
export const  GetGoodsAvgPc  = function(params) {
    return ajaxGet(getGoodsAvgPc +'?'+ params)
}
// 生活必需品价格走势文字内容?date=2020-03-14&node_type=零售市场&goods_type=猪肉类&goods_name=白条
export const  GetWsPriceIndexPc  = function(params) {
    return ajaxGet(getWsPriceIndexPc +'?'+ params)
}
// 猪肉省份来源
export const  VegMeatProvince  = function(params) {
    return ajaxGet(vegMeatProvince +'?'+ params)
}
// 蔬菜来源省份
export const  VegetableProvince  = function(params) {
    return ajaxGet(vegetableProvince +'?'+ params)
}
// 上报商品种类
export const  GetGoodsType  = function(params) {
    return ajaxGet(getGoodsType +'?'+ params)
}
// 企业数量按类型查看
export const  GetNodeJgInfoType  = function(params) {
    return ajaxGet(getNodeJgInfoType +'?'+ params)
}