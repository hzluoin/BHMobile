<template>
  <div class="headerBox">
    <div class="headLogo"><img src="../assets/images/public/headLogo.png"></div>
    <div class="headTitle">币汇 - 专业的数字货币交易平台</div>
  </div>
</template>

<script>
export default {
  name: 'HeaderPublic'
}
</script>

<style scoped>
  /*ipad*/
  @media (min-width: 768px) {
    .headerBox{position: relative;width: 100%;height: 150px;background-color: #18184C;top:0;left: 0;background: url("../assets/images/public/headBg.png") repeat;}
    .headLogo{position: absolute;width: 22%;left: 39%;top: 16%;}
    .headLogo img{position: relative;width: 100%;display: block;}
    .headTitle{position: absolute;width: 100%;color: #fff;font-size: 14px;text-align: center;top: 75%;}
  }
  /*手机端*/
  @media (max-width: 767px){
    .headerBox{position: relative;width: 100%;height: 130px;background-color: #18184C;top:0;left: 0;background: url("../assets/images/public/headBg.png") repeat;}
    .headLogo{position: absolute;width: 28%;left: 34%;top: 16%;}
    .headLogo img{position: relative;width: 100%;display: block;}
    .headTitle{position: absolute;width: 100%;color: #fff;font-size: 14px;text-align: center;top: 68%;}
  }
</style>
