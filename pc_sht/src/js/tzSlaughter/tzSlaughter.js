import {ajaxPost,ajaxGet} from '../config/ajax.js';
import { getAllYzctzjg,insertYzctzjg,deleteYzctzjg} from '../address/url.js';

// 查询屠宰加工
export const  GetAllYzctzjg  = function(params) {
    return ajaxPost(getAllYzctzjg,params)
}
// 新增屠宰加工
export const  InsertYzctzjg  = function(params) {
    return ajaxPost(insertYzctzjg,params)
}
// 删除屠宰加工
export const  DeleteYzctzjg  = function(params) {
    return ajaxPost(deleteYzctzjg,params)
}