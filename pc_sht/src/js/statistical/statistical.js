import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryGoodsRankCurrentYear,queryGoodsRankCurrentMonth,queryGoodsRankCurrentWeek,queryGoodsRankCurrentDay,
    queryBizRankCurrentWeek,queryBizRankCurrentDay,queryBizRankCurrentMonth,queryBizRankCurrentYear,queryHasNoTzBizByNodeId,
    getTzInfoUploadDays,getTzInfoUploadBizNum,getBizOnlineTime,getGoodsWeightRankAndAvgPrice,queryMoneyAndWeightForBiz,
    computNode,computNodeNumWeek,computPluNumWeek,queryMoneyLittleTime,queryMoneyAndWeightForGoods,getBizNotOnlineTime,
    queryMoneyCurrentWeek,queryMoneyCurrentMonth,queryMoneyCurrentDayHour,queryMoneyCurrentYear,queryMoneyAndWeightForMarket
} from '../address/url.js';


// 查询当年商品交易额排行
export const QueryGoodsRankCurrentYear = function(params) {
    return ajaxGet(queryGoodsRankCurrentYear +'?'+ params)
}
// 查询当月商品交易额排行
export const QueryGoodsRankCurrentMonth = function(params) {
    return ajaxGet(queryGoodsRankCurrentMonth +'?'+ params)
}
// 查询当周商品交易额排行
export const QueryGoodsRankCurrentWeek = function(params) {
    return ajaxGet(queryGoodsRankCurrentWeek +'?'+ params)
}
// 查询当天商品交易额排行
export const QueryGoodsRankCurrentDay = function(params) {
    return ajaxGet(queryGoodsRankCurrentDay +'?'+ params)
}
// 查询当年商户交易额排行
export const QueryBizRankCurrentYear = function(params) {
    return ajaxGet(queryBizRankCurrentYear +'?'+ params)
}
// 查询当月商户交易额排行
export const QueryBizRankCurrentMonth = function(params) {
    return ajaxGet(queryBizRankCurrentMonth +'?'+ params)
}
// 查询当周商户交易额排行
export const QueryBizRankCurrentWeek = function(params) {
    return ajaxGet(queryBizRankCurrentWeek +'?'+ params)
}
// 查询当天商户交易额排行
export const QueryBizRankCurrentDay = function(params) {
    return ajaxGet(queryBizRankCurrentDay +'?'+ params)
}
// 该市场当月上传进货台账的商户信息（录入天数）
export const GetTzInfoUploadDays = function(params) {
    return ajaxGet(getTzInfoUploadDays +'?'+ params)
}
// 该市场当月上传进货台账的商户信息（商户数）
export const GetTzInfoUploadBizNum = function(params) {
    return ajaxGet(getTzInfoUploadBizNum +'?'+ params)
}
// 该市场当日电子秤最早在线时间
export const GetBizOnlineTime = function(params) {
    return ajaxGet(getBizOnlineTime +'?'+ params)
}
// 该市场电子秤不在线天数
export const GetBizNotOnlineTime = function(params){
    return ajaxGet(getBizNotOnlineTime + '?' + params)
}
// 商品交易量及价格走势(前10)
export const GetGoodsWeightRankAndAvgPrice = function(params) {
    return ajaxGet(getGoodsWeightRankAndAvgPrice +'?'+ params)
}
// 某个市场统计页面 的总金额 ,总条数,总商户数,总商品数以及日同比，周同比、当月总金额 
export const ComputNode = function(params) {
    return ajaxGet(computNode +'?'+ params)
}
// 交易笔数周表数据
export const ComputNodeNumWeek = function(params) {
    return ajaxGet(computNodeNumWeek +'?'+ params)
}
// 交易商品周表数据
export const ComputPluNumWeek = function(params) {
    return ajaxGet(computPluNumWeek +'?'+ params)
}
// 查询本周交易额数据
export const QueryMoneyCurrentWeek = function(params) {
    return ajaxGet(queryMoneyCurrentWeek +'?'+ params)
}
// 查询本月交易额数据
export const QueryMoneyCurrentMonth = function(params) {
    return ajaxGet(queryMoneyCurrentMonth +'?'+ params)
}
// 查询当天24小时交易额数据
export const QueryMoneyCurrentDayHour = function(params) {
    return ajaxGet(queryMoneyCurrentDayHour +'?'+ params)
}
// 查询当年商户交易额排行
export const QueryMoneyCurrentYear = function(params) {
    return ajaxGet(queryMoneyCurrentYear +'?'+ params)
}
//查询月总交易额的接口
export const QueryMoneyLittleTime = function(params) {
     return ajaxGet(queryMoneyLittleTime + '?' + params)
}
//查询商品交易额的数据
export const QueryMoneyAndWeightForGoods = function(params) {
    return ajaxGet(queryMoneyAndWeightForGoods + '?' + params)
}
//查询商户交易额的数据
export const QueryMoneyAndWeightForBiz = function(params) {
    return ajaxGet(queryMoneyAndWeightForBiz + '?'+ params)
}
//查询商户交易额明细总额
export const QueryMoneyAndWeightForMarket = function(params){
    return ajaxGet(queryMoneyAndWeightForMarket + '?' + params)
}
//查询未录入商户台账数
export const QueryHasNoTzBizByNodeId = function(params){
    return ajaxGet(queryHasNoTzBizByNodeId + '?' + params)
}