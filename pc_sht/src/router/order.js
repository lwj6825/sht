import Order from '@/components/order/order'

export default [
    { 
        path: 'order',//订单
        component: resolve => require(['@/components/order/order'],resolve),
        name:'Order',
        children:[]
      }
]