import BigNumber from 'bignumber.js'
import NumberFormat from '../../plugin/NumberFormat'

const state = {
  // 全部钱包列表数据(接口返回)
  // [{
  //   'id': 237473,
  //   'userId': 107298,
  //   'dictionariesId': 'BTM',
  //   'dictionariesName': 'bytom',
  //   'path': '0x747cabe5b984f1f5bc5ad53f4cfbe4c72e730dba',
  //   'balance': 0.0,
  //   'frozenAmount': 0.0,
  //   'url': null,
  //   'createTime': null,
  //   'updateTime': null,
  //   'password': null,
  //   'encrypt': null,
  //   'status': null,
  //   'platformRate': '0.00100000',
  //   'miningFee': '8.00000000'
  // }]
  walletList: null,
  walletJson: null,
  // 有钱的钱包列表数据
  richWalletList: null,
  richWalletJson: null,
  walletHttp: null
}
const getters = {
  getWalletList (state) {
    return state.walletList
  },
  getWalletJson (state) {
    return state.walletJson
  },
  getRichWalletList (state) {
    return state.richWalletList
  },
  getRichWalletJson (state) {
    return state.richWalletJson
  }
}
const mutations = {
  setWalletHttp (state, http) {
    state.walletHttp = http
  },
  setWallet (state, list) {
    const walletJson = {}
    const richWalletJson = {}
    const richWalletList = []
    for (let i in list) {
      const key = list[i]['dictionariesId']
      const value = list[i]
      // 处理余额、冻结、可用余额
      const balance = new BigNumber(value['balance'])
      const frozenAmount = new BigNumber(value['frozenAmount'])
      value['balance'] = NumberFormat.toFixed(balance.toString(), 8)
      value['frozenAmount'] = NumberFormat.toFixed(frozenAmount.toString(), 8)
      value['availableBalance'] = NumberFormat.toFixed(balance.minus(frozenAmount).toString(), 8)
      walletJson[key] = value
      if (balance > 0) {
        richWalletJson[key] = value
        richWalletList.push(value)
      }
    }
    state.walletJson = walletJson
    state.walletList = list
    state.richWalletJson = richWalletJson
    state.richWalletList = richWalletList
  }
}
const actions = {
  queryWalletList ({ state, commit, dispatch }) {
    return new Promise((resolve, reject) => {
      if (state.walletList) {
        resolve()
      } else {
        if (!state.walletHttp) {
          const http = dispatch('encryptConnection', {
            url: '/api/wallet/selectWalletListUI',
            data: {}
          })
          commit('setWalletHttp', http)
        }
        state.walletHttp.then(response => {
          commit('setWalletHttp', null)
          commit('setWallet', response.body.data)
          resolve()
        }, response => {
          commit('setWalletHttp', null)
          reject(response)
        })
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
