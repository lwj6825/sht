queryNode
import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import {queryNode, queryNodeTypeSelect, queryNodeNameByType, queryNodeUserdefine, insertNodeUserdefine, batchUpdateNodeUserdefine, 
    deleteUserdefine, downloadNodeUserdefine, updateNodeUserdefine, queryReportNodeGoods, getGoodsTypes, closeReportNodeGoods, 
    queryNodeGoodsDetail, downloadReportNodeGoods, selectReportNodeGoodsType, selectReportNodeGoodsPrice, queryPriceExtract,
    getLifeBxGoods, insertLifeBxGoods, updateLifeBxGoods, deleteLifeBxGoods, downloadLifeBxGoods, batchUpdateLifeBxGoods,
    nodePriceType, nodePriceTypeNew, queryNodePriceExtract, queryNodePriceExtractNew, queryNodePriceName, insertPriceNode, updatePriceNode, batchUpdatePriceNode, 
    downloadPriceNodeExtract, nodeGoodsManage, queryNodeGoods, updateNodeGoods, queryProposalReportNodeGoods,
    queryWarningReportNodeGoods, downloadWarningNodeGoods, downloadProposalReportNodeGoods, getGoodsTypeNew, queryNodeSelectNew
} from '../address/url.js';

// 节点类型查询
export const  QueryNodeTypeSelect  = function(params) {
    return ajaxGet(queryNodeTypeSelect +'?'+ params)
}
// 节点下拉
export const  QueryNodeSelectNew  = function(params) {
    return ajaxGet(queryNodeSelectNew +'?'+ params)
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
// 编辑对照（商品，产地，商户，节点）
export const UpdateNodeUserdefine  = function(params) {
    return ajaxPost(updateNodeUserdefine, params)
}
// 对照批量修改（商品，产地，商户，节点）
export const BatchUpdateNodeUserdefine  = function(params) {
    return ajaxPost(batchUpdateNodeUserdefine, params)
}
// 删除对照（商品，产地，商户，节点）
export const DeleteUserdefine  = function(params) {
    return ajaxGet(deleteUserdefine +'?'+ params)
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
// 查看上报商品
export const QueryReportNodeGoods  = function(params) {
    return ajaxPost(queryReportNodeGoods, params)
}
// 上报商品  商品分类
export const GetGoodsTypes  = function(params) {
    return ajaxGet(getGoodsTypes +'?'+ params)
}
// 上报商品关闭上报
export const CloseReportNodeGoods  = function(params) {
    return ajaxPost(closeReportNodeGoods, params)
}
// 上报商品查看明细
export const QueryNodeGoodsDetail  = function(params) {
    return ajaxPost(queryNodeGoodsDetail, params)
}
// 上报商品 导出
export const DownloadReportNodeGoods = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadReportNodeGoods, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 已上报商品的种类（折线图）
export const SelectReportNodeGoodsType  = function(params) {
    return ajaxPost(selectReportNodeGoodsType, params)
}
// 已上报商品的均价每天（折线图）
export const SelectReportNodeGoodsPrice  = function(params) {
    return ajaxPost(selectReportNodeGoodsPrice, params)
}
// 价格抽取管理
export const QueryPriceExtract  = function(params) {
    return ajaxGet(queryPriceExtract +'?'+ params)
}
// 生活必须品商品管理列表
export const GetLifeBxGoods  = function(params) {
    return ajaxPost(getLifeBxGoods, params)
}
// 生活必须品商品列表搜索下拉  商品分类
export const GetGoodsTypeNew  = function(params) {
    return ajaxGet(getGoodsTypeNew +'?'+ params)
}
// 新增生活必须品商品
export const InsertLifeBxGoods  = function(params) {
    return ajaxPost(insertLifeBxGoods, params)
}
// 修改生活必须品商品
export const UpdateLifeBxGoods  = function(params) {
    return ajaxPost(updateLifeBxGoods, params)
}
// 删除生活必需品商品
export const DeleteLifeBxGoods  = function(params) {
    return ajaxPost(deleteLifeBxGoods, params)
}
// 导出生活必需品商品
export const DownloadLifeBxGoods  = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadLifeBxGoods, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 批量修改生活必需品商品
export const BatchUpdateLifeBxGoods  = function(params) {
    return ajaxPost(batchUpdateLifeBxGoods, params)
}
// 价格抽取节点管理的条件查询
export const NodePriceType  = function(params) {
    return ajaxGet(nodePriceType +'?'+ params)
}
// 价格抽取节点管理的条件查询
export const NodePriceTypeNew  = function(params) {
    return ajaxGet(nodePriceTypeNew +'?'+ params)
}
// 价格抽取节点查询(英文逗号)
export const QueryNodePriceExtract  = function(params) {
    return ajaxPost(queryNodePriceExtract, params)
}
// 价格抽取节点查询(英文逗号)
export const QueryNodePriceExtractNew  = function(params) {
    return ajaxPost(queryNodePriceExtractNew, params)
}
// 根据节点编码关联出其他相关信息?node_id=110100489
export const QueryNodePriceName  = function(params) {
    return ajaxGet(queryNodePriceName +'?'+ params)
}
// 新增价格节点抽取
export const InsertPriceNode  = function(params) {
    return ajaxPost(insertPriceNode, params)
}
// 编辑价格节点抽取
export const UpdatePriceNode  = function(params) {
    return ajaxPost(updatePriceNode, params)
}
// 批量编辑价格抽取节点
export const BatchUpdatePriceNode  = function(params) {
    return ajaxPost(batchUpdatePriceNode, params)
}
// 下载价格抽取节点
export const DownloadPriceNodeExtract  = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadPriceNodeExtract, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 节点商品管理
export const NodeGoodsManage  = function(params) {
    return ajaxPost(nodeGoodsManage, params)
}
// 查看全部商品
export const QueryNodeGoods  = function(params) {
    return ajaxPost(queryNodeGoods, params)
}
// 修改节点商品
export const UpdateNodeGoods  = function(params) {
    return ajaxPost(updateNodeGoods, params)
}
// 建议上报商品
export const QueryProposalReportNodeGoods  = function(params) {
    return ajaxPost(queryProposalReportNodeGoods, params)
}
// 建议上报商品下载
export const DownloadProposalReportNodeGoods  = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadProposalReportNodeGoods, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 预警商品列表
export const QueryWarningReportNodeGoods  = function(params) {
    return ajaxPost(queryWarningReportNodeGoods, params)
}
// 下载预警商品
export const DownloadWarningNodeGoods  = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadWarningNodeGoods, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}