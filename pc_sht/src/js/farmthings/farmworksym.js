import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {symQueryUrl,symGetAllUrl,symInsertUrl} from '../address/url.js';



// export const symQueryUrl = baseUrl + 'farming/querySymApply';// 溯源码查询
// export const symGetAllUrl = baseUrl + 'farming/getAllSymApply';// 获取所有溯源码
// export const symInsertUrl = baseUrl + 'farming/insertSymApply';// 溯源码查询



//溯源码查询
export const symQuery  = function(params) {
  return ajaxPost(symQueryUrl,params)
}

// 溯源码获取全部
export const symGetAllsymPost  = function(params) {
  return ajaxPost(symGetAllUrl,params)
}

// 申请溯源码_新增
export const symInsert  = function(params) {
  return ajaxPost(symInsertUrl,params)
}






