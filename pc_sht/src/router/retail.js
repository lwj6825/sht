// import retail from '../components/retail/retail.vue'
// import retailList from '../components/retail/retailList.vue'
// import viewRetail from '../components/retail/viewRetail.vue'
// import addPurchase from '../components/retail/addPurchase.vue'
// import dataFilling from '../components/retail/dataFilling.vue'
// import filePurchase from '../components/retail/filePurchase.vue'
// import purchaseList from '../components/retail/purchaseList.vue'
// import viewPurchase from '../components/retail/viewPurchase.vue'

export default [
    {
        path: 'retail/retail',
        component: resolve => require(['@/components/retail/retail'],resolve),
        name:"Retail",
        meta:{
            id:'388',
            node:'retail',
            url:'retail',
        }
    },
    {
        path: 'retail/retailList',
        component: resolve => require(['@/components/retail/retailList'],resolve),
        name:"RetailList",
        meta:{
            id:'389',
            node:'retail',
            url:'retailList',
        }
    },
    {
        path: 'retail/viewRetail',
        component: resolve => require(['@/components/retail/viewRetail'],resolve),
        name:"ViewRetail",
        meta:{
            id:'390',
            node:'retail',
            url:'viewRetail',
        }
    },
    {
        path: 'retail/addPurchase',
        component: resolve => require(['@/components/retail/addPurchase'],resolve),
        name:"AddPurchase",
        meta:{
            id:'609',
            node:'retail',
            url:'addPurchase',
        }
    },
    {
        path: 'retail/dataFilling',
        component: resolve => require(['@/components/retail/dataFilling'],resolve),
        name:"DataFilling",
        meta:{
            id:'607',
            node:'retail',
            url:'dataFilling',
        }
    },
    {
        path: 'retail/filePurchase',
        component: resolve => require(['@/components/retail/filePurchase'],resolve),
        name:"FilePurchase",
        meta:{
            id:'611',
            node:'retail',
            url:'filePurchase',
        }
    },
    {
        path: 'retail/purchaseList',
        component: resolve => require(['@/components/retail/purchaseList'],resolve),
        name:"PurchaseList",
        meta:{
            id:'608',
            node:'retail',
            url:'purchaseList',
        }
    },
    {
        path: 'retail/viewPurchase',
        component: resolve => require(['@/components/retail/viewPurchase'],resolve),
        name:"ViewPurchase",
        meta:{
            id:'610',
            node:'retail',
            url:'viewPurchase',
        }
    },
]