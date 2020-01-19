

export default [
    { 
        path: 'control/control', //数据监控管理
        component: resolve => require(['@/components/control/control'],resolve),
        name:'Control',
        meta:{
            id:'392',
            node:'control',
            url:'Control',
        }
    },
    { 
        path: 'control/dailyWarning', //预警执行日志
        component: resolve => require(['@/components/control/dailyWarning'],resolve),
        name:'DailyWarning',
        meta:{
            id:'393',
            node:'control',
            url:'dailyWarning',
        }
    },
    { 
        path: 'control/executeResult', //预警执行日志(查看执行结果)
        component: resolve => require(['@/components/control/executeResult'],resolve),
        name:'ExecuteResult',
        meta:{
            id:'411',
            node:'control',
            url:'executeResult',
        }
    },
    { 
        path: 'control/dataControl', //未上传数据企业
        component: resolve => require(['@/components/control/dataControl'],resolve),
        name:'DataControl',
        meta:{
            id:'395',
            node:'control',
            url:'dataControl',
        }
    },
    { 
        path: 'control/comparison', //缺失对照数据
        component: resolve => require(['@/components/control/comparison'],resolve),
        name:'Comparison',
        meta:{
            id:'396',
            node:'control',
            url:'comparison',
        }
    },
    { 
        path: 'control/lookComparison', //查看缺失对照企业
        component: resolve => require(['@/components/control/lookComparison'],resolve),
        name:'LookComparison',
        meta:{
            id:'432',
            node:'control',
            url:'lookComparison',
        }
    }
    // { 
    //     path: 'control/executeResult', //未上传数据企业(数据解析)
    //     component: resolve => require(['@/components/control/executeResult'],resolve),
    //     name:'ExecuteResult',
    //     meta:{
    //         id:'394',
    //         node:'control',
    //         url:'executeResult',
    //     }
]
