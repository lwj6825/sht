export default [
    { 
        path: 'analysis/analysis', //数据解析
        component: resolve => require(['@/components/analysis/analysis'],resolve),
        name:'Analysis',
        meta:{
            id:'414',
            node:'analysis',
            url:'analysis',
        }
    },
    { 
        path: 'analysis/taskMotion', //任务运行日志
        component: resolve => require(['@/components/analysis/taskMotion'],resolve),
        name:'TaskMotion',
        meta:{
            id:'416',
            node:'analysis',
            url:'taskMotion',
        }
    },
    { 
        path: 'analysis/journal', //解析运行日志
        component: resolve => require(['@/components/analysis/journal'],resolve),
        name:'Journal',
        meta:{
            id:'418',
            node:'analysis',
            url:'journal',
        }
    },
    { 
        path: 'analysis/ftpFile', //ftp文件日志
        component: resolve => require(['@/components/analysis/ftpFile'],resolve),
        name:'FtpFile',
        meta:{
            id:'421',
            node:'analysis',
            url:'ftpFile',
        }
    },
    { 
        path: 'analysis/newjxsjMonitor', //解析数据监控
        component: resolve => require(['@/components/analysis/newjxsjMonitor'],resolve),
        name:'NewjxsjMonitor',
        meta:{
            id:'435',
            node:'analysis',
            url:'newjxsjMonitor',
        }
    },
    { 
        path: 'analysis/newwjscSituation', //最近文件上传情况
        component: resolve => require(['@/components/analysis/newwjscSituation'],resolve),
        name:'newwjscSituation',
        meta:{
            id:'436',
            node:'analysis',
            url:'newwjscSituation',
        }
    },
    { 
        path: 'analysis/newzjjxSituation', //最近15条解析情况
        component: resolve => require(['@/components/analysis/newzjjxSituation'],resolve),
        name:'newzjjxSituation',
        meta:{
            id:'437',
            node:'analysis',
            url:'newzjjxSituation',
        }
    },
    { 
        path: 'analysis/newcontrast', //对照管理
        component: resolve => require(['@/components/analysis/newcontrast'],resolve),
        name:'newcontrast',
        meta:{
            id:'438',
            node:'analysis',
            url:'newcontrast',
        }
    },
    // { 
    //     path: 'control/dataControl', //未上传数据企业(数据解析)
    //     component: resolve => require(['@/components/control/dataControl'],resolve),
    //     name:'DataControl',
    //     meta:{
    //         id:'395',
    //         node:'control',
    //         url:'dataControl',
    //     }
    // },
    // { 
    //     path: 'control/executeResult', //未上传数据企业(数据解析)
    //     component: resolve => require(['@/components/control/executeResult'],resolve),
    //     name:'ExecuteResult',
    //     meta:{
    //         id:'394',
    //         node:'control',
    //         url:'executeResult',
    //     }
    // },
]
