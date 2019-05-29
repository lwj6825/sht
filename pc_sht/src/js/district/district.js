import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getAllRegion,insertRegion,getAllBiz,insertBiz,deleteRegion,getAllGys,insertGys,superGetAddr,insertGysForBind,
    getAllGysForBind,queryPurchase2,purchaseAdd2,salesAdd2,querySales2,getAllGoodsForBind,insertGoodsForBind,getAllGysForMoreBiz,
    getAllSalesGoodsForMoreBiz,superRoleList,getAllPurchaseGoodsForMoreBiz,updateRegionAuto} from '../address/url.js';

// 新增市场区域
export const AddMarkets  = function(params) {
    return ajaxPost(insertRegion,params)
}
// 获取市场区域
export const GetMarkets  = function(params) {
    return ajaxPost(getAllRegion,params)
}
// 删除市场区域
export const DeleteMarkets  = function(params) {
    return ajaxPost(deleteRegion,params)
}
// 否生成下游台账
export const UpdateRegionAuto  = function(params) {
    return ajaxPost(updateRegionAuto,params)
}
// 管理商户
// ---获取列表
export const GetMerchants  = function(params) {
    return ajaxPost(getAllBiz,params)
}
// ---新增商户
export const AddMerchants  = function(params) {
    return ajaxPost(insertBiz,params)
}
// ---查询角色
export const GetJs  = function(params) {
    return ajaxPost(superRoleList,params)
}
// ---绑定供应商
export const BindGys  = function(params) {
    return ajaxPost(insertGysForBind,params)
}
// ---点击绑定供应商查询该商户上级中未绑定的供应商
export const GetBindGys  = function(params) {
    return ajaxPost(getAllGysForBind,params)
}
// ---查询多商户的某个区域下某个商户所有供应商
export const GetAllBindGys  = function(params) {
    return ajaxPost(getAllGysForMoreBiz,params)
}
// ---绑定商品
export const BindSp  = function(params) {
    return ajaxPost(insertGoodsForBind,params)
}
// ---点击绑定商品查询该商户上级中未绑定的商品
export const GetBindSp  = function(params) {
    return ajaxPost(getAllGoodsForBind,params)
}
// ---查询多商户的某个区域下某个商户所有销售商品
export const GetAllBindSp  = function(params) {
    return ajaxPost(getAllSalesGoodsForMoreBiz,params)
}
// ---查询多商户的某个区域下某个商户所有进货商品
export const GetAllJh  = function(params) {
    return ajaxPost(getAllPurchaseGoodsForMoreBiz,params)
}
//  管理供应商
// ---获取列表
export const GetSupplier  = function(params) {
    return ajaxPost(getAllGys,params)
}
// ---新增供应商
export const AddSupplier  = function(params) {
    return ajaxPost(insertGys,params)
}
// ---获取地区
export const GetDq  = function(params) {
    return ajaxPost(superGetAddr,params)
}
// 管理商品
// ---进货
    //查询进货商品列表
export const GetEntry  = function(params) {
    return ajaxPost(queryPurchase2,params)
}
    //新增进货商品列表
export const AddEntry  = function(params) {
    return ajaxPost(purchaseAdd2,params)
}
// ---销售
    //查询销售商品列表
export const GetSell  = function(params) {
    return ajaxPost(querySales2,params)
}
    //新增销售商品列表
export const AddSell  = function(params) {
    return ajaxPost(salesAdd2,params)
}