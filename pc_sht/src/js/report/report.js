import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import { getTodayGoodsTableLimteTime, getTodayGoodsTableLimteTimeNew, getGoodsTypeAndName, getGoodsTypeAndNameNew } from '../address/url.js';

// 价格报表
export const GetTodayGoodsTableLimteTime = function(params) {
    return ajaxGet(getTodayGoodsTableLimteTime +'?'+ params)
}
// 价格报表
export const GetTodayGoodsTableLimteTimeNew = function(params) {
    return ajaxGet(getTodayGoodsTableLimteTimeNew +'?'+ params)
}
// 价格报表查询条件
export const GetGoodsTypeAndName = function(params) {
    return ajaxGet(getGoodsTypeAndName +'?'+ params)
}
// 价格报表查询条件
export const GetGoodsTypeAndNameNew = function(params) {
    return ajaxGet(getGoodsTypeAndNameNew +'?'+ params)
}