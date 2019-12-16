import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getAllDataSource,queryDataSourceType,updateDataSource,insertDataSource,queryQuartzJob,queryQuartzState,quartzManagerNew} from '../address/url.js';

// 数据源接入查询 
export const GetAllDataSource  = function(params) {
    return ajaxPost(getAllDataSource,params)
}
//数据源编辑
export const UpdateDataSource = function(params) {
    return ajaxPost(updateDataSource,params)
}
//数据源添加
export const InsertDataSource = function(params) {
    return ajaxPost(insertDataSource,params)
}
//数据源类型查询 
export const QueryDataSourceType = function() {
    return ajaxGet(queryDataSourceType)
}
//定时任务管理中任务类型
export const QueryQuartzJob = function() {
    return ajaxGet(queryQuartzJob)
}
//定时任务管理中任务状态
export const QueryQuartzState = function() {
    return ajaxGet(queryQuartzState)
}
//定时任务管理查询
export const QuartzManagerNew = function(params) {
    return ajaxPost(quartzManagerNew,params)
}