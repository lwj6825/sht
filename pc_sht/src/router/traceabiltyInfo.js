// import adddecodingRules from '@/components/traceabiltyInfo/adddecodingRules'
// import additemCode from '@/components/traceabiltyInfo/additemCode'
// import addreviewInfo from '@/components/traceabiltyInfo/addreviewInfo'
// import addreviewInfo from '@/components/ditraceabiltyInfostrict/addreviewInfo'
// import itemCode from '@/components/traceabiltyInfo/itemCode'
// import reviewInfo from '@/components/traceabiltyInfo/reviewInfo'
// import showreviewInfo from '@/components/traceabiltyInfo/showreviewInfo'
// import reviewJournal from '../components/traceabiltyInfo/reviewJournal.vue'

export default [
    { 
        path: 'traceabiltyInfo/traceabiltyInfo',
        component: resolve => require(['@/components/traceabiltyInfo/traceabiltyInfo'],resolve),
        name:'TraceabiltyInfo',
        meta:{
            id:'455',
            node:'traceabiltyInfo',
            url:'traceabiltyInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/showreviewInfo',
        component: resolve => require(['@/components/traceabiltyInfo/showreviewInfo'],resolve),
        name:'ShowreviewInfo',
        meta:{
            id:'465',
            node:'traceabiltyInfo',
            url:'showreviewInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/decodingRules',
        component: resolve => require(['@/components/traceabiltyInfo/decodingRules'],resolve),
        name:'DecodingRules',
        meta:{
            id:'457',
            node:'traceabiltyInfo',
            url:'decodingRules',
        }
    },
    { 
        path: 'traceabiltyInfo/reviewInfo',
        component: resolve => require(['@/components/traceabiltyInfo/reviewInfo'],resolve),
        name:'ReviewInfo',
        meta:{
            id:'463',
            node:'traceabiltyInfo',
            url:'reviewInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/itemCode', 
        component: resolve => require(['@/components/traceabiltyInfo/itemCode'],resolve),
        name:'ItemCode',
        meta:{
            id:'463',
            node:'traceabiltyInfo',
            url:'itemCode',
        }
    },
    { 
        path: 'traceabiltyInfo/additemCode',
        component: resolve => require(['@/components/traceabiltyInfo/additemCode'],resolve),
        name:'AdditemCode',
        meta:{
            id:'461',
            node:'traceabiltyInfo',
            url:'additemCode',
        }
    },
    { 
        path: 'traceabiltyInfo/addreviewInfo',
        component: resolve => require(['@/components/traceabiltyInfo/addreviewInfo'],resolve),
        name:'AddreviewInfo',
        meta:{
            id:'464',
            node:'traceabiltyInfo',
            url:'addreviewInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/adddecodingRules',
        component: resolve => require(['@/components/traceabiltyInfo/adddecodingRules'],resolve),
        name:'AdddecodingRules',
        meta:{
            id:'458',
            node:'traceabiltyInfo',
            url:'adddecodingRules',
        }
    },
    { 
        path: 'traceabiltyInfo/reviewJournal',
        component: resolve => require(['@/components/traceabiltyInfo/reviewJournal'],resolve),
        name:'ReviewJournal',
        meta:{
            id:'504',
            node:'traceabiltyInfo',
            url:'reviewJournal',
        }
    },
    { 
        path: 'traceabiltyInfo/retroactiveNode',
        component: resolve => require(['@/components/traceabiltyInfo/retroactiveNode'],resolve),
        name:'RetroactiveNode',
        meta:{
            id:'587',
            node:'traceabiltyInfo',
            url:'retroactiveNode',
        }
    },
    { 
        path: 'traceabiltyInfo/editRetroactiveNode',
        component: resolve => require(['@/components/traceabiltyInfo/editRetroactiveNode'],resolve),
        name:'EditRetroactiveNode',
        meta:{
            id:'588',
            node:'traceabiltyInfo',
            url:'editRetroactiveNode',
        }
    }
]