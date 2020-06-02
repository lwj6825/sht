import dataPricePort from '../components/dataPort/dataPricePort.vue'
import dataWeekPort from '../components/dataPort/dataWeekPort.vue'

export default [
    { 
        path: 'dataPort/dataPricePort', //对照管理
        component: resolve => require(['@/components/dataPort/dataPricePort'],resolve),
        name:'DataPricePort',
        meta:{
            id:'510',
            node:'dataPort',
            url:'dataPricePort',
        }
    },
    { 
        path: 'dataPort/dataWeekPort', //对照管理
        component: resolve => require(['@/components/dataPort/dataWeekPort'],resolve),
        name:'DataWeekPort',
        meta:{
            id:'511',
            node:'dataPort',
            url:'dataWeekPort',
        }
    },
]
