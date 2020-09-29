import ReportLife from '../components/FtReport/ReportLife.vue'
export default [
    {
        path: 'FtReport/ReportLife',
        component: resolve => require(['@/components/FtReport/ReportLife'],resolve),
        name:'ReportLife',
        meta:{
            id:'10009',
            node:'FtReport',
            url:'ReportLife',
        }
    },
]
