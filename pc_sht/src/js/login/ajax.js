import {ajaxPost} from '../config/ajax.js';
import {loginUrl,loginout} from '../address/url.js';

// 登录接口
export const  login  = function(params) {
  return ajaxPost(loginUrl,params)
}
export const  Loginout  = function(params) {
  return ajaxPost(loginout,params)
}