<template>
  <div class="history">
    <!--头部-->
    <div class="headBox">
      <ul class="headBtn pt5">
        <li @click="select(0)">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/headBg.png" v-show="isShowHeadBg">
          <div class="center-float-center poa h100">往期记录</div>
        </li>
        <li @click="select(1)">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/headBg.png" v-show="!isShowHeadBg">
          <div class="center-float-center poa h100">我的记录</div>
        </li>
      </ul>
    </div>
    <!--往期记录-->
    <div class="beforeH mt5" v-show="isShowHeadBg">
      <div class="por w100 mt5"  v-for="(data, index) in historyList" :key="index">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/beforeBg.png">
        <div class="color-fff ft16 font2">第{{data.periods}}期<span class="ft14 ml2">({{data.periodDate}})</span></div>
        <div class="color-fff ft14 font3">{{data.periodTime}}</div>
        <!--涨-->
        <div class="leftBox">
          <div class="upImg">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/up.png" >
            <div class="ft14 font4">看涨</div>
            <div class="ft12 font5">{{Number(data.upRate * 100).cut(2)}}%</div>
          </div>
          <div class="ft14">
            {{data.upAmount === '-' ? 0 :
            (9999999 >= Number(data.upAmount) && Number(data.upAmount) >= 0 ? Number(data.upAmount) :
            (99999999 >= Number(data.upAmount) && Number(data.upAmount) >= 10000000 ? Number(Number(data.upAmount) / 10000).cut(2) + '万' :
            (Number(data.upAmount) >= 100000000 ? Number(Number(data.upAmount) / 100000000).cut(2) + '亿' : 0)))}}
            {{data.currency}}
          </div>
        </div>
        <!--vs-->
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/vs.png" class="vs">
        <!--跌-->
        <div class="rightBox right-tb-scatter">
          <div class="downImg">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/down.png">
            <div class="ft14 font4">看跌</div>
            <div class="ft12 font5">{{Number(data.downRate * 100).cut(2)}}%</div>
          </div>
          <div class="ft14">
            {{data.downAmount === '-' ? 0 :
            (9999999 >= Number(data.downAmount) && Number(data.downAmount) >= 0 ? Number(data.downAmount) :
            (99999999 >= Number(data.downAmount) && Number(data.downAmount) >= 10000000 ? Number(Number(data.downAmount) / 10000).cut(2) + '万' :
            (Number(data.downAmount) >= 100000000 ? Number(Number(data.downAmount) / 100000000).cut(2) + '亿' : 0)))}}
            {{data.currency}}
          </div>
        </div>
        <!--百分比-->
        <ul class="percent">
          <li id="line1" :style="'width:'+ (Number(data.upRate) === 0 && Number(data.downRate) === 0  ? 50 : Number(data.upRate * 100).cut(2)) + '%'">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/line1.png">
          </li>
          <li id="line2" :style="'width:'+ (Number(data.upRate) === 0 && Number(data.downRate) === 0 ? 50 : Number(data.downRate * 100).cut(2)) + '%'">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/line2.png">
          </li>
        </ul>
        <!--本期结果 0:平,1:涨,2:跌-->
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/p.png" class="result" v-if="data.result === 0">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/z.png" class="result" v-if="data.result === 1">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/d.png" class="result" v-if="data.result === 2">
      </div>
      <!--更多-->
      <div class="font1 mt5 loadMore" v-if="isMoreList" @click="queryGuessPriceRecordsUI" v-loading="loading">— 点击加载更多 —</div>
      <div class="font1 mt5 loadMore" v-else>— 没有更多数据了 —</div>
    </div>
    <!--我的记录-->
    <div class="ownH mt5" v-show="!isShowHeadBg && isList" >
      <div class="por w100 mt5" v-for="(item, index) in myList" :key="index">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/ownBg.png">
        <div class="myBox">
          <div class="line0 color-fff ft14 mt2 mb2">
            <span class="coinName">{{item.currency}}</span>第{{item.periodNum}}期<span class="ml2 ft12">({{item.periodDate}})</span>
          </div>
          <div class="line1">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/red.png" v-show="isNaN(item.periodTotalSum) === false &&  Number(item.periodTotalSum) >= 0">
            <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/green.png" v-show="isNaN(item.periodTotalSum) === false &&  Number(item.periodTotalSum) < 0">
            <div class="color-fff ft16 center-float-center poa h100">
              {{isNaN(item.periodTotalSum) ? '' : (Number(item.periodTotalSum) >= 0 ? '盈' : '亏')}}
            </div>
          </div>
          <div class="line2 center-lr-scatter color-fff ft14 mt5 mb4">
            <div>{{item.periodTime}}</div>
            <!--允许字符串存在-->
            <div>
              {{isNaN(item.periodTotalSum) ? item.periodTotalSum : (Number(item.periodTotalSum) > 0 ? '+' + Number(item.periodTotalSum) : Number(item.periodTotalSum))}}
              {{isNaN(item.periodTotalSum) ? '' : item.currency}}
            </div>
          </div>
          <ul class="line3">
            <li class="first center-tb-scatter">
              <div class="font1 center-float-center">第1次预言
                <span class="color-fff" v-if="item.periodDetails[0]" :class="{'red': item.periodDetails[0].type === 1,'green': item.periodDetails[0].type === 2}">
              {{item.periodDetails[0].type === 1 ? '涨': '跌'}}</span>
              </div>
              <div v-if="item.periodDetails[0]">{{item.periodDetails[0].downAmount}}{{item.currency}}</div>
              <div v-else>-</div>
            </li>
            <li class="second center-tb-scatter">
              <div class="font1 center-float-center">第2次预言
                <span class="color-fff" v-if="item.periodDetails[1]" :class="{'red': item.periodDetails[1].type === 1,'green': item.periodDetails[1].type === 2}">
              {{item.periodDetails[1].type === 1 ? '涨': '跌'}}</span>
              </div>
              <div v-if="item.periodDetails[1]">{{item.periodDetails[1].downAmount}}{{item.currency}}</div>
              <div v-else>-</div>
            </li>
            <li class="third center-tb-scatter">
              <div class="font1 center-float-center">第3次预言
                <span class="color-fff" v-if="item.periodDetails[2]" :class="{'red': item.periodDetails[2].type === 1,'green': item.periodDetails[2].type === 2}">
              {{item.periodDetails[2].type === 1 ? '涨': '跌'}}</span>
              </div>
              <div v-if="item.periodDetails[2]">{{item.periodDetails[2].downAmount}}{{item.currency}}</div>
              <div v-else>-</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="font1 mt5 loadMore">— 没有更多数据了 —</div>
    </div>
    <!--没有记录-->
    <div class="noBg" v-show="!isList">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/noMessage.png" class="">
        <div class="mt10 color-fff ft20">你尚未预言</div>
        <div class="arrow" @click="goUp">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/btnBg.png">
          <div class="center-float-center poa h100 color-fff ft12">立即前往</div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  data () {
    return {
      // 背景图切换
      isShowHeadBg: true,
      // 是否预言
      isList: true,
      // 涨跌 百分比
      upPercent: 50,
      downPercent: 50,
      // 我的记录List
      myList: [],
      // 往期记录List
      historyList: [],
      // 是否还有数据
      isMoreList: true,
      hPage: {
        pageSize: 10, // 条数
        pageNo: 1 // 页数
      },
      mPage: {
        pageSize: 100,
        pageNo: 1
      },
      // 加载
      loading: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },
  created () {
    this.Native.setJavascriptFunc('goBack', () => {
      this.$router.push({name: 'guessIndex'})
    })
    // 往期记录
    this.queryGuessPriceRecordsUI()
  },
  methods: {
    select (_index) {
      if (_index === 0) {
        this.hPage.pageNo = 1
        this.initFun()
        this.isShowHeadBg = true
        this.queryGuessPriceRecordsUI()
      } else {
        this.initFun()
        this.isShowHeadBg = false
        this.queryGuessPriceRecordByUserIdUI()
      }
    },
    initFun () {
      this.historyList = []
      this.isList = true
    },
    // 往期记录
    queryGuessPriceRecordsUI () {
      this.loading = true
      this.$store.dispatch('encryptConnection', {
        url: '/api/guessPrice/queryGuessPriceRecordsUI',
        data: {
          pageSize: this.hPage.pageSize,
          pageNo: this.hPage.pageNo
        },
        refreshKey: this.Native.ios
      }).then(res => {
        if (res.body.data.length > 0) {
          this.historyList = this.historyList.concat(res.body.data)
          this.loading = false
        } else {
          this.isMoreList = false
          this.loading = false
        }
      }, res => {
        this.logout(res)
        const code = parseInt(res.body.code) || res.body.code
        this.loading = false
        switch (code) {
          case 'BS-0007':
            // 暂无数据
            this.isMoreList = false
            break
          default:
            this.$message.error(res.body.msg)
            break
        }
      })
      ++this.hPage.pageNo
    },
    // 我的记录
    queryGuessPriceRecordByUserIdUI () {
      if (!this.user.userId && !this.user.loginStatus) {
        // 1跳资金密码 2登录 3实名认证
        this.$store.commit('clearRSAPublicKey')
        this.Native.call('goPage', {
          type: 2
        })
      } else {
        this.$store.dispatch('encryptConnection', {
          url: '/api/guessPrice/queryGuessPriceRecordByUserIdUI',
          data: {
            pageSize: this.mPage.pageSize,
            pageNo: this.mPage.pageNo
          },
          refreshKey: this.Native.ios
        }).then(res => {
          if (res.body.data.length > 0) {
            this.myList = res.body.data
          } else {
            this.isList = false
          }
        }, res => {
          this.logout(res)
          const code = parseInt(res.body.code) || res.body.code
          switch (code) {
            case 'BS-0007':
              this.isList = false
              break
            case 300:
              this.$message.error(res.body.message)
              // 1跳资金密码 2登录 3实名认证
              this.$store.commit('clearRSAPublicKey')
              this.Native.call('goPage', {
                type: 2
              })
              break
            default:
              this.$message.error(res.body.message)
              break
          }
        })
      }
    },
    // 立即前往
    goUp () {
      this.isList = true
      this.$router.push({ name: 'guessIndex' })
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
  .headBox{background-color: #22077F;position: relative;width: 100%;height: auto;top: 0;left: 0;}
  .headBtn{position: relative;width: 70%;margin-left: 15%;}
  .headBtn li{position: relative;width: 50%;display: inline-block;color: #fff;font-size: 14px;height: 39px;}
  /*我的记录*/
  .ownH{position: relative;width: 94%;left: 3%;}
  .myBox{position: absolute;width: 90%;top: 0;left: 5%;}
  .coinName{background-color: #2514a5;padding: 1% 2%;border-radius: 5px;color: #FFD200;margin-right:2%;}
  .line1{position: absolute;width: 9%;top: 0;right: 0;left: auto;}
  .line2 div{background-color: #17098c;padding: 1% 2%;border-radius: 5px;margin-right:2%;}
  .font1{color: #6986F2;font-size: 12px;margin-bottom:6%;width: 100%;text-align: center;}
  .font1 span{padding:0 3%;border-radius: 3px;position: relative;margin-left: 3%;}
  .red{background-color: #FF3521;}
  .green{background-color: #40C03F;}
  .line3{color: #fff;font-size: 14px;position: relative;}
  .line3 li{position: relative;width: 33.33%;float: left;text-align: center;}
  /*往期记录*/
  .beforeH{position: relative;width: 94%;left: 3%;}
  .font2{position: absolute;width: 100%;top: 4%;text-align: center;}
  .font3{position: absolute;width: 100%;top: 18%;text-align: center;}
  /*没有记录*/
  .arrow{position: relative;width: 100%;left: 0;margin-top: 30%;}
  .noBg{position: relative;width: 28%;left: 36%;margin-top: 24%;text-align: center;}
  .leftBox{position: absolute;top: 3%;left: 7%;width: 44%;color: #fff;}
  .rightBox{position: absolute;top: 3%;right: 7%;width: 44%;color: #fff;}
  .upImg,.downImg{width: 52%;margin-top: 22%;position: relative;margin-bottom: 3%;z-index: 11;}
  .vs{position: absolute;width: 10%;left: 45%;top: 42%;z-index: 1;}
  .font4{position: absolute;width: 100%;top: 47%;text-align: center;}
  .font5{position: absolute;width: 100%;top: 70%;text-align: center;}
  .percent{position: absolute;width: 42%;top: 46.6%;height: 13.6%;left: 29%;}
  .percent li{position: relative;width: 50%;float: left;height: 100%;}
  .percent li img{height: 100%;}
  .result{position: absolute;width: 8%;top: 72%;left: 46%;}
  .loadMore{height: 50px;margin-bottom: 0;}
</style>
