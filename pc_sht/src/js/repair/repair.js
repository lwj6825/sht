import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import { queryNodeBasePage,getAssetsConfig,getAssetsUser,insertAssetsTask,getAssetsTask,getAssetsTaskImg,updateAssetsTask,
    deleteAssetsTaskImg,getAssetsTaskInfo,insertAssetsImg,updateAssetsTaskInfo,deleteAssetsInfo,updateAssetsTaskAssignId,
    insertAssetsTaskResult,getAssetsTaskResult,getAssetsTaskLog,updateAssetsTaskScbj,deleteAssetsTask,getAllGroup,insertAssetsGroup,
    queryBusinessForMobile,downAssetsTaskXsl,deleteAssetsGroup
} from '../address/url.js';

// 查询节点
export const  QueryNodeBasePage  = function(params) {
    return ajaxGet(queryNodeBasePage +'?'+ params)
}
// 查询用户组以及 报修类型 ，任务类型
export const  GetAssetsConfig  = function(params) {
    return ajaxGet(getAssetsConfig +'?'+ params)
}
// 查询指派人 和创建人
export const  GetAssetsUser  = function(params) {
    return ajaxGet(getAssetsUser +'?'+ params)
}
// 新增报修任务，临时任务接口
export const InsertAssetsTask  = function(params) {
    return ajaxPost(insertAssetsTask,params)
}
// 查询报修任务 回收站，临时任务（id不为空的时候 （查看任务详情 时用到））
export const GetAssetsTask  = function(params) {
    return ajaxPost(getAssetsTask,params)
}
// 查询报修任务以及临时任务的 图片 （查看任务详情 时用到）
export const GetAssetsTaskImg  = function(params) {
    return ajaxPost(getAssetsTaskImg,params)
}
// 更新任务内容
export const UpdateAssetsTask  = function(params) {
    return ajaxPost(updateAssetsTask,params)
}
//  删除已存在的任务 图片 （所有图片的删除都可以用这个）
export const DeleteAssetsTaskImg  = function(params) {
    return ajaxPost(deleteAssetsTaskImg,params)
}
// 查询任务详情时 用到（查询任务解决方案 详情） 有设备
export const  GetAssetsTaskInfo  = function(params) {
    return ajaxGet(getAssetsTaskInfo +'?'+ params)
}
// 保存图片
export const InsertAssetsImg  = function(params) {
    return ajaxPost(insertAssetsImg,params)
}
// 更新任务中的设备信息
export const  UpdateAssetsTaskInfo  = function(params) {
    return ajaxPost(updateAssetsTaskInfo, params)
}
// 删除任务中的设备信息
export const  DeleteAssetsInfo  = function(params) {
    return ajaxGet(deleteAssetsInfo +'?'+ params)
}
// 修改指派人
export const  UpdateAssetsTaskAssignId  = function(params) {
    return ajaxPost(updateAssetsTaskAssignId, params)
}
// 关闭 没无设备 时  保存解决方案的图片 以及信息
export const  InsertAssetsTaskResult  = function(params) {
    return ajaxPost(insertAssetsTaskResult, params)
}
// 查看关闭任务 没无设备 时解决方案的图片 以及信息
export const  GetAssetsTaskResult  = function(params) {
    return ajaxGet(getAssetsTaskResult +'?'+ params)
}
// 查看任务日志
export const  GetAssetsTaskLog  = function(params) {
    return ajaxGet(getAssetsTaskLog +'?'+ params)
}
// 更新任务的 删除标记 
export const  UpdateAssetsTaskScbj  = function(params) {
    return ajaxPost(updateAssetsTaskScbj, params)
}
// 彻底删除
export const  DeleteAssetsTask  = function(params) {
    return ajaxPost(deleteAssetsTask, params)
}
// 获取所有分组
export const  GetAllGroup  = function(params) {
    return ajaxGet(getAllGroup +'?'+ params)
}
// 新增分组 和组员 组长 或者 修改分组
export const  InsertAssetsGroup  = function(params) {
    return ajaxPost(insertAssetsGroup, params)
}
// 删除分组
export const  DeleteAssetsGroup  = function(params) {
    return ajaxPost(deleteAssetsGroup, params)
}

// 商户分页加载
export const  QueryBusinessForMobile  = function(params) {
    return ajaxGet(queryBusinessForMobile +'?'+ params)
}
// 报修导出
export const DownAssetsTaskXsl = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downAssetsTaskXsl, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}