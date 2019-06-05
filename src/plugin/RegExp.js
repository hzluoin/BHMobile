let RegExp = {}
RegExp.install = function (Vue, options) {
  // 手机校验
  const phoneRegExp = new window.RegExp(`^[0-9]{8,11}$`)
  // 邮箱检验，正则来源：https://blog.csdn.net/liudglink/article/details/78511759
  const emailRegExp = new window.RegExp(`^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$`)
  // 验证码格式校验正则
  const captchaRegExp = new window.RegExp('^[a-zA-Z0-9]{4,6}$')
  // 密码格式校验正则
  const passwordsRegExp = new window.RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$`)
  // 六位纯数字密码格式校验正则
  const numberPasswordsRegExp = new window.RegExp(`^[0-9]{6}$`)
  // 价格格式校验正则
  const priceRegExp = new window.RegExp(`^[\\d]+(\\.\\d+){0,1}$`)
  let _RegExp = {
    telephone (telephone) {
      return phoneRegExp.test(telephone)
    },
    email (email) {
      return emailRegExp.test(email)
    },
    captcha (captcha) {
      return captchaRegExp.test(captcha)
    },
    password (password) {
      return passwordsRegExp.test(password)
    },
    numberPassword (password) {
      return numberPasswordsRegExp.test(password)
    },
    price (price) {
      return priceRegExp.test(price)
    }
  }

  Vue.prototype.$RegExp = _RegExp
  Vue.RegExp = _RegExp
}
export default RegExp
