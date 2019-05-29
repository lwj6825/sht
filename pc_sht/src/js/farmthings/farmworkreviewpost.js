import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {nsAuditQueryUrl,nsAuditInsertUrl,nsAuditDownloadUrl,nsAuditInsertOverUrl} from '../address/url.js';

//审核_查询
export const nsAuditQueryUrlPOST  = function(params) {
  return ajaxPost(nsAuditQueryUrl,params)
}

// 审核_下载
export const nsAuditDownloadUrlPOST  = function(params) {
  return ajaxPost(nsAuditDownloadUrl,params)
}

// 审核_更新
export const nsAuditInsertUrlPOST  = function(params) {
  return ajaxPost(nsAuditInsertUrl,params)
}

// 审核_更新
export const nsAuditInsertOverUrlPOST  = function(params) {
  return ajaxPost(nsAuditInsertOverUrl,params)
}






