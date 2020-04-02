import monitor from '../components/monitor/monitor.vue'
import monitorMsg from '../components/monitor/monitorMsg.vue'

export default [
    {
        path: 'monitor/monitor',
        component: resolve => require(['@/components/monitor/monitor'],resolve),
        name:"Monitor",
        meta:{
            id:'481',
            node:'monitor',
            url:'monitor',
        }
    },
    {
        path: 'monitor/monitorMsg',
        component: resolve => require(['@/components/monitor/monitorMsg'],resolve),
        name:"MonitorMsg",
        meta:{
            id:'482',
            node:'monitor',
            url:'monitorMsg',
        }
    },
]