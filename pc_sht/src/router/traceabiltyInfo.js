// import adddecodingRules from '@/components/traceabiltyInfo/adddecodingRules'
// import additemCode from '@/components/traceabiltyInfo/additemCode'
// import addreviewInfo from '@/components/traceabiltyInfo/addreviewInfo'
// import addreviewInfo from '@/components/ditraceabiltyInfostrict/addreviewInfo'
// import itemCode from '@/components/traceabiltyInfo/itemCode'
// import reviewInfo from '@/components/traceabiltyInfo/reviewInfo'
// import showreviewInfo from '@/components/traceabiltyInfo/showreviewInfo'

export default [
    { 
        path: 'traceabiltyInfo/traceabiltyInfo', // 追溯信息管理
        component: resolve => require(['@/components/traceabiltyInfo/traceabiltyInfo'],resolve),
        name:'TraceabiltyInfo',
        meta:{
            id:'455',
            node:'traceabiltyInfo',
            url:'traceabiltyInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/decodingRules', // 解码规则管理
        component: resolve => require(['@/components/traceabiltyInfo/decodingRules'],resolve),
        name:'DecodingRules',
        meta:{
            id:'457',
            node:'traceabiltyInfo',
            url:'decodingRules',
        }
    },
    { 
        path: 'traceabiltyInfo/reviewInfo', // 解码规则管理
        component: resolve => require(['@/components/traceabiltyInfo/reviewInfo'],resolve),
        name:'ReviewInfo',
        meta:{
            id:'463',
            node:'traceabiltyInfo',
            url:'reviewInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/itemCode', // 解码规则管理
        component: resolve => require(['@/components/traceabiltyInfo/itemCode'],resolve),
        name:'ItemCode',
        meta:{
            id:'463',
            node:'traceabiltyInfo',
            url:'itemCode',
        }
    },
    { 
        path: 'traceabiltyInfo/additemCode', // 新增物品码
        component: resolve => require(['@/components/traceabiltyInfo/additemCode'],resolve),
        name:'AdditemCode',
        meta:{
            id:'459',
            node:'traceabiltyInfo',
            url:'additemCode',
        }
    },
    { 
        path: 'traceabiltyInfo/addreviewInfo', // 新增企业信息
        component: resolve => require(['@/components/traceabiltyInfo/addreviewInfo'],resolve),
        name:'AddreviewInfo',
        meta:{
            id:'464',
            node:'traceabiltyInfo',
            url:'addreviewInfo',
        }
    },
    { 
        path: 'traceabiltyInfo/adddecodingRules', // 新增解码规则
        component: resolve => require(['@/components/traceabiltyInfo/adddecodingRules'],resolve),
        name:'AdddecodingRules',
        meta:{
            id:'458',
            node:'traceabiltyInfo',
            url:'adddecodingRules',
        }
    }
]