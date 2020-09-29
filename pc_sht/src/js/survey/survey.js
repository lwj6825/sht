import {ajaxPost,ajaxGet} from '../config/ajax.js';
import axios from 'axios';
import { getNodePriceData, queryNodeGoodsDetails
} from '../address/url.js';

// 价格检测接口 shbxppt
export const GetNodePriceData  = function(params) {
    return ajaxPost(getNodePriceData,params)
}
// 查看中心价格上报商品 shbxppt
export const QueryNodeGoodsDetails  = function(params) {
    return ajaxPost(queryNodeGoodsDetails,params)
}
