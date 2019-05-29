import Farmwork from '@/components/farmwork/farmwork'
import Recording from '@/components/farmwork/recording'
import ViewRecord from '@/components/farmwork/viewrecord'
import SyCodeApplication from '@/components/farmworksy/sycodeapplication'
import SyCodeSearch from '@/components/farmworksy/sycodesearch'
import ManagementCrop from '@/components/farmwork/managementCrop'
import AddCrop from '@/components/farmwork/addCrop'
import InforCrop from '@/components/farmwork/inforCrop'
import EditCrop from '@/components/farmwork/editCrop'

//农业_农事管理
export default [
  //农事
  {
    path: 'farmwork/recording',
    component: resolve => require(['@/components/farmwork/recording'],resolve),
    name:'Recording',
    meta:{
      id:'105',
      node:'farmwork',
      url:'recording',
    }
  },
  {
    path: 'farmwork/viewrecord',
    component: resolve => require(['@/components/farmwork/viewrecord'],resolve),
    name:'ViewRecord',
    meta:{
      id:'177',
      node:'farmwork',
      url:'viewrecord',
    }
  },
  //溯源
  {
    path: 'farmworksy/sycodeapplication',
    component: resolve => require(['@/components/farmworksy/sycodeapplication'],resolve),
    name:'SyCodeApplication',
    meta:{
      id:'179',
      node:'farmworksy',
      url:'sycodeapplication',
    }
  },
  {
    path: 'farmworksy/sycodesearch',
    component: resolve => require(['@/components/farmworksy/sycodesearch'],resolve),
    name:'SyCodeSearch',
    meta:{
      id:'181',
      node:'farmworksy',
      url:'sycodesearch',
    }
  },
  //管理
  {
    path: 'crop/managementCrop',
    component: resolve => require(['@/components/farmwork/managementCrop'],resolve),
    name:'ManagementCrop',
    meta:{
      id:'183',
      node:'crop',
      url:'managementCrop',
    }
  },
  {
    path: 'crop/addCrop',
    component: resolve => require(['@/components/farmwork/addCrop'],resolve),
    name:'AddCrop',
    meta:{
      id:'184',
      node:'crop',
      url:'addCrop',
    }
  },
  {
    path: 'crop/inforCrop',
    component: resolve => require(['@/components/farmwork/inforCrop'],resolve),
    name:'InforCrop',
    meta:{
      id:'185',
      node:'crop',
      url:'inforCrop',
    }
  },
  {
    path: 'crop/editCrop',
    component: resolve => require(['@/components/farmwork/editCrop'],resolve),
    name:'EditCrop',
    meta:{
      id:'186',
      node:'crop',
      url:'editCrop',
    }
  }
]