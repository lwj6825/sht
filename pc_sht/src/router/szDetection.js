import addDetection from '../components/szDetection/addDetection.vue'
import detectionList from '../components/szDetection/detectionList.vue'
import szDetection from '../components/szDetection/szDetection.vue'
import viewDetection from '../components/szDetection/viewDetection.vue'

export default [
    { 
        path: 'szDetection/szDetection', 
        component: resolve => require(['@/components/szDetection/szDetection'],resolve),
        name:'SzDetection',
        meta:{
            // id:'87',
            node:'szDetection',
            url:'szDetection',
        }
    },
    { 
        path: 'szDetection/addDetection', 
        component: resolve => require(['@/components/szDetection/addDetection'],resolve),
        name:'AddDetection',
        meta:{
            // id:'87',
            node:'szDetection',
            url:'addDetection',
        }
    },
    { 
        path: 'szDetection/detectionList', 
        component: resolve => require(['@/components/szDetection/detectionList'],resolve),
        name:'DetectionList',
        meta:{
            // id:'87',
            node:'szDetection',
            url:'detectionList',
        }
    },
    { 
        path: 'szDetection/viewDetection', 
        component: resolve => require(['@/components/szDetection/viewDetection'],resolve),
        name:'ViewDetection',
        meta:{
            // id:'87',
            node:'szDetection',
            url:'viewDetection',
        }
    },
    
]