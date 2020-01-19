export default [
    { 
        path: 'warning/warning', //预警管理
        component: resolve => require(['@/components/warning/warning'],resolve),
        name:'Warning',
        meta:{
            id:'428',
            node:'warning',
            url:'warning',
        }
    },
    { 
        path: 'warning/warnManage', //全部预警
        component: resolve => require(['@/components/warning/warnManage'],resolve),
        name:'WarnManage',
        meta:{
            id:'429',
            node:'warning',
            url:'warnManage',
        }
    },
    { 
        path: 'warning/addwarning', //添加预警
        component: resolve => require(['@/components/warning/addwarning'],resolve),
        name:'Addwarning',
        meta:{
            id:'431',
            node:'warning',
            url:'Addwarning',
        }
    },
]
