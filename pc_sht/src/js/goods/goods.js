import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {
  getDefaultProductType, 
  queryAllSuppliers,
  querySpecification,
  queryPurchase,
  deleteGoods,
  purchaseAdd,
  goodsUpdate,
  lookGoods,
  querySales,
  salesAdd,    
  goodsCode,  
  geStkOrigin,
  updateStkOr,
  deleteStkOr,
  insertStkOr,
  getGoodsJdImg,
  updateGoodsJdImg,
  deleteGoodsJdImg,
  UpdateGoodsIsNeed
} from '../address/url.js';


// 查询进货商品列表
export const purchase  = function(params) {
  return ajaxPost(queryPurchase,params)
}
// 删除进货商品商品
export const deleteGood = function(params) {
  return ajaxGet(deleteGoods +'?ID='+ params)
}
// 新增进货商品
export const addPurchase  = function(params) {
  return ajaxPost(purchaseAdd,params)
}
// 编辑进货单条商品
export const goodUpdate = function(params) {
  return ajaxPost(goodsUpdate,params)
}
// 查看进货单条商品
export const lookGood = function(params) {
  return ajaxPost(lookGoods  ,params)
}

// 商品品种——默认查询三级商品品种
export const getDefaultProductTypes  = function(params) {
  return ajaxGet(getDefaultProductType,params)
}
// 查询供应商列表（菜单选项）
export const allSuppliers  = function(params) {
  return ajaxGet(queryAllSuppliers,params)
}
// 查询规格列表
export const allSpecification  = function(params) {
  return ajaxGet(querySpecification,params)
}
// 商品编码
export const GoodsCode  = function(params) {
  return ajaxPost(goodsCode,params)
}

// 查询销售商品列表
export const sales  = function(params) {
  return ajaxPost(querySales,params)
}
// 新增销售商品
export const saleAdd  = function(params) {
  return ajaxPost(salesAdd,params)
}
// 获取销售商品的 基地图片
export const GetGoodsJdImg = function(params) {
  return ajaxGet(getGoodsJdImg +'?'+ params)
}
// 新增或者修改基地图片
export const UpdateGoodsJdImg  = function(params) {
  return ajaxPost(updateGoodsJdImg,params)
}
// 删除
export const DeleteGoodsJdImg  = function(params) {
  return ajaxGet(deleteGoodsJdImg +'?'+ params)
}
// 原料
// 查看原料
export const GeStkOrigin  = function(params) {
  return ajaxPost(geStkOrigin,params)
}
// 编辑原料
export const UpdateStkOr  = function(params) {
  return ajaxPost(updateStkOr,params)
}
// 删除原料
export const DeleteStkOr  = function(params) {
  return ajaxPost(deleteStkOr,params)
}
// 新增原料
export const InsertStkOr  = function(params) {
  return ajaxPost(insertStkOr,params)
}
//商品 是否为 生活必需品
export const updateGoodsIsNeed  = function(params) {
  return ajaxGet(UpdateGoodsIsNeed +'?'+ params)
}





