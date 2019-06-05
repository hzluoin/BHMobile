<template>
  <div id="app" :class="{'overflow_hidden':this.$store.getters.getShowPup,'':!this.$store.getters.getShowPup}">
    <router-view v-wechat-title="getTitle"/>
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    getTitle () {
      const messages = this.$i18n.messages
      const locale = this.$i18n.locale
      return messages[locale].title.Description
    }
  },
  mounted () {
    // 开启友盟统计
    if (process.env.NODE_ENV !== 'development') {
      var cnzzProtocol = ((document.location.protocol === 'https:') ? ' https://' : ' http://')
      document.write(unescape("%3Cspan id='cnzz_stat_icon_1274113368'%3E%3C/span%3E%3Cscript src='" + cnzzProtocol + "s19.cnzz.com/z_stat.php%3Fid%3D1274113368%26show%3Dpic' type='text/javascript'%3E%3C/script%3E"))
    }
  }
}
</script>
<style>
  #app{position: relative;width: 100%;height: 100%;top: 0;left: 0;background-color: #18184C;}
  .overflow_hidden{overflow: hidden;}
</style>
