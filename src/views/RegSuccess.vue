<template>
  <div class="regSuccess">
    <!--通用头部-->
    <header-public></header-public>
    <!--content-->
    <div class="regSuccessBox">
      <div class="logoBox">
        <img src="../assets/images/register/successLogo.png" class="successLogo">
        <p class="reg_font">恭喜您，注册成功！</p>
      </div>
      <a class="returnHome" href="/pc/login">
        <img src="../assets/images/home/registerBtn.png">
        <div class="center-float-center returnHomeBtn">返回登录</div>
      </a>
      <div class="w90 footer_font">
        <p class="font1">币汇移动端功能暂不完善，请您移步到币汇PC端网站(https://www.8bihui.com）访问，体验完整的功能。我们即将更新版本，敬请期待！</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderPublic from '../components/HeaderPublic'
export default {
  name: 'RegSuccess',
  components: { HeaderPublic }
}
</script>

<style scoped>
  .regSuccess{position: relative;width: 100%;top: 0;left: 0;background-color: #18184C;height: 100%;}
  .regSuccessBox{position: absolute;width: 100%;top: 0;left: 0;height: 100%;}
  .logoBox{position: absolute;width: 100%;top:28%;left: 0;}
  .successLogo{position: relative;width: 26%;top:28%;left: 37%;}
  .reg_font{position: relative;color: #fff;font-size: 16px;width: 100%;text-align: center;margin-top: 4%;}
  .returnHome{position: absolute;top: 60%;width: 60%;left: 20%;}
  .returnHomeBtn{position: absolute;color: #fff;top: 0;text-align: center;width: 100%;height: 100%;font-size: 16px;}
  .footer_font{color: #646E9D;font-size: 12px;top: 76%;background-color: #191542;position: absolute;}
  .font1{padding: 5%;}
</style>
