import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getJgjgByNodeid, getNodeJgInfoGroupForJg, insertNodeJgInfo, updateNodeJgInfo, deleteNodeJgInfo} from '../address/url.js';

// 所属街道
export const  GetJgjgByNodeid  = function(params) {
    return ajaxGet(getJgjgByNodeid +'?'+ params)
}
// 企业列表
export const  GetNodeJgInfoGroupForJg  = function(params) {
    return ajaxPost(getNodeJgInfoGroupForJg,params)
}
// 新增企业
export const  InsertNodeJgInfo  = function(params) {
    return ajaxPost(insertNodeJgInfo,params)
}
// 编辑企业
export const  UpdateNodeJgInfo  = function(params) {
    return ajaxPost(updateNodeJgInfo,params)
}
// 删除企业
export const  DeleteNodeJgInfo  = function(params) {
    return ajaxGet(deleteNodeJgInfo +'?'+ params)
}