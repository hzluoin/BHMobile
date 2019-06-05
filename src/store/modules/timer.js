const state = {
  guessTimer: null,
  guessIntervalTimer: null
}
// get
const getters = {
}
// set
const mutations = {
  setGuessTimer (state, timer) {
    if (state.guessTimer) {
      clearTimeout(state.guessTimer)
    }
    state.guessTimer = timer
  },
  setIntervalTimer (state, timer) {
    if (state.guessIntervalTimer) {
      clearInterval(state.guessIntervalTimer)
    }
    state.guessIntervalTimer = timer
  }
}

const actions = {
}

export default {
  state,
  getters,
  actions,
  mutations
}
