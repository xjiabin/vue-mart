import Vue from 'vue'
// import '@/lib/flexible.min'
import '@/lib/cube-ui'
import App from './App.vue'
import router from '@/routers/router'
import store from '@/store/store'
import { createAPI } from 'cube-ui'

import Kheader from '@/components/Header.vue'
import Notice from '@/components/Notice.vue'
import Ball from '@/components/Ball.vue'
import notice from '@/services/notice.js'

import { $Toast, $Alert, $Confirm } from '@/plugin/index'

Vue.component('k-header', Kheader)

Vue.config.productionTip = false

Vue.prototype.$toast = $Toast
Vue.prototype.$alert = $Alert
Vue.prototype.$confirm = $Confirm

createAPI(Vue, Notice, true);
createAPI(Vue, Ball, ['transitionend']);
Vue.prototype.$notice = notice;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
