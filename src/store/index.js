import Vue from 'vue'
import Vuex from 'vuex'
import fullScreen from './modules/fullScreen'
import coin from './modules/coin'
import encrypedConnection from './modules/encrypedConnection'
import encrypedConnectionSSO from './modules/encrypedConnectionSSO'
import wallet from './modules/wallet'
import user from './modules/user'
import timer from './modules/timer'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fullScreen,
    coin,
    encrypedConnection,
    encrypedConnectionSSO,
    wallet,
    user,
    timer
  }
})
