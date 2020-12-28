// import District from '@/components/district/district'
// import Market from '@/components/district/market'
// import AddMarket from '@/components/district/addMarket'
// import GlMerchants from '@/components/district/glMerchants'
// import GlSupplier from '@/components/district/glSupplier'
// import GlCommodity from '@/components/district/glCommodity'
// import GlStandingBook from '@/components/district/glStandingBook'
// import Redact from '@/components/district/redact'
// import AddMerchants from '@/components/district/addMerchants'
// import AddSupplier from '@/components/district/addSupplier'
// import AddEntry from '@/components/district/addEntry'
// import AddSell from '@/components/district/addSell'
// import MerchantsXq from '@/components/district/merchantsXq'
// import SupplierXq from '@/components/district/supplierXq'
// import EntryXq from '@/components/district/entryXq'
// import SellXq from '@/components/district/sellXq'

export default [
  {
    path: 'district/market',
    component: resolve => require(['@/components/district/market'],resolve),
    name:'Market',
    meta:{
      id:'158',
      node:'district',
      url:'market',
    }
  },
  {
    path: 'district/addMarket',
    component: resolve => require(['@/components/district/addMarket'],resolve),
    name:'AddMarket',
    meta:{
      id:'159',
      node:'district',
      url:'addMarket',
    }
  },
  {
    path: 'district/glMerchants',
    component: resolve => require(['@/components/district/glMerchants'],resolve),
    name:'GlMerchants',
    meta:{
      id:'160',
      node:'district',
      url:'glMerchants',   
    }
  },
  {//新增商户 绑定供应商 绑定商品
    path: 'district/addMerchants',
    component: resolve => require(['@/components/district/addMerchants'],resolve),
    name: 'AddMerchants',
    meta:{
      id:'161',
      node:'district',
      url:'addMerchants', 
    }
  },
  {// 管理商户-商户详情
    path: 'district/merchantsXq',
    component: resolve => require(['@/components/district/merchantsXq'],resolve), 
    name: 'MerchantsXq',
    meta:{
      id:'162',
      node:'district',
      url:'merchantsXq',
    }
  },
  {
    path: 'district/glSupplier',
    component: resolve => require(['@/components/district/glSupplier'],resolve),
    name:'GlSupplier',
    meta:{
      id:'165',
      node:'district',
      url:'glSupplier',
    }
  },
  {
    path: 'district/addSupplier',
    component: resolve => require(['@/components/district/addSupplier'],resolve),
    name:'AddSupplier',
    meta:{
      id:'166',
      node:'district',
      url:'addSupplier',
    }
  },
  {
    path: 'district/supplierXq',
    name: 'SupplierXq',
    component: resolve => require(['@/components/district/supplierXq'],resolve), 
    meta:{
      id:'167',
      node:'district',
      url:'supplierXq',
    }
  },
  {
    path: 'district/glCommodity',
    component: resolve => require(['@/components/district/glCommodity'],resolve),
    name:'GlCommodity',
    meta:{
      id:'168',
      node:'district',
      url:'glCommodity',
    }
  },
  {
    path: 'district/addEntry',
    component: resolve => require(['@/components/district/addEntry'],resolve),
    name:'AddEntry',
    meta:{
      id:'169',
      node:'district',
      url:'addEntry',
    }
  },
  {
    path: 'district/entryXq',
    component: resolve => require(['@/components/district/entryXq'],resolve),
    name:'EntryXq',
    meta:{
      id:'170',
      node:'district',
      url:'entryXq',
    }
  },
  {
    path: 'district/addSell',
    component: resolve => require(['@/components/district/addSell'],resolve),
    name:'AddSell',
    meta:{
      id:'171',
      node:'district',
      url:'addSell',
    }
  },
  {
    path: 'district/sellXq',
    component: resolve => require(['@/components/district/sellXq'],resolve),
    name:'SellXq',
    meta:{
      id:'172',
      node:'district',
      url:'sellXq',
    }
  },
  {
    path: 'district/glStandingBook',
    component: resolve => require(['@/components/district/glStandingBook'],resolve),
    name:'GlStandingBook',
    meta:{
      id:'173',
      node:'district',
      url:'glStandingBook',
    }
  },
  {
    path: 'district/redact',
    component: resolve => require(['@/components/district/redact'],resolve),
    name:'Redact',
    meta:{
      id:'175',
      node:'district',
      url:'redact',
    }
  },
]