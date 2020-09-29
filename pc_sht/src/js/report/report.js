import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import { getTodayGoodsTableLimteTime, getGoodsTypeAndName } from '../address/url.js';

// 价格报表
export const GetTodayGoodsTableLimteTime = function(params) {
    return ajaxGet(getTodayGoodsTableLimteTime +'?'+ params)
}
// 价格报表查询条件
export const GetGoodsTypeAndName = function(params) {
    return ajaxGet(getGoodsTypeAndName +'?'+ params)
}