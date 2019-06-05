<template>
  <div id="inviteRegister">
    <!--kv-->
    <img src="../assets/images/invite/imgBg.png">
    <!--content-->
    <div class="poa reBox">
      <img src="../assets/images/invite/img10.png">
      <div class="poa font1 fontLine">
        您的好友 {{account}}
        <div class="font2">邀请您领取大礼包</div>
      </div>
      <input type="text" placeholder="请输入领取手机号码" class="poa input tel" maxlength="11" v-model="telValue">
      <button class="poa input clickBtn" @click="clickBtn">领取礼包</button>
    </div>
    <!--遮罩页面-->
    <div class="pup" v-if="isShowPage">
      <div class="poa black"></div>
      <div class="poa con">
        <img src="../assets/images/invite/img11.png">
        <div class="poa title">邀请好友注册 <span>持续返现</span></div>
        <img src="../assets/images/invite/close.png" class="poa close" @click="closeBtn">
        <div class="poa codeBox codeBox1">
          <input type="text" placeholder="请输入短信验证码" class="code" maxlength="6" v-model="telCodeValue">
          <button class="sendCode" @click="sendCodeBtn" :class="{sendCodeT:getCodeBtn,sendCodeF:!getCodeBtn}">{{sendCodeText}}</button>
        </div>
        <div class="poa codeBox codeBox2">
          <input type="password" placeholder="请设置6-20位登录密码" class="code1" maxlength="20" v-model="passwordValue">
        </div>
        <div class="poa codeBox codeBox3 center-float-left">
          <div class="code2 mr5">邀请码：</div>
          <input type="text" maxlength="10" v-model="inviteCodeValue" class="code2">
        </div>
        <a class="poa btnBg">
          <img src="../assets/images/invite/btnBg.png">
          <button class="poa receiveBtn" @click="receiveBtn">立即领取</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InviteRegister',
  data () {
    return {
      isShowPage: false,
      // 手机号码格式校验正则
      telephoneRegExp: new RegExp(`^[0-9]{11}$`),
      // 验证码格式校验正则
      captchaRegExp: new RegExp('^[a-zA-Z0-9]{4,6}$'),
      // 密码格式校验正则
      passwordsRegExp: new RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$`),
      // 开关
      getCodeBtn: true,
      getReceiveBtn: true,
      // 验证码时间
      countTime: 60,
      sendCodeText: '发送验证码',
      // 国家区号(默认)
      iTelCode: '0086',
      // v-model绑定到的值
      telValue: '',
      telCodeValue: '',
      passwordValue: '',
      inviteCodeValue: '',
      account: ''
    }
  },
  created () {
    // 获取邀请码
    const code = this.$route.params.code
    const account = this.$route.params.account
    if (code) {
      this.inviteCodeValue = code
    }
    // 获取电话或邮箱
    if (account) {
      this.account = account
    }
  },
  methods: {
    // 领取礼包
    clickBtn () {
      // 校验手机格式是否正确
      if (this.telValue === '' || this.telValue.replace(/\s+/g, '').length === 0 || isNaN(this.telValue)) {
        this.$message.error('手机号码不能为空')
        return false
      }
      if (!this.telephoneRegExp.test(this.telValue)) {
        this.$message.error('手机号码不正确')
        return false
      }
      // 判断手机号码是否重复
      this.$store.dispatch('encryptConnection', {
        url: '/api/userinfo/findByTelephoneUI',
        data: {
          telephone: this.telValue
        }
      }).then(response => {
        if (parseInt(response.body.code) === 200) {
          if (response.body.data.isExist) {
            this.$message.error('账号已存在')
            // 已注册也跳转下载页面
            this.$router.push({
              name: 'download'
            })
          } else {
            this.isShowPage = true
          }
        } else {
          this.$message.error('账号已存在')
          // 已注册也跳转下载页面
          this.$router.push({
            name: 'download'
          })
        }
      }, response => {
        this.$message.error('获取失败')
      })
    },
    // 关闭
    closeBtn () {
      this.isShowPage = false
    },

    // 发送验证码
    sendCodeBtn () {
      if (this.getCodeBtn) {
        this.getCodeBtn = false
        // 获取手机验证码接口
        this.$store.dispatch('encryptConnectionSSO', {
          url: '/api/sso/message/send',
          data: {
            telephone: this.telValue,
            countryCode: this.iTelCode,
            index: '0', // 0注册 1修改登录密码 2密码找回 3更改手机号(原手机)  4更改手机号(新手机)
            source: '2' // 1 飞梭 2 币汇
          }
        }).then(response => {
          if (parseInt(response.body.code) === 200) {
            this.getCountTime(this.countTime)
          } else if (response.body.code === 'E0807') {
            this.$message.error('短信发送过于频繁')
            this.getCodeBtn = true
          } else {
            this.$message.error(response.body.message)
            this.getCodeBtn = true
          }
        }, response => {
          this.$message.error('短信发送失败')
          this.getCodeBtn = true
        })
      }
    },
    // 计时
    getCountTime (_countTime) {
      let time = ''
      this.sendCodeText = '重新获取(' + _countTime + ')'
      if (_countTime > 0) {
        _countTime--
        time = setTimeout(() => {
          this.getCountTime(_countTime)
        }, 1000)
      } else {
        this.sendCodeText = '发送验证码'
        clearTimeout(time)
        this.getCodeBtn = true
      }
    },
    // 立即领取
    receiveBtn () {
      // 校验验证码
      if (this.telCodeValue === '' || this.telCodeValue.replace(/\s+/g, '').length === 0 || isNaN(this.telCodeValue)) {
        this.$message.error('请输入验证码')
        return false
      }
      if (!this.captchaRegExp.test(this.telCodeValue)) {
        this.$message.error('验证码格式错误')
        return false
      }
      // 校验密码
      if (this.passwordValue === '') {
        this.$message.error('请输入密码')
        return false
      }
      if (this.passwordValue.length < 6 || !this.passwordsRegExp.test(this.passwordValue)) {
        this.$message.error('密码格式为8-16位英文数字组合')
        return false
      }
      if (this.getReceiveBtn) {
        this.getReceiveBtn = false
        // 校验邀请码是否存在
        this.$http.post('/api/userinfo/inviteeCodeIsExistUI', {
          inviteeCode: this.inviteCodeValue
        }).then(function (res) {
          if (parseInt(res.body.code) === 200) {
            if (res.body.data === true) {
              // 注册接口
              this.$store.dispatch('encryptConnectionSSO', {
                url: '/api/sso/user/register',
                data: {
                  uTelephone: this.telValue,
                  uPassword: this.passwordValue, // 密码
                  uInvCode: this.inviteCodeValue, // 邀请码
                  source: 2, // 1 飞梭用户 2 币汇用户
                  email: '',
                  countryCode: this.iTelCode, // 国家区号
                  telephoneCode: this.telCodeValue, // 手机验证码
                  emailCode: '', // 邮箱验证码
                  type: 0 // 飞梭用户注册的话 1 第三方注册 0 正常手机号注册
                }
              }).then(response => {
                if (parseInt(response.body.code) === 200) {
                  this.getReceiveBtn = true
                  // 成功领取跳转下载页面
                  this.$router.push({
                    name: 'download'
                  })
                } else {
                  this.$message.error('注册失败')
                  this.getReceiveBtn = true
                }
              }, response => {
                this.$message.error('注册失败')
                this.getReceiveBtn = true
              })
            } else {
              this.$message.error('邀请码不存在,请重新确认')
              this.getReceiveBtn = true
            }
          } else {
            // 查询失败
            this.$message.error('邀请码不正确,请重新确认')
            this.getReceiveBtn = true
          }
        }, function () {
          this.$message.error('校验邀请码失败')
          this.getReceiveBtn = true
        })
      }
    }
  }
}
</script>

<style scoped>
  ul li{float: left;list-style: none;position: relative;}
  #inviteRegister{background-color: #6800A9;position: absolute;width: 100%;height: 100%;top: 0;left: 0;}

  /*content*/
  .reBox{width: 90%;left: 5%;top: 55%;}
  .font1{font-size: 18px;color: #333;font-weight: 600;width: 68%;text-align: center;top: 6%;left: 16%;}
  .font2{font-size: 14px;color: #333;font-weight: 400;width: 100%;text-align: center;margin-top: 2%;}
  .input{width: 88%;left: 6%;height: 16%;text-align: center;border-radius: 24px;font-size: 16px;font-weight: 400;box-sizing: border-box}
  .tel{border: 1px solid #D1D1D1;background: 0;top: 43%;color: #000;}
  .clickBtn{background-color: #005CF4;top:67%;border: 0;color: #fff;}

  /*遮罩层*/
  .pup{position: fixed;height: 100%;z-index: 11;top: 0;width: 100%;}
  .black{background-color: #000;opacity: 0.6;height: 100%;}
  .con{width: 90%;left: 5%;top:6%;}
  .title{font-size: 18px;color: #000;font-weight: 400;width: 60%;text-align: center;top: 22%;left: 20%;}
  .title span{color: #EA7606;}
  .close{width: 7%;top: 22%;left: 82%;}
  .codeBox{width: 80%;height: 8%;left: 10%;}
  .codeBox1{top: 31%;border-bottom: 1px solid #EFEFEF;}
  .codeBox2{top:40%;border-bottom: 1px solid #EFEFEF;}
  .codeBox3{top:49%;}
  .pup input{border: 0;height: 88%;width: 100%;position: relative;font-size: 15px;color: #000;}
  .pup input::-webkit-input-placeholder {color: #999;}

  .pup .sendCode{border: 0;height: 88%;font-size: 13px;color: #fff;border-radius: 4px;float: right;width: 36%;padding: 0;}
  .pup .sendCodeT{background-color: #0084F9;color: #fff;}
  .pup .sendCodeF{background-color: #EDEDEE;color: #999;}

  .pup .code{width: 62%;float: left;}
  .pup .code2{color: #B3B3B3;font-size: 13px;}
  .btnBg{width: 70%;left: 15%;top: 80%;display: flex;}
  .btnBg img{height: 100%;}
  .btnBg .receiveBtn{height: 100%;-ms-flex-item-align: center;align-self: center;width: 100%;background: 0;border: 0;top: -4%;color: #AB5211;font-size: 17px;}
</style>
