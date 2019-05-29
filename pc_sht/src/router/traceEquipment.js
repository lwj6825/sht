import assets from '../components/traceEquipment/assets.vue';
import inspection from '../components/traceEquipment/inspection.vue';
import maintenance from '../components/traceEquipment/maintenance.vue'
import newAssets from '../components/traceEquipment/newAssets.vue';
import newMaintenance from '../components/traceEquipment/newMaintenance.vue'
import personalXjMsg from '../components/traceEquipment/personalXjMsg.vue';
import statisticalFx from '../components/traceEquipment/statisticalFx.vue';
import traceEquipment from '../components/traceEquipment/traceEquipment.vue';
import viewAssets from '../components/traceEquipment/viewAssets.vue';
import viewInspection from '../components/traceEquipment/viewInspection.vue';
import viewMaintenance from '../components/traceEquipment/viewMaintenance.vue';

export default [
    {
        path: 'traceEquipment/assets',
        component:resolve => require(['@/components/traceEquipment/assets'],resolve),
        name:"Assets",
        meta:{
            id:'278',
            node:'traceEquipment',
            url:'assets',
        }
    },
    {
        path: 'traceEquipment/inspection',
        component:  resolve => require(['@/components/traceEquipment/inspection'],resolve),
        name:'Inspection',
        meta:{
            id:'282',
            node:'traceEquipment',
            url:'inspection',
        }
    },
    {
        path: 'traceEquipment/maintenance',
        component:  resolve => require(['@/components/traceEquipment/maintenance'],resolve),
        name:'Maintenance',
        meta:{
            id:'286',
            node:'traceEquipment',
            url:'maintenance',
        }
    },
    {
        path: 'traceEquipment/newAssets',
        component:  resolve => require(['@/components/traceEquipment/newAssets'],resolve),
        name:'NewAssets',
        meta:{
            id:'279',
            node:'traceEquipment',
            url:'newAssets',
        }
    },
    {
        path: 'traceEquipment/newMaintenance',
        component:  resolve => require(['@/components/traceEquipment/newMaintenance'],resolve),
        name:'NewMaintenance',
        meta:{
            id:'287',
            node:'traceEquipment',
            url:'newMaintenance',
        }
    },
    {
        path: 'traceEquipment/personalXjMsg',
        component:  resolve => require(['@/components/traceEquipment/personalXjMsg'],resolve),
        name:'PersonalXjMsg',
        meta:{
            id:'283',
            node:'traceEquipment',
            url:'personalXjMsg',
        }
    },
    {
        path: 'traceEquipment/statisticalFx',
        component:resolve => require(['@/components/traceEquipment/statisticalFx'],resolve),
        name:"StatisticalFx",
        meta:{
            id:'290',
            node:'traceEquipment',
            url:'statisticalFx',
        }
    },
    {
        path: 'traceEquipment/traceEquipment',
        component:  resolve => require(['@/components/traceEquipment/traceEquipment'],resolve),
        name:'TraceEquipment',
        meta:{
            id:'276',
            node:'traceEquipment',
            url:'traceEquipment',
        }
    },
    {
        path: 'traceEquipment/viewAssets',
        component:  resolve => require(['@/components/traceEquipment/viewAssets'],resolve),
        name:'ViewAssets',
        meta:{
            id:'280',
            node:'traceEquipment',
            url:'viewAssets',
        }
    },
    {
        path: 'traceEquipment/viewInspection',
        component:  resolve => require(['@/components/traceEquipment/viewInspection'],resolve),
        name:'ViewInspection',
        meta:{
            id:'284',
            node:'traceEquipment',
            url:'viewInspection',
        }
    },
    {
        path: 'traceEquipment/viewMaintenance',
        component:  resolve => require(['@/components/traceEquipment/viewMaintenance'],resolve),
        name:'ViewMaintenance',
        meta:{
            id:'288',
            node:'traceEquipment',
            url:'viewMaintenance',
        }
    },
]

