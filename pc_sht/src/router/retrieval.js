import ledgerMsg from '../components/retrieval/ledgerMsg.vue'
import retrieval from '../components/retrieval/retrieval.vue'
import retrievalMsg from '../components/retrieval/retrievalMsg.vue'
import viewLedger from '../components/retrieval/viewLedger.vue'
import viewRetrieval from '../components/retrieval/viewRetrieval.vue'

export default [
    {
        path: 'retrieval/retrieval',
        component: resolve => require(['@/components/retrieval/retrieval'],resolve),
        name:"Retrieval",
        meta:{
            id:'470',
            node:'retrieval',
            url:'retrieval',
        }
    },
    {
        path: 'retrieval/ledgerMsg',
        component: resolve => require(['@/components/retrieval/ledgerMsg'],resolve),
        name:"LedgerMsg",
        meta:{
            id:'475',
            node:'retrieval',
            url:'ledgerMsg',
        }
    },
    {
        path: 'retrieval/retrievalMsg',
        component: resolve => require(['@/components/retrieval/retrievalMsg'],resolve),
        name:"RetrievalMsg",
        meta:{
            id:'473',
            node:'retrieval',
            url:'retrievalMsg',
        }
    },
    {
        path: 'retrieval/viewLedger',
        component: resolve => require(['@/components/retrieval/viewLedger'],resolve),
        name:"ViewLedger",
        meta:{
            id:'477',
            node:'retrieval',
            url:'viewLedger',
        }
    },
    {
        path: 'retrieval/viewRetrieval',
        component: resolve => require(['@/components/retrieval/viewRetrieval'],resolve),
        name:"ViewRetrieval",
        meta:{
            id:'474',
            node:'retrieval',
            url:'viewRetrieval',
        }
    },
]