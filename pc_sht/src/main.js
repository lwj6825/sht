// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import'../static/style.css'
import directives from '../static/directives'
import axios from 'axios'
import elTableInfiniteScroll from 'el-table-infinite-scroll';

// import BaiduMap from 'vue-baidu-map'
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(elTableInfiniteScroll);
// Vue.use(BaiduMap, {
//   ak: 'bbXubLQnW7BMIFxVbsNKbzGgNqo2PZIg'    //这个地方是官方提供的ak密钥
// })
Vue.use(directives)

Vue.config.productionTip = false

console.log(this.$route)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
