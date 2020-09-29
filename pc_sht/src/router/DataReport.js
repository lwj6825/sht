import DataReportUpload from '../components/DataReport/DataReportUpload.vue'
export default [
    {
        path: 'DataReport/DataReportUpload',
        component: resolve => require(['@/components/DataReport/DataReportUpload'],resolve),
        name:'DataReportUpload',
        meta:{
            id:'10009',
            node:'DataReport',
            url:'DataReportUpload',
        }
    },
]
