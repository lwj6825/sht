// import enterpriseFtList from '../components/enterpriseFt/enterpriseFtList.vue'

export default [
    {
        path: 'enterpriseFt/enterpriseFtList',
        component: resolve => require(['@/components/enterpriseFt/enterpriseFtList'],resolve),
        name:"EnterpriseFtList",
        meta:{
            id:'637',
            node:'enterpriseFt',
            url:'enterpriseFtList',
        }
    },
    
]