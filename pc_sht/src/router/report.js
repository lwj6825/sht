// import reportList from '../components/report/reportList.vue'

export default [
    { 
        path: 'report/reportList',
        component: resolve => require(['@/components/report/reportList'],resolve),
        name:'ReportList',
        meta:{
            id:'602',
            node:'report',
            url:'reportList',
        }
    },
]
