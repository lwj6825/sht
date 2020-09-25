import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryNodeInfoIndexNew, getAllNodeJc, getAllNodeNew} from '../address/url.js';

// 价格监测
export const  QueryNodeInfoIndexNew  = function(params) {
    return ajaxPost(queryNodeInfoIndexNew,params)
}
// 填报企业
export const  GetAllNodeJc  = function(params) {
    return ajaxGet(getAllNodeJc +'?'+ params)
}
// 填报企业
export const  GetAllNodeNew  = function(params) {
    return ajaxGet(getAllNodeNew +'?'+ params)
}