<template>
  <div id="download">
    <!--微信打开提示-->
    <div v-if="isWX" class="guide">
      <p>币汇</p>
      <p>请点击右上角，在<span>浏览器</span>打开该页面</p>
      <img src="../assets/images/download/WechatIMG8.png" class="arrow">
    </div>
    <img src="../assets/images/download/img1.png">
    <div>
      <img src="../assets/images/download/img2.png">
      <button class="poa downloadBtn btn1" @click="refs.download.click()">
        <a :href="url" class="center-float-center" v-show="loaded">立即下载</a>
      </button>
    </div>
    <img src="../assets/images/download/img3.png">
    <img src="../assets/images/download/img4.png">
    <div>
      <img src="../assets/images/download/img5.png">
      <button class="poa downloadBtn btn2" @click="refs.download.click()">
        <a :href="url" ref="download" class="center-float-center" v-show="loaded">立即下载</a>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Download',
  data () {
    return {
      url: '/download/ios',
      isWX: false,
      loaded: false
    }
  },
  methods: {
    download () {
      this.$http.get(this.url)
    }
  },
  created () {
    const agent = navigator.userAgent.toLowerCase()
    // 微信浏览器
    if (/MicroMessenger/i.test(agent)) {
      this.isWX = true
    } else {
      let type = 3
      if (/(Android)/i.test(navigator.userAgent)) {
        type = 3
        this.url = 'https://feisuo-apk-source.oss-cn-hongkong.aliyuncs.com/feisuo_apk_download/20190112/BiHui-v1.0.apk'
      } else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        type = 4
        this.url = 'itms-services://?action=download-manifest&amp;url=https://feisuo-apk-source.oss-cn-hongkong.aliyuncs.com/feisuo_apk_download/20181229/feisuo.plist'
      }
      this.$http.post('/api/feisuo/systemVersion/findAllVersion', {
        type: type
      }).then(response => {
        const data = response.body.data[0]
        if (data) {
          this.url = data['installUrl']
        }
        this.loaded = true
      }, response => {
        this.loaded = true
      })
    }
  }
}
</script>

<style scoped>
  .downloadBtn{width: 70%;border-radius: 21px;border:1px solid #fff;left: 15%;background: 0;position: absolute;}
  .downloadBtn a{color: #fff;font-size: 16px;font-weight: 500;text-align: center;position: absolute;width: 100%;height:100%;top: 0;left: 0;}

  .download img,.download div{position: relative;width: 100%;top: 0;left: 0;}
  .btn1{top: 1%;height: 10%;}
  .btn2{top:78%;background-color: #fff;height: 8%;}
  .btn2 a{color: #0085F8;}

  .guide {width: 100%;height: 100%;background-color: #000;opacity: 0.8;position: fixed;top: 0;-webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;box-sizing: border-box;z-index: 11;}
  .guide .arrow {width: 32%;position: absolute;top: 0;right: 0;left: auto;}
  .guide p {position: relative;text-align: center;color: #fff;width: 100%;}
  .guide :first-child {margin-top: 48%;font-size: 24px;}
  .guide span {color: #D3BF4D;}
</style>
