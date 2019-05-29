import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {superAllFunUrlList,superAllParentNode,superAddFun,superDelete,superEdit} from '../address/url.js';

// 获取所有功能列表
export const  getAllFunUrlList  = function(params) {
  return ajaxPost(superAllFunUrlList,params)
}
// 搜索功能列表
export const searchFunUrlList = function(params){
    return ajaxPost(superAllFunUrlList , params)
}
// 删除功能列表项
export const deleteItem = function(params){
    return ajaxPost(superDelete,params)
}
// 编辑功能列表项
export const editItem = function(params){
    return ajaxPost(superEdit,params)
}
// 获取功能列表父节点名称
export const  getAllParentNode  = function() {    
    return ajaxGet(superAllParentNode)
}
// 新增功能模块
export const  addFun  = function(params) {
    return ajaxPost(superAddFun,params)
}