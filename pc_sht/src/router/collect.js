

export default [
    { 
        path: 'collect/collect', //数据采集
        component: resolve => require(['@/components/collect/collect'],resolve),
        name:'Collect',
        meta:{
            id:'422',
            node:'collect',
            url:'collect',
        }
    },
    { 
        path: 'collect/dataSource', //数据源
        component: resolve => require(['@/components/collect/dataSource'],resolve),
        name:'DataSource',
        meta:{
            id:'424',
            node:'collect',
            url:'dataSource',
        }
    },
    { 
        path: 'collect/timeTask', //定时任务
        component: resolve => require(['@/components/collect/timeTask'],resolve),
        name:'TimeTask',
        meta:{
            id:'427',
            node:'collect',
            url:'timeTask',
        }
    },
    { 
        path: 'collect/adddataSource', //添加数据源
        component: resolve => require(['@/components/collect/adddataSource'],resolve),
        name:'AdddataSource',
        meta:{
            id:'425',
            node:'collect',
            url:'adddataSource',
        }
    }
]
