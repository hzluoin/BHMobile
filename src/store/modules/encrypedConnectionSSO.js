import Vue from 'vue'

const state = {
  //  一个同步的HTTP请求,防止多个异步请求时，重复获取服务器RSA公钥
  // RSA加密公钥:从服务器获取，在localStorage做缓存,不在store存储;通过cookie保证和浏览器生命周期一致。
  ssoHttp: null,
  // 在setter和getter中使用,否则无法正常执行setter和getter
  ssoRsaPublicKey: null
}
const getters = {
  getSSOHttp: state => {
    return state.ssoHttp
  },
  getSSORsaPublicKey: state => {
    // 公钥是否是当前会话获取的，公钥保存是否存在，且时间是在30分钟内
    const sessionFlag = Vue.cookies.set('ssoRsaPublicKeySessionFlag', true, '0', '/')
    const publicKey = localStorage.getItem('ssoRsaPublicKey')
    const timeFlag = (+new Date() - Number(localStorage.getItem('ssoRsaPublicKeyTime'))) < (1000 * 60 * 30)
    if (sessionFlag && publicKey && timeFlag) {
      state.ssoRsaPublicKey = publicKey
    } else {
      state.ssoRsaPublicKey = null
      localStorage.removeItem('ssoRsaPublicKey')
      localStorage.removeItem('ssoRsaPublicKeyTime')
    }
    return state.ssoRsaPublicKey
  }
}
const mutations = {
  // 设置同步请求的响应对象
  setSSOHttp: (state, response) => {
    state.ssoHttp = response
  },
  // 设置从服务器获取的公钥
  setSSORSAPublicKey: (state, rsaPublicKey) => {
    state.ssoRsaPublicKey = rsaPublicKey
    // cookie中保存公钥周期，同浏览器生命周期同步
    Vue.cookies.set('ssoRsaPublicKeySessionFlag', true, '0', '/')
    // localStorage做数据缓存
    localStorage.setItem('ssoRsaPublicKey', rsaPublicKey)
    localStorage.setItem('ssoRsaPublicKeyTime', (+new Date()) + '')
  },
  // 清除从服务器获取的公钥
  clearSSORSAPublicKey: state => {
    state.ssoRsaPublicKey = null
    Vue.cookies.remove('ssoRsaPublicKeySessionFlag')
    localStorage.removeItem('ssoRsaPublicKey')
    localStorage.removeItem('ssoRsaPublicKeyTime')
  }
}
const actions = {
  encryptConnectionSSO: ({ getters, commit, dispatch }, { url, data }) => {
    return new Promise((resolve, reject) => {
      // 获取公钥后刷新、创建DES秘钥并加密数据，建立HTTP连接
      const createConnection = function () {
        // 1.每次请求都产生一个新的本地DES秘钥
        const desKey = Vue.cryp.generateKey(64, false)
        // 2.使用服务器RSA公钥加密DES秘钥
        const desKeyForRSA = Vue.cryp.encryptByRSA(getters.getSSORsaPublicKey, desKey)
        // 3.使用本地DES秘钥加密数据
        const encryptedData = Vue.cryp.encryptByDES(JSON.stringify(data), desKey)
        // 4.创建http链接
        let http = Vue.http.post(url, { data: encryptedData, mi: desKeyForRSA })
        resolve(http)
        reject(http)
      }
      if (getters.getSSORsaPublicKey) {
        // 1.本地已存在服务器RSA公钥:创建加密链接
        createConnection()
      } else {
        // 避免创建多个秘钥获取Http请求
        if (!getters.getSSOHttp) {
          commit('setSSOHttp', Vue.http.post('/api/sso/rsa/get', null))
        }
        getters.getSSOHttp.then(response => {
          commit('setSSORSAPublicKey', response.body.data.publicKey)
          createConnection()
          commit('setSSOHttp', null)
        }, () => {
          commit('setSSOHttp', null)
        })
      }
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
