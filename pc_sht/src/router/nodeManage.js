export default [
    {
        path: 'nodeManage/nodeManage',
        component: resolve => require(['@/components/nodeManage/nodeManage'],resolve),
        name:"NodeManage",
        meta:{
            id:'441',
            node:'nodeManage',
            url:'nodeManage',
        }
    },
    {
        path: 'nodeManage/nodeManageMsg',
        component: resolve => require(['@/components/nodeManage/nodeManageMsg'],resolve),
        name:"NodeManageMsg",
        meta:{
            id:'442',
            node:'nodeManage',
            url:'nodeManageMsg',
        }
    },
    {
        path: 'nodeManage/addnodeManage',
        component: resolve => require(['@/components/nodeManage/addnodeManage'],resolve),
        name:"AddnodeManage",
        meta:{
            id:'443',
            node:'nodeManage',
            url:'addnodeManage',
        }
    }
]