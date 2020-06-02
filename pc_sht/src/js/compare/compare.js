queryNode
import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import {queryNode, queryNodeTypeSelect, queryNodeNameByType, queryNodeUserdefine, insertNodeUserdefine, batchUpdateNodeUserdefine, 
    deleteUserdefine, downloadNodeUserdefine, 
} from '../address/url.js';

// 节点类型查询
export const  QueryNodeTypeSelect  = function(params) {
    return ajaxGet(queryNodeTypeSelect +'?'+ params)
}
// 对照管理查询
export const QueryNode  = function(params) {
    return ajaxPost(queryNode, params)
}
// 商品,节点，产地，商户对照查询
export const QueryNodeUserdefine  = function(params) {
    return ajaxPost(queryNodeUserdefine, params)
}
// 添加对照（商品，产地，商户，节点）
export const InsertNodeUserdefine  = function(params) {
    return ajaxPost(insertNodeUserdefine, params)
}
// 对照批量修改（商品，产地，商户，节点）
export const BatchUpdateNodeUserdefine  = function(params) {
    return ajaxPost(batchUpdateNodeUserdefine, params)
}
// 删除对照（商品，产地，商户，节点）
export const DeleteUserdefine  = function(params) {
    return ajaxGet(geleteUserdefine +'?'+ params)
}
// 下载对照（商品，产地，商户，节点）
export const DownloadNodeUserdefine = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadNodeUserdefine, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}