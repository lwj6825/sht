// import DataReportList from '../components/DataEnterprise/DataReportList.vue'
// import DataMarketList from '../components/DataEnterprise/DataMarketList.vue'
export default [
    {
        path: 'DataEnterprise/DataReportList',
        component: resolve => require(['@/components/DataEnterprise/DataReportList'],resolve),
        name:'DataReportList',
        meta:{
            id:'10004',
            node:'DataEnterprise',
            url:'DataReportList',
        }
    },
    {
        path: 'DataEnterprise/DataMarketList',
        component: resolve => require(['@/components/DataEnterprise/DataMarketList'],resolve),
        name:'DataMarketList',
        meta:{
            id:'10006',
            node:'DataEnterprise',
            url:'DataMarketList',
        }
    },
]
