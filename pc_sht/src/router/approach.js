import dataPricePort from '../components/approach/approachList.vue'

export default [
    { 
        path: 'approach/approachList', //对照管理
        component: resolve => require(['@/components/approach/approachList'],resolve),
        name:'ApproachList',
        meta:{
            id:'606',
            node:'approach',
            url:'approachList',
        }
    },
]
