// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
// import Vant from 'vant'
import 'vant/lib/vant-css/index.css';
import './style/iconfont.css';
// import './config/rem'
import VueProgressBar from 'vue-progressbar'

const options = {
  color: '#f44',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.5s',
    opacity: '1s',
    termination: 99999999
  },
  autoRevert: false,
  location: 'top',
  autoFinish: false
}

Vue.config.productionTip = false
Vue.use(VueProgressBar, options)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
