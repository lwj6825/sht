// import Role from '@/components/role/role'
// import RoleManagement from '@/components/role/roleManagement'
// import EditRole from '@/components/role/editRole'
// import retailRoleList from '../components/role/retailRoleList.vue'
// import newRetailRole from '../components/role/newRetailRole.vue'

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
  {
    path:'role/retailRoleList',
    component:resolve => require(['@/components/role/retailRoleList'],resolve),
    name:'RetailRoleList',
    meta:{
      // id:'192',
      node:'role',
      url:'retailRoleList',
    },
  },
  {
    path:'role/newRetailRole',
    component:resolve => require(['@/components/role/newRetailRole'],resolve),
    name:'NewRetailRole',
    meta:{
      // id:'192',
      node:'role',
      url:'newRetailRole',
    },
  },
]