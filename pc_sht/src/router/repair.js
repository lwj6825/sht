import Repair from '@/components/repair/repair'

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
        name:'Repair',
        meta:{
            id:'',
            node:'repair',
            url:'repairMsg',
        }
    }
]