import Statistical from '@/components/statistical/statistical'
import TotalTransaction from '@/components/statistical/totalTransaction'
import CommodityMoney from '@/components/statistical/commodityMoney'
import MerchantMoney from '@/components/statistical/merchantMoney'
import statisticsMsg from '../components/statistical/statisticsMsg'

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
        path: 'statistical/statisticalTz', //商户交易额
        component: resolve => require(['@/components/statistical/statisticalTz'],resolve),
        name:'StatisticalTz',
        meta:{
            id:'359',
            node:'statistical',
            url:'statisticalTz',
        } 
    }
]