  import {ajaxPost,ajaxGet} from '../config/ajax.js';
  import {queryJobType,queryExecuteResult,getAllJobExecuteLog} from '../address/url.js';

   //任务运行日志中任务类型
   export const  QueryJobType  = function() {
    return ajaxGet(queryJobType)
  }
  
  //任务运行日志中任务执行结果
  export const QueryExecuteResult  = function() {
    return ajaxGet(queryExecuteResult)
  }
  
  //任务运行日志查询
  export const  GetAllJobExecuteLog  = function(params) {
    return ajaxPost(getAllJobExecuteLog,params)
  }