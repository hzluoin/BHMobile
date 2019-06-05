const state = {
  showAlert: false
}
const getters = {
  // 当出现全屏弹窗(禁止滚动条滚动)
  getShowPup: state => {
    return state.showAlert
  }
}
const mutations = {
  setShowPup: (state, showAlert) => {
    state.showAlert = showAlert
  }
}

export default {
  state,
  getters,
  mutations
}
