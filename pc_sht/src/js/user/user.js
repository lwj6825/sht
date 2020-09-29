import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {
    superGetUserList,
    superAddUser,
    superEditUser,
    superDeleteUser,
    superGetAddr,
    getAllNode,
    insertNodeInfo,
    querySupplier,
    insertSupplier,
    updateSupplier,
    deleteSupplier,
    findSupplier,
    queryGyjd,
    toStart,
    toStop,
    updateState,
    getNodeApply,
    updateNodeApply,
    queryMonitoring,
    getNodeInfoXt,
    updatePasswordByUserId,
    queryNodeIdForName,
    queryNodeType,
} from '../address/url.js';

//所有用户信息
export const  getUserList  = function(params) {
    return ajaxPost(superGetUserList,params)
  }
//新增用户
export const  addUser  = function(params) {
    return ajaxPost(superAddUser,params)
  }
//修改用户
export const  editUser  = function(params) {
    return ajaxPost(superEditUser,params)
  }
//删除用户
export const  deleteUser  = function(params) {
    return ajaxPost(superDeleteUser +'?userId='+ params)
  }
//获取省
export const  getAddr  = function(params) {
    return ajaxGet(superGetAddr,params)
  }
// 创建用户--所属节点
export const  GetAllNode  = function(params) {
  return ajaxGet(getAllNode)
}
//添加市场
export const  InsertNodeInfo  = function(params) {
  return ajaxPost(insertNodeInfo,params)
}
// 添加市场企业类型
export const  QueryNodeIdForName  = function(params) {
  return ajaxPost(queryNodeIdForName,params)
}
// 添加市场企业类型查询
export const  QueryNodeType  = function(params) {
  return ajaxGet(queryNodeType,params)
}

// 供货单位 
//供货单位管理查询（超管）
export const  QuerySupplier  = function(params) {
  return ajaxPost(querySupplier,params)
}
//新增供货单位（超管）
export const  InsertSupplier  = function(params) {
  return ajaxPost(insertSupplier,params)
}
//修改供货单位（超管）
export const  UpdateSupplier  = function(params) {
  return ajaxPost(updateSupplier,params)
}
//删除供货单位（超管）
export const  DeleteSupplier  = function(params) {
  return ajaxPost(deleteSupplier,params)
}
//根据id查询供货单位（超管）
export const  FindSupplier  = function(params) {
  return ajaxPost(findSupplier,params)
}
//供应单位状态管理查询
export const  QueryGyjd  = function(params) {
  return ajaxPost(queryGyjd,params)
}
//启用
export const  ToStart  = function(params) {
  return ajaxPost(toStart,params)
}
//禁用
export const  ToStop  = function(params) {
  return ajaxPost(toStop,params)
}
//用户详情禁用启用
export const  UpdateState  = function(params) {
  return ajaxPost(updateState,params)
}
//获取申请列表
export const  GetNodeApply  = function(params) {
  return ajaxPost(getNodeApply,params)
}
// 审核状态修改
export const  UpdateNodeApply  = function(params) {
  return ajaxPost(updateNodeApply,params)
}
// 对接信息监控
export const  QueryMonitoring  = function(params) {
  return ajaxPost(queryMonitoring,params)
}
// 接入系统备案
export const  GetNodeInfoXt  = function(params) {
  return ajaxPost(getNodeInfoXt,params)
}
//修改密码
export const  UpdatePasswordByUserId  = function(params) {
  return ajaxPost(updatePasswordByUserId,params)
}