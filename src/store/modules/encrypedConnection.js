import Vue from 'vue'

const state = {
  //  一个同步的HTTP请求
  syncResponse: null,
  // RSA加密公钥
  rsaPublicKey: null,
  // DES秘钥
  desKey: '',
  // 加密后的DES密钥
  desKeyForRSA: '',
  // 伪装登录所需的参数:token
  token: null,
  // 伪装登录所需的参数:feisuoUserId
  feisuoUserId: null,
  // 伪装登录所需的参数:sessionId
  sessionId: null
}
const getters = {
  getSyncResponse: state => {
    return state.syncResponse
  },
  getRsaPublicKey: state => {
    return state.rsaPublicKey
  },
  getDesKey: (state) => {
    return state.desKey
  },
  getDesKeyForRSA: (state) => {
    return state.desKeyForRSA
  }
}
const mutations = {
  // 设置同步请求的响应对象
  setSyncResponse: (state, response) => {
    state.syncResponse = response
  },
  // 设置从服务器获取的公钥
  setRSAPublicKey: (state, rsaPublicKey) => {
    state.rsaPublicKey = rsaPublicKey
  },
  // 清除从服务器获取的公钥
  clearRSAPublicKey: state => {
    state.rsaPublicKey = null
  },
  // 刷新本地DES秘钥
  refreshDesKey: (state) => {
    state.desKey = Vue.cryp.generateKey(64, false)
    state.desKeyForRSA = Vue.cryp.encryptByRSA(state.rsaPublicKey, state.desKey)
  },
  // 设置伪装登录所需参数
  setLoginParams (state, data) {
    state.token = data.token
    state.feisuoUserId = data.feisuoUserId
    Vue.cookies.set('SESSION', data['sessionId'], '/')
  },
  // 清除伪装登录所需参数
  clearLoginParams (state) {
    state.token = null
    state.feisuoUserId = null
    Vue.cookies.remove('SESSION', '/')
  }
}
const actions = {
  encryptConnection: ({commit, state, getters}, {url, data, refreshKey}) => {
    return new Promise((resolve, reject) => {
      // 是否需要强制刷新公钥
      if (refreshKey) {
        commit('clearRSAPublicKey')
      }
      // 获取公钥后刷新、创建DES秘钥并加密数据，建立HTTP连接
      let http = null
      const createConnection = function () {
        commit('refreshDesKey')
        const encryptedData = Vue.cryp.encryptByDES(JSON.stringify(data), state.desKey)
        const sendData = {data: encryptedData, mi: state.desKeyForRSA}
        // 是否需要伪装登录
        if (state.token && state.feisuoUserId) {
          sendData['token'] = state.token
          sendData['feisuoUserId'] = state.feisuoUserId
        }
        http = Vue.http.post(url, sendData)
        resolve(http)
        reject(http)
      }

      if (state.rsaPublicKey) {
        // 已获取公钥，本地刷新DES秘钥
        createConnection()
      } else if (!getters.getSyncResponse) {
        // 从服务器获取公钥，本地生成DES秘钥
        commit('setSyncResponse', Vue.http.post('/api/rsa/get', null))
      }
      getters.getSyncResponse.then(response => {
        commit('setRSAPublicKey', response.body.data.publicKey)
        createConnection()
        commit('setSyncResponse', null)
      }, response => {
        commit('setSyncResponse', null)
      })
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
