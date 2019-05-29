import FarmworkCommodity from '@/components/farmworkcommodity/farmworkcommodity'
import ComVariety from '@/components/farmworkcommodity/comvariety'

//农事商品
export default [

  {
    path: 'farmworkcommodity/comvariety',
    component: resolve => require(['@/components/farmworkcommodity/comvariety'],resolve),
    name:'ComVariety',
    meta:{
      id:'199',
      node:'farmworkcommodity',
      url:'comvariety',
    }
  }
]
