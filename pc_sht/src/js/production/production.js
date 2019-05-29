import {ajaxPost,ajaxGet} from '../config/ajax.js';
import { getAllProduction } from '../address/url.js';

// 生产查询
export const  GetAllProduction  = function(params) {
  return ajaxPost(getAllProduction,params)
}