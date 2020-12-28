// import reportFtList from '../components/reportFt/reportFtList.vue'

export default [
    {
        path: 'reportFt/reportFtList',
        component: resolve => require(['@/components/reportFt/reportFtList'],resolve),
        name:"ReportFtList",
        meta:{
            id:'635',
            node:'reportFt',
            url:'reportFtList',
        }
    },
    
]