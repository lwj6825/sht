import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {loginUrl,loginout,getShtUserInfo} from '../address/url.js';

// 登录接口
export const  login  = function(params) {
  return ajaxPost(loginUrl,params)
}
// get单点登录
export const GetShtUserInfo = function(params) {
  return ajaxGet(getShtUserInfo +'?'+ params)
}
export const  Loginout  = function(params) {
  return ajaxPost(loginout,params)
}