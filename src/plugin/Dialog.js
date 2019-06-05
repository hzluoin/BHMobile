let Dialog = {
  install (Vue, options) {
    Vue.prototype.$Dialog = Dialog
    Vue.$Dialog = Dialog
  },
  alert (name) {
    let iFrame = document.createElement('IFRAME')
    iFrame.style.display = 'none'
    iFrame.setAttribute('src', 'data:text/plain,')
    document.documentElement.appendChild(iFrame)
    window.frames[0].window.alert(name)
    iFrame.parentNode.removeChild(iFrame)
  }
}

export default Dialog
