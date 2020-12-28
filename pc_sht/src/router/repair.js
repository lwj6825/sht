// import Repair from '@/components/repair/repair'
// import repairMsg from '../components/repair/repairMsg.vue'
// import viewRepair from '../components/repair/viewRepair.vue'
// import lsTask from '../components/repair/lsTask.vue'
// import recovery from '../components/repair/recovery.vue'
// import viewLsTask from '../components/repair/viewLsTask.vue'
// import viewRecovery from '../components/repair/viewRecovery.vue'

export default [
    { 
        path: 'repair/repair', //报修
        component: resolve => require(['@/components/repair/repair'],resolve),
        name:'Repair',
        meta:{
            id:'',
            node:'repair',
            url:'repair',
        }
    },
    { 
        path: 'repair/repairMsg', //报修
        component: resolve => require(['@/components/repair/repairMsg'],resolve),
        name:'RepairMsg',
        meta:{
            id:'399',
            node:'repair',
            url:'repairMsg',
        }
    },
    { 
        path: 'repair/viewRepair',
        component: resolve => require(['@/components/repair/viewRepair'],resolve),
        name:'ViewRepair',
        meta:{
            id:'400',
            node:'repair',
            url:'viewRepair',
        }
    },
    { 
        path: 'repair/lsTask',
        component: resolve => require(['@/components/repair/lsTask'],resolve),
        name:'LsTask',
        meta:{
            id:'402',
            node:'repair',
            url:'lsTask',
        }
    },
    { 
        path: 'repair/viewLsTask',
        component: resolve => require(['@/components/repair/viewLsTask'],resolve),
        name:'ViewLsTask',
        meta:{
            id:'403',
            node:'repair',
            url:'viewLsTask',
        }
    },
    { 
        path: 'repair/recovery',
        component: resolve => require(['@/components/repair/recovery'],resolve),
        name:'Recovery',
        meta:{
            id:'405',
            node:'repair',
            url:'recovery',
        }
    },
    { 
        path: 'repair/viewRecovery',
        component: resolve => require(['@/components/repair/viewRecovery'],resolve),
        name:'ViewRecovery',
        meta:{
            id:'406',
            node:'repair',
            url:'viewRecovery',
        }
    },
]