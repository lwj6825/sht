import Management from '@/components/management/management'
import MerchantsMgm from '@/components/management/merchantsMgm'
import InvitationMerchants from '@/components/management/invitationMerchants'
import NewCommodity from '@/components/management/newCommodity'
import SupplierMgm from '@/components/management/supplierMgm'
import NewSupplier from '@/components/management/newSupplier'
import ViewSupplier from '@/components/management/viewSupplier'
import EditSupplier from '@/components/management/editSupplier'
import ClientMgm from '@/components/management/clientMgm'
import NewClient from '@/components/management/newClient'
import ViewClient from '@/components/management/viewClient'
import EditClient from '@/components/management/editClient'
import ManageSuppliers from '@/components/management/manageSuppliers'
import ManageGoods from '@/components/management/manageGoods'
import MerchantsInfor from '@/components/management/merchantsInfor'
import supplyUnit from '../components/management/supplyUnit.vue'

export default [
    {
      path: 'management/merchantsMgm',
      component: resolve => require(['@/components/management/merchantsMgm'],resolve),
      name:"MerchantsMgm",
      meta:{
        id:'117',
        node:'management',
        url:'merchantsMgm',
      }
    },
    {
        path: 'management/newCommodity',
        component: resolve => require(['@/components/management/newCommodity'],resolve),
        name:'NewCommodity',
        meta:{
            id:'118',
            node:'management',
            url:'newCommodity',
        }
    },
    {
        path: 'management/manageSuppliers',
        component: resolve => require(['@/components/management/manageSuppliers'],resolve),
        name:'ManageSuppliers',
        meta:{
            id:'119',
            node:'management',
            url:'manageSuppliers',
        }
    },
    {
        path: 'management/manageGoods',
        component: resolve => require(['@/components/management/manageGoods'],resolve),
        name:'ManageGoods',
        meta:{
            id:'120',
            node:'management',
            url:'manageGoods',
        }
    },
    {
        path: 'management/merchantsInfor',
        component: resolve => require(['@/components/management/merchantsInfor'],resolve),
        name:'MerchantsInfor',
        meta:{
            id:'121',
            node:'management',
            url:'merchantsInfor',
        }
    },
    {
        path: 'management/invitationMerchants',
        component: resolve => require(['@/components/management/invitationMerchants'],resolve),
        name:'InvitationMerchants',
        meta:{
            id:'123',
            node:'management',
            url:'invitationMerchants',
        },
    },  
    {
        path: 'management/supplierMgm',
        component: resolve => require(['@/components/management/supplierMgm'],resolve),
        name:'SupplierMgm',
        meta:{
            id:'125',
            node:'management',
            url:'supplierMgm',
        }
    },
    {
        path: 'management/newSupplier',
        component: resolve => require(['@/components/management/newSupplier'],resolve),
        name:'NewSupplier',
        meta:{
            id:'126',
            node:'management',
            url:'newSupplier',
        }
    },
    {
        path: 'management/viewSupplier',
        component: resolve => require(['@/components/management/viewSupplier'],resolve),
        name:'ViewSupplier',
        meta:{
            id:'127',
            node:'management',
            url:'viewSupplier',
        }
    },
    {
        path: 'management/editSupplier',
        component: resolve => require(['@/components/management/editSupplier'],resolve),
        name:'EditSupplier',
        meta:{
            id:'128',
            node:'management',
            url:'editSupplier',
        }
    },
    {
        path: 'management/clientMgm',
        component: resolve => require(['@/components/management/clientMgm'],resolve),
        name:'ClientMgm',
        meta:{
            id:'130',
            node:'management',
            url:'clientMgm',
        }
    },
    {
        path: 'management/newClient',
        component: resolve => require(['@/components/management/newClient'],resolve),
        name:'NewClient',
        meta:{
            id:'131',
            node:'management',
            url:'newClient',
        }
    },
    {
        path: 'management/viewClient',
        component: resolve => require(['@/components/management/viewClient'],resolve),
        name:'ViewClient',
        meta:{
            id:'132',
            node:'management',
            url:'viewClient',
        }
    },
    {
        path: 'management/editClient',
        component: resolve => require(['@/components/management/editClient'],resolve),
        name:'EditClient',
        meta:{
            id:'133',
            node:'management',
            url:'editClient',
        }
    },
    {
        path: 'management/supplyUnit',
        component: resolve => require(['@/components/management/supplyUnit'],resolve),
        name:'SupplyUnit',
        meta:{
            id:'267',
            node:'management',
            url:'supplyUnit',
        }
    }
  ]