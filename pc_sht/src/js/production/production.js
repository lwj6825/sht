import {ajaxPost,ajaxGet} from '../config/ajax.js';
import { getAllProduction,queryGoodsinfo,queryPurchaseGoods,queryGoodsBatchId,insertProduction,queryPurchaseInfo,deleteProduction,
  downloadProduction,downloadBatchProduction,findProduction} from '../address/url.js';

// 生产查询
export const  GetAllProduction  = function(params) {
  return ajaxPost(getAllProduction,params)
}
// 搜索商品
export const  QueryGoodsinfo  = function(params) {
  return ajaxPost(queryGoodsinfo,params)
}
// 查询进货商品信息
export const  QueryPurchaseGoods  = function(params) {
  return ajaxPost(queryPurchaseGoods,params)
}
// 查询进货商品的批次号  选择批次号后填写重量
export const  QueryGoodsBatchId  = function(params) {
  return ajaxPost(queryGoodsBatchId,params)
}
// 新增生产任务
export const  InsertProduction  = function(params) {
  return ajaxPost(insertProduction,params)
}
// 查询进货信息
export const  QueryPurchaseInfo  = function(params) {
  return ajaxPost(queryPurchaseInfo,params)
}
// 删除生产任务
export const  DeleteProduction  = function(params) {
  return ajaxPost(deleteProduction,params)
}
// 下载文件
export const  DownloadProduction  = function(params) {
  return ajaxPost(downloadProduction,params)
}
// 批量下载文件
export const  DownloadBatchProduction  = function(params) {
  return ajaxPost(downloadBatchProduction,params)
}
// 查看生产详情
export const  FindProduction  = function(params) {
  return ajaxPost(findProduction,params)
}