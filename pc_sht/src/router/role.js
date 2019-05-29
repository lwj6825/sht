import Role from '@/components/role/role'
import RoleManagement from '@/components/role/roleManagement'
import EditRole from '@/components/role/editRole'

export default [
  {
    path:'role/roleManagement',
    component:resolve => require(['@/components/role/roleManagement'],resolve),
    name:'RoleManagement',
    meta:{
      id:'191',
      node:'role',
      url:'roleManagement',
    },
  },
  {
    path:'role/editRole',
    component:resolve => require(['@/components/role/editRole'],resolve),
    name:'EditRole',
    meta:{
      id:'192',
      node:'role',
      url:'editRole',
    },
  },
]