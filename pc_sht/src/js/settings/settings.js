import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {getAllTzType,queryArea,updateTz,saveTzProperty,saveTzUserdefineProperty,saveTzUserdefine,deleteTzUserdefine,
    merchantsName,
    equipmentManagementList,
    equipmentManagementFactory,
    newAddEquipment,
    searchGoods,
    deleteEquipment,
    queryBindMsg,
    bingKsys,
    unBindKeys,
    editEquipment,
    downLoadDoc,
    getNodeInfo,
    updateNodeInfo,
    queryGoodsForTrace,
    queryGoodsForNoTrace,
    insertGoodsForTrace,
    updateGoodsImgForTrace,
    getNodeZzrzForTrace,
    deleteNodeZzrzForTrace,
    uploadZzrzInfoForTrace,
    updatePassword,
} from '../address/url.js'

// 进货台账 销售台账 进货 tz_type = 1 销售 tz_type = 2
// 列表
export const GetEntryTz  = function(params) {
    return ajaxPost(getAllTzType,params)
}
// 编辑
// ----所选区域
export const GetArea  = function(params) {
    return ajaxPost(queryArea,params)
}
// ----编辑默认列表
export const GetUpdateTz  = function(params) {
    return ajaxPost(updateTz,params)
}
// ----是否展示必填（默认字段）
export const IsProperty  = function(params) {
    return ajaxPost(saveTzProperty,params)
}
// ----是否展示必填（自定义字段）
export const IsUserdefine  = function(params) {
    return ajaxPost(saveTzUserdefineProperty,params)
}
// ----删除自定义字段
export const DeleteUserdefine  = function(params) {
    return ajaxPost(deleteTzUserdefine,params)
}
// ----保存按钮接口
export const SaveTzUserdefine  = function(params) {
    return ajaxPost(saveTzUserdefine,params)
}
// ----设备管理-新增设备-查询商户名称
export const MerchantsName = function(params){
    return ajaxPost(merchantsName,params)
}
// ----设备管理-列表
export const EquipmentManagementList = function(params){
    return ajaxPost(equipmentManagementList,params)
}
// ----设备管理-生产厂家
export const EquipmentManagementFactory = function(){
    return ajaxGet(equipmentManagementFactory)
}
// ----设备管理-新增设备
export const NewAddEquipment =  function(params){
    return ajaxPost(newAddEquipment,params)
}
// ----设备管理-快捷键绑定商品-搜索商品
export const SearchGoods = function(params){
    return ajaxPost(searchGoods,params)
}
// ----设备管理-删除
export const DeleteEquipment = function(params){
    return ajaxPost(deleteEquipment,params)
}
// ----设备管理-查询当前设备绑定信息
export const QueryBindMsg = function(params){
    return ajaxPost(queryBindMsg,params)
}
// ----设备管理-绑定商品
export const BingKsys = function(params){
    return ajaxPost(bingKsys,params)
}
// ----设备管理-解绑商品
export const UnBindKeys = function(params){
    return ajaxPost(unBindKeys,params)
}
// ----设备管理-修改设备信息
export const EditEquipment = function(params){
    return ajaxPost(editEquipment,params)
}
// ----设备管理-下载称文件
export const DownLoadDoc = function(params){
  return ajaxPost(downLoadDoc,params)
}
// ----企业信息-获取企业信息
export const GetNodeInfo = function(params){
    return ajaxPost(getNodeInfo,params)
}
// ----企业信息-获取企业信息
export const UpdateNodeInfo = function(params){
    return ajaxPost(updateNodeInfo,params)
}
// ----追溯模板-追溯精选蔬菜查询
export const QueryGoodsForTrace = function(params){
    return ajaxPost(queryGoodsForTrace,params)
}
// ----追溯模板-追溯精选蔬菜添加时
export const QueryGoodsForNoTrace = function(params){
    return ajaxPost(queryGoodsForNoTrace,params)
}
// ----追溯模板-追溯精选选中蔬菜  0代表删除，1代表选择为精选
export const InsertGoodsForTrace = function(params){
    return ajaxPost(insertGoodsForTrace,params)
}
// ----追溯模板-追溯精选蔬菜查询
export const UpdateGoodsImgForTrace = function(params){
    return ajaxPost(updateGoodsImgForTrace,params)
}

// ----追溯模板-查询资质认证图片信息
export const GetNodeZzrzForTrace = function(params){
    return ajaxPost(getNodeZzrzForTrace,params)
}
// ----追溯模板-删除资质认证图片信息
export const DeleteNodeZzrzForTrace = function(params){
    return ajaxPost(deleteNodeZzrzForTrace,params)
}
// ----追溯模板-上传资质认证图片信息
export const UploadZzrzInfoForTrace = function(params){
    return ajaxPost(uploadZzrzInfoForTrace,params)
}
// 账户管理
export const UpdatePassword = function(params) {
    return ajaxGet(updatePassword +'?'+ params)
}