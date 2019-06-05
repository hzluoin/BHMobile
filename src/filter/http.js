import Vue from 'vue'
import store from '../store'

let Http = {
  filter () {
    // 请求数据格式
    Vue.http.options.emulateJSON = true
    // 请求超时时间
    Vue.http.options.timeout = 60000
    // 请求处理、和响应处理
    Vue.http.interceptors.push((request, next) => {
      // IE防缓存
      request.headers.set('Cache-Control', 'no-cache')
      request.headers.set('Pragma', 'no-cache')
      let timeout = null
      if (request.timeout) {
        timeout = setTimeout(() => {
          request.abort()
        }, request.timeout)
      }
      // 2.响应处理
      next((response) => {
        // 2.1清除超时时间
        clearTimeout(timeout)
        // 2.2处理响应码
        if (parseInt(response.status) === 200) {
          // 2.2.1服务器正常响应
          const code = parseInt(response.body.code) || response.body.code
          switch (code) {
            case 1:
              Vue.prototype.$message('您的账号已在别处登陆')
              response.ok = false
              response.status = 1
              response.statusText = response.body.msg
              store.dispatch('clearUserInfo').then()
              break
            // 正确
            case 200:
              break
            case NaN:
              break
            // 登录超时
            case 300:
              Vue.prototype.$message('登录已超时')
              response.ok = false
              response.status = 300
              response.statusText = response.body.msg
              break
            case 302:
              Vue.prototype.$message('您的账号已在别处登陆')
              response.ok = false
              response.status = 302
              response.statusText = response.body.msg
              store.dispatch('clearUserInfo').then()
              break
            case 400:
              Vue.prototype.$message.error(response.body.msg)
              break
            case 500:
              Vue.prototype.$message.error('请尝试刷新页面')
              response.ok = false
              response.status = 666
              response.statusText = '请尝试刷新页面'
              response.body.msg = '请尝试刷新页面'
              break
            case 'NO_18':
              window.location.reload()
              break
            default:
              // 将其他自定义错误进行转换
              response.ok = false
              response.status = response.body.code
              response.statusText = response.body.msg
              break
          }
        } else {
          // 2.4.2服务器响应出错
          // 清除公钥
          store.commit('clearRSAPublicKey')
          store.commit('clearSSORSAPublicKey')
          const code = parseInt(response.status)
          switch (code) {
            case 0:
              response.statusText = '请尝试刷新页面'
              Vue.prototype.$message.error(response.statusText)
              break
            case 302:
              store.dispatch('clearUserInfo').then()
              break
            default:
              response.statusText = '请尝试刷新页面：' + response.status + '/' + response.statusText
              Vue.prototype.$message.error(response.statusText)
              break
          }
        }
        // 2.5打印响应报文
        console.group('服务器响应>>>' + response.url)
        console.log(response)
        console.groupEnd()
        return response
      })
    })
  }
}

export default Http
