import {ajaxPost,ajaxGet} from '../config/ajax.js';
import { getAllProduction,queryGoodsinfo,queryPurchaseGoods,queryGoodsBatchId,insertProduction,queryPurchaseInfo,deleteProduction,
  downloadProduction,downloadBatchProduction,findProduction,getAllProductionTech,insertProductionTech,updateProductionTech,
  deleteProductionTech} from '../address/url.js';
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
// 加工工艺
// 查询加工工艺接口
export const  GetAllProductionTech  = function(params) {
  return ajaxPost(getAllProductionTech,params)
}
// 新增加工工艺接口
export const  InsertProductionTech  = function(params) {
  return ajaxPost(insertProductionTech,params)
}
// 更改加工工艺接口
export const  UpdateProductionTech  = function(params) {
  return ajaxPost(updateProductionTech,params)
}
// 删除加工工艺接口
export const  DeleteProductionTech  = function(params) {
  return ajaxPost(deleteProductionTech,params)
}