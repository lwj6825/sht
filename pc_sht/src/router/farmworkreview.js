import FarmworkReview from '@/components/farmworkreview/farmworkreview'
import SymReview from '@/components/farmworkreview/symreview'

//农事审核
export default [
  {
    path: 'farmworkreview/symreview',
    component: resolve => require(['@/components/farmworkreview/symreview'],resolve),
    name:'SymReview',
    meta:{
      id:'198',
      node:'farmworkreview',
      url:'symreview',
    }
  }
]
