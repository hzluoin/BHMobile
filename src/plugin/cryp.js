import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
let BHCryp = {}
BHCryp.install = function (Vue, options) {
  let _cryp = {
    // DES密钥生成器
    generateKey (length, special) {
      let iteration = 0
      let key = ''
      let randomNumber
      if (special === undefined) {
        special = true
      }
      while (iteration < length) {
        randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33
        if (!special) {
          if ((randomNumber >= 33) && (randomNumber <= 47)) continue
          if ((randomNumber >= 58) && (randomNumber <= 64)) continue
          if ((randomNumber >= 91) && (randomNumber <= 96)) continue
          if ((randomNumber >= 123) && (randomNumber <= 126)) continue
        }
        iteration++
        key += String.fromCharCode(randomNumber)
      }
      return key
    },

    // DES加密 Pkcs7填充方式
    encryptByDES (message, key) {
      // 把私钥转换成16进制的字符串
      const keyHex = CryptoJS.enc.Utf8.parse(key)
      // 模式为ECB padding为Pkcs7
      const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        iv: keyHex,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      // 加密出来是一个16进制的字符串
      return encrypted.ciphertext.toString()
    },

    // DES解密
    decryptByDES (ciphertext, key) {
      // 把私钥转换成16进制的字符串
      var keyHex = CryptoJS.enc.Utf8.parse(key)
      // 把需要解密的数据从16进制字符串转换成字符byte数组
      var decrypted = CryptoJS.DES.decrypt({
        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
      }, keyHex, {
        iv: keyHex,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      })
      // 以utf-8的形式输出解密过后内容
      return decrypted.toString(CryptoJS.enc.Utf8)
    },

    // RSA公钥加密
    encryptByRSA (publicKey, message) {
      const encrypt = new JSEncrypt()
      encrypt.setPublicKey(publicKey)
      return encrypt.encrypt(message)
    },

    encryptData (data, key) {
      let newData = {}
      for (let i in data) {
        newData[i] = _cryp.encryptByDES(data[i], key)
      }
      return newData
    }
  }

  Vue.prototype.$cryp = _cryp
  Vue.cryp = _cryp
}
export default BHCryp
