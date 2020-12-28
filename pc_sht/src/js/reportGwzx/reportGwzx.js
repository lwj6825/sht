import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import { queryWeekReportList, queryReportDetailsList, exportGwzxDetails, getShopInfoByUserId, updateShopInfoByUserId, getSavedReport,
    addReport, exportGwzxTemplate, getYestodaySaleroom, exportWeekReportExcel, } from '../address/url.js';

// 价格报表
export const  QueryWeekReportList  = function(params) {
    return ajaxPost(queryWeekReportList,params)
}
// 价格报表
export const  QueryReportDetailsList  = function(params) {
    return ajaxPost(queryReportDetailsList,params)
}
// 下载模板
export const ExportGwzxTemplate = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: exportGwzxTemplate, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 数据上报单条数据下载详情
export const ExportGwzxDetails = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: exportGwzxDetails, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
// 根据user_id 返回门店数据
export const GetShopInfoByUserId = function(params) {
    return ajaxGet(getShopInfoByUserId +'?'+ params)
}
// 根据shop_id 修改商户信息
export const  UpdateShopInfoByUserId  = function(params) {
    return ajaxPost(updateShopInfoByUserId,params)
}
// 回显已保存的数据(数据上报)
export const GetSavedReport = function(params) {
    return ajaxPost(getSavedReport,params)
}
// 数据上报新增
export const  AddReport  = function(params) {
    return ajaxPost(addReport,params)
}
// 获取本周第二天的前一天数据（上周三）参数穿上周四时间获取上周三数据
export const  GetYestodaySaleroom  = function(params) {
    return ajaxPost(getYestodaySaleroom,params)
}
// 导出汇总表
export const ExportWeekReportExcel = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: exportWeekReportExcel, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}