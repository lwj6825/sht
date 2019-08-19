import newSlaughter from '../components/tzSlaughter/newSlaughter.vue'
import slaughterList from '../components/tzSlaughter/slaughterList.vue'
import tzSlaughter from '../components/tzSlaughter/tzSlaughter.vue'
import viewSlaughter from '../components/tzSlaughter/viewSlaughter.vue'

export default [
    { 
        path: 'tzSlaughter/tzSlaughter', 
        component: resolve => require(['@/components/tzSlaughter/tzSlaughter'],resolve),
        name:'TzSlaughter',
        meta:{
            id:'351',
            node:'tzSlaughter',
            url:'tzSlaughter',
        }
    },
    { 
        path: 'tzSlaughter/newSlaughter', 
        component: resolve => require(['@/components/tzSlaughter/newSlaughter'],resolve),
        name:'NewSlaughter',
        meta:{
            id:'354',
            node:'tzSlaughter',
            url:'newSlaughter',
        }
    },
    { 
        path: 'tzSlaughter/slaughterList', 
        component: resolve => require(['@/components/tzSlaughter/slaughterList'],resolve),
        name:'SlaughterList',
        meta:{
            id:'353',
            node:'tzSlaughter',
            url:'slaughterList',
        }
    },
    { 
        path: 'tzSlaughter/viewSlaughter', 
        component: resolve => require(['@/components/tzSlaughter/viewSlaughter'],resolve),
        name:'ViewSlaughter',
        meta:{
            id:'355',
            node:'tzSlaughter',
            url:'viewSlaughter',
        }
    },
]