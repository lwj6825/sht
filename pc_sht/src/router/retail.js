import retail from '../components/retail/retail.vue'
import retailList from '../components/retail/retailList.vue'
import viewRetail from '../components/retail/viewRetail.vue'

export default [
    {
        path: 'retail/retail',
        component: resolve => require(['@/components/retail/retail'],resolve),
        name:"Retail",
        meta:{
            id:'388',
            node:'retail',
            url:'retail',
        }
    },
    {
        path: 'retail/retailList',
        component: resolve => require(['@/components/retail/retailList'],resolve),
        name:"RetailList",
        meta:{
            id:'389',
            node:'retail',
            url:'retailList',
        }
    },
    {
        path: 'retail/viewRetail',
        component: resolve => require(['@/components/retail/viewRetail'],resolve),
        name:"ViewRetail",
        meta:{
            id:'390',
            node:'retail',
            url:'viewRetail',
        }
    },
]