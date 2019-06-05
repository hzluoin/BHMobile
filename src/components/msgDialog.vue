<template>
  <!--提示信息-->
  <div class="alertPrompt" :visible="msgShow">
    <div class="black"></div>
    <div class="center-float-center h100">{{msg}}</div>
  </div>
</template>

<script>
export default {
  name: 'msgDialog',
  props: {
    msgShow: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  /*提示*/
  .alertPrompt{position: fixed;width: 60%;height: 10%;top: 40%;left: 20%;z-index: 11111111111;border-radius: 2px;color: #fff;font-size: 14px;text-align: center;}
  .alertPrompt .black{position: absolute;width: 100%;height: 100%;top: 0;left: 0;background-color: #000;opacity: 0.8;-ms-filter: alpha(opacity= 80);filter: alpha(opacity= 80);}
</style>
