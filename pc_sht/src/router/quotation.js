import quotation from '../components/quotation/quotation.vue'
import quotationList from '../components/quotation/quotationList.vue'
import viewquotation from '../components/quotation/viewquotation.vue'

export default [
    {
        path: 'quotation/quotation',
        component: resolve => require(['@/components/quotation/quotation'],resolve),
        name:"quotation",
        meta:{
            id:'500',
            node:'quotation',
            url:'quotation',
        }
    },
    {
        path: 'quotation/quotationList',
        component: resolve => require(['@/components/quotation/quotationList'],resolve),
        name:"quotationList",
        meta:{
            id:'501',
            node:'quotation',
            url:'quotationList',
        }
    },
    {
        path: 'quotation/viewQuotation',
        component: resolve => require(['@/components/quotation/viewQuotation'],resolve),
        name:"viewQuotation",
        meta:{
            id:'502',
            node:'quotation',
            url:'viewQuotation',
        }
    },
]
