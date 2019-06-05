<template>
  <div class="guessIndex">
    <!--kv-->
    <div class="kv">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img1.png">
      <!--活动规则-->
      <div class="bgImg">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/bgImg.png">
        <div class="color-fff ft12 center-float-center poa h100" @click="ruleBtn">活动规则</div>
      </div>
      <!--币种选择-->
      <div class="coinSelect center-lr-scatter" id="coinSelect">
         <div class="selectBox" @click="coinSelectBtn(0,coinList[0])" id="s0" v-show="coinList[0]">
           <img :src="selectSrc">
           <div class="ft16 bold">{{coinList[0]}}</div>
         </div>
        <div class="selectBox" @click="coinSelectBtn(1,coinList[1])" id="s1" v-show="coinList[1]">
          <img :src="selectSrc">
          <div class="ft16 bold">{{coinList[1]}}</div>
        </div>
        <div class="selectBox" @click="coinSelectBtn(2,coinList[2])" id="s2" v-show="coinList[2]">
          <img :src="selectSrc">
          <div class="ft16 bold">{{coinList[2]}}</div>
        </div>
      </div>
      <div class="fontBox">
        <!--编号格式MM-DDX-->
        <p class="color-fff ft16 bold mt4">第{{new Date().format('MM-dd-')}}{{selectInfoList.periods}}期</p>
        <p class="color-fff ft14">当前奖池<span class="font1 ft22 bold ml1 mr1">{{selectInfoList.amount ? selectInfoList.amount : 0}}</span>{{selectInfoList.currency}}</p>
        <p class="font2 ft12 mt1">收盘后预言正确即可瓜分</p>
      </div>
    </div>
    <!--content1价格,k线图-->
    <div class="content1">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img2.jpg">
      <div class="c1Box">
        <p class="color-fff ft14 mt4">{{new Date().format('MM月dd日')}}BTC指数[BTC/USDT]</p>
        <div class="center-lr-scatter mt4">
          <div class="left-tb-scatter">
            <div class="color-fff ft12">开盘价格</div><!--开盘价格，收盘价格显示到小数点后两位小数-->
            <div class="redFont ft24 bold">{{selectInfoList.openPrice ? Number(selectInfoList.openPrice).cut(2) : 0}}</div>
          </div>
          <div class="left-tb-scatter right">
            <div class="color-fff ft12">当前价格</div>
            <div class="redFont ft24 bold">{{selectInfoList.currentPrice ? Number(selectInfoList.currentPrice).cut(2) : 0}}</div>
          </div>
        </div>
        <!--k线图-->
        <div class="bg-fff lineBox mt5">
          <div id="echarts"></div>
        </div>
      </div>
    </div>
    <!--content2时间-->
    <div class="content2">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img3.jpg">
      <div class="poa color-fff ft12 font3 mt2">本次投注剩余时间</div>
      <!--倒计时-->
      <div class="timeBox center-float-center">
        <!--时-->
        <div class="timeBg">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/timeBg.png">
          <div class="poa">{{!remainHour ? '00' : (remainHour === '00' ? remainHour : (remainHour >= 10 ? remainHour : '0' + remainHour))}}</div>
        </div>:
        <!--分-->
        <div class="timeBg">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/timeBg.png">
          <div class="poa">{{!remainMinutes ? '00' : (remainMinutes === '00' ? remainMinutes : (remainMinutes >= 10 ? remainMinutes : '0' + remainMinutes))}}</div>
        </div>:
        <!--秒-->
        <div class="timeBg">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/timeBg.png">
          <div class="poa">{{!remainSecond ? '00' : (remainSecond === '00' ? remainSecond : (remainSecond >= 10 ? remainSecond : '0' + remainSecond))}}</div>
        </div>
      </div>
      <!--涨-->
      <div class="leftBox left-tb-scatter">
        <div class="upImg" @click="showBuyDialog('1')">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/up.png" >
          <div class="ft14 font4">看涨</div><!--看涨比例,看跌比例四舍五入到整数位-->
          <div class="ft12 font5">{{upPercent === 0 ? 0 : (parseInt(upPercent) ? parseInt(upPercent) + '%' : 0)}}</div>
        </div>
        <div class="ft13"><!--不影响样式的情况下，最多显示7位数-->
          {{9999999 >= Number(selectInfoList.upAmount) && Number(selectInfoList.upAmount) >= 0 ? Number(selectInfoList.upAmount) :
          (99999999 >= Number(selectInfoList.upAmount) && Number(selectInfoList.upAmount) >= 10000000 ? Number(Number(selectInfoList.upAmount) / 10000).cut(2) + '万' :
          (Number(selectInfoList.upAmount) >= 100000000 ? Number(Number(selectInfoList.upAmount) / 100000000).cut(2) + '亿' : 0))}}
          {{selectCoinName}}
        </div>
      </div>
      <!--vs-->
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/vs.png" class="vs">
      <!--跌-->
      <div class="rightBox right-tb-scatter">
        <div class="downImg" @click="showBuyDialog('2')">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/down.png">
          <div class="ft14 font4">看跌</div>
          <div class="ft12 font5">{{downPercent === 0 ? 0 : (parseInt(downPercent) ? parseInt(downPercent) + '%' : 0)}}</div>
        </div>
        <div class="ft14">
          {{9999999 >= Number(selectInfoList.downAmount) && Number(selectInfoList.downAmount) >= 0 ? Number(selectInfoList.downAmount) :
          (99999999 >= Number(selectInfoList.downAmount) && Number(selectInfoList.downAmount) >= 10000000 ? Number(Number(selectInfoList.downAmount) / 10000).cut(2) + '万' :
          (Number(selectInfoList.downAmount) >= 100000000 ? Number(Number(selectInfoList.downAmount) / 100000000).cut(2) + '亿' : 0))}}
          {{selectCoinName}}
        </div>
      </div>
      <!--百分比-->
      <ul class="percent">
        <li id="line1" :style="'width:'+ (upPercent ? ((Number(upPercent) !== 0 && Number(downPercent) !== 0) ? Number(upPercent).cut(2) : 50) : 50) + '%'">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/line1.png">
        </li>
        <li id="line2" :style="'width:'+ (downPercent ? ((Number(upPercent) !== 0 && Number(downPercent) !== 0) ? Number(downPercent).cut(2) : 50) : 50) + '%'">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/line2.png">
        </li>
      </ul>
      <!--剩余次数-->
      <div class="haveCount">剩余<span class="font1">{{haveCount ? haveCount : 0}}次</span>预言机会</div>
    </div>
    <!--content3投注，历史记录-->
    <div class="content3">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img4.jpg">
      <div class="color-fff poa font6 mt2 mr10" v-show="minCoinBuyCount && maxCoinBuyCount">
        每人每期仅可预言三次<br/>每次可投<span>{{minCoinBuyCount}}-{{maxCoinBuyCount}}</span>{{selectInfoList.currency}}
      </div>
      <div class="font8 center-lr-scatter" v-if="gameTime === false && Number(haveCount) !== Number(allCount)">
        <div class="center-float-left">本次你已预言<span class="font1 ft30 bold ml10">{{lastAgreeClick === '1' ? '涨' : '跌'}}</span></div>
        <div class="center-float-right">预言：<span class="font1 ft12">{{selectInfoList.downCurrencyAmount}}</span></div>
      </div>
      <div class="font8 center-float-center" v-else>本次尚未预言</div>
      <!--收盘时间-->
      <div class="font9 ft12 poa" v-show="selectInfoList.closeTime">{{new Date(selectInfoList.closeTime).format('hh:mm:ss')}}揭晓结果</div>
      <!--查看历史记录-->
      <div class="selectBtn font1" @click="selectBtn">查看历史记录</div>
      <!--连投奖-->
      <!--<img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/ltj.png" class="ltjBtn" @click="ltjBtn">-->
    </div>
    <!--content4留言-->
    <div class="content4">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img5.jpg">
      <div class="swiper-container messUl">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-no-swiping left-float-top" v-for="(list, index) in msgList" :key="index">
             <div class="leftText">{{list.account}}</div>
             <div class="ml2 color-fff">{{list.msg}}</div>
          </div>
        </div>
      </div>
      <div class="messageBox">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/message.png">
        <input type="text" maxlength="20" placeholder="请输入您的留言" class="color-999 ft12 messInput" v-model="sendMsg">
        <button class="messBtn color-fff ft12" @click="sendMessage">发弹幕</button>
      </div>
    </div>
    <!--content5战绩排行-->
    <div class="content5">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img6.png">
      <div class="font7 color-fff ft18 bold">战绩排行</div>
      <ul class="topTenBox">
        <!--我，前三条-->
        <li>
          <table class="phbList table" cellpadding="0" cellspacing="0">
            <tr>
              <th>排名</th>
              <th>姓名</th>
              <th>胜率</th>
              <th>预言成功</th>
            </tr>
            <tr class="own" v-if="topTenOwn">
              <td>{{(!topTenOwn.rank) ? '-' : (topTenOwn.rank > 50 ? '50+' : topTenOwn.rank)}}</td>
              <td class="apostrophe-two">{{topTenOwn.name ? topTenOwn.name : '我'}}</td>
              <td class="font10">{{topTenOwn.winRate ? topTenOwn.winRate : '0'}}%</td>
              <td class="font10">{{topTenOwn.winCount ? topTenOwn.winCount : '0'}}</td>
            </tr>
            <tr class="one" v-if="topThree[0]">
              <td><img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/one.png" class="topThree"></td>
              <td class="apostrophe-two">{{topThree[0].name ? topThree[0].name : '-'}}</td>
              <td class="font10">{{topThree[0].winRate ? topThree[0].winRate : '0'}}%</td>
              <td class="font10">{{topThree[0].winCount ? topThree[0].winCount : '0'}}</td>
            </tr>
            <tr class="two" v-if="topThree[1]">
              <td><img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/two.png" class="topThree"></td>
              <td class="apostrophe-two">{{topThree[1].name ? topThree[1].name : '-'}}</td>
              <td class="font10">{{topThree[1].winRate ? topThree[1].winRate : '0'}}%</td>
              <td class="font10">{{topThree[1].winCount ? topThree[1].winCount : '0'}}</td>
            </tr>
            <tr class="three" v-if="topThree[2]">
              <td><img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/three.png" class="topThree"></td>
              <td class="apostrophe-two">{{topThree[2].name ? topThree[2].name : '-'}}</td>
              <td class="font10">{{topThree[2].winRate ? topThree[2].winRate : '0'}}%</td>
              <td class="font10">{{topThree[2].winCount ? topThree[2].winCount : '0'}}</td>
            </tr>
          </table>
        </li>
        <!--剩下的条数-->
        <li>
          <table class="phbList table" cellpadding="0" cellspacing="0" v-for="(data, index) in topTenList" :key="index">
            <tr>
              <td>{{data.rank}}</td>
              <td class="apostrophe-two">{{data.name ? data.name : '-'}}</td>
              <td class="font10">{{data.winRate ? data.winRate : '0'}}%</td>
              <td class="font10">{{data.winCount ? data.winCount : '0'}}</td>
            </tr>
          </table>
        </li>
      </ul>
    </div>
    <!--提示信息-->
    <div class="alertPrompt" v-show="isShowAlertPrompt">
      <div class="black"></div>
      <div class="center-float-center h100">{{gameMsg}}</div>
    </div>
    <!--看涨看跌弹窗-->
    <buy-dialog v-if="isShowBuyDialog" :visible.sync="isShowBuyDialog" @isRush="isRush" :agreeClick="agreeClick" :selectInfoList="selectInfoList"
                :userId="user.userId"></buy-dialog>
    <!--新人连投奖弹窗-->
    <continue-dialog v-if="isShowContinueDialog" :visible.sync="isShowContinueDialog" :currency="selectCoinName"></continue-dialog>
  </div>
</template>

<script>
import BuyDialog from './BuyDialog'
import ContinueDialog from './ContinueDialog'
import Swiper from 'swiper'
export default {
  name: 'GuessIndex',
  components: { ContinueDialog, BuyDialog },
  data () {
    return {
      // 是否出现弹出框
      isShowBuyDialog: false,
      isShowContinueDialog: false,
      // 背景图片路径替换
      selectSrc: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/s1.png',
      selectSrc1: 'https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/s2.png',
      // 币种名称
      coinList: {},
      // 币种个数(默认3个，调用币种接口的时候再赋值一下)
      coinCount: 3,
      // 选择的币种名称
      selectCoinName: '',
      // 猜涨跌数据
      selectInfoList: {},
      // 投注剩余时间(时分秒)倒计时，防止重复创建倒计时
      timer: null,
      remainHour: '',
      remainMinutes: '',
      remainSecond: '',
      // 涨跌 百分比
      // upPercent: '',
      // downPercent: '',
      upPercent: 0,
      downPercent: 0,
      // 总共次数
      allCount: '3',
      // 剩余次数
      haveCount: '',
      // 上一次选择涨 or 跌
      lastAgreeClick: '',
      // 当前选择涨 or 跌(1,涨 2.跌)
      agreeClick: '1',
      // 币种预言大小金额区间
      minCoinBuyCount: '',
      maxCoinBuyCount: '',
      // 排行榜
      topTenOwn: {},
      topThree: [],
      topTenList: [],
      overDate: '',
      // 弹幕List
      sendMsg: '',
      msgList: [],
      // mySwiper
      mySwiper: '',
      // K线图配置对象
      kLineChart: null,
      // K线图行情数据
      kLineData: {
        timeList: [],
        priceList: [],
        turnoverList: []
      },
      startDay: '',
      startHour: '',
      endHour: '',
      // 活动时间
      gameTime: false,
      gameMsg: '',
      // 是否出现提示弹窗文字
      isShowAlertPrompt: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  watch: {
    selectInfoList () {
      // 查询BTCk线图
      this.queryLine(this.selectInfoList.openTime, this.selectInfoList.closeTime)
    }
  },
  created () {
    // require('eruda').init()
    this.Native.setJavascriptFunc('goBack', () => {
      this.Native.call('goBack', {})
    })
    this.Native.call('setTitle', {
      titleName: '比特币猜涨跌'
    })
    this.Native.call('getLoginInfo', {}, data => {
      if (data['userId'] && data['token'] && data['sessionId']) {
        this.$store.commit('setLoginParams', {
          token: data['token'],
          feisuoUserId: data['userId'],
          sessionId: data['sessionId']
        })
        // 设置登录状态
        this.$store.commit('setUser', {
          userId: data['userId'],
          loginStatus: true
        })
        // 查询当前已登录用户的个人信息
        this.$store.dispatch('queryUserInfo').then()
      } else {
        // 清除用户信息
        this.$store.commit('clearLoginParams')
        this.$store.dispatch('clearUserInfo').then()
      }
    })
    // 留言条
    this.msgList = this.createMessages(100)
    // 获取币种接口
    this.$store.dispatch('encryptConnection', {
      url: '/api/guess/currencyListUI',
      data: {},
      refreshKey: this.Native.ios
    }).then(res => {
      if (parseInt(res.body.code) === 200) {
        this.coinList = res.body.data
        this.coinCount = res.body.data.length
        // 默认样式
        if (this.coinList[0]) {
          document.getElementById('coinSelect').firstChild.firstChild.src = this.selectSrc1
          document.getElementById('coinSelect').firstChild.lastChild.style.color = '#fff'
          this.selectCoinName = this.coinList[0]
          // 公共查询数据方法
          this.selectInfoUI()
          this.qryRank(this.user.userId)
        }
      } else if (parseInt(res.body.code) === 400) {
        // 预言活动已经全部结束或未开始
        this.$message.error(res.body.msg)
        this.gameTime = true
        this.gameMsg = res.body.msg
      } else {
        this.$message.error(res.body.msg)
      }
    }, res => {
      this.logout(res)
      this.$message.error(res.body.msg)
    })

    // 创建四分钟一次的轮询查询BTCk线图
    const interTimer = setInterval(() => {
      this.queryLine(this.selectInfoList.openTime, this.selectInfoList.closeTime)
    }, 240000)
    this.$store.commit('setIntervalTimer', interTimer)
  },
  mounted () {
    // swiper上下轮播
    this.mySwiper = new Swiper('.content4 .swiper-container', {
      loop: true,
      direction: 'vertical',
      autoplay: 1500, // 自动切换的时间间隔
      speed: 500, // 滑动速度
      noSwiping: true,
      height: 28, // messUl——height: 72px;
      initialSlide: 0,
      loopAdditionalSlides: 0,
      onReachEnd: () => {
        // 留言条
        this.msgList = this.createMessages(100)
      }
    })
    this.mySwiper.init()
    this.mySwiper.startAutoplay()
  },
  methods: {
    isRush () {
      // 重新调用一次接口
      this.selectInfoUI()
      this.qryRank(this.user.userId)
    },
    // 查询猜涨跌详情数据
    selectInfoUI () {
      this.$store.dispatch('encryptConnection', {
        url: '/api/guess/infoUI',
        data: {
          userId: this.user.userId,
          currency: this.selectCoinName
        },
        refreshKey: this.Native.ios
      }).then(res => {
        this.selectInfoList = res.body.data
        // 时分秒
        let lastTime = res.body.data['overDate'] // 四小时一场
        this.overDate = res.body.data['overDate']
        if (lastTime !== 0) {
          lastTime = parseInt((lastTime / 1000).toString())
          if (!this.timer && parseInt(lastTime.toString()) > 0) {
            this.timer = setInterval(() => {
              // 倒计时结束
              if (--lastTime <= 0) {
                clearTimeout(this.timer)
              }
              this.remainHour = parseInt((lastTime / 3600).toString())
              this.remainMinutes = parseInt(((lastTime % 3600) / 60).toString())
              this.remainSecond = lastTime % 60
            }, 1000)
          }
        } else {
          this.remainHour = '00'
          this.remainMinutes = '00'
          this.remainSecond = '00'
        }
        // 看涨跌比例
        // this.upPercent = res.body.data.upScale
        // this.downPercent = res.body.data.downScale
        // if (Number(this.upPercent) === 0 && Number(this.downPercent) === 0) {
        //   this.upPercent = '50'
        //   this.downPercent = '50'
        // }
        // 看涨跌比例按总金额算
        if (Number(this.selectInfoList.amount) !== 0) {
          this.upPercent = (Number(this.selectInfoList.upAmount) / Number(this.selectInfoList.amount)) * 100
          this.downPercent = (Number(this.selectInfoList.downAmount) / Number(this.selectInfoList.amount)) * 100
        } else {
          this.upPercent = 0
          this.downPercent = 0
        }
        // 剩余次数 = 总次数 - 已预言次数
        this.haveCount = Number(this.allCount) - Number(res.body.data.guessCount)
        // 上一次选择涨 or 跌
        if (res.body.data.guessCount !== '0') {
          this.lastAgreeClick = res.body.data.guessTypes.split(',')[res.body.data.guessTypes.split(',').length - 1]
        }
        // 币种预言大小金额区间
        if (res.body.data.paySelections.split(',').length) {
          this.minCoinBuyCount = res.body.data.paySelections.split(',')[0]
          this.maxCoinBuyCount = res.body.data.paySelections.split(',')[res.body.data.paySelections.split(',').length - 1]
        }
        let recoverTime = 0
        if (res.body.data['overDate']) {
          recoverTime = (this.selectInfoList.closeTime - this.selectInfoList.openTime) / 2 + res.body.data['overDate']
        } else {
          recoverTime = this.selectInfoList.closeTime - +new Date()
        }
        const timer = setTimeout(() => {
          this.selectInfoUI()
          this.qryRank(this.user.userId)
        }, recoverTime)
        this.$store.commit('setGuessTimer', timer)
      }, res => {
        this.logout(res)
        this.$message.error(res.body.msg)
      })
    },
    // 战绩排行榜查询
    qryRank (userId) {
      if (userId) {
        this.$store.dispatch('encryptConnection', {
          url: '/api/guess/rankUI',
          data: {
            userId: userId
          },
          refreshKey: this.Native.ios
        }).then(res => {
          this.topTenOwn = {}
          this.topThree = []
          this.topTenList = []
          var data = []
          data = res.body.data
          if (data.length <= 10) {
            // 少于10条
            for (let i = 0; i < data.length; i++) {
              if (i <= 2) {
                this.topThree.push(data[i])
              } else {
                this.topTenList.push(data[i])
              }
              if (data[i].name === '我') {
                for (let key in data[i]) {
                  this.topTenOwn[key] = data[i][key]
                }
              }
            }
          } else if (data.length > 10) {
            // 11条=我在排行榜前十名之外
            this.topTenOwn = data[0]
            data.splice(0, 1) // 删除
            for (let i = 0; i < data.length; i++) {
              if (i <= 2) {
                this.topThree.push(data[i])
              } else {
                this.topTenList.push(data[i])
              }
            }
          } else {}
        }, res => {
          this.logout(res)
          this.$message.error(res.body.msg)
        })
      }
    },
    // 选择币种
    coinSelectBtn (_index, _coinName) {
      this.selectCoinName = _coinName
      this.recoverFun(this.coinCount)
      document.getElementById('s' + _index).firstChild.src = this.selectSrc1
      document.getElementById('s' + _index).lastChild.style.color = '#fff'
      this.selectInfoUI()
      this.qryRank(this.user.userId)
    },
    // 活动规则
    ruleBtn () {
      if (this.selectCoinName) {
        this.$router.push({ name: 'rule', params: { currency: this.selectCoinName } })
      } else {
        this.$router.push({ name: 'rule', params: { currency: 0 } })
      }
    },
    // 看涨跌
    showBuyDialog (_index) {
      // 活动是否结束
      if (!this.gameTime) {
        // 注册登录，实名认证用户才可操作
        if (!this.user.userId && !this.user.loginStatus) {
          // 1跳资金密码 2登录 3实名认证
          this.$store.commit('clearRSAPublicKey')
          this.Native.call('goPage', {
            type: 2
          })
        } else {
          // 查询当前已登录用户的个人信息
          this.$store.dispatch('queryUserInfo').then(res => {
            if (res.body.data.identityAuthenticator !== '0') {
              // 一个是倒计时到0的状态，一个是进来就是0无法点击状态
              if (((this.remainHour === 0 && this.remainMinutes === 0) && this.remainSecond === 0) || Number(this.overDate) === 0) {
                this.isShowAlertPrompt = true
                this.gameMsg = '投注时间已过!'
                setTimeout(() => {
                  this.isShowAlertPrompt = false
                }, 1500)
              } else {
                if (this.haveCount === 0) {
                  this.isShowAlertPrompt = true
                  this.gameMsg = '当前场次预言次数已用完!'
                  setTimeout(() => {
                    this.isShowAlertPrompt = false
                  }, 1500)
                } else {
                  this.isShowBuyDialog = true
                  this.agreeClick = _index
                }
              }
            } else {
              this.Native.call('goPage', {
                type: 3
              })
            }
          }, res => {})
        }
      } else {
        this.$message.error(this.gameMsg)
      }
    },
    // 查看历史记录
    selectBtn () {
      this.$router.push({ name: 'history' })
    },
    // 连投奖
    // ltjBtn () {
    //   this.isShowContinueDialog = true
    // },
    // 恢复默认
    recoverFun (_length) {
      for (let i = 0; i < _length; i++) {
        document.getElementById('s' + i).firstChild.src = this.selectSrc
        document.getElementById('s' + i).lastChild.style.color = '#265dcc'
      }
    },
    // 发弹幕
    sendMessage () {
      if (!this.user.userId && !this.user.loginStatus) {
        this.Native.call('goPage', {
          type: 2
        })
      } else {
        if (this.sendMsg !== '') {
          const account = this.user.nickname || this.user.desensitizationTelephone || this.user.desensitizationEmail
          this.msgList.splice(this.mySwiper.activeIndex + 2, 0, { account: account, msg: this.sendMsg })
          this.sendMsg = ''
        } else {
          this.$message.error('请输入1-20个字!')
        }
      }
    },
    createMessages (total) {
      // 1.创建消息
      let msgList = require('../../assets/data/msg').msg
      msgList.sort(function () {
        const a = Math.random()
        const b = Math.random()
        return a > b ? 0 : -1
      })
      // 2.创建用户名
      const account = require('../../assets/data/account')
      // 手机号码头部三位
      const telHeadList = account.telephone
      // 2.1生成手机账号
      const createTelAcc = function (headList) {
        let index = parseInt((Math.random() * headList.length).toString())
        const head = headList[index]
        let end = '0000' + parseInt((Math.random() * 9999).toString())
        end = end.substring(end.length - 4, end.length)
        return head + '****' + end
      }
      // 2.2获取昵称
      let nickname = account.nickname
      nickname.sort(function () {
        const a = Math.random()
        const b = Math.random()
        return a > b ? 0 : -1
      })
      nickname = nickname.slice(0, total * 0.3)
      // 2.4合成账号列表
      let accountList = nickname
      for (let i = 0; i < total * 0.7; ++i) {
        accountList.push(createTelAcc(telHeadList))
      }
      accountList.sort(function () {
        return Math.random() > 0.5 ? 0 : -1
      })
      accountList = accountList.slice(0, total)
      // 3.合成弹幕
      let messageList = []
      for (let i = 0; i < total; ++i) {
        messageList.push({
          account: accountList[i],
          msg: msgList[i]
        })
      }
      return messageList
    },
    // 查询行情折线图
    queryLine (startTime, endTime) {
      this.$http.get('/api/digitalAssets/findKLineDataUI?currency=BTC').then(response => {
        const data = response.body.data
        let timeList = []
        let priceList = []
        let turnoverList = []
        for (let i in data) {
          // 按时间段截取数据
          const time = new Date(parseInt(data[i][0]))
          // 过滤:还在开始之前
          if (time < startTime) {
            continue
          }
          // 过滤:还在结束之后
          if (time > endTime) {
            break
          }
          // 装载数据
          timeList.push(time.format('hh:mm'))
          priceList.push(data[i][1])
          turnoverList.push(data[i][2])
        }
        if (this.selectInfoList.openPrice) {
          priceList.shift()
          priceList.unshift(this.selectInfoList.openPrice)
        }
        this.$set(this.kLineData, 'timeList', timeList)
        this.$set(this.kLineData, 'priceList', priceList)
        this.$set(this.kLineData, 'turnoverList', turnoverList)
        this.line()
      }, response => {
        this.logout(response)
      })
    },
    line () {
      if (!this.kLineChart) {
        const echarts = require('echarts')
        this.kLineChart = echarts.init(document.getElementById('echarts'))
      }
      this.kLineChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        title: {
          text: '数据来源:blockchain',
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.kLineData.timeList
        },
        yAxis: {
          show: false,
          max: 'dataMax',
          min: function (value) {
            return (value.min - (value.max - value.min) * 0.1)
          }
        },
        grid: {
          bottom: 20
        },
        series: [
          {
            name: '价格(USD)',
            type: 'line',
            smooth: false,
            showSymbol: false,
            symbolSize: 0,
            data: this.kLineData.priceList,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: '#65CCFF'
              }
            },
            lineStyle: {
              normal: {
                color: '#65CCFF'
              }
            },
            areaStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: 'rgba(218,244,255,.4)' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#FFF' // 100% 处的颜色
                  }]
                }
              }
            }
          }]
      })
      this.kLineChart.resize()
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
  }
}
</script>

<style scoped>
  .kv{z-index: 11;}
  .guessIndex{background-color: #22077f;padding-bottom: 10%;height: auto;}
  .bgImg{position: absolute;width: 16%;top: 10%;right: 0;}
  .bgImg img{width: 100%;}
  .fontBox{position: absolute;width: 100%;top: 78.2%;left: 0;height: 22%;text-align: center;z-index: 11;}
  .font1{color: #FFD40D;}
  .font2{color: #07EBFF;}
  .coinSelect{position: absolute;width: 66%;left: 17%;top: 68.3%;z-index: 1;}
  .coinSelect .selectBox{position: relative;width: 29%;}
  .selectBox div{position: absolute;width: 100%;top: 15%;text-align: center;color: #265dcc;}
  /*content1*/
  .c1Box{position: absolute;width: 90%;left: 5%;top: 0;}
  .lineBox{width: 100%;height: 148px;position: relative;border-radius: 5px;}
  .redFont{color: #FF2E2E;}
  .right{text-align: right;}
  #echarts{position: absolute;width: 100%;top: 0;left: 0;height: 100%;}
  /*content2*/
  .font3{text-align: center;width: 100%;}
  .leftBox{position: absolute;top: 0;left: 9%;width: 40%;color: #fff;}
  .rightBox{position: absolute;top: 0;right: 9%;width: 40%;color: #fff;}
  .upImg,.downImg{width: 52%;margin-top: 22%;position: relative;margin-bottom: 3%;z-index: 11;}
  .vs{position: absolute;width: 10%;left: 45%;top: 36%;z-index: 1;}
  .timeBox{position: absolute;width: 100%;top: 16%;z-index: 1;color: #4C75AC;}
  .timeBg{position: relative;top: 0;font-size: 12px;width: 26px;height: 100%;text-align: center;}
  .timeBg div{letter-spacing: 4px;text-align: right;left: auto;}
  .font4{position: absolute;width: 100%;top: 47%;text-align: center;}
  .font5{position: absolute;width: 100%;top: 70%;text-align: center;}
  .font6{text-align: center;font-size: 12px;}
  .font6 span{color: #FFF60D;}
  .percent{position: absolute;width: 42%;top: 40.6%;height: 13%;left: 29%;}
  .percent li{position: relative;width: 50%;float: left;height: 100%;}
  .percent li img{height: 100%;}
  .haveCount{background-color: #050093;position: absolute;width: 28%;top: 66%;font-size: 12px;text-align: center;left: 36%;padding: 1% 0;border-radius: 5px;}
  /*content3*/
  .selectBtn{position: absolute;width: 50%;top: 75%;margin-left: 7%;font-size: 13px;}
  .ltjBtn{position: absolute;width: 20%;top: 57%;left: auto;right: 0;margin-right: 7%;}
  .font8{position: absolute;width: 68%;top: 28%;left: 16%;height: 22%;}
  .font8 div{position: relative;width: 50%;float: left;color: #fff;font-size: 12px;height: 100%;}
  .font9{color:#488EEC;top: 56%;width: 100%;text-align: center;}
  /*content4*/
  .messageBox{position: absolute;width: 74%;top: 66%;left: 13%;z-index: 1111;}
  .messInput{position: absolute;width: 65%;top: 0;left: 0;height: 100%;text-indent: 1rem;}
  .messBtn{position: absolute;width: 35%;right: 0;top: 0;height: 100%;text-align: center;}
  .messUl{position: absolute;width: 84%;left: 8%;top: 10%;height: 72px;}
  .leftText{max-width: 140px;}
  /*content5*/
  .content5{position: relative;width: 94.4%;left: 2.8%;}
  .font7{position: absolute;width: 100%;top: 2.6%;text-align: center;}
  .topTenBox{position: absolute;width: 100%;left: 0;top: 8%;height: auto;}
  .topTenBox li{position: relative;width: 100%;}
  .phbList{position: relative;width: 100%;left: 0;top: 8%;height: auto;}
  .phbList th,.phbList td{color: #fff;font-size: 12px;text-align: center;height: 48px;}
  .content5 .own{background-color: #2A1AB2;border-spacing: 0;}
  .content5 .topThree{position: relative;width: 34%;margin: 0 auto;}
  .content5 .font10{color: #FFEB0D;}
  /*提示*/
  .alertPrompt{position: fixed;width: 60%;height: 10%;top: 40%;left: 20%;z-index: 11111111111;border-radius: 2px;color: #fff;font-size: 14px;text-align: center;}
  .alertPrompt .black{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-color: #000;opacity: 0.8;-ms-filter: alpha(opacity= 80);filter: alpha(opacity= 80);}
</style>
