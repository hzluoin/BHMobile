;(function (window) {
  window.Number.prototype.cut = function (places) {
    // 1.位数不合法
    places = parseInt(places)
    if (!places) {
      return Number(this)
    }
    let valueStr = this.toString()
    // 2.单精度返回
    if (!/\./.test(valueStr)) {
      return Number(this)
    }
    // 3.分解数据
    let startNum = valueStr.split('.')[0]
    let endNum = valueStr.split('.')[1]
    endNum = endNum.substr(0, places)
    return Number(startNum + '.' + endNum)
  }
})(window)
