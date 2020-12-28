// import Fun from '@/components/fun/fun'
// import FunManagement from '@/components/fun/funManagement'
// import EditFun from '@/components/fun/editFun'

export default [
  {
    path: 'fun/funManagement', 
    component: resolve => require(['@/components/fun/funManagement'],resolve),
    name:'FunManagement',
    meta:{
      id:'194',
      node:'fun',
      url:'funManagement',
    }
  },
  {
    path:'fun/editFun',
    component:resolve => require(['@/components/fun/editFun'],resolve),
    name:'EditFun',
    meta:{
      id:'195',
      node:'fun',
      url:'editFun',
    },
  },
]