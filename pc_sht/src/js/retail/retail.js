import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryNodeInfoIndex,queryIndex,queryBizGoods,insert,queryGoodsForBiz,queryRegion,autoIdentity,insertList,queryGoodsForNode,
    queryRegionForGoodsPrice,queryGoodsIndex, downloadPriceLife, getAllNodePage} from '../address/url.js';
import axios from 'axios';

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
//  市场添加报价 商品
export const  QueryGoodsForNode  = function(params) {
    return ajaxPost(queryGoodsForNode,params)
}
//  市场添加报价 区域
export const  QueryRegionForGoodsPrice  = function(params) {
    return ajaxPost(queryRegionForGoodsPrice,params)
}
//  查看市场报价  商户录的报价信息
export const  QueryGoodsIndex  = function(params) {
    return ajaxPost(queryGoodsIndex,params)
}
// 导出
export const DownloadPriceLife = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadPriceLife, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 获取企业信息userId 等
export const  GetAllNodePage  = function(params) {
    return ajaxPost(getAllNodePage,params)
}