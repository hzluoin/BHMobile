import BigNumber from 'bignumber.js'
BigNumber.install = function (Vue, options) {
  Vue.prototype.BigNumber = BigNumber
  Vue.BigNumber = BigNumber
}
export default BigNumber
