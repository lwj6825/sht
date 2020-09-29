import addBizManage from '../components/nodeManage/addBizManage.vue'
import bizManageMsg from '../components/nodeManage/bizManageMsg.vue'
import editBizManage from '../components/nodeManage/editBizManage.vue'

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
    },
    {
        path: 'nodeManage/addBizManage',
        component: resolve => require(['@/components/nodeManage/addBizManage'],resolve),
        name:"AddBizManage",
        meta:{
            id:'600',
            node:'nodeManage',
            url:'addBizManage',
        }
    },
    {
        path: 'nodeManage/bizManageMsg',
        component: resolve => require(['@/components/nodeManage/bizManageMsg'],resolve),
        name:"BizManageMsg",
        meta:{
            id:'598',
            node:'nodeManage',
            url:'bizManageMsg',
        }
    },
    {
        path: 'nodeManage/editBizManage',
        component: resolve => require(['@/components/nodeManage/editBizManage'],resolve),
        name:"EditBizManage",
        meta:{
            id:'599',
            node:'nodeManage',
            url:'editBizManage',
        }
    },
]