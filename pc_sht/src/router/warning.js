export default [
    { 
        path: 'warning/warning', //数据解析
        component: resolve => require(['@/components/warning/warning'],resolve),
        name:'Warning',
        meta:{
            id:'428',
            node:'warning',
            url:'warning',
        }
    },
    { 
        path: 'warning/warnManage', //任务运行日志
        component: resolve => require(['@/components/warning/warnManage'],resolve),
        name:'WarnManage',
        meta:{
            id:'429',
            node:'warning',
            url:'warnManage',
        }
    },
]
