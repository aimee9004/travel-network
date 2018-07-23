// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import Vant from 'vant'
import 'vant/lib/vant-css/index.css';
import './config/rem'
import * as global_ from './config/env'

Vue.prototype.GLOBAL = global_
console.log('main GLOBAL', Vue.prototype.GLOBAL)

Vue.config.productionTip = false
// Vue.use(Vant)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
