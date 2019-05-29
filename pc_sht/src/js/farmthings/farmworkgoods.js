import {ajaxPost,ajaxGet} from '../config/ajax.js';
import {nsGoodsQueryUrl,nsGoodsInsertUrl,nsGoodsDeleteUrl,nsGoodsUpdateUrl,nsGoodsNumberUrl} from '../address/url.js';

//农事产品_查询
export const nsGoodsQueryPOST  = function(params) {
  return ajaxPost(nsGoodsQueryUrl,params)
}

//农事产品_查询
export const nsGoodsNumberPOST  = function(params) {
  return ajaxPost(nsGoodsNumberUrl,params)
}

// 农事产品_删除
export const nsGoodsDeletePOST  = function(params) {
  return ajaxPost(nsGoodsDeleteUrl,params)
}

// 农事产品_新增
export const nsGoodsInsertPOST  = function(params) {
  return ajaxPost(nsGoodsInsertUrl,params)
}

// 农事产品_更新
export const nsGoodsUpdatePOST  = function(params) {
  return ajaxPost(nsGoodsUpdateUrl,params)
}






