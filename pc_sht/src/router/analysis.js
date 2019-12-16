

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
