import Goods from '@/components/goods/goods'
import Stocks from '@/components/goods/stocks'
import EditStocks from '@/components/goods/editStocks'
import ViewStocks from '@/components/goods/viewStocks'
import Market from '@/components/goods/market'
import EditMarket from '@/components/goods/editMarket'
import ViewMarket from '@/components/goods/viewMarket'
import newStocks from '../components/goods/newStocks.vue'
import newMarket from '../components/goods/newMarket.vue'

export default [
  {
    path: 'goods/stocks',
    component:resolve => require(['@/components/goods/stocks'],resolve),
    name:"Stocks",
    meta:{
      id:'96',
      node:'goods',
      url:'stocks',
    }
  },
  {
    path: 'goods/editStocks',
    component:  resolve => require(['@/components/goods/editStocks'],resolve),
    name:'EditStocks',
    meta:{
      id:'137',
      node:'goods',
      url:'editStocks',
    }
  },
  {
    path: 'goods/viewStocks',
    component:  resolve => require(['@/components/goods/viewStocks'],resolve),
    name:'ViewStocks',
    meta:{
      id:'136',
      node:'goods',
      url:'viewStocks',
    }
  },
  {
    path: 'goods/market',
    component:  resolve => require(['@/components/goods/market'],resolve),
    name:'Market',
    meta:{
      id:'97',
      node:'goods',
      url:'market',
    }
  },
  {
    path: 'goods/editMarket',
    component:  resolve => require(['@/components/goods/editMarket'],resolve),
    name:'EditMarket',
    meta:{
      id:'141',
      node:'goods',
      url:'editMarket',
    }
  },
  {
    path: 'goods/viewMarket',
    component:  resolve => require(['@/components/goods/viewMarket'],resolve),
    name:'ViewMarket',
    meta:{
      id:'140',
      node:'goods',
      url:'viewMarket',
    }
  },
  {
    path: 'goods/newStocks',
    component:  resolve => require(['@/components/goods/newStocks'],resolve),
    name:'NewStocks',
    meta:{
      id:'447',
      node:'goods',
      url:'newStocks',
    }
  },
  {
    path: 'goods/newMarket',
    component:  resolve => require(['@/components/goods/newMarket'],resolve),
    name:'NewMarket',
    meta:{
      id:'139',
      node:'goods',
      url:'newMarket',
    }
  },
]
