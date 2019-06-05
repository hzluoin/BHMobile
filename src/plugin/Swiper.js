;(function () {
  var Swipe = function (dom, positionX, positionY) {
    // 设置对象的DOM
    this.dom = dom
    this.setDom = function (dom) {
      this.dom = dom
    }

    // 设置当前位置
    this.positionX = positionX
    this.positionY = positionY
    this.setPositionX = function (x) {
      this.positionX = x
    }
    this.setPositionY = function (y) {
      this.positionY = y
    }

    // 记录上次触摸点位置
    this.lastX = 0
    this.lastY = 0
    this.setLastX = function (x) {
      this.lastX = x
    }
    this.setLastY = function (y) {
      this.lastY = y
    }

    // 设置移动量
    this.translateX = 0
    this.translateY = 0
    this.setTranslateX = function (x) {
      this.translateX = x
    }
    this.setTranslateY = function (y) {
      this.translateY = y
    }

    // 操作锁
    this.locked = true
    this.lock = function () {
      this.locked = true
    }
    this.unlock = function () {
      this.locked = false
    }
    // 在图片执行完一系列动作之后才可以继续下一个操作
    // this.isSwiper = true
  }

  Swipe.index = 0

  Swipe.prototype = {
    // 父元素中心点
    wrapOriginX: 0,
    wrapOriginY: 0,
    wrap: {},
    setWrap (wrap) {
      this.wrap = wrap
      this.wrapOriginX = wrap.clientWidth / 2
      this.wrapOriginY = wrap.clientHeight / 2
    },
    // 子元素列表，倒序保存
    contentList: [],
    addContent (swipe) {
      this.contentList.push(swipe)
    },
    getFirstContent () {
      return this.contentList[this.contentList.length - 1]
    },
    // 当前最上层元素下标
    current: 0,
    // 第一个元素偏移量
    firstContentOffsetX: 0,
    firstContentOffsetY: 0,
    // 第一元素的放大倍率
    firstContentScale: ' scale(1.2);',
    cyclic () {
      // 重置数据
      this.dom.removeAttribute('style')
      this.setTranslateX(0)
      this.setTranslateY(0)
      this.setPositionX(this.wrapOriginX)
      this.setPositionY(this.wrapOriginY)
      this.dom.style = 'transform: translateX(0px) translateY(0px);'
      // 循环dom元素，List最后一个元素对应屏幕最上一个元素
      const lastDom = this.contentList.pop()
      this.wrap.removeChild(lastDom.dom)
      this.wrap.insertBefore(lastDom.dom, this.contentList[0].dom)
      this.contentList.unshift(lastDom)
      // 解锁手势控制
      this.contentList[this.contentList.length - 1].unlock()
      // 修改下标
      if (++Swipe.index === this.contentList.length) {
        Swipe.index = 0
      }
    },
    // 重置数据
    reset () {
      this.dom.removeAttribute('style')
      this.setTranslateX(0)
      this.setTranslateY(0)
      this.setPositionX(this.wrapOriginX)
      this.setPositionY(this.wrapOriginY)
      this.dom.style = 'transform: translateX(' + this.firstContentOffsetX + 'px) translateY(' + this.firstContentOffsetY + 'px);'
    },
    // 计算出场目标点
    calculateGoOutTarget () {
      // 以父元素中心点为原点
      const vector = {
        x: this.positionX - this.wrapOriginX,
        y: this.positionY - this.wrapOriginY
      }
      const percent = {
        x: this.wrapOriginX / Math.abs(vector.x),
        y: this.wrapOriginY / Math.abs(vector.y)
      }
      if (percent.x === Infinity) {
        percent.x = 0
      }
      if (percent.y === Infinity) {
        percent.y = 0
      }
      let target
      if (percent.x < percent.y) {
        target = {
          x: vector.x * percent.x * 2,
          y: vector.y * percent.x * 2
        }
      } else {
        target = {
          x: vector.x * percent.y * 2,
          y: vector.y * percent.y * 2
        }
      }
      if (target.x === 0) {
        target.x = this.wrapOriginX * 2
      }
      if (target.y === 0) {
        target.y = this.wrapOriginY * 2
      }
      return target
    },
    // 触摸开始
    start (x, y) {
      this.setLastX(x)
      this.setLastY(y)
    },
    // 移动
    move (targetX, targetY) {
      // 计算移动量、更新中心点位置、更新移动位置
      this.setTranslateX(this.translateX + (targetX - this.lastX))
      this.setTranslateY(this.translateY + (targetY - this.lastY))
      this.setPositionX(this.wrapOriginX + this.translateX)
      this.setPositionY(this.wrapOriginY + this.translateY)
      this.setLastX(targetX)
      this.setLastY(targetY)
      this.dom.style = 'transform: translateX(' + (this.translateX + this.firstContentOffsetX) + 'px) translateY(' + (this.translateY + this.firstContentOffsetY) + 'px)' + this.firstContentScale
    },
    // 恢复
    springBack () {
      this.reset()
      this.dom.style = 'transform: translateX(' + this.firstContentOffsetX + 'px) translateY(' + this.firstContentOffsetY + 'px)' + this.firstContentScale + 'transition: all 350ms;'
    },
    // 出场
    goOut () {
      const target = this.calculateGoOutTarget()
      this.dom.style = 'transform: translateX(' + target.x + 'px) translateY(' + target.y + 'px);transition: all .25s;'
    },
    // 下一元素进场
    goInto () {
      const nextContent = this.contentList[this.contentList.length - 2]
      nextContent.dom.style = 'transform: translateX(' + this.firstContentOffsetX + 'px) translateY(' + this.firstContentOffsetY + 'px)' + this.firstContentScale + 'transition: all .25s;z-index:11;'
    },
    // 决策：恢复或出场
    decide () {
      const decideX = this.positionX > this.wrapOriginX ? Math.abs(this.wrapOriginX * 2 - this.positionX) : this.positionX
      const decideY = this.positionY > this.wrapOriginY ? Math.abs(this.wrapOriginY * 2 - this.positionY) : this.positionY
      if (decideX < this.wrapOriginX / 2 || decideY < this.wrapOriginY / 2) {
        return true
      } else {
        return false
      }
    }
  }

  window.mySwiper = function (wrap, contentIds) {
    let imageTimes = 0
    // 父容器中心点坐标
    Swipe.prototype.setWrap(wrap)
    const screenOriginX = wrap.clientWidth / 2
    const screenOriginY = wrap.clientHeight / 2
    // 创建子元素
    Swipe.prototype.contentList = []
    for (let i in contentIds) {
      let content = document.getElementById(contentIds[i])
      let swipe = new Swipe(content, screenOriginX, screenOriginY)
      Swipe.prototype.addContent(swipe)

      content.addEventListener('touchmove', function (e) {
        if (swipe.locked) {
          return
        }
        swipe.move(e.changedTouches[0].clientX, e.changedTouches[0].clientY)
      })

      content.addEventListener('touchstart', function (e) {
        if (swipe.locked) {
          return
        }
        swipe.start(e.targetTouches[0].clientX, e.targetTouches[0].clientY)
      })
      content.addEventListener('touchend', function (e) {
        if (swipe.locked) {
          return
        }
        if (swipe.decide()) {
          swipe.lock()
          swipe.goOut()
          swipe.goInto()
          setTimeout(function () {
            swipe.cyclic()
          }, 250)
        } else {
          swipe.springBack()
        }
      })
    }
    Swipe.prototype.firstContentOffsetY = -60
    let first = Swipe.prototype.getFirstContent()
    first.move(0, 0)
    first.unlock()

    return new Promise((resolve, reject) => {
      let times = 0
      let temp = setInterval(() => {
        if (imageTimes >= contentIds.length) {
          resolve(Swipe)
        }
        if (times++ > 20) {
          clearInterval(temp)
          reject(Swipe)
        }
      }, 100)
    })
  }
})()
