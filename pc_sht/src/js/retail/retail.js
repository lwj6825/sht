import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryNodeInfoIndex,queryIndex,queryBizGoods,insert,queryGoodsForBiz,queryRegion,autoIdentity,insertList} from '../address/url.js';

// 超管查询所有市场的报价内容
export const  QueryNodeInfoIndex  = function(params) {
    return ajaxPost(queryNodeInfoIndex,params)
}
// 市场的点击查看报价单
export const  QueryIndex  = function(params) {
    return ajaxPost(queryIndex,params)
}
// 市场点击按照商户查看
export const  QueryBizGoods  = function(params) {
    return ajaxPost(queryBizGoods,params)
}
// 市场添加报价 点击商户 查看商户的商品
export const  QueryGoodsForBiz  = function(params) {
    return ajaxPost(queryGoodsForBiz,params)
}
// 市场修改和新增报价单的内容
export const  Insert  = function(params) {
    return ajaxPost(insert,params)
} 
//  市场的点击查看报价单  区域信息 
export const  QueryRegion  = function(params) {
    return ajaxPost(queryRegion,params)
} 
//  智能识别
export const  AutoIdentity  = function(params) {
    return ajaxPost(autoIdentity,params)
} 
//  批量保存
export const  InsertList  = function(params) {
    return ajaxPost(insertList,params)
} 