// import reportCsList from '../components/reportCs/reportCsList.vue'

export default [
    {
        path: 'reportCs/reportCsList',
        component: resolve => require(['@/components/reportCs/reportCsList'],resolve),
        name:"ReportCsList",
        meta:{
            id:'641',
            node:'reportCs',
            url:'reportCsList',
        }
    },
    
]