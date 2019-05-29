import analyze from '@/components/analyze/analyze'// 总
import amountJiank from '../components/analyze/amountJiank.vue' // 追溯产品交易量监控及预测
import electronicMap from '../components/analyze/electronicMap.vue' //追溯节点运营监控(电子地图）
import gailAnalyze from '../components/analyze/gailAnalyze.vue' // 追溯企业/环节覆盖率分析
import jiegAnalysis from '../components/analyze/jiegAnalysis.vue' // 追溯体系运行考核结果分析
import lthcShow from '../components/analyze/lthcShow.vue' // 追溯链条合成展示
import merchantsReport from '../components/analyze/merchantsReport.vue' // 商户运行报告
import nodeReport from '../components/analyze/nodeReport.vue' // 节点运行报告
import priceJiank from '../components/analyze/priceJiank.vue' // 追溯产品交易价格监控及预测
import statisticalShow from '../components/analyze/statisticalShow.vue' // 追溯链条合成展示
import storesReport from '../components/analyze/storesReport.vue' //  门店运行报告
import yxTestYb from '../components/analyze/yxTestYb.vue' // 运行考核月报
import cateringData from '../components/analyze/cateringData.vue'  // 餐饮数据运行概况
import dataStatistics from '../components/analyze/dataStatistics.vue'  // 数据量统计
import dxqMonitoring from '../components/analyze/dxqMonitoring.vue' // 大兴区餐饮监控
import ftqMonitoring from '../components/analyze/ftqMonitoring.vue' // 丰台区餐饮监控 
import getsTo from '../components/analyze/getsTo.vue' // 查询机 
import monitoring from '../components/analyze/monitoring.vue' // 节点/商户连续未上报及电子秤监控 
import groupData from '../components/analyze/groupData.vue' // 集团数据监控
import logMonitoring from '../components/analyze/logMonitoring.vue' // 日志监控
import dataServices from '../components/analyze/dataServices.vue' // 数据服务监控
export default [
  {
    path: 'analyze/gailAnalyze',
    component:resolve => require(['@/components/analyze/gailAnalyze'],resolve),
    name:"GailAnalyze",
    meta:{
      id:'224',
      node:'analyze',
      url:'gailAnalyze',
    }
  },
  {
    path: 'analyze/amountJiank',
    component:  resolve => require(['@/components/analyze/amountJiank'],resolve),
    name:'AmountJiank',
    meta:{
      id:'231',
      node:'analyze',
      url:'amountJiank',
    }
  },
  {
    path: 'analyze/electronicMap',
    component:  resolve => require(['@/components/analyze/electronicMap'],resolve),
    name:'ElectronicMap',
    meta:{
      id:'225',
      node:'analyze',
      url:'electronicMap',
    }
  },
//   {
//     path: 'analyze/jiegAnalysis',
//     component:  resolve => require(['@/components/analyze/jiegAnalysis'],resolve),
//     name:'JiegAnalysis',
//     meta:{
//       id:'97',
//       node:'analyze',
//       url:'jiegAnalysis',
//     }
//   },
  {
    path: 'analyze/lthcShow',
    component:  resolve => require(['@/components/analyze/lthcShow'],resolve),
    name:'LthcShow',
    meta:{
      id:'232',
      node:'analyze',
      url:'lthcShow',
    }
  },
  {
    path: 'analyze/merchantsReport',
    component:  resolve => require(['@/components/analyze/merchantsReport'],resolve),
    name:'MerchantsReport',
    meta:{
      id:'229',
      node:'analyze',
      url:'merchantsReport',
    }
  },

  {
    path: 'analyze/nodeReport',
    component:  resolve => require(['@/components/analyze/nodeReport'],resolve),
    name:'NodeReport',
    meta:{
      id:'227',
      node:'analyze',
      url:'nodeReport',
    }
  },
  {
    path: 'analyze/priceJiank',
    component:  resolve => require(['@/components/analyze/priceJiank'],resolve),
    name:'PriceJiank',
    meta:{
      id:'230',
      node:'analyze',
      url:'priceJiank',
    }
  },
  {
    path: 'analyze/statisticalShow',
    component:  resolve => require(['@/components/analyze/statisticalShow'],resolve),
    name:'StatisticalShow',
    meta:{
      id:'234',
      node:'analyze',
      url:'statisticalShow',
    }
  },
  {
    path: 'analyze/yxTestYb',
    component:  resolve => require(['@/components/analyze/yxTestYb'],resolve),
    name:'YxTestYb',
    meta:{
      id:'226',
      node:'analyze',
      url:'yxTestYb',
    }
  },
  {
    path: 'analyze/storesReport',
    component:  resolve => require(['@/components/analyze/storesReport'],resolve),
    name:'StoresReport',
    meta:{
      id:'228',
      node:'analyze',
      url:'storesReport',
    }
  },
  {
        path:'analyze/cateringData',
        component:resolve => require(['@/components/analyze/cateringData'],resolve),
        name:'CateringData',
        meta:{
            id:'306',
            node:'analyze',
            url:'cateringData',
        },
    },
    {
        path:'analyze/dataStatistics',
        component:resolve => require(['@/components/analyze/dataStatistics'],resolve),
        name:'DataStatistics',
        meta:{
            id:'303',
            node:'analyze',
            url:'dataStatistics',
        },
    },
    {
        path:'analyze/dxqMonitoring',
        component:resolve => require(['@/components/analyze/dxqMonitoring'],resolve),
        name:'DxqMonitoring',
        meta:{
            id:'308',
            node:'analyze',
            url:'dxqMonitoring',
        },
    },
    {
        path:'analyze/ftqMonitoring',
        component:resolve => require(['@/components/analyze/ftqMonitoring'],resolve),
        name:'FtqMonitoring',
        meta:{
            id:'307',
            node:'analyze',
            url:'ftqMonitoring',
        },
    },
    {
        path:'analyze/getsTo',
        component:resolve => require(['@/components/analyze/getsTo'],resolve),
        name:'GetsTo',
        meta:{
            id:'305',
            node:'analyze',
            url:'getsTo',
        },
    },
    {
        path:'analyze/monitoring',
        component:resolve => require(['@/components/analyze/monitoring'],resolve),
        name:'Monitoring',
        meta:{
            id:'304',
            node:'analyze',
            url:'monitoring',
        },
    },
    {
      path:'analyze/groupData',
      component:resolve => require(['@/components/analyze/groupData'],resolve),
      name:'GroupData',
      meta:{
          id:'335',
          node:'analyze',
          url:'groupData',
      },
  },
  {
      path:'analyze/logMonitoring',
      component:resolve => require(['@/components/analyze/logMonitoring'],resolve),
      name:'LogMonitoring',
      meta:{
          id:'336',
          node:'analyze',
          url:'logMonitoring',
      },
  },
  {
      path:'analyze/dataServices',
      component:resolve => require(['@/components/analyze/dataServices'],resolve),
      name:'DataServices',
      meta:{
          id:'337',
          node:'analyze',
          url:'dataServices',
      },
  },
]