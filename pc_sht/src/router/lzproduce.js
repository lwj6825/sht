import Producetable from '@/components/lzproduce/producetable'

export default [
  //农事
  {
    path: 'statistical/lzproduce/producetable',
    component: resolve => require(['@/components/lzproduce/producetable'],resolve),
    name:'Producetable',
    meta:{
      id:'8883',
      node:'lzproduce',
      url:'producetable',
    }

  }
]
