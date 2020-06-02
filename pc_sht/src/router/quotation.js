import quotation from '../components/quotation/quotation.vue'
import quotationList from '../components/quotation/quotationList.vue'
import viewQuotation from '../components/quotation/viewQuotation.vue'

export default [
    {
        path: 'quotation/quotation',
        component: resolve => require(['@/components/quotation/quotation'],resolve),
        name:"Quotation",
        meta:{
            id:'500',
            node:'quotation',
            url:'quotation',
        }
    },
    {
        path: 'quotation/quotationList',
        component: resolve => require(['@/components/quotation/quotationList'],resolve),
        name:"QuotationList",
        meta:{
            id:'501',
            node:'quotation',
            url:'quotationList',
        }
    },
    {
        path: 'quotation/viewQuotation',
        component: resolve => require(['@/components/quotation/viewQuotation'],resolve),
        name:"ViewQuotation",
        meta:{
            id:'502',
            node:'quotation',
            url:'viewQuotation',
        }
    },
]
