import quotation from '../components/quotation/quotation.vue'
import quotationList from '../components/quotation/quotationList.vue'
import viewquotation from '../components/quotation/viewquotation.vue'

export default [
    {
        path: 'quotation/quotation',
        component: resolve => require(['@/components/quotation/quotation'],resolve),
        name:"quotation",
        meta:{
            id:'388',
            node:'quotation',
            url:'quotation',
        }
    },
    {
        path: 'quotation/quotationList',
        component: resolve => require(['@/components/quotation/quotationList'],resolve),
        name:"quotationList",
        meta:{
            id:'389',
            node:'quotation',
            url:'quotationList',
        }
    },
    {
        path: 'quotation/viewQuotation',
        component: resolve => require(['@/components/quotation/viewQuotation'],resolve),
        name:"Viewquotation",
        meta:{
            id:'390',
            node:'quotation',
            url:'viewQuotation',
        }
    },
]