import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/index.scss'
import 'vant/lib/icon/local.css'
import VueCookies from 'vue-cookies'

Vue.use(Vant)
Vue.use(VueCookies)

Vue.config.productionTip = false
console.log(process.env.NODE_BASE_URL)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
