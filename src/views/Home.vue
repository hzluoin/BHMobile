<template>
  <div class="home">
    <!--通用头部-->
    <header-public></header-public>
    <!--content-->
    <div class="homeBox">
      <!--kv-->
      <el-carousel :interval="5000" arrow="never" :autoplay="true" v-bind:height="kvHeight" class="indexCss">
        <el-carousel-item>
          <img src="../assets/images/home/kv1.png" class="kv" ref="imgHeight">
        </el-carousel-item>
        <el-carousel-item>
          <a href="https://8bihui.zendesk.com/hc/zh-cn/community/posts/360034987571-ADC%E4%B8%8A%E7%BA%BF%E5%B8%81%E6%B1%87%E4%BA%A4%E6%98%93%E6%89%80%E6%B4%BB%E5%8A%A8">
            <img src="../assets/images/home/kv2.jpg" class="kv">
          </a>
        </el-carousel-item>
      </el-carousel>
      <!--公告-->
      <div class="w90 news">
        <img src="../assets/images/home/horn.png" class="horn">
        <div class="swiper-container new">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-no-swiping">
              <a class="new apostrophe-one" @click="skipPc()" id="skipPc" v-show="active_Title.title">{{active_Title.title}}</a>
            </div>
          </div>
        </div>
      </div>
      <!--币率-->
      <div class="w90 blBox">
        <div class="blBox1">
          <div class="blDiv" style="border-top: 0;">
              <div class="font1">BTC</div>
              <div class="font2" :class="{'upFont': priceList.BTC.rise, 'downFont': !priceList.BTC.rise}">
                <span v-if="getCNY">￥{{USDToCNY(priceList.BTC.price)}}</span>
                <span v-else>${{Number(priceList.BTC.price).cut(2)}}</span>
                <div class="arrowImg" :class="{'upImg': priceList.BTC.rise, 'downImg': !priceList.BTC.rise}"></div>
              </div>
              <div class="font3" :class="{'upDiv': priceList.BTC.rise, 'downDiv': !priceList.BTC.rise}">{{priceList.BTC.risePercent}}%</div>
          </div>
          <div class="blDiv">
            <div class="font1">LTC</div>
            <div class="font2" :class="{'upFont': priceList.LTC.rise, 'downFont': !priceList.LTC.rise}">
              <span v-if="getCNY">￥{{USDToCNY(priceList.LTC.price)}}</span>
              <span v-else>${{Number(priceList.LTC.price).cut(2)}}</span>
              <div class="arrowImg" :class="{'upImg': priceList.LTC.rise, 'downImg': !priceList.LTC.rise}"></div>
            </div>
            <div class="font3" :class="{'upDiv': priceList.LTC.rise, 'downDiv': !priceList.LTC.rise}">{{priceList.LTC.risePercent}}%</div>
          </div>
          <div class="blDiv">
            <div class="font1">BCH</div>
            <div class="font2" :class="{'upFont': priceList.BCH.rise, 'downFont': !priceList.BCH.rise}">
              <span v-if="getCNY">￥{{USDToCNY(priceList.BCH.price)}}</span>
              <span v-else>${{Number(priceList.BCH.price).cut(2)}}</span>
              <div class="arrowImg" :class="{'upImg': priceList.BCH.rise, 'downImg': !priceList.BCH.rise}"></div>
            </div>
            <div class="font3" :class="{'upDiv': priceList.BCH.rise, 'downDiv': !priceList.BCH.rise}">{{priceList.BCH.risePercent}}%</div>
          </div>
          <div class="blDiv">
            <div class="font1">ETH</div>
            <div class="font2" :class="{'upFont': priceList.ETH.rise, 'downFont': !priceList.ETH.rise}">
              <span v-if="getCNY">￥{{USDToCNY(priceList.ETH.price)}}</span>
              <span v-else>${{Number(priceList.ETH.price).cut(2)}}</span>
              <div class="arrowImg" :class="{'upImg': priceList.ETH.rise, 'downImg': !priceList.ETH.rise}"></div>
            </div>
            <div class="font3" :class="{'upDiv': priceList.ETH.rise, 'downDiv': !priceList.ETH.rise}">{{priceList.ETH.risePercent}}%</div>
          </div>
          <div class="blDiv" style="border-bottom: 0px;">
            <div class="font1">ETC</div>
            <div class="font2" :class="{'upFont': priceList.ETC.rise, 'downFont': !priceList.ETC.rise}">
              <span v-if="getCNY">￥{{USDToCNY(priceList.ETC.price)}}</span>
              <span v-else>${{Number(priceList.ETC.price).cut(2)}}</span>
              <div class="arrowImg" :class="{'upImg': priceList.ETC.rise, 'downImg': !priceList.ETC.rise}"></div>
            </div>
            <div class="font3" :class="{'upDiv': priceList.ETC.rise, 'downDiv': !priceList.ETC.rise}">{{priceList.ETC.risePercent}}%</div>
          </div>
        </div>
      </div>
      <!--立即注册-->
      <div class="publicBtn">
        <button class="loginBtn"><a href="/pc/login">登录</a></button>
        <button class="registerBox" @click="registerBtn">注册</button>
      </div>
      <!--优势-->
      <div class="w90 ysBox">
        <div class="title">—— 我们的优势 ——</div>
        <ul>
          <li>
            <img src="../assets/images/home/img1.png">
            <div class="ys_title">全球场外交易</div>
            <div class="ys_font">支持多国法币交易，为用户保值、增收、极速安全</div>
          </li>
          <li class="right">
            <img src="../assets/images/home/img2.png">
            <div class="ys_title">用户至上</div>
            <div class="ys_font">所有交易免费，充币、提币实时到账，多语种客服支持</div>
          </li>
          <li>
            <img src="../assets/images/home/img3.png">
            <div class="ys_title">安全</div>
            <div class="ys_font">专业级的金融风控团队95%的资产冷钱包存储</div>
          </li>
          <li class="right">
            <img src="../assets/images/home/img4.png">
            <div class="ys_title">专业</div>
            <div class="ys_font">人民币、美元市场无缝式交易，专业级的操盘模式</div>
          </li>
        </ul>
        <div style="clear: both;"></div>
      </div>
      <!--关于我们-->
      <div class="aboutBox">
        <div class="title">—— 关于我们 ——</div>
        <div class="footer1">
          <div class="w90 tbc-lr-scatter">
            <div class="footerLogo"><img src="../assets/images/public/footerLogo.png"></div>
            <div class="rightFont column">
              <p>最简单 最安全 最专业  </p>
              <p>客服时间: 币汇 7*24 小时为您服务</p>
              <p>投诉建议 services@8bihui.com</p>
            </div>
          </div>
          <img src="../assets/images/home/qr_code.jpg" class="qr_code">
          <div class="codeFont">官网公众号</div>
        </div>
      </div>
    </div>
    <!--通用底部-->
    <footer-public></footer-public>
  </div>
</template>

<script>
import FooterPublic from '../components/FooterPublic'
import HeaderPublic from '../components/HeaderPublic'
import Swiper from 'swiper'
export default {
  name: 'home',
  components: {
    HeaderPublic,
    FooterPublic
  },
  data () {
    return {
      // 轮播图高度
      kvHeight: '',
      selectLeftType: '1', // 1 公告中心 2帮助中心，一级id
      categoryId: '', // 类别id，二级id
      active_Title: '',
      pageListUI: {}
    }
  },
  computed: {
    getCNY () {
      return this.$store.getters.getRate.rates.CNY
    },
    priceList () {
      let data = this.$store.getters.getOtherAsset
      return {
        BTC: { price: (data.BTC && data.BTC.price) || 0, rise: (!data.BTC) || (data.BTC.change >= 0), risePercent: (data.BTC && data.BTC.change_daily) || 0 },
        LTC: { price: (data.LTC && data.LTC.price) || 0, rise: (!data.LTC) || (data.LTC.change >= 0), risePercent: (data.LTC && data.LTC.change_daily) || 0 },
        BCH: { price: (data.BCH && data.BCH.price) || 0, rise: (!data.BCH) || (data.BCH.change >= 0), risePercent: (data.BCH && data.BCH.change_daily) || 0 },
        ETH: { price: (data.ETH && data.ETH.price) || 0, rise: (!data.ETH) || (data.ETH.change >= 0), risePercent: (data.ETH && data.ETH.change_daily) || 0 },
        ETC: { price: (data.ETC && data.ETC.price) || 0, rise: (!data.ETC) || (data.ETC.change >= 0), risePercent: (data.ETC && data.ETC.change_daily) || 0 }
      }
    }
  },
  mounted () {
    this.$refs.imgHeight.onload = () => {
      this.kvHeight = this.$refs.imgHeight.offsetHeight + 'px'
    }
    // swiper上下轮播
    let mySwiper = new Swiper('.swiper-container', {
      direction: 'vertical',
      autoplay: 3000,
      loop: false,
      speed: 3000,
      height: 26,
      autoHeight: true,
      noSwiping: true
    })
    mySwiper.init()
  },
  methods: {
    registerBtn () {
      this.$router.push({ name: 'register' })
    },
    USDToCNY (price) {
      if (this.$store.getters.getRate.rates && this.$store.getters.getRate.rates.CNY) {
        return new this.BigNumber(price).multipliedBy(new this.BigNumber(this.$store.getters.getRate.rates.CNY)).toNumber().cut(2)
      } else {
        return price
      }
    },
    skipPc () {
      let skipPc = document.getElementById('skipPc')
      skipPc.href = 'https://8bihui.com/FrequentlyAskedQuestion/' + this.selectLeftType + '/' + this.categoryId + '/' + this.active_Title.id
      skipPc.click()
    }
  },
  created () {
    // 首页开始轮询价格，间隔一分钟
    this.$store.dispatch('syncPrice').then()
    setInterval(() => {
      this.$store.dispatch('syncPrice').then()
    }, 30000)

    // 查询最新公告
    this.$http.get('/api/help/listUI', {
      params: {
        type: 1
      }
    }).then(response => {
      if (response.body.data[0]) {
        this.categoryId = response.body.data[0].categoryId
        this.active_Title = response.body.data[0].helps[0]
      }
    }, response => {
      this.$message.error(response.body.msg)
    })
  }
}
</script>
<style scoped>
  ul li{float: left;list-style: none;position: relative;}
  .home{position: relative;width: 100%;top: 0;left: 0;background-color: #18184C;height: 100%;}
  .homeBox{background-color: #18184C}
  /*kv*/
  .kv{position: relative;width: 100%;top: 0;left: 0;}
  /*公告*/
  .news{background-color: #131345;border-radius: 4px;margin: 2% 0;padding: 2% 0;height: 26px;overflow: hidden;}
  .news .new{position: relative;width: 95%;margin-left: 5%;color: #71719A;font-size: 12px;height: 26px;line-height: 26px;}
  .news .horn{width: 4%;position: absolute;margin-left: 2%;height: auto;top: 32%;
    animation: next 1s 1s infinite ease-in-out;
    -webkit-animation: next 1s 1s infinite ease-in-out;/* Safari and Chrome */
    -moz-animation: next 1s 1s infinite ease-in-out; /* Firefox */
    -o-animation: next 1s 1s infinite ease-in-out; /* Opera */
  }
  @keyframes next{
    0%{opacity:0; }
    100%{opacity:1;}
  }
  @-webkit-keyframes next{
    0%{opacity:0; }
    100%{opacity:1;}
  }
  @-moz-keyframes next{
    0%{opacity:0; }
    100%{opacity:1;}
  }
  @-o-keyframes next{
    0%{opacity:0; }
    100%{opacity:1;}
  }
  /*币率*/
  .blBox{border: 1px solid #1F235E;border-radius: 4px;}
  .blBox .blBox1{position: relative;width: 98%;left: 1%;margin: 1% 0;border-radius: 4px;background-color: #2A2A6A;}
  .blDiv{position: relative;width: 100%;height: 20px;padding: 2% 0;border-bottom: 1px solid #252563;border-top: 1px solid #2F2F74;}
  .font1{position: absolute;text-align: center;line-height: 20px;color: #fff;font-size: 12px;left: 6%;}
  .font2{position: relative;width: 40%;text-align: left;line-height: 20px;left: 30%;font-size: 16px;}
  .upFont{color: #4DB872;}
  .downFont{color: #EF6560;}
  .font3{position: absolute;width: 20%;right: 6%;top: 19%;text-align: center;color: #fff;font-size: 12px;border-radius: 4px;padding: 1% 0;}
  .upDiv{background-color: #4DB872;}
  .downDiv{background-color: #EF6560;}

  .arrowImg{position: absolute;width: 7%;margin-left: 5%;top: 10%;height: 100%;display: inline-block;}
  .upImg{background: url("../assets/images/home/up.png") no-repeat;background-size: contain;}
  .downImg{background: url("../assets/images/home/down.png") no-repeat;background-size: contain;}

  /*立即注册*/
  .publicBtn{position: relative;width: 100%;height: auto;top: 0;left: 0;margin: 3% 0;}
  .publicBtn button{position: relative;background: 0;width: 37%;padding: 1% 1%;top: 0;text-align: center;display: initial;border-radius: 21px;}
  .publicBtn .loginBtn{left: 8%;border:2px solid #56ECFF;}
  .loginBtn a{position: relative;width: 100%;height: 100%;display: block;color: #56ECFF;}
  .publicBtn .registerBox{position: absolute;right: 8%;color: #fff;height: 100%;
    background: -webkit-linear-gradient(left, #19BEFF, #58EDFF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #19BEFF, #58EDFF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #19BEFF, #58EDFF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #19BEFF , #58EDFF); /* 标准的语法 */}

  /*优势*/
  .title{position: relative;width: 100%;color: #56ECFF;font-size: 18px;text-align: center;clear: both;margin: 8% 0;}
  .ysBox{clear: both;}
  .ysBox ul{position: relative;width: 100%;clear: both;}
  .ysBox ul li{position: relative;width: 49%;float: left;margin: 0 1% 1% 0;}
  .ysBox ul .right{float: right;}
  .ys_title{position: absolute;width: 100%;top: 48%;color: #fff;font-size: 16px;text-align: center;}
  .ys_font{position: absolute;width: 80%;top: 68%;color: #7475B2;font-size: 12px;left: 10%;}
  /*关于我们*/
  .aboutBox{clear: both;}
  .aboutBox .qr_code{position: relative;width: 40%;left: 30%;margin: 8% 0 4% 0;border-radius: 4px;}
  .codeFont{position: relative;width: 100%;text-align: center;color: #fff;font-size: 14px;}
  .footer1{background-color: #191542;position: relative;width: 100%;left: 0;padding: 6% 0;}
  .footerLogo{width: 25%;margin-left: 8%;}
  .rightFont{width: 60%;}
  .rightFont p{color: #646E9D;font-size: 12px;text-align: left;}
</style>
