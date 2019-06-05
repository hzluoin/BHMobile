;(function (window) {
  window.String.prototype.toNumber = function () {
    if (Number(this) !== 'NaN' && this.split('.').length > 1) {
      let startStr = this.split('.')[0]
      let endStr = this.split('.')[1]
      return Number(startStr + '.' + endStr.substr(0, 15))
    } else {
      return Number(this)
    }
  }
})(window)
