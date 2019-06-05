let ConvertImg = {}
ConvertImg.install = function (Vue, options) {
  let _convertImg = function () {
    this.canvas = null
  }
  _convertImg.prototype = {
    convert (url, width, height, callback) {
      const img = document.createElement('img')
      img.src = url || ''
      img.onload = () => {
        // 和指定的宽高进行等比缩放>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        //     大于  等于  小于
        // 宽   A     B    C
        // 高   a     b    c
        // 宽比：wRate = img.width / width
        // 高比：hRate = img.height / height
        // 放大：Cc,scale=大(wRate, hRate)
        // 缩小：Aa Ab Ac,scale=wRate; Ba Ca,scale=hRate
        // 不变：Bb Bc Cb,scale=1
        if (width && height) {
          const wRate = img.width / width
          const hRate = img.height / height
          const Cc = wRate < 1 && hRate < 1
          const Aa = wRate > 1 && hRate > 1
          const Ab = wRate > 1 && hRate === 1
          const Ac = wRate > 1 && hRate < 1
          const Ba = wRate === 1 && hRate > 1
          const Ca = wRate < 1 && hRate > 1
          let scale = 1
          // 放大
          if (Cc) {
            scale = wRate > hRate ? wRate : hRate
          } else if (Ab || Ac) {
            // 缩小
            scale = wRate
          } else if (Ba || Ca) {
            // 缩小
            scale = hRate
          } else if (Aa) {
            // 缩小
            scale = wRate > hRate ? wRate : hRate
          }
          img.width = img.width / scale
          img.height = img.height / scale
        }
        // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        this.canvas = canvas
        callback()
      }
    },
    convertToBase64 (url, width, height, callback) {
      if (this.canvas) {
        callback = arguments[0] || function () {}
        callback(this.canvas.toDataURL())
      } else {
        this.convert(url, width, height, () => {
          callback = callback || function () {}
          callback(this.canvas.toDataURL())
        })
      }
    },
    convertToBlob (url, width, height, callback) {
      if (this.canvas) {
        callback = arguments[0] || function () {}
        this.canvas.toBlob(callback)
      } else {
        this.convert(url, width, height, () => {
          this.canvas.toBlob(callback)
        })
      }
    },
    clear () {
      this.canvas = null
    }
  }

  Vue.prototype.$convertImg = new _convertImg()
}
export default ConvertImg
