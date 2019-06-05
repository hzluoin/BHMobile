<template>
  <div class="rule">
    <div class="ruleBox pt5 pb5">
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img8.png">
      <div class="fontAll">
        <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/closeBtn.png" id="closeBtn" @click="closeBtn">
        <section v-if="ruleList.qualification">
          <span class="title">一、参与资格</span>
          <div>{{ruleList.qualification}}</div>
        </section>
        <section v-if="ruleList.startDate && ruleList.endDate">
          <span class="title">二、活动时间</span>
          <div class="font1">{{new Date(ruleList.startDate).format('yyyy年MM月dd日')}}-{{new Date(ruleList.endDate).format('yyyy年MM月dd日')}}</div>
        </section>
        <section v-if="ruleList.rule1">
          <span class="title">三、活动规则</span>
          <ul class="ulFont">
            <li v-if="ruleList.rule1">
              <span class="circle">1</span>
              <div class="font2">{{ruleList.rule1}}<br/>{{ruleList.rule2}}</div>
            </li>
            <li v-if="ruleList.rule3">
              <span class="circle">2</span>
              <div class="font2">{{ruleList.rule3}}<br/>{{ruleList.rule4}}</div>
            </li>
            <li v-if="ruleList.rule5">
              <span class="circle">3</span>
              <div class="font2">{{ruleList.rule5}}<br/>{{ruleList.rule6}}</div>
            </li>
            <li v-if="ruleList.rule7">
              <span class="circle">4</span>
              <div class="font2">{{ruleList.rule7}}<br/>{{ruleList.rule8}}</div>
            </li>
            <li v-if="ruleList.rule9">
              <span class="circle">5</span>
              <div class="font2">{{ruleList.rule9}}<br/>{{ruleList.rule10}}</div>
            </li>
            <li v-if="ruleList.rule11">
              <span class="circle">6</span>
              <div class="font2">{{ruleList.rule11}}<br/>{{ruleList.rule12}}</div>
            </li>
          </ul>
        </section>
        <!--btn-->
        <div class="closeBtn1" @click="closeBtn">
          <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/btnBg.png">
          <div class="center-float-center poa h100">已阅读</div>
        </div>
      </div>
      <img src="https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img10.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Rule',
  data () {
    return {
      ruleList: {}
    }
  },
  created () {
    this.Native.setJavascriptFunc('goBack', () => {
      this.$router.push({name: 'guessIndex'})
    })
    const currency = this.$route.params.currency
    // 查询活动规则
    this.$http.post('/api/guessActivity/selectByCurrencyActivityUI?currency=' + currency).then(res => {
      this.ruleList = res.body.data[0]
    }, res => {
      this.$message.error(res.body.msg)
    })
  },
  methods: {
    closeBtn () {
      this.$router.push({ name: 'guessIndex' })
    }
  }
}
</script>

<style scoped>
  .rule{background-color: #22077f;width: 100%;position: relative;height: auto;}
  .ruleBox{position: relative;width: 90%;left: 5%;height: 90%;color: #E4E3F3;font-size: 14px;}
  .fontAll{background: url("https://8bihui-mobile-webapp.oss-cn-beijing.aliyuncs.com/images/guessGame/img9.png") repeat;padding: 4% 5%;}
  .fontAll div,.fontAll span,.fontAll li{padding: 2% 0;margin: 4% 0;}
  .fontAll span{padding: 2% 2%;}
  .title{background-color: #2b15a0;border-radius: 5px;}
  .font1{color: #FFD200;}
  .ulFont p{margin-bottom: 5%;}
  .ulFont .circle{background-color: #FFD40D;width: 15px;height: 15px;color: #3420BE;font-size: 14px;
    margin: 0;padding: 0;position: absolute;border-radius: 100%;line-height: 16px;text-align: center;}
  .ulFont .font2{position: relative;margin: 0 0 0 20px;padding: 0;}
  #closeBtn{position: absolute;width: 10%;right: 2%;top: 0;left: auto;}
  .fontAll .closeBtn1{position: relative;width: 34%;left: 33%;bottom: 0;padding: 0;margin: 0;}
  .fontAll .closeBtn1 div{padding: 0;margin: 0;}
</style>
