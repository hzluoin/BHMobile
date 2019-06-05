let KeyboardListener = {}
KeyboardListener.install = function (Vue, options) {
  let _KeyboardListener = {
    listenerList: {},
    addListener ({name, func}) {
      // 不接受非函数对象
      if (typeof func !== 'function') {
        return 'ERROR_IS_NOT_FUNCTION'
      }
      // 不接受匿名函数
      if (!name) {
        return 'ERROR_NOT_NAME'
      }
      _KeyboardListener.listenerList[name] = func
      return true
    },
    removeListener (name) {
      return delete _KeyboardListener.listenerList[name]
    }
  }
  window.onkeypress = function (e) {
    const list = _KeyboardListener.listenerList
    for (let i in list) {
      list[i](e)
    }
  }
  Vue.prototype.$keyboardListener = _KeyboardListener
  Vue.keyboardListener = _KeyboardListener
}
export default KeyboardListener
