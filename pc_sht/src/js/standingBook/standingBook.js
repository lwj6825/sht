import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryInTzDetailRegion,tzAdd,updatePc,getAllBiz,queryInTzDetailByTzId,queryXsTzDetailRegion,querySuppiler,ZhdTzParse,
  getAllTzGys,queryCheckList,addCheckItem,deteleCheckItem,jcqueryPurchase,deleteDoc,searchDoc,deleteTzByTzId,downloadXsTzDetail,tzUpdate,
  queryXsTzDetailByTzId} from '../address/url.js';
import {baseUrl} from "../address/url";

// ----获取供应商
export const GetAllTzGys  = function(params) {
  return ajaxPost(getAllTzGys,params)
}
// 进货台账
// ----列表
export const GetEntryTz  = function(params) {
  return ajaxPost(queryInTzDetailRegion,params)
}
// 新增台账
export const TzAdd  = function(params) {
  return ajaxPost(tzAdd,params)
}
// 编辑台账
export const TzUpdate  = function(params) {
  return ajaxPost(tzUpdate,params)
}
// 删除台账
export const DeleteTzByTzId  = function(params) {
  return ajaxGet(deleteTzByTzId +'?'+ params)
}
// 获取默认、自定义列表
export const UpdatePc  = function(params) {
  return ajaxPost(updatePc,params)
}
// 查询商户
export const GetAllBiz  = function(params) {
  return ajaxPost(getAllBiz,params)
}
// 台账详情
export const QueryInTzDetailByTzId  = function(params) {
  return ajaxPost(queryInTzDetailByTzId,params)
}
// 供货单位
export const QuerySuppiler  = function(params) {
    return ajaxPost(querySuppiler,params)
}
// 销售台账
// ----列表
export const GetSaleTz  = function(params) {
  return ajaxPost(queryXsTzDetailRegion,params)
}
// ----导出
export const DownloadXsTzDetail  = function(params) {
  return ajaxPost(downloadXsTzDetail,params)
}
// ----查看详情
export const QueryXsTzDetailByTzId  = function(params) {
  return ajaxPost(queryXsTzDetailByTzId,params)
}


//检测相关代码
export const getCheckList  = function(params) {
  return ajaxPost(queryCheckList,params)
}

export const AddCheckItem  = function(params) {
  return ajaxPost(addCheckItem,params)
}

export const DeteleCheckItem  = function(params) {
  return ajaxPost(deteleCheckItem,params)
}

// 查询检测里面的商品
export const jcpurchase  = function(params) {
  return ajaxPost(jcqueryPurchase,params)
}

//删除单据
export const DeleteDoc = function(params){
  return ajaxPost(deleteDoc,params)
}
//查询单据
export const SearchDoc = function(params){
  return ajaxPost(searchDoc,params)
}
