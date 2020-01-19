import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import {getAllBiz,lookShop,
  insertBiz,
  getAllGys,
  insertGys,
  deleteGys,
  updateGys,
  supplierList,
  entryGgoodsList,
  sellGoodsList,
  bindingSupplier,
  saveBindinSupplier,
  bindingGoods,
  saveBindingGoods,
  getCenterBussinessInfo,
  insertKh,
  UpdateBizUser,
  UpdateBizBooth,
  getAllBizType,
  downloadGys,
  downloadCustomer,
  addBizId,
} from '../address/url.js';

// 查询商户列表
export const allBizs  = function(params) {
  return ajaxPost(getAllBiz,params)
}
// 新增商户
export const insBiz  = function(params) {
  return ajaxPost(insertBiz,params)
}
//商户类型 
export const GetAllBizType = function(params) {
  return ajaxGet(getAllBizType)
}
//新增商户 - 查看店铺
export const LookShop = function(params){
  return ajaxPost(lookShop,params)
} 

//商户详情  修改用户信息
export const updateBizUser = function(params){
  return ajaxPost(UpdateBizUser,params)
} 

//商户详情  修改商铺信息
export const updateBizBooth = function(params){
  return ajaxPost(UpdateBizBooth,params)
} 

// 新增供应商--
export const insGys  = function(params) {
  return ajaxPost(insertGys,params)
}
// ---新增客户 
export const InsertKh  = function(params) {
  return ajaxPost(insertKh,params)
}
// 导出客户
// export const DownloadCustomer = function(form) {
//   return axios({ // 用axios发送post请求
//       method: 'post',
//       url: downloadCustomer, // 请求地址
//       data: form, // 参数
//       // responseType: 'blob', // 表明返回服务器返回的数据类型
//       responseType: 'arraybuffer',
//       headers: {
//           'Content-Type': 'application/json'
//       }
//   })
// }
// 查询供应商列表
export const allGys  = function(params) {
  return ajaxPost(getAllGys,params)
}

// 营业执照
export const GetCenterBussinessInfo  = function(params) {
  return ajaxPost(getCenterBussinessInfo,params)
}

//删除供应商/商户
export const deleGys = function(params){
  return ajaxPost(deleteGys,params)
}

//编辑保存
export const UpdateGys = function(params){
  return ajaxPost(updateGys,params)
}

//管理供应商
export const SupplierList = function(params){
  return ajaxPost(supplierList,params)
}
//管理供应商 - 绑定供应商
export const BindingSupplier = function(params){
  return ajaxPost(bindingSupplier,params)
}

//管理供应商 - 绑定供应商保存
export const SaveBindinSupplier = function(params){
  return ajaxPost(saveBindinSupplier,params)
}

//管理商品 - 进货
export const EntryGoodsList = function(params){
  return ajaxPost(entryGgoodsList,params)
}

//管理商品 - 销售
export const SellGoodsList = function(params){
  return ajaxPost(sellGoodsList,params)
}

//管理商品 - 绑定商品列表
export const BindingGoods = function(params){
  return ajaxPost(bindingGoods,params)
}

//管理商品 - 绑定商品保存
export const SaveBindingGoods = function(params){
  return ajaxPost(saveBindingGoods,params)
}
// 自动生成得商户编码
export const  AddBizId  = function(params) {
  return ajaxGet(addBizId +'?'+ params)
}