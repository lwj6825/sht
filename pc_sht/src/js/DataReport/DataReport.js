import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getReportRecordFengTai,fileExportFT} from '../address/url.js';
import axios from 'axios';

// 超管查询所有市场的报价内容
export const  GetReportRecordFengTai  = function(params) {
    return ajaxPost(getReportRecordFengTai,params)
}
// 导出文件
// export const  GetfileExportFT = function(params) {
//     return ajaxPost(fileExportFT,params)
// }
export const GetfileExportFT = function(form) {
    return axios({ // 用axios发送post请求
        method: 'post',
        url: fileExportFT, // 请求地址
        data: form, // 参数
        // responseType: 'blob', // 表明返回服务器返回的数据类型
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
