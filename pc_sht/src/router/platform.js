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
import new_file from '../components/platform/new_file.vue';
import hahaha from '../components/platform/hahaha.vue';
export default [
    {
        path: 'platform/enterprise',
        component: resolve => require(['@/components/platform/enterprise'],resolve),
        name:"Enterprise",
        meta:{
            id:'549',
            node:'platform',
            url:'enterprise',
        }
    },
    {
        path: 'platform/DataVolume',
        component: resolve => require(['@/components/platform/DataVolume'],resolve),
        name:"DataVolume",
        meta:{
            id:'551',
            node:'platform',
            url:'DataVolume',
        }
    },
    {
        path: 'platform/nodeReport',
        component: resolve => require(['@/components/platform/nodeReport'],resolve),
        name:"NodeReport",
        meta:{
            id:'552',
            node:'platform',
            url:'nodeReport',
        }
    },
    {
        path: 'platform/merchantReport',
        component: resolve => require(['@/components/platform/merchantReport'],resolve),
        name:"MerchantReport",
        meta:{
            id:'553',
            node:'platform',
            url:'merchantReport',
        }
    },
    {
        path: 'platform/query',
        component: resolve => require(['@/components/platform/query'],resolve),
        name:"MerchantReport",
        meta:{
            id:'554',
            node:'platform',
            url:'query',
        }
    },
    {
        path: 'platform/runAssessment',
        component: resolve => require(['@/components/platform/runAssessment'],resolve),
        name:"RunAssessment",
        meta:{
            id:'556',
            node:'platform',
            url:'runAssessment',
        }
    },
    {
        path: 'platform/singleNode',
        component: resolve => require(['@/components/platform/singleNode'],resolve),
        name:"SingleNode",
        meta:{
            id:'557',
            node:'platform',
            url:'singleNode',
        }
    },
    {
        path: 'platform/moreMerchant',
        component: resolve => require(['@/components/platform/moreMerchant'],resolve),
        name:"MoreMerchant",
        meta:{
            id:'558',
            node:'platform',
            url:'moreMerchant',
        }
    },
    {
        path: 'platform/moreStore',
        component: resolve => require(['@/components/platform/moreStore'],resolve),
        name:"MoreStore",
        meta:{
            id:'558',
            node:'platform',
            url:'moreStore',
        }
    },
    {
        path: 'platform/transactionPrice',
        component: resolve => require(['@/components/platform/transactionPrice'],resolve),
        name:"TransactionPrice",
        meta:{
            id:'561',
            node:'platform',
            url:'transactionPrice',
        }
    },
    {
        path: 'platform/transactionVolume',
        component: resolve => require(['@/components/platform/transactionVolume'],resolve),
        name:"TransactionVolume",
        meta:{
            id:'562',
            node:'platform',
            url:'transactionVolume',
        }
    },
    {
        path: 'platform/new_file',
        component: resolve => require(['@/components/platform/new_file'],resolve),
        name:"New_file",
        meta:{
            id:'562',
            node:'platform',
            url:'new_file',
        }
    },
    {
        path: 'platform/hahaha',
        component: resolve => require(['@/components/platform/hahaha'],resolve),
        name:"Hahaha",
        meta:{
            id:'562',
            node:'platform',
            url:'hahaha',
        }
    }
    
]
