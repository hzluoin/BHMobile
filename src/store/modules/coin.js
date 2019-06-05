import Vue from 'vue'

const state = {
  // 法币汇率
  // {
  //      "base": "USD",
  //      "timestamp": 1526649591621,
  //      "rates": {
  //        "USDT": 1.00000086,
  //        "USD": 1,
  //        "CNY": 6.37805,
  //        "HKD": 7.85005,
  //        "KRW": 1081.57,
  //        "JPY": 110.94767712,
  //        "EUR": 0.848582,
  //        "AUD": 1.330482,
  //        "BRL": 3.69931,
  //        "CAD": 1.280865,
  //        "CHF": 0.999304,
  //        "CLP": 632.6,
  //        "CZK": 21.715925,
  //        "DKK": 6.320165,
  //        "GBP": 0.740933
  //      }
  otherAsset: {},
  rate: {
    'base': 'USD',
    'timestamp': 1526649591621,
    'rates': {
      'CNY': 1
    }
  }
}
// get
const getters = {
  // 获取汇率
  getRate: state => {
    return state.rate
  },
  getOtherAsset: state => {
    return JSON.stringify(state.otherAsset) === '{}' ? false : state.otherAsset
  }
}
// set
const mutations = {
  setRate (state, rate) {
    state.rate = rate
  },
  setOtherAsset (state, otherAsset) {
    state.otherAsset = otherAsset
  }
}

const actions = {
  syncPrice ({ commit }) {
    // 2.获取第三方对应价格
    Vue.http.get('/api/digitalAssets/findExPriceUI').then(response => {
      const list = response.body.data
      let objects = {}
      for (let i in list) {
        objects[list[i].currency] = {
          price: list[i].current_price,
          high: list[i].high_24h,
          low: list[i].low_24h,
          change: list[i].price_change_24h,
          change_daily: Number(list[i].price_change_24h / list[i].high_24h * 100).cut(2)
        }
      }
      objects['timestamps'] = +new Date()
      commit('setOtherAsset', objects)
    }, response => {
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
