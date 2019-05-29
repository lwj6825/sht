import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {
  superRoleList,
  superAddRole,
  superDeleteRole,
  superEditRole,
  superQueryRoleId,
  superParentRoleList,
  getRoleNode,
  insertRoleNode,
  deleteRoleNode,
  deleteRoleNodeList
} from '../address/url.js';

// 获取角色列表
export const  getRoleList  = function(params) {
  return ajaxPost(superRoleList,params)
}
// 新增角色
export const  addRoleList  = function(params) {
    return ajaxPost(superAddRole,params)
  }
// 删除角色
export const  deleteRoleList  = function(params) {
  return ajaxGet(superDeleteRole + '?roleid=' + params)
}
// 编辑角色
export const  editRoleList  = function(params) {
  return ajaxPost(superEditRole,params)
}
// 编辑角色时角色的权限ID
export const  queryRoleId  = function(params) {
  return ajaxPost(superQueryRoleId +'?roleid='+ params)
}

// 角色列表-父级
export const parentRoleList = function(params){
  return ajaxGet(superParentRoleList,params)
}
// 获取节点列表
export const GetRoleNode = function(params){
  return ajaxPost(getRoleNode,params)
}
// 删除节点关系列表
export const DeleteRoleNode = function(params){
  return ajaxPost(deleteRoleNode,params)
}
// 新增节点关系列表deleteRoleNodeList
export const InsertRoleNode = function(params){
  return ajaxPost(insertRoleNode,params)
}
// 批量删除节点关系列表
export const DeleteRoleNodeList = function(params){
  return ajaxPost(deleteRoleNodeList,params)
}