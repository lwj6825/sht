import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryNodeInfoIndex,queryIndex,queryBizGoods,insert,queryGoodsForBiz,queryRegion,autoIdentity,insertList,queryGoodsForNode,
    queryRegionForGoodsPrice,queryGoodsIndex,queryIndexDate,queryNodeGoodsBiz} from '../address/url.js';

// 超管查询所有市场的报价内容
export const  getQueryNodeInfoIndex  = function(params) {
    return ajaxPost(queryNodeInfoIndex,params)
}
// 市场的点击查看报价单
export const  getQueryIndex  = function(params) {
    return ajaxPost(queryIndex,params)
}
// 市场点击按照商户查看
export const  getQueryBizGoods  = function(params) {
    return ajaxPost(queryBizGoods,params)
}
// 市场添加报价 点击商户 查看商户的商品
export const  getQueryGoodsForBiz  = function(params) {
    return ajaxPost(queryGoodsForBiz,params)
}
// 市场修改和新增报价单的内容
export const  getInsert  = function(params) {
    return ajaxPost(insert,params)
}
//  市场的点击查看报价单  区域信息
export const  getQueryRegion  = function(params) {
    return ajaxPost(queryRegion,params)
}
//  智能识别
export const  getAutoIdentity  = function(params) {
    return ajaxPost(autoIdentity,params)
}
//  批量保存
export const  getInsertList  = function(params) {
    return ajaxPost(insertList,params)
}
//  市场添加报价 商品
export const  getQueryGoodsForNode  = function(params) {
    return ajaxPost(queryGoodsForNode,params)
}
//  市场添加报价 区域
export const  getQueryRegionForGoodsPrice  = function(params) {
    return ajaxPost(queryRegionForGoodsPrice,params)
}
//  查看市场报价  商户录的报价信息
export const  getQueryGoodsIndex  = function(params) {
    return ajaxPost(queryGoodsIndex,params)
}
//  时间段查询报价记录
export const  getQueryIndexDate  = function(params) {
    return ajaxPost(queryIndexDate,params)
}
//  查询某天的报价商户
export const  getQueryNodeGoodsBiz  = function(params) {
    return ajaxPost(queryNodeGoodsBiz,params)
}
