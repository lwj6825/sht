import Settings from '@/components/settings/settings'
import EnterpriseInfo from '@/components/settings/enterpriseInfo'
import AccountSeting from '@/components/settings/accountSeting'
import StandingBookMsg from '@/components/settings/standingBookMsg'
import WorkersSeting from '@/components/settings/workersSeting'
import CustomSeting from '@/components/settings/customSeting'
import BoothManagement from '@/components/settings/boothManagement'
import EditEntryTz from '@/components/settings/editEntryTz'
import EditSaleTz from '@/components/settings/editSaleTz'
import EquipmentMsg from '@/components/settings/equipmentMsg'
import AddEquipment from '@/components/settings/addEquipment'
import retrospect from '@/components/settings/retrospect.vue'
import lookImages from '../components/settings/lookImages.vue'
import assetState from '../components/settings/assetState.vue';
import assetTypes from '../components/settings/assetTypes.vue';
import partName from '../components/settings/partName.vue';

export default [
  {
    path: 'settings/enterpriseInfo',
    component: resolve => require(['@/components/settings/enterpriseInfo'],resolve),
    name:"EnterpriseInfo",
    meta:{
      id:'99',
      node:'settings',
      url:'enterpriseInfo',
    }
  },
  {
    path: 'settings/accountSeting',
    component: resolve => require(['@/components/settings/accountSeting'],resolve),
    name:'AccountSeting',
    meta:{
      id:'144',
      node:'settings',
      url:'accountSeting',
    }
  },
  {
    path: 'settings/workersSeting',
    component: resolve => require(['@/components/settings/workersSeting'],resolve),
    name:'WorkersSeting',
    meta:{
      id:'100',
      node:'settings',
      url:'workersSeting',
    }
  },
  {
    path: 'settings/customSeting',
    component: resolve => require(['@/components/settings/customSeting'],resolve),
    name:'CustomSeting',
    meta:{
      id:'149',
      node:'settings',
      url:'customSeting',
    }
  },
  {
    path: 'settings/standingBookMsg',
    component: resolve => require(['@/components/settings/standingBookMsg'],resolve),
    name:'StandingBookMsg',
    meta:{
      id:'150',
      node:'settings',
      url:'standingBookMsg',
    }
  },
  {
    path: 'settings/boothManagement',
    component: resolve => require(['@/components/settings/boothManagement'],resolve),
    name:'BoothManagement',
    meta:{
      id:'154',
      node:'settings',
      url:'boothManagement',
    }
  },
  {
    path: 'settings/editEntryTz',
    name: 'EditEntryTz',
    component: resolve => require(['@/components/settings/editEntryTz'],resolve),
    meta:{
      id:'151',
      node:'settings',
      url:'editEntryTz',
    }
  },
  {
    path: 'settings/editSaleTz',
    name: 'EditSaleTz',
    component: resolve => require(['@/components/settings/editSaleTz'],resolve),
    meta:{
      id:'152',
      node:'settings',
      url:'editSaleTz',
    }
  },
  {
    path: 'settings/equipmentMsg',
    name: 'EquipmentMsg',
    component: resolve => require(['@/components/settings/equipmentMsg'],resolve),
    meta:{
      id:'156',
      node:'settings',
      url:'equipmentMsg',
    }
  },
  {
    path: 'settings/addEquipment',
    name: 'AddEquipment',
    component: resolve => require(['@/components/settings/addEquipment'],resolve),
    meta:{
      id:'206',
      node:'settings',
      url:'addEquipment',
    }
  },
  {
    path: 'settings/retrospect',
    name: 'Retrospect',
    component: resolve => require(['@/components/settings/retrospect'],resolve),
    meta:{
      id:'258',
      node:'settings',
      url:'retrospect',
    }
  },
  {
    path: 'settings/lookImages',
    name: 'LookImages',
    component: resolve => require(['@/components/settings/lookImages'],resolve),
    meta:{
      id:'259',
      node:'settings',
      url:'lookImages',
    }
  },
  {
    path: 'settings/assetState',
    name: 'AssetState',
    component: resolve => require(['@/components/settings/assetState'],resolve),
    meta:{
      id:'294',
      node:'settings',
      url:'assetState',
    }
  },
  {
    path: 'settings/assetTypes',
    name: 'AssetTypes',
    component: resolve => require(['@/components/settings/assetTypes'],resolve),
    meta:{
      id:'292',
      node:'settings',
      url:'assetTypes',
    }
  },
  {
    path: 'settings/partName',
    name: 'PartName',
    component: resolve => require(['@/components/settings/partName'],resolve),
    meta:{
      id:'296',
      node:'settings',
      url:'partName',
    }
  },
  
]