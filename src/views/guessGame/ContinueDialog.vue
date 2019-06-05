<template>
  <div class="continueDialog" :visible="visible">
    <div class="black"></div>
    <!--内容-->
    <div class="pup">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/continueBg.png">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/closeBtn.png" class="closeBtn" @click="closeBtn">
      <div class="title color-fff ft18 bold">新人连投奖</div>
      <div class="title1 color-fff ft12">连续完成5次预言并分享给好友可获得{{maxCount}}{{currency}}</div>
      <ul class="ul1">
        <li class="center-tb-scatter">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/goldBg.png" class="w66">
          <div class="countBox">第1次</div>
        </li>
        <li class="center-tb-scatter">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/goldBg.png" class="w66">
          <div class="countBox">第2次</div>
        </li>
        <li class="center-tb-scatter">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/goldBg.png" class="w66">
          <div class="countBox">第3次</div>
        </li>
        <li class="center-tb-scatter">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/goldBg.png" class="w66">
          <div class="countBox">第4次</div>
        </li>
        <li class="center-tb-scatter">
          <div class="w66">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/goldBg.png">
            <div class="center-float-center poa h100 count ft12">888</div>
          </div>
          <div class="countBox">第5次</div>
        </li>
      </ul>
      <!--line-->
      <div class="lineBox center-float-left" id="lineBox">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <!--dot-->
      <div class="lineBox1 center-float-left" id="lineBox1">
        <div class="center-tb-scatter"><img :src="dotSrc" class="dot"></div>
        <div class="center-tb-scatter"><img :src="dotSrc" class="dot"></div>
        <div class="center-tb-scatter"><img :src="dotSrc" class="dot"></div>
        <div class="center-tb-scatter"><img :src="dotSrc" class="dot"></div>
        <div class="center-tb-scatter"><img :src="dotSrc" class="dot"></div>
      </div>
      <!--btn-->
      <div class="shareBtn">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/btnBg.png">
        <div class="center-float-center poa h100" @click="shareBtn">炫耀一下</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContinueDialog',
  data () {
    return {
      // 新人连投奖总次数
      allCount: 4,
      // 新人连投奖拥有次数
      haveCount: 0,
      haveDot: 0,
      // 能否分享
      isShare: true,
      // 背景图片路径替换
      dotSrc: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/dot_no.png',
      dotSrc1: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/dot_yes.png',
      // 连投最大金额
      maxCount: ''
    }
  },
  created () {
    // 查询连投分享次数信息
    this.$store.dispatch('encryptConnection', {
      url: '/api/guessPrice/queryUserOfGuessActivityInfoUI',
      data: {
        currency: this.currency
      },
      refreshKey: this.Native.ios
    }).then(res => {
      let data = res.body.data
      if (data.time !== 0) {
        this.haveCount = data.time - 1
        this.haveDot = data.time
        this.isShare = data.canShare

        for (let i = 0; i < this.haveCount; i++) {
          document.getElementById('lineBox').children[i].style.backgroundColor = '#FFEB0D'
        }
        for (let i = 0; i < this.haveDot; i++) {
          document.getElementById('lineBox1').children[i].firstChild.src = this.dotSrc1
        }
      }
    }, res => {
      this.logout(res)
    })
    // 查询连投中奖金额
    this.$store.dispatch('encryptConnection', {
      url: '/api/guessReward/queryRewardAmountByCurrencyUI',
      data: {
        currency: this.currency
      },
      refreshKey: this.Native.ios
    }).then(res => {
      this.maxCount = res.body.data.rewardAmount
    }, res => {
      this.logout(res)
    })
  },
  methods: {
    closeBtn () {
      this.$emit('update:visible', false)
    },
    shareBtn () {
      if (this.isShare === false && this.haveDot >= 5) {
      } else {
        this.$message.error('您已不能分享')
      }
    },
    logout (response) {
      if (/1|300|302/.test(response.status)) {
        this.Native.call('goPage', {
          type: 2
        })
        this.Native.setJavascriptFunc('goBack', () => {
          this.Native.call('goBack', {})
        })
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    currency: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .continueDialog{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 1111;}
  .black{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 1111;background-color: #000;opacity: 0.6;}
  .closeBtn{position: absolute;width: 10%;right: 0;top: 0;left: auto;z-index: 11111;}
  .pup{z-index: 1111;position: fixed;width: 94%;left: 3%;top: 26%;}
  .title{position: absolute;width: 100%;text-align: center;top: 4%;}
  .title1{position: absolute;width: 100%;text-align: center;top: 26%;}
  .ul1{position: absolute;width: 92%;top: 38%;left: 4%;}
  .ul1 li{position: relative;float: left;width: 20%;color: #fff;font-size: 12px;}
  .countBox{background-color: #21129b;border-radius: 8px;padding: 2% 5%;}
  .w66{width: 66%;}
  .count{color: #993b08;}
  .lineBox{position: absolute;width: 76%;top: 70%;left: 12%;height: 0.8%;}
  .lineBox div{width: 25%;float: left;background-color: #312ecc;height: 100%;}
  .lineBox1{position: absolute;width: 92%;top: 68.8%;left: 4%;}
  .lineBox1 div{width: 20%;float: left;height: 100%;}
  .dot{position: relative;width: 14%;top: 0;}
  .shareBtn{position: absolute;width: 30%;left: 35%;bottom: 3%;}
</style>
