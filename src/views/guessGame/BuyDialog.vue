<template>
  <!--看涨看跌弹窗-->
  <div class="buyDialog" :visible="visible">
    <div class="black"></div>
    <!--内容-->
    <div class="pup" v-show="showPup === '0'">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/buyBg.png">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/closeBtn.png" class="closeBtn" @click="closeBtn">
      <div class="upImg">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/up.png" v-if="agreeClick === '1'">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/down.png" v-else>
        <div class="ft14 font4 font1">{{agreeClick === '1' ? '看涨' : '看跌'}}</div>
      </div>
      <div class="fontAll">
        <div class="count center-float-center">我的{{dataList.currency}}：{{myHavaCount}}</div>
        <ul class="selectUl">
          <li @click="checkCount(0, paySelection[0])" id="ck0">
            <img :src="checkSrc">
            <div class="center-float-center poa h100">{{paySelection[0]}}</div>
          </li>
          <li @click="checkCount(1, paySelection[1])" id="ck1">
            <img :src="checkSrc">
            <div class="center-float-center poa h100">{{paySelection[1]}}</div>
          </li>
          <li @click="checkCount(2, paySelection[2])" id="ck2">
            <img :src="checkSrc">
            <div class="center-float-center poa h100">{{paySelection[2]}}</div>
          </li>
          <li @click="checkCount(3, paySelection[3])" id="ck3">
            <img :src="checkSrc">
            <div class="center-float-center poa h100">{{paySelection[3]}}</div>
          </li>
        </ul>
       <div class="font2">
         <div>猜对预计可得<span>{{getable}}</span>{{dataList.currency}}</div>
         <div>一起来刮分<span>{{amount}}</span>{{dataList.currency}}</div>
         <div class="mt5">预测{{new Date().format('MM月dd日')}}BTC指数涨跌</div>
         <div>（奖励仅供参考，以实际结果为准）</div>
       </div>
      </div>
      <!--btn-->
      <div class="buyBtn">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/btnBg.png">
        <div class="center-float-center poa h100" @click="buyConfirm">确定购买</div>
      </div>
    </div>
    <!--输入密码弹窗-->
    <div class="pup1" :class="{hidden: showPup !== '1'}" @click="focusInput">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/payBg.png">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/closeBtn.png" class="closeBtn" @click="closeBtn1">
      <div class="title color-fff ft16">请输入支付密码</div>
      <div class="title1 color-fff ft16">请支付({{dataList.currency}})</div>
      <div class="title2 ft24 bold">{{selectBuyCount}}</div>
      <ul class="pass center-float-left">
        <li class="center-float-center h100" v-for="(item, index) in password" :key="index">
          <i></i>
        </li>
      </ul>
      <input ref="pwd" type="number" v-model="password" maxlength="6" class="pass" autofocus="autofocus" style="height: 0.1px;"/>
    </div>
    <!--提示未设置密码弹窗-->
    <div class="pup2" v-show="showPup === '2'">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/szBg.png">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/closeBtn.png" class="closeBtn" @click="closeBtn2">
      <div class="title color-fff ft16">提示</div>
      <div class="title2 ft20 bold">您未设置支付密码</div>
      <div class="szBtn" @click="closeBtn2">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/zbszBtn.png">
        <div class="center-float-center poa h100 color-fff ft14">暂不设置</div>
      </div>
      <div class="szBtn1" @click="goMoneyPsdSet">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/msszBtn.png">
        <div class="center-float-center poa h100 color-fff ft14">马上设置</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuyDialog',
  components: {},
  data () {
    return {
      // 背景图片路径替换
      checkSrc: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/select.png',
      checkSrc1: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/select_on.png',
      // 买币种类选择个数
      buyCoinCount: 4,
      // 资金密码
      password: '',
      // 出现弹窗
      showPup: '0',
      // 币种可选择购买金额数量
      paySelection: {},
      // 传过来的list
      dataList: {},
      // 我的币种可用资金
      myHavaCount: 0,
      // 选择的购买数量
      selectBuyCount: '0',
      // 预计可得
      expectProfitList: {}
    }
  },
  created () {
    this.dataList = this.selectInfoList
    this.paySelection = this.dataList.paySelections.split(',')
    // 查询自己当前币种的余额
    this.$store.dispatch('encryptConnection', {
      url: '/api/wallet/selectWalletListUI',
      data: {
        currencyCode: this.dataList.currency
      },
      refreshKey: this.Native.ios
    }).then(res => {
      if (res.body.data.length > 0) {
        this.myHavaCount = Number(res.body.data[0].balance) - Number(res.body.data[0].frozenAmount)
      }
    }, res => {
      this.logout(res)
      this.$message.error(res.body.message)
    })
  },
  watch: {
    password () {
      if (this.password.length <= 6) {
        if (this.password.length === 6) {
          this.$refs.pwd.blur()
          // 下注购买
          this.$store.dispatch('encryptConnection', {
            url: '/api/bets/addUI',
            data: {
              password: this.password,
              periodsId: (this.dataList.id).toString(), // 期数id
              coinCount: this.selectBuyCount, // 下注金额
              type: this.agreeClick, // 猜涨还是跌(1,涨 2.跌)
              currency: this.dataList.currency // 币种
            },
            refreshKey: this.Native.ios
          }).then(res => {
            // ios提示组件被遮挡
            setTimeout(() => {
              this.$emit('isRush', {value: true})
              this.$emit('update:visible', false)
              alert(res.body.msg)
            }, 0)
          }, res => {
            this.logout(res)
            setTimeout(() => {
              alert(res.body.msg)
            }, 0)
            this.password = ''
          })
        }
      } else {
        this.password = this.password.slice(0, 6)
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    },
    // 预计可得
    getable () {
      const buyCount = new this.BigNumber(this.selectBuyCount)
      const upAmount = new this.BigNumber(this.selectInfoList['upAmount'])
      const downAmount = new this.BigNumber(this.selectInfoList['downAmount'])
      if (this.agreeClick === '1') {
        return this.NumberFormat.toFixed(buyCount.dividedBy(buyCount.plus(upAmount)).multipliedBy(downAmount).toNumber(), 4)
      } else {
        return this.NumberFormat.toFixed(buyCount.dividedBy(buyCount.plus(downAmount)).multipliedBy(upAmount).toNumber(), 4)
      }
    },
    // 瓜分总数
    amount () {
      if (this.agreeClick === '1') {
        return this.selectInfoList['downAmount']
      } else {
        return this.selectInfoList['upAmount']
      }
    }
  },
  mounted () {
    // 默认样式
    document.getElementById('ck0').firstChild.src = this.checkSrc1
    this.selectBuyCount = this.paySelection[0]
    this.qurEstimateEarnUI()
  },
  methods: {
    focusInput () {
      this.$refs.pwd.focus()
    },
    // 关闭买币
    closeBtn () {
      this.$emit('update:visible', false)
      this.password = ''
    },
    // 关闭输入密码弹窗
    closeBtn1 () {
      this.$emit('update:visible', false)
      this.showPup = '0'
      this.password = ''
    },
    // 关闭提示未设置密码弹窗，暂不设置
    closeBtn2 () {
      this.$emit('update:visible', false)
      this.showPup = '0'
      this.password = ''
    },
    // 马上设置
    goMoneyPsdSet () {
      this.showPup = '0'
      this.$emit('update:visible', false)
      // 1跳资金密码 2登录 3实名认证
      this.$store.commit('clearRSAPublicKey')
      this.Native.call('goPage', {
        type: 1
      })
    },
    // 买币数量选择
    checkCount (_index, paySelection) {
      this.recoverFun(this.buyCoinCount)
      document.getElementById('ck' + _index).firstChild.src = this.checkSrc1
      this.selectBuyCount = paySelection
    },
    // 恢复默认
    recoverFun (_length) {
      for (let i = 0; i < _length; i++) {
        document.getElementById('ck' + i).firstChild.src = this.checkSrc
      }
    },
    // 确定购买
    buyConfirm () {
      // 判断是否设置支付密码  0:未设置，1:已设置
      if (this.user.fundPassword === 0) {
        this.showPup = '2'
      } else {
        // 判断余额是否充足
        if (Number(this.myHavaCount) === 0 || (Number(this.myHavaCount) < Number(this.selectBuyCount))) {
          this.$message.error('账户余额不足，请及时充值！')
        } else {
          this.showPup = '1'
          this.focusInput()
        }
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
    agreeClick: {
      type: String,
      default: '1'
    },
    selectInfoList: {
      type: Object,
      default: function () {
        return { message: '' }
      }
    }
  }
}
</script>

<style scoped>
  .buyDialog{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 1111;}
  .black{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 1111;background-color: #000;opacity: 0.6;}
  .fontAll{width: 100%;position: absolute;z-index: 1111;top: 0;left: 0;height: 100%;color: #fff;font-size: 12px;text-align: center;}
  .fontAll span{color: #FFD40D;}
  .closeBtn{position: absolute;width: 10%;right: 0;top: 0;left: auto;z-index: 11111;}
  .pup,.pup1,.pup2{z-index: 1111;position: fixed;width: 94%;left: 3%;top: 26%;}
  .pup1.hidden{z-index: -10000;}
  .upImg{position: absolute;width: 20%;z-index: 1111;top: -8%;left: 40%;}
  .font1{position: absolute;width: 100%;top: 50%;text-align: center;}
  .count{background-color: #2212A4;border-radius: 55px;position: absolute;height: 10%;width: 50%;text-align: center;left: 25%;top: 23%;
    -moz-box-shadow:1px 1px 1px 1px #12057D inset;-webkit-box-shadow:1px 1px 1px 1px #12057D inset;box-shadow:1px 1px 1px 1px #12057D inset;}
  .selectUl{position: absolute;width: 88%;top: 38%;left: 6%;}
  .selectUl li{position: relative;float: left;width: 24%;margin-right: 1%;}
  .font2{position: absolute;width: 100%;top: 52%;}
  .buyBtn{position: absolute;width: 34%;left: 33%;bottom: 2%;}
  .buyBtn div{z-index: 1111;}

  .title{position: absolute;width: 100%;text-align: center;top: 4%;}
  .title1{position: absolute;width: 100%;text-align: center;top: 28%;}
  .title2{position: absolute;width: 100%;text-align: center;top: 40%;color: #FFD40D;}
  .pass{position: absolute;width: 78%;top: 63%;left: 11%;height: 20%;
    border: 0;
    background: transparent;
    color: transparent;
    letter-spacing: 38px;
    text-indent: 0.6rem;z-index: 1;
    /*moz-user-select: -moz-none;*/
    /*-moz-user-select: none;*/
    /*-o-user-select:none;*/
    /*-khtml-user-select:none;*/
    /*-webkit-user-select:none;*/
    /*-ms-user-select:none;*/
    /*user-select:none;*/
  }
  .pass li{width: 16.6%;position: relative;float: left;}
  .pass li i{display: inline-block;border-radius: 100%;background-color: white;width: 18px;height: 18px;}
  .szBtn{position: absolute;width: 30%;bottom: 4%;left: 10%;}
  .szBtn1{position: absolute;width: 30%;bottom: 4%;right: 10%;}
</style>
