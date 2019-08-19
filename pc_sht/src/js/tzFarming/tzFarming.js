import {ajaxPost,ajaxGet} from '../config/ajax.js';
import { getAllYzcxx,insertYzcxx,updateYzcxx,deleteYzcxx,getYzcImg,deleteYzcImg,getAllYzcda,insertYzcda,updateYzcda,deleteYzcda,
    getAllYzcfy,insertYzcfy,updateYzcfy,deleteYzcfy,getAllYzcsy,insertYzcsy,updateYzcsy,deleteYzcsy} from '../address/url.js';

// 养殖场管理查询
export const  GetAllYzcxx  = function(params) {
    return ajaxPost(getAllYzcxx,params)
}
// 新增养殖场
export const  InsertYzcxx  = function(params) {
    return ajaxPost(insertYzcxx,params)
}
// 更新养殖场
export const  UpdateYzcxx  = function(params) {
    return ajaxPost(updateYzcxx,params)
}
// 删除养殖场
export const  DeleteYzcxx  = function(params) {
    return ajaxPost(deleteYzcxx,params)
}
// 获取图片
export const GetYzcImg = function(params) {
    return ajaxGet(getYzcImg +'?'+ params)
}
// 删除图片
export const  DeleteYzcImg  = function(params) {
    return ajaxPost(deleteYzcImg,params)
}
// 查看养殖场档案信息
export const  GetAllYzcda  = function(params) {
    return ajaxPost(getAllYzcda,params)
}
// 新增养殖场档案
export const  InsertYzcda  = function(params) {
    return ajaxPost(insertYzcda,params)
}
// 更新养殖场档案
export const  UpdateYzcda  = function(params) {
    return ajaxPost(updateYzcda,params)
}
// 删除养殖场档案
export const  DeleteYzcda  = function(params) {
    return ajaxPost(deleteYzcda,params)
}
// 查看养殖场防疫
export const  GetAllYzcfy  = function(params) {
    return ajaxPost(getAllYzcfy,params)
}
// 新增养殖场档案
export const  InsertYzcfy  = function(params) {
    return ajaxPost(insertYzcfy,params)
}
// 更新养殖场防疫
export const  UpdateYzcfy  = function(params) {
    return ajaxPost(updateYzcfy,params)
}
// 删除养殖场防疫
export const  DeleteYzcfy  = function(params) {
    return ajaxPost(deleteYzcfy,params)
}
// 查询养殖场饲养
export const  GetAllYzcsy  = function(params) {
    return ajaxPost(getAllYzcsy,params)
}
// 新增养殖场饲养
export const  InsertYzcsy  = function(params) {
    return ajaxPost(insertYzcsy,params)
}
// 更新养殖场饲养记录
export const  UpdateYzcsy  = function(params) {
    return ajaxPost(updateYzcsy,params)
}
// 删除养殖场饲养
export const  DeleteYzcsy  = function(params) {
    return ajaxPost(deleteYzcsy,params)
}