import User from '@/components/user/user'
import UserList from '@/components/user/userList'
import AddUser from '@/components/user/addUser'
import LookInfo from '@/components/user/LookInfo'
import addMarekt from '../components/user/addMarekt.vue'
import glSupplyUnit from '../components/user/glSupplyUnit.vue';
import applyJoin from '../components/user/applyJoin.vue'
import enterpriseAudit from '../components/user/enterpriseAudit.vue'
import xqReview from '../components/user/xqReview.vue'
import msgMonitoring from '../components/user/msgMonitoring.vue'
import xtRecord from '../components/user/xtRecord.vue'

export default [
  {
    path: 'user/userList', 
    component: resolve => require(['@/components/user/userList'],resolve),
    name:'UserList',
    meta:{
      id:'188',
      node:'user',
      url:'userList',
    }
  },
  {
    path: 'user/addUser', 
    component: resolve => require(['@/components/user/addUser'],resolve),
    name:'AddUser',
    meta:{
      id:'189',
      node:'user',
      url:'AddUser',
    },
  },
  {
    path: 'user/lookInfo', 
    component: resolve => require(['@/components/user/LookInfo'],resolve),
    name:'LookInfo',
    meta:{
      id:'190',
      node:'user',
      url:'LookInfo',
    },
  },
  {
    path: 'user/addMarekt', 
    component: resolve => require(['@/components/user/addMarekt'],resolve),
    name:'addMarekt',
    meta:{
      id:'260',
      node:'user',
      url:'addMarekt',
    },
  },
  {
    path: 'user/glSupplyUnit', 
    component: resolve => require(['@/components/user/glSupplyUnit'],resolve),
    name:'glSupplyUnit',
    meta:{
      id:'268',
      node:'user',
      url:'glSupplyUnit',
    },
  },
  {
    path: 'user/xqReview', 
    component: resolve => require(['@/components/user/xqReview'],resolve),
    name:'XqReview',
    meta:{
      id:'328',
      node:'user',
      url:'xqReview',
    },
  },
  {
    path: 'user/enterpriseAudit', 
    component: resolve => require(['@/components/user/enterpriseAudit'],resolve),
    name:'EnterpriseAudit',
    meta:{
      id:'325',
      node:'user',
      url:'enterpriseAudit',
    },
  },
  {
    path: 'user/msgMonitoring', 
    component: resolve => require(['@/components/user/msgMonitoring'],resolve),
    name:'MsgMonitoring',
    meta:{
      id:'327',
      node:'user',
      url:'msgMonitoring',
    },
  },
  {
    path: 'user/xtRecord', 
    component: resolve => require(['@/components/user/xtRecord'],resolve),
    name:'XtRecord',
    meta:{
      id:'326',
      node:'user',
      url:'xtRecord',
    },
  },
]