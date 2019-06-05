<template>
  <div id="invite">
    <!--kv-->
    <img src="../assets/images/invite/img1.png" class="imgBg">
    <!--我的邀请码，排行榜 -->
    <div class="imgBg bgImg">
      <div class="w90">
        <img src="../assets/images/invite/img6.png">
        <!--我的邀请码-->
        <div class="poa inviteCode">
          <img src="../assets/images/invite/img4.png">
          <div class="center-float-center poa myCode">我的邀请码</div>
          <div class="center-float-center num">{{inviteCode}}</div>
          <img src="../assets/images/invite/img5.png" class="poa copy center-float-center" v-clipboard:copy="copySrc" v-clipboard:success="handleSuccess" v-clipboard:error="handleError">
        </div>
        <!--邀请人数总收益估价-->
        <ul class="poa ul1">
          <li class="font2"><p class="font1 colorB">{{registeredCount}}</p>邀请人数</li>
          <li class="font2"><p class="font1 colorR">{{Number(rmbNum).cut(2)}}</p>总收益估价</li>
        </ul>
      </div>
      <!--排行榜-->
      <div class="w90 mt5">
        <img src="../assets/images/invite/img7.png">
        <div class="poa phbBox">
          <img src="../assets/images/invite/left.png" class="poa icon left">
          <span class="poa">排行榜</span>
          <img src="../assets/images/invite/right.png" class="poa icon right">
        </div>
        <ul class="poa ul2">
          <li>
            <img src="../assets/images/invite/two.png">
            <img src="../assets/images/invite/headImg.png" class="headImg">
            <div class="poa tel">{{top3List[1] ? (top3List[1].userName ? top3List[1].userName : (top3List[1].userAccount ? top3List[1].userAccount : '' )) : ''}}</div>
            <div class="poa price">¥<span>{{top3List[1] ? (Number(top3List[1].rmbNum).cut(2) || '') : '0'}}</span></div>
          </li>
          <li class="one">
            <img src="../assets/images/invite/one.png" >
            <img src="../assets/images/invite/headImg.png" class="headImg">
            <div class="poa tel">{{top3List[0] ? (top3List[0].userName ? top3List[0].userName : (top3List[0].userAccount
              ? top3List[0].userAccount : '' )) : ''}}</div>
            <div class="poa price">¥<span>{{top3List[0] ? (Number(top3List[0].rmbNum).cut(2) || '') : '0'}}</span></div>
          </li>
          <li>
            <img src="../assets/images/invite/three.png">
            <img src="../assets/images/invite/headImg.png" class="headImg">
            <div class="poa tel">{{top3List[2] ? (top3List[2].userName ? top3List[2].userName : (top3List[2].userAccount ? top3List[2].userAccount : '' )) : ''}}</div>
            <div class="poa price">¥<span>{{top3List[2] ? (Number(top3List[2].rmbNum).cut(2) || '') : '0'}}</span></div>
          </li>
        </ul>
      </div>
    </div>
    <!--马上进群-->
    <div class="imgBg bgImg pt5">
      <div class="w90">
        <img src="../assets/images/invite/img9.png">
        <div class="poa qunBox">
          <img src="../assets/images/invite/group.png" class="poa img1">
          <div class="tbc-tb-scatter middleBox">
            <p class="">Telegram-8bihui用户群</p>
            <p class="font3">拉新技巧和大神交流</p>
          </div>
          <img src="../assets/images/invite/img8.png" class="poa img8" @click="joinGroup">
        </div>
      </div>
    </div>
    <!--活动规则-->
    <div class="imgBg bgImg pt5">
      <div class="w90 ruleBox">
        <div class="colorO title">活动规则</div>
        <div class="w90">
          <div><span class="ruleIndex">1.</span>好友接受邀请并完成注册后，每产生一笔真实交易手续费，您将<span class="colorO">会获得该笔交易手续费的50%作为佣金</span>；佣金=好友实际产生交易量*手续费*50%。</div>
          <div><span class="ruleIndex">2.</span>邀请人可享受长达<span class="colorO">180天的邀请返佣</span>，按照好友实际注册时间计时。</div>
        </div>
      </div>
    </div>
    <!--底部按钮-->
    <div class="btnAll">
      <a class="lj center-float-center" v-on:click="copySrcBtn">链接邀请好友</a>
      <a class="hb center-float-center" v-on:click="posterBtn">专属海报邀请</a>
    </div>
    <!--海报分享-->
    <transition name="el-zoom-in-bottom">
      <div class="pup posterShare" v-if="posterPage" v-loading="loading">
        <!--动效轮播图-->
        <div id="wrap">
          <div id="content4" :class="{'content':!maxWidth,'content1':maxWidth}">
            <img src="../assets/images/invite/bg4.jpg" id="img4">
            <vue-qr :text="copySrc" :size="200" :logoSrc="logoSrc" :margin="0" :whiteMargin="true" class="vueQr"></vue-qr>
          </div>
          <div id="content3" :class="{'content':!maxWidth,'content1':maxWidth}">
            <img src="../assets/images/invite/bg3.jpg" id="img3">
            <vue-qr :text="copySrc" :size="200" :logoSrc="logoSrc" :margin="0" :whiteMargin="true" class="vueQr"></vue-qr>
          </div>
          <div id="content2" :class="{'content':!maxWidth,'content1':maxWidth}">
            <img src="../assets/images/invite/bg2.jpg" id="img2">
            <vue-qr :text="copySrc" :size="200" :logoSrc="logoSrc" :margin="0" :whiteMargin="true" class="vueQr"></vue-qr>
          </div>
          <div id="content1" :class="{'content':!maxWidth,'content1':maxWidth}">
            <img src="../assets/images/invite/bg1.jpg" id="img1"><!--背景图-->
            <vue-qr :text="copySrc" :size="200" :logoSrc="logoSrc" :margin="0" :whiteMargin="true" id="vueQr1" class="vueQr"></vue-qr><!--二维码-->
          </div>
        </div>
        <div class="text" :class="{'textX':isiPhoneX,'':!isiPhoneX}">滑动图片切换样式</div>
        <div class="poa bg-fff bottomBox" :class="{'bottomX':isiPhoneX,'':!isiPhoneX}">
          <div class="poa lineBox tbc-lr-scatter">
            <div class="center-float-center cancelBtn" v-on:click="cancelBtn">取消</div>
            <div class="center-float-center downloadBtn" v-on:click="downloadImg">分享</div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
  name: 'Invite',
  components: { VueQr },
  data () {
    return {
      // 邀请码
      inviteCode: '',
      // 下载地址
      copySrc: window.location.origin + '/mobile/register/',
      // 二维码
      logoSrc: require('../assets/images/invite/logo.png'),
      // 动态轮播图
      contentIds: [
        // 'content6',
        // 'content5',
        'content4',
        'content3',
        'content2',
        'content1'
      ],
      posterPage: false, // 是否出现海报遮罩
      maxWidth: false, // 手机屏宽
      isiPhoneX: false, // 是否是iPhoneX
      top3List: [],
      loading: false,
      registeredCount: 0, // 邀请人数
      rmbNum: 0, // 总收益估价
      account: '' // 电话号码或者邮箱
    }
  },
  created () {
    // 目前仅支持APP加载本页面
    if (this.Native.isHybrid) {
      this.Native.call('setTitle', {
        titleName: '邀请有礼'
      })
      this.Native.call('inviteFriend', {}, data => {
        this.inviteCode = data.inviteCode
        this.rmbNum = data.rmbNum
        this.registeredCount = data.registeredCount
        // 脱敏电话或者邮箱
        if (data.phoneNum) {
          const start = data.phoneNum.substr(0, 3)
          const end = data.phoneNum.substr(7, data.phoneNum.length)
          data.phoneNum = start + '****' + end
        } else {
          data.email = data.email.substr(0, 3) + '****' + data.email.substr(data.email.indexOf('@'))
        }
        this.account = data.phoneNum || data.email
        this.copySrc = this.copySrc + this.inviteCode + '/' + this.account
      })
    } else {
      // this.$router.push({name: 'home'})
    }

    // 轮播图兼容ipad
    if (document.body.clientWidth >= 768) {
      this.maxWidth = true
    }
    // 判断是否是iPhone X
    let u = navigator.userAgent
    let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isIOS) {
      if (screen.height === 812 && screen.width === 375) {
        this.isiPhoneX = true
      } else {
        this.isiPhoneX = false
      }
    }

    // 排行榜
    this.$store.dispatch('encryptConnection', {
      url: '/api/incomeRecord/findTheMontyTopThreeUI',
      data: {}
    }).then(response => {
      if (parseInt(response.body.code) === 200) {
        this.top3List = response.body.data
      } else {
        this.$message.error('排行榜信息获取失败，请刷新重试')
      }
    }, response => {
      this.$message.error('排行榜信息获取失败，请刷新重试')
    })
  },
  methods: {
    // 复制成功
    handleSuccess: function () {
      setTimeout(function () {
        alert('复制成功')
      }, 0)
    },
    // 复制失败
    handleError: function () {
      setTimeout(function () {
        alert('邀请码迷路了，请刷新后再次尝试')
      }, 0)
    },
    // 链接邀请好友
    copySrcBtn () {
      this.Native.call('share', {
        type: '1',
        data: window.location.origin + '/mobile/register/' + this.inviteCode + '/' + this.account,
        shareTitle: '你的好友在币汇交易所交易完成，送给你一个神秘豪礼。',
        shareThumb: require('../assets/data/thumb').content,
        shareDes: '我在币汇-专业的资产交易平台等你，立即领取豪礼。'
      })
    },
    // 海报邀请好友
    posterBtn () {
      this.$store.commit('setShowPup', true)
      this.posterPage = true
      this.loading = true

      const renderInterval = setInterval(() => {
        const wrap = document.getElementById('wrap')
        if (wrap) {
          window.mySwiper(wrap, this.contentIds).then(swipe => {
            this.loading = false
          }, () => {
            this.loading = false
          })
          clearInterval(renderInterval)
        }
      }, 10)
    },
    // 取消关闭海报页面
    cancelBtn () {
      this.posterPage = false
      this.$store.commit('setShowPup', false)
    },
    // 下载
    downloadImg () {
      // 获取当前点击的图片的父级的id
      let imgIndexOn = document.getElementById('wrap').children
      // 最后一个元素的id
      let imgId = imgIndexOn[imgIndexOn.length - 1].id
      let content = document.getElementById(imgId)

      // 创建画布
      let canvas = document.createElement('canvas')
      canvas.width = 750
      canvas.height = 1334
      const ctx = canvas.getContext('2d')
      // 二维码宽高
      const codeWH = canvas.width / 3

      // 绘制背景图片
      let backgroundImage = document.getElementById(content.children[0].id)
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

      // 给二维码加一个矩形背景   context.strokeRect(x,y,width,height);
      ctx.lineJoin = 'round'
      ctx.lineWidth = 10
      ctx.fillStyle = '#FFF'
      ctx.strokeStyle = '#FFF'
      ctx.strokeRect((canvas.width - codeWH) / 2, (canvas.height / 1.45), codeWH, codeWH)
      ctx.fillRect((canvas.width - codeWH) / 2, (canvas.height / 1.45), codeWH, codeWH)

      // 二维码  ctx.drawImage(img, x, y, 图片宽, 图片高)
      let qr = document.getElementById('vueQr1').firstChild
      ctx.drawImage(qr, (canvas.width - codeWH) / 2, (canvas.height / 1.45), codeWH, codeWH)
      ctx.save()

      // 判断是否有生成的图片,销毁重新设置
      // let newCanvasId = document.getElementById('newCanvas' + content.children[0].id)
      // if (newCanvasId) {
      //   content.removeChild(newCanvasId)
      // }

      // 转成新图片
      // const newImgSrc = document.createElement('img')
      // newImgSrc.style.display = 'none'
      // newImgSrc.src = canvas.toDataURL('image/jpeg', 1.0)
      //
      // let idName = document.createAttribute('id')
      // idName.value = 'newCanvas' + content.children[0].id
      // newImgSrc.setAttributeNode(idName)
      // content.appendChild(newImgSrc)

      this.Native.call('share', {
        type: '2',
        data: canvas.toDataURL('image/jpeg', 1.0).split(',')[1]
      })
    },
    // 马上进群
    joinGroup () {
      this.Native.call('openTelegram', {
        telegramNum: 'https://t.me/bihui8'
      })
    }
  }
}
</script>

<style scoped>
  ul li{float: left;list-style: none;position: relative;}
  #invite{background-color: #150A57;}
  /*邀请码*/
  .bgImg{background: url("../assets/images/invite/img2.png") 100% 100%;background-size: 100%;}
  .inviteCode{width: 70%;top: 6%;left: 15%;}
  .inviteCode .myCode{top: 0;left: 0;color: #fff;font-size: 14px;width: 39%;text-align: center;font-weight: 400;height: 100%;}

  .inviteCode .num{position: absolute;top: 0;left: 41%;color: #FFC30D;font-size: 14px;width: 46%;text-align: center;font-weight: bold;height: 100%;}
  .copy{width: 6%;left: 89%;top: 30%;}
  .ul1{width: 100%;top:40%;left: 0;bottom: 0;}
  .ul1 li{position: relative;width: 50%;text-align: center;}
  .ul1 li p{font-weight: bold;margin: 8% 0;}

  /*排行榜*/
  .ul2{width: 100%;bottom:0;height: 80%;top:auto;}
  .ul2 li{position: relative;width: 33%;height: 100%;}
  .ul2 li img{position: absolute;width: 50%;left: 25%;bottom: 39%;top:auto;}
  .ul2 .one img{width: 60%;left: 20%;}
  .ul2 li .headImg{width: 46%;border-radius: 50%;left: 27%;top: 23.8%;}
  .ul2 .one .headImg{width: 55%;border-radius: 50%;left: 22%;top: 16%;}
  .tel{color: #333;font-size: 12px;width: 100%;text-align: center;bottom: 22%;top: auto;}
  .price{color: #F83224;font-size: 12px;font-weight: bold;bottom: 8%;top: auto;text-align: center;width: 100%;}
  .price span{font-size: 15px;}
  .phbBox{top: 3%;width: 34%;left: 33%;height: 18%;}
  .icon{width: 14%;top: 20%;}
  .phbBox .left{left: 10%;}
  .phbBox .right{right: 10%;left: auto;}
  .phbBox span{color: #538CFF;font-size: 14px;font-weight: bold;width: 50%;left: 25%;text-align: center;}

  /*进群*/
  .qunBox{width: 100%;height: 100%;top: 0;left: 0;}
  .img1{width: 18%;left: 4%;border-radius: 10px;top: 14%;}

  .qunBox .font3{top:36%;color: #005CF4;font-size: 12px;}
  .img8{width: 20%;right: 4%;left: auto;top: 36%;}
  .middleBox{position: absolute;width: 50%;left: 25%;height: 100%;}
  .middleBox p{width: 100%;text-align: left;color: #333;font-size: 14px;font-weight: 400;}

  /*规则*/
  .ruleBox{color: #5C99FE;font-size: 12px;text-align: left;font-weight: 400;line-height: 150%;padding-bottom: 25%;}
  .title{font-size: 14px;margin: 2% 0;font-weight: 500;}
  .colorO{color: #E0AD10;}
  .colorB{color: #005CF4;}
  .colorR{color: #F83224;}
  .font1{font-size: 20px;text-align: center;}
  .font2{font-size: 14px;color: #333;}
  .ruleIndex{position: absolute;left: -6%;}

  /*底部按钮*/
  .btnAll{position: fixed;width: 100%;height:8%;margin: 0 auto;color: #fff;background-color: #000;bottom: 0;
    z-index: 111;top: auto;font-weight: 400;}
  .btnAll a{position: absolute;width: 45%;height: 70%;top:15%;display: flex;text-align: center;}
  .lj{background-color: #2C95D8;left: 5%;border-radius:40px 0 0 40px;}
  .hb{background-color: #22279F;right: 5%;border-radius:0 40px 40px 0;}

  /*链接邀请好友*/
  .pup{position: fixed;width: 100%;height: 100%;z-index: 1111;top: 0;left: 0;}

  /*海报分享*/
  .posterShare{background-color: #fff;animation-delay: 1s;}

  /*轮播图*/
  #wrap {width: 100%;height: 100%;position: relative;overflow: hidden;top: 0;z-index: 11;}
  /*js中图片是手机屏幕的一半*/
  .content {width: 50%;position: absolute;margin: auto;top: 22%;left: 0;right: 0;}
  .content1 {width: 40%;position: absolute;margin: auto;top: 22%;left: 0;right: 0;}
  .content img,.content1 img{position: relative;width:100%;display: block;}
  .posterShare .bottomX{bottom: 80px;}

  .bottomBox{height: 10%;bottom: 0;top: auto;z-index: 1111;width: 100%;}
  .lineBox{height: 100%;font-size: 13px;border-top: 1px solid #ebebeb;width: 90%;left: 5%;}
  .lineBox div{position: absolute;width: 44%;text-align: center;height: 60%;font-size: 17px;border-radius: 24px;}
  .cancelBtn{left: 4%;border: 1px solid #CCC;color: #999;}
  .downloadBtn{right: 4%;color: #fff;background-color: #005CF4;border: 1px solid #005CF4;}

  /*二维码*/
  .vueQr{position: absolute;width: 36%;top: 68%;left: 32%;}
  .text{position: absolute;width: 100%;color: #999;text-align: center;font-size: 13px;bottom: 14%;}
  .posterShare .textX{bottom: 24%;}
  .pubBtn img{position: relative;width: 50%;margin: 0 auto;}

  /*隐藏不显示*/
  .hide{display: none;}

  /*遮罩层淡入淡出动画*/
  .fade-in {
    -webkit-animation: fade-in 400ms forwards;
    -o-animation: fade-in 400ms forwards;
    animation: fade-in 400ms forwards;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
      -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    }
    to {
      opacity: 0.4;
      -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
    }
  }
  .fade-out {
    -webkit-animation: fade-out 400ms forwards;
    -o-animation: fade-out 400ms forwards;
    animation: fade-out 400ms forwards;
  }
  @keyframes fade-out {
    from {
      opacity: 0.4;
      -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=40);
    }
    to {
      opacity: 0;
      -ms-filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
    }
  }
  /*弹出向上滑动动画*/
  .zoom-in-bottom {
    -webkit-animation: zoom-in-bottom 400ms forwards;
    -o-animation: zoom-in-bottom 400ms forwards;
    animation: zoom-in-bottom 400ms forwards;
  }
  @keyframes zoom-in-bottom {
    from {
      -webkit-transform: translate(0, 100%);
      -moz-transform: translate(0, 100%);
      -ms-transform: translate(0, 100%);
      -o-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
    to {
      -webkit-transform: translate(0, 0);
      -moz-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      -o-transform: translate(0, 0);
      transform: translate(0, 0);
    }
  }
  .zoom-out-bottom {
    -webkit-animation: zoom-out-bottom 400ms forwards;
    -o-animation: zoom-out-bottom 400ms forwards;
    animation: zoom-out-bottom 400ms forwards;
  }
  @keyframes zoom-out-bottom {
    from {
      -webkit-transform: translate(0, 0);
      -moz-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      -o-transform: translate(0, 0);
      transform: translate(0, 0);
    }
    to {
      -webkit-transform: translate(0, 100%);
      -moz-transform: translate(0, 100%);
      -ms-transform: translate(0, 100%);
      -o-transform: translate(0, 100%);
      transform: translate(0, 100%);
    }
  }
</style>
