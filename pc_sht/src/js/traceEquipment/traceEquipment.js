import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import {baseUrl,queryAssetsUser,queryAssetsConf,queryAssetsType,queryNodeBase,queryBusiness,queryAssetsBase,downloadAssetsBase,
    assetsAdd,assetsUpdate,importAssets,importAssetsUpdate,queryChangeListByAssetsId,queryInspectinfoListByAssetsId,
    queryMaintaininfoListByAssetsId,updateMoreAssetsStatus,inspectMoreAssets,addinspect,addAssetsType,setAssetsConf,deleteAssetsConf,
    queryInspect,queryInspectId,downloadInspect,deleteInspect,queryMaintain,bar_code,maintainAdd,downloadMaintain,queryMaintainId,
    deleteMaintain,queryInspectionRecord,importMaintain,queryMaintainName,updateAssetsType,deleteAssetsType,updateAssetsConf,
    queryAssetsSpecifications,queryAssetsNames,queryAssetsManufacturers,queryNodeBase2,parseMonLog,queryTableName,getFileState,
    queryFtpMonLog,getParseType
    } from "../address/url";
    
// 查询 所有资产用户信息（需要确定用户类型类型）
export const QueryAssetsUser = function(params) {
    return ajaxGet(queryAssetsUser +'?'+ params)
}
// 查询 资产状态、所属期 等查询条件下拉框
export const QueryAssetsConf = function(params) {
    return ajaxGet(queryAssetsConf +'?'+ params)
}
// 查询 资产类型树
export const QueryAssetsType = function(params) {
    return ajaxGet(queryAssetsType +'?'+ params)
}
// 查询 所有节点
export const QueryNodeBase = function(params) {
    return ajaxGet(queryNodeBase +'?'+ params)
}
// 查询 所有节点 --- 新增
export const QueryNodeBase2 = function(params) {
    return ajaxGet(queryNodeBase2 +'?'+ params)
}
// 查询 所有商户
export const QueryBusiness = function(params) {
    return ajaxGet(queryBusiness +'?'+ params)
}
// 查询资产信息
export const QueryAssetsBase  = function(params) {
    return ajaxPost(queryAssetsBase,params)
}
// 导出资产信息
// export const DownloadAssetsBase  = function(params) {
//     return ajaxPost(downloadAssetsBase,params)
// }
export const exportExcel = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadAssetsBase, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 新增资产
export const AssetsAdd  = function(params) {
    return ajaxPost(assetsAdd,params)
}
// 修改资产
export const AssetsUpdate  = function(params) {
    return ajaxPost(assetsUpdate,params)
}
// 资产批量导入 -- 新增
export const ImportAssets  = function(params) {
    return ajaxPost(importAssets,params)
}
// 资产批量导入 -- 修改
export const ImportAssetsUpdate  = function(params) {
    return ajaxPost(importAssetsUpdate,params)
}
// 资产--查询变更记录
export const QueryChangeListByAssetsId  = function(params) {
    return ajaxPost(queryChangeListByAssetsId,params)
}
//  资产--查询巡检记录
export const QueryInspectinfoListByAssetsId  = function(params) {
    return ajaxPost(queryInspectinfoListByAssetsId,params)
}
//  资产--查询维修记录
export const QueryMaintaininfoListByAssetsId  = function(params) {
    return ajaxPost(queryMaintaininfoListByAssetsId,params)
}
// 批量变更
export const UpdateMoreAssetsStatus  = function(params) {
    return ajaxPost(updateMoreAssetsStatus,params)
}
// 批量巡检
export const InspectMoreAssets  = function(params) {
    return ajaxPost(inspectMoreAssets,params)
}
// 新增巡检
export const Addinspect  = function(params) {
    return ajaxPost(addinspect,params)
}
// 新增资产类型
export const AddAssetsType  = function(params) {
    return ajaxPost(addAssetsType,params)
}
// 配置资产-新增 资产状态、部件名称、所属期
export const SetAssetsConf  = function(params) {
    return ajaxPost(setAssetsConf,params)
}
//配置资产-《删除》 资产状态、部件名称、所属期
export const DeleteAssetsConf  = function(params) {
    return ajaxPost(deleteAssetsConf,params)
}
// 查询巡检信息
export const QueryInspect  = function(params) {
    return ajaxPost(queryInspect,params)
}
// 根据巡检id查看巡检信息以及巡检记录
export const QueryInspectId  = function(params) {
    return ajaxPost(queryInspectId,params)
}
// 导出巡检信息
// export const DownloadInspect  = function(params) {
//     return ajaxPost(downloadInspect,params)
// }
export const DownloadInspect = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadInspect, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 删除巡检记录
export const DeleteInspect  = function(params) {
    return ajaxPost(deleteInspect,params)
}
// 查询维修信息
export const QueryMaintain  = function(params) {
    return ajaxPost(queryMaintain,params)
}
// 根据条码号查询设备名称
export const Bar_code  = function(params) {
    return ajaxPost(bar_code,params)
}
// 新增维修记录传资产id
export const MaintainAdd  = function(params) {
    return ajaxPost(maintainAdd,params)
}
// 导出维修记录
// export const DownloadMaintain  = function(params) {
//     return ajaxPost(downloadMaintain,params)
// }
export const DownloadMaintain = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: downloadMaintain, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 根据巡检id查看维修信息以及维修记录
export const QueryMaintainId  = function(params) {
    return ajaxPost(queryMaintainId,params)
}
// 删除维修记录
export const DeleteMaintain  = function(params) {
    return ajaxPost(deleteMaintain,params)
}
// 查看个人的巡检记录
export const QueryInspectionRecord  = function(params) {
    return ajaxPost(queryInspectionRecord,params)
}
// 维修导入
export const ImportMaintain  = function(params) {
    return ajaxPost(importMaintain,params)
}
// 维修新增输入条码号
export const QueryMaintainName  = function(params) {
    return ajaxPost(queryMaintainName,params)
}
// 修改资产类型
export const UpdateAssetsType  = function(params) {
    return ajaxPost(updateAssetsType,params)
}
// 删除资产类型
export const DeleteAssetsType  = function(params) {
    return ajaxPost(deleteAssetsType,params)
}
// 配置资产-《修改》 资产状态、部件名称、所属期
export const UpdateAssetsConf  = function(params) {
    return ajaxPost(updateAssetsConf,params)
}
// 查询所有资产规格
export const QueryAssetsSpecifications = function(params) {
    return ajaxGet(queryAssetsSpecifications +'?'+ params)
}
// 查询所有资产名称
export const QueryAssetsNames = function(params) {
    return ajaxGet(queryAssetsNames +'?'+ params)
}
// 查询所有资产生产厂家
export const QueryAssetsManufacturers = function(params) {
    return ajaxGet(queryAssetsManufacturers +'?'+ params)
}
//解析运行日志
export const ParseMonLog = function(params) {
    return ajaxPost(parseMonLog,params)
}
// 表名下拉菜单
export const QueryTableName = function(params) {
    return ajaxGet(queryTableName +'?'+ params)
}
//ftp文件日志
export const QueryFtpMonLog = function(params) {
    return ajaxPost(queryFtpMonLog,params)
}
// 任务环节下拉getFileState
export const GetParseType = function(params) {
    return ajaxGet(getParseType +'?'+ params)
}
// 状态
export const GetFileState = function(params) {
    return ajaxGet(getFileState +'?'+ params)
}