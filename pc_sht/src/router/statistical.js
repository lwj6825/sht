import Statistical from '@/components/statistical/statistical'

export default [
    { 
        path: 'statistical/statistical', //统计
        component: resolve => require(['@/components/statistical/statistical'],resolve),
        name:'Statistical',
        meta:{
            id:'87',
            node:'statistical',
            url:'statistical',
        }
    }
]