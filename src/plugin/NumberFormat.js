// 数字格式化
let NumberFormat = function () {}

// 截取指定位数
NumberFormat.toFixed = function (number, places) {
  // 1.NaN、单精度数据、截取位数错误;直接返回
  if (isNaN(number) || !/\./.test(number.toString()) || !parseInt(places)) {
    return number
  }
  // 2.截取字符串
  let end = number.toString().indexOf('.') + places + 1
  return number.toString().substring(0, end)
}

NumberFormat.install = function (Vue, options) {
  Vue.prototype.NumberFormat = NumberFormat
  Vue.NumberFormat = NumberFormat
}
export default NumberFormat
