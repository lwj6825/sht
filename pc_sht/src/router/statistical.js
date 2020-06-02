import Statistical from '@/components/statistical/statistical'
import TotalTransaction from '@/components/statistical/totalTransaction'
import CommodityMoney from '@/components/statistical/commodityMoney'
import MerchantMoney from '@/components/statistical/merchantMoney'
import statisticsMsg from '../components/statistical/statisticsMsg'
import bizList from '../components/statistical/bizList.vue'
import viewBizList from '../components/statistical/viewBizList.vue'
import viewGoodCommodity from '../components/statistical/viewGoodCommodity.vue'

export default [
    { 
        path: 'statistical/statisticsMsg', //统计
        component: resolve => require(['@/components/statistical/statisticsMsg'],resolve),
        name:'StatisticsMsg',
        meta:{
            id:'344',
            node:'statistical',
            url:'statisticsMsg',
        }
    },
    { 
        path: 'statistical/statistical', //统计
        component: resolve => require(['@/components/statistical/statistical'],resolve),
        name:'Statistical',
        meta:{
            id:'87',
            node:'statistical',
            url:'statistical',
        }
    },
    { 
        path: 'statistical/totalTransaction', //统计
        component: resolve => require(['@/components/statistical/totalTransaction'],resolve),
        name:'TotalTransaction',
        meta:{
            id:'356',
            node:'statistical',
            url:'totalTransaction',
        }
    },
    {
        path: 'statistical/commodityMoney', //商品交易额
        component: resolve => require(['@/components/statistical/commodityMoney'],resolve),
        name:'CommodityMoney',
        meta:{
            id:'357',
            node:'statistical',
            url:'commodityMoney',
        }  
    },
    {
        path: 'statistical/merchantMoney', //商户交易额
        component: resolve => require(['@/components/statistical/merchantMoney'],resolve),
        name:'MerchantMoney',
        meta:{
            id:'358',
            node:'statistical',
            url:'merchantMoney',
        } 
    },
    {
        path: 'statistical/statisticalTz', 
        component: resolve => require(['@/components/statistical/statisticalTz'],resolve),
        name:'StatisticalTz',
        meta:{
            id:'359',
            node:'statistical',
            url:'statisticalTz',
        } 
    },
    {
        path: 'statistical/bizList',
        component: resolve => require(['@/components/statistical/bizList'],resolve),
        name:'BizList',
        meta:{
            id:'505',
            node:'statistical',
            url:'bizList',
        } 
    },
    {
        path: 'statistical/viewBizList', 
        component: resolve => require(['@/components/statistical/viewBizList'],resolve),
        name:'ViewBizList',
        meta:{
            id:'506',
            node:'statistical',
            url:'iewBizList',
        } 
    },
    {
        path: 'statistical/viewGoodCommodity', 
        component: resolve => require(['@/components/statistical/viewGoodCommodity'],resolve),
        name:'ViewGoodCommodity',
        meta:{
            // id:'506',
            node:'statistical',
            url:'iewBizList',
        } 
    },
]