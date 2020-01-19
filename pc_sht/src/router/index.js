import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login'
import Home from '@/components/home/home'
// 普通用户
import statistical from './statistical.js'
import standingBook from './standingBook.js'
import order from './order.js'
import management from './management.js'
import goods from './goods.js'
import settings from './settings.js'
import district from './district.js'
import lzproduce from "./lzproduce.js";
import farmwork from "./farmwork.js";
import traceEquipment from "./traceEquipment.js"
import szDetection from "./szDetection.js"
import tzFarming from "./tzFarming"
import tzSlaughter from "./tzSlaughter"
// import farmworksy from "./farmworksy.js";
import farmworkcommodity from "./farmworkcommodity.js";
import farmworkreview from "./farmworkreview.js";
import production from "./production.js"
// 超管    ...farmworksy,
import user from './user.js'
import role from './role.js'
import fun from './fun.js'
// BDP
import analyze from './analyze.js'
import differentSz from './differentSz'
import assets from './assets'
import retail from './retail'
import repair from './repair'

import control from './control'
import analysis from './analysis'
import collect from './collect'
import warning from './warning'
import nodeManage from './nodeManage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        ...statistical,
        ...standingBook,
        ...order,
        ...district,
        ...management,
        ...farmwork,
        ...lzproduce,

        ...farmworkcommodity,
        ...farmworkreview,
        ...goods,
        ...settings,
        ...user,
        ...role,
        ...fun,
        ...analyze,
        ...differentSz,
        ...assets,
        ...production,
        ...traceEquipment,
        ...szDetection,
        ...tzFarming,
        ...tzSlaughter,
        ...retail,
        ...repair,
        ...control,
        ...analysis,
        ...collect,
        ...warning,
        ...nodeManage
      ]
    },
  ]
})
