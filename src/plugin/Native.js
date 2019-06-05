let Native = {}
Native.install = function (Vue) {
  if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    // callback容器
    const SDKNativeEvents = {}
    /*
     * funcName native的方法名
     * data 参数
     * callback 回调匿名方法
     */
    const sdkLaunchFunc = function (funcName, data, callback) {
      const _data = data || {}
      const _callback = callback || function () {}
      SDKNativeEvents[funcName] = _callback
      try {
        window.Native.native_launchFunc({
          funcName: funcName,
          data: JSON.stringify(_data)
        })
      } catch (e) {
        console.log(e)
      }
    }

    /**
     * native回调  本地做完事情后将funcName和data传过来，调用之前h5预留的匿名函数
     * funcName 对应的触发方法名
     * data 参数
     */
    const sdkNativeCallback = function (data) {
      const obj = JSON.parse(data)
      try {
        const funcName = obj.funcName
        if (SDKNativeEvents[funcName]) {
          delete obj.funcName
          SDKNativeEvents[funcName](obj)
          SDKNativeEvents[funcName] = null
        }
      } catch (e) {
        alert(e)
      }
    }

    /**
     * IOS调用H5本地方法
     * funcName 对应的方法名
     */
    const _setJavascriptFunc = function (funcName, func) {
      window[funcName] = func
    }

    window.sdk_nativeCallback = sdkNativeCallback
    const _Native = {
      ios: true,
      android: false,
      call: sdkLaunchFunc,
      setJavascriptFunc: _setJavascriptFunc,
      isHybrid: window.Native
    }

    Vue.Native = _Native
    Vue.prototype.Native = _Native
  } else if (/(android)/i.test(navigator.userAgent.toLocaleLowerCase())) {
    // 工具--生成唯一键
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const randomStr = function () {
      let res = ''
      for (let i = 0; i < 5; i++) {
        let id = Math.ceil(Math.random() * 35)
        res += chars[id]
      }
      return res
    }
    const getUniqueKey = function () {
      return randomStr() + '' + +new Date()
    }
    // callback容器
    let SDKNativeEvents = {}

    /*
     * 存入传来的callback回调，加入唯一键名，使调用相同的功能可以并发
     * funcName native的方法名
     * data 参数
     * callback 回调匿名方法
     */
    const sdkLaunchFunc = function (funcName, data, callback) {
      const _data = data || {}
      const _callback = callback || function () {}
      const newName = funcName += getUniqueKey()
      SDKNativeEvents[newName] = _callback
      try {
        window.App.native_launchFunc(newName, JSON.stringify(_data))
      } catch (e) {
        console.log(e)
      }
    }

    /**
     * native回调  本地做完事情后将funcName和data传过来，调用之前h5预留的匿名函数
     * funcName 对应的触发方法名
     * data 参数
     */
    const sdkNativeCallback = function (funcName, data) {
      const obj = JSON.parse(data)
      try {
        if (SDKNativeEvents[funcName]) {
          SDKNativeEvents[funcName](obj)
          SDKNativeEvents[funcName] = null
        }
      } catch (e) {
        alert(e)
      }
    }

    /**
     * Android调用H5本地方法
     * funcName 对应的方法名
     */
    const _setJavascriptFunc = function (funcName, func) {
      window[funcName] = func
    }

    window.sdk_nativeCallback = sdkNativeCallback
    const _Native = {
      ios: false,
      android: true,
      call: sdkLaunchFunc,
      setJavascriptFunc: _setJavascriptFunc,
      isHybrid: window.App
    }

    Vue.Native = _Native
    Vue.prototype.Native = _Native
  }
}
export default Native
