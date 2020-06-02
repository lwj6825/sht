import enterprise from '../components/platform/enterprise.vue';
import DataVolume from '../components/platform/DataVolume.vue';
import merchantReport from '../components/platform/merchantReport.vue';
import moreMerchant from '../components/platform/moreMerchant.vue';
import moreStore from '../components/platform/moreStore.vue';
import nodeReport from '../components/platform/nodeReport.vue';
import query from '../components/platform/query.vue';
import runAssessment from '../components/platform/runAssessment.vue';
import singleNode from '../components/platform/singleNode.vue';
import transactionPrice from '../components/platform/transactionPrice.vue';
import transactionVolume from '../components/platform/transactionVolume.vue';

export default [
    {
        path: 'platform/enterprise',
        component: resolve => require(['@/components/platform/enterprise'],resolve),
        name:"Enterprise",
        meta:{
            id:'549',
            node:'enterprise',
            url:'enterprise',
        }
    },
    {
        path: 'platform/DataVolume',
        component: resolve => require(['@/components/platform/DataVolume'],resolve),
        name:"DataVolume",
        meta:{
            id:'551',
            node:'DataVolume',
            url:'DataVolume',
        }
    },
    {
        path: 'platform/nodeReport',
        component: resolve => require(['@/components/platform/nodeReport'],resolve),
        name:"NodeReport",
        meta:{
            id:'552',
            node:'nodeReport',
            url:'nodeReport',
        }
    },
    {
        path: 'platform/merchantReport',
        component: resolve => require(['@/components/platform/merchantReport'],resolve),
        name:"MerchantReport",
        meta:{
            id:'553',
            node:'merchantReport',
            url:'merchantReport',
        }
    },
    {
        path: 'platform/query',
        component: resolve => require(['@/components/platform/query'],resolve),
        name:"MerchantReport",
        meta:{
            id:'554',
            node:'query',
            url:'query',
        }
    },
    {
        path: 'platform/runAssessment',
        component: resolve => require(['@/components/platform/runAssessment'],resolve),
        name:"RunAssessment",
        meta:{
            id:'556',
            node:'runAssessment',
            url:'runAssessment',
        }
    },
    {
        path: 'platform/singleNode',
        component: resolve => require(['@/components/platform/singleNode'],resolve),
        name:"SingleNode",
        meta:{
            id:'557',
            node:'singleNode',
            url:'singleNode',
        }
    },
    {
        path: 'platform/moreMerchant',
        component: resolve => require(['@/components/platform/moreMerchant'],resolve),
        name:"MoreMerchant",
        meta:{
            id:'558',
            node:'moreMerchant',
            url:'moreMerchant',
        }
    },
    {
        path: 'platform/moreStore',
        component: resolve => require(['@/components/platform/moreStore'],resolve),
        name:"MoreStore",
        meta:{
            id:'558',
            node:'moreStore',
            url:'moreStore',
        }
    },
    {
        path: 'platform/transactionPrice',
        component: resolve => require(['@/components/platform/transactionPrice'],resolve),
        name:"TransactionPrice",
        meta:{
            id:'561',
            node:'transactionPrice',
            url:'transactionPrice',
        }
    },
    {
        path: 'platform/transactionVolume',
        component: resolve => require(['@/components/platform/transactionVolume'],resolve),
        name:"TransactionVolume",
        meta:{
            id:'562',
            node:'transactionVolume',
            url:'transactionVolume',
        }
    }
]
