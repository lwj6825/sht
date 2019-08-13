import farmingList from '../components/tzFarming/farmingList.vue'
import tzFarming from '../components/tzFarming/tzFarming.vue'
import viewFarming from '../components/tzFarming/viewFarming.vue'

export default [
    { 
        path: 'tzFarming/tzFarming', 
        component: resolve => require(['@/components/tzFarming/tzFarming'],resolve),
        name:'TzFarming',
        meta:{
            // id:'87',
            node:'tzFarming',
            url:'tzFarming',
        }
    },
    { 
        path: 'tzFarming/farmingList', 
        component: resolve => require(['@/components/tzFarming/farmingList'],resolve),
        name:'FarmingList',
        meta:{
            // id:'87',
            node:'tzFarming',
            url:'farmingList',
        }
    },
    { 
        path: 'tzFarming/viewFarming', 
        component: resolve => require(['@/components/tzFarming/viewFarming'],resolve),
        name:'ViewFarming',
        meta:{
            // id:'87',
            node:'tzFarming',
            url:'viewFarming',
        }
    },
]