import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryBizInfos, querySaleEntryJgInfo} from '../address/url.js';

// 节点名称下拉
export const  QueryBizInfos  = function(params) {
    return ajaxPost(queryBizInfos, params)
}
// 数据类型
export const  QuerySaleEntryJgInfo  = function(params) {
    return ajaxPost(querySaleEntryJgInfo, params)
}