import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {queryArea} from '../address/url.js';

// 查询区域
export const QueryArea  = function(params) {
    return ajaxPost(queryArea,params)
  }