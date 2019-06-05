import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import http from './filter/http'
import router from './router'
import store from './store/index'
import './assets/css/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n/i18n'
import VueResource from 'vue-resource'
import homeTitle from 'vue-wechat-title'
import './plugin/Number'
import BigNumber from './plugin/BigNumber'
import './plugin/Swiper'
import 'swiper/dist/css/swiper.min.css'
import VueClipboard from 'vue-clipboard2'
import VueQr from 'vue-qr'
import Native from './plugin/Native'
import BHCryp from './plugin/cryp'
import './plugin/Date'
import '@babel/polyfill'
import vueCookies from 'vue-cookies'
import Dialog from './plugin/Dialog'
import NumberFormat from './plugin/NumberFormat'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(i18n)
Vue.use(VueResource)
Vue.use(homeTitle)
Vue.use(BigNumber)
Vue.use(VueClipboard)
Vue.use(VueQr)
Vue.use(Native)
Vue.use(BHCryp)
Vue.use(vueCookies)
Vue.use(Dialog)
Vue.use(NumberFormat)

http.filter()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
