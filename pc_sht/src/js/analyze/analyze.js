import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getAllDash} from '../address/url.js';

// 获取id
export const  GetAllDash  = function(params) {
  return ajaxPost(getAllDash,params)
}