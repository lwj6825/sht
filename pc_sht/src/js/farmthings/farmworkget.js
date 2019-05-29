import {ajaxPost, ajaxGet} from '../config/ajax.js';
import {
  updateFarmPlot,
  getFarmPlotListUrl,
  addFarmPlot,
  deleteFarmPlot,
  viewFarmRecord,
  viewFarmRecordBchfz,
  viewFarmRecordNsjl,
  viewFarmAddBchfz,
  viewFarmDeleteBchfz,
  viewFarmAddNsjl,
  viewFarmDeleteNsjl,
  viewFarmAddTrsf,
  viewFarmDeleteTrsf,
  viewFarmRecordTrsf,
  viewFarmUpdateTrsf,
  viewFarmUpdateBchfz,
  viewFarmUpdateNsjl,
  viewFarmHzs,
  cropMgm,
  editSave,
} from '../address/url.js';


//查询地块列表
export const plotList = function (params) {
  return ajaxPost(getFarmPlotListUrl, params)
}

export const plotHzsList = function (params) {
  return ajaxPost(viewFarmHzs, params)
}

// 新增地块
export const addFarmPlotPost = function (params) {
  return ajaxPost(addFarmPlot, params)
}

// 更新地块
export const updateFarmPlotPost = function (params) {
  return ajaxPost(updateFarmPlot, params)
}


// 删除地块
export const deleteFarmPlotPost = function (params) {
  return ajaxPost(deleteFarmPlot, params)
}

// 查看农事记录
export const viewFarmRecordPost = function (params) {
  return ajaxPost(viewFarmRecord, params)
}

// 查看病虫害防治记录
export const viewFarmBchfzPost = function (params) {
  return ajaxPost(viewFarmRecordBchfz, params)
}
// 查看土壤施肥记录
export const viewFarmTrsfjlPost = function (params) {
  return ajaxPost(viewFarmRecordTrsf, params)
}

// 查看农事记录中的农事记录
export const viewFarmNsjlPost = function (params) {
  return ajaxPost(viewFarmRecordNsjl, params)
}

// 新增土壤施肥
export const addFarmAddTrsfPost = function (params) {
  return ajaxPost(viewFarmAddTrsf, params)
}

// 删除土壤施肥
export const deleteFarmTrsfPost = function (params) {
  return ajaxPost(viewFarmDeleteTrsf, params)
}

// 新增防虫害
export const addFarmAddBchfzPost = function (params) {
  return ajaxPost(viewFarmAddBchfz, params)
}

// 删除防虫害
export const deleteFarmBchfzPost = function (params) {
  return ajaxPost(viewFarmDeleteBchfz, params)
}


// 新增农事记录
export const addFarmAddNsjlPost = function (params) {
  return ajaxPost(viewFarmAddNsjl, params)
}


// 删除农事记录
export const deleteFarmNsjlPost = function (params) {
  return ajaxPost(viewFarmDeleteNsjl, params)
}


// 更新土壤施肥记录
export const updateFarmTrsfPost = function (params) {
  return ajaxPost(viewFarmUpdateTrsf, params)
}

// 更新病虫害防治记录
export const updateFarmBchfzPost = function (params) {
  return ajaxPost(viewFarmUpdateBchfz, params)
}

// 更新农事记录中的农事记录
export const updateFarmNsjlPost = function (params) {
  return ajaxPost(viewFarmUpdateNsjl, params)
}

//农事管理-合作社管理列表
export const CropMgm = function (params) {
  return ajaxPost(cropMgm, params)
}

//农事管理-合作社管理修改保存
export const EditSave = function (params) {
  return ajaxPost(editSave, params)
}




