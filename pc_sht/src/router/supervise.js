import supervise from '../components/supervise/supervise.vue'
import superviseMsg from '../components/supervise/superviseMsg.vue'

export default [
    {
        path: 'supervise/supervise',
        component: resolve => require(['@/components/supervise/supervise'],resolve),
        name:"Supervise",
        meta:{
            id:'484',
            node:'supervise',
            url:'supervise',
        }
    },
    {
        path: 'supervise/superviseMsg',
        component: resolve => require(['@/components/supervise/superviseMsg'],resolve),
        name:"SuperviseMsg",
        meta:{
            id:'485',
            node:'supervise',
            url:'superviseMsg',
        }
    },
]