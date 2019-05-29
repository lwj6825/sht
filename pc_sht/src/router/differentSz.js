import differentSz from '../components/differentSz/differentSz.vue' 
import szManagement from '../components/differentSz/szManagement.vue' 
export default [
    {
      path: 'differentSz/differentSz',
      component:resolve => require(['@/components/differentSz/differentSz'],resolve),
      name:"DifferentSz",
      meta:{
        id:'236',
        node:'differentSz',
        url:'differentSz',
      }
    },
    {
      path: 'differentSz/szManagement',
      component:  resolve => require(['@/components/differentSz/szManagement'],resolve),
      name:'SzManagement',
      meta:{
        id:'237',
        node:'differentSz',
        url:'szManagement',
      }
    },
   
]