
import assets from '../components/assets/assets.vue'
import assetsMsg from '../components/assets/assetsMsg.vue'
export default [
    {
      path: 'assets/assets',
      component:resolve => require(['@/components/assets/assets'],resolve),
      name:"assets",
      meta:{
        id:'262',
        node:'assets',
        url:'assets',
      }
    },
    {
      path: 'assets/assetsMsg',
      component:  resolve => require(['@/components/assets/assetsMsg'],resolve),
      name:'assetsMsg',
      meta:{
        id:'263',
        node:'assets',
        url:'assetsMsg',
      }
    },
]