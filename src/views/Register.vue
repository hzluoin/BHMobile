<template>
  <div class="register">
    <!--通用头部-->
    <header-public></header-public>
    <!--content-->
    <div class="content">
      <div class="registerBox">
        <!--按钮 0手机验证 1邮箱验证-->
        <div class="tbc-lr-scatter re_Btn">
          <button @click="reBtn(0)">
            <div :class="{color_w:onClick === 1,color_b:onClick === 0}">手机注册</div>
            <img :class="{hideImg:onClick === 1,showImg:onClick === 0}" src="../assets/images/register/arrow.png" class="arrow">
          </button>
          <button @click="reBtn(1)">
            <div :class="{color_w:onClick === 0,color_b:onClick === 1}">邮箱注册</div>
            <img :class="{hideImg:onClick === 0,showImg:onClick === 1}" src="../assets/images/register/arrow.png" class="arrow">
          </button>
        </div>
        <!--手机注册,邮箱注册-->
        <div class="phoneRe">
          <!--国际区号-->
          <div class="line1" v-if="onClick === 0">
            <el-select v-model="iTelCodeValue" placeholder="请选择" id="country">
              <el-option
                v-for="item in iTelCodeOptions"
                :key="item.label"
                :label="'+'+item.value+item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!--手机号码-->
          <div class="line" v-if="onClick === 0">
            <input type="text" placeholder="请输入您的手机号码" id="tel" maxlength="11" v-model="telValue"/>
          </div>
          <!--手机验证码-->
          <div class="line telCode tbc-lr-scatter" v-if="onClick === 0">
            <input type="text" placeholder="请输入手机验证码" id="telCode" maxlength="6" v-model="telCodeValue"/>
            <button class="getCode tbc-lr-scatter" @click="getTelCode">{{getCodeText}}</button>
          </div>
          <!--个人邮箱-->
          <div class="line" v-if="onClick === 1">
            <input type="text" placeholder="请输入您的个人邮箱" id="email" v-model="emailValue"/>
          </div>
          <!--邮箱验证码-->
          <div class="line tbc-lr-scatter" v-if="onClick === 1">
            <input type="text" placeholder="请输入邮箱验证码" id="emailCode" maxlength="6" v-model="emailCodeValue"/>
            <button class="getCode1 tbc-lr-scatter" @click="getEmailCode">{{getCodeText1}}</button>
          </div>
          <!--密码-->
          <div class="line">
            <input type="password" placeholder="密码、8-20位英文数字组合" id="password" maxlength="20" minlength="8" v-model="passwordValue"/>
          </div>
          <div class="line">
            <input type="password" placeholder="再次确认密码" id="confirmPass" maxlength="20" minlength="8" v-model="confirmPassValue"/>
          </div>
          <div class="center-float-left rule">
            <input id="checkBtn" type="checkbox" v-model="ruleValue"/>
            <label for="checkBtn" class="checkBtn" @click="checkBtn">
              <img src="../assets/images/register/check_no.png"/>
              <img src="../assets/images/register/check_yes.png"/>
            </label>
            我已阅读并同意<span @click="ruleShowBtn">《网络服务协议》</span>
          </div>
          <button class="tbc-lr-scatter ljzcBtn" @click="registerBtn">
            <img src="../assets/images/home/registerBtn.png">
            <div class="registerBtn tbc-lr-scatter">立即注册</div>
          </button>
          <a class="tbc-lr-scatter ljdlBtn" href="/pc/login">立即登录</a>
        </div>
      </div>
    </div>
    <!--通用底部-->
    <footer-public></footer-public>
    <!--网络服务协议-->
    <div class="pupcon" v-if="ruleShow">
      <div class="black"></div>
      <div class="pup">
        <a class="closeBtn" @click="closeBtn"><img src="../assets/images/register/closeBtn.png"></a>
        <p class="pupTitle">网络服务协议</p>
        <div class="fontBox">
          <p>币汇网络服务协议是由币汇团队与币汇用户就币汇网的各项服务所製定的相关权利义务规范。 币汇的运营者依据本协议为用户提供服务。
            用户访问或使用本网站，即表示已接受并同意本协议的所有条件和条款，同意将其作为确定双方权利义务的依据；不愿接受本协议的，不得访问或使用本网站。
            本协议不涉及币汇用户与其他用户之间因数字货币交易而产生的法律关系及法律纠纷。</p>
          <p>注意：本网站所有内容，为便利用户，可能提供多个语言版本，若有冲突或遗漏等情况，以中文内容为准。币汇有权对本协议进行修改，请用户定期查看本协议。</p>
          <p>重要提示：</p>
          <p>我们在此特别提醒您：</p>
          <p>1 数字资产市场是全新的、未经确认的，而且可能不会增长；</p>
          <p>2 数字资产主要由投机者大量使用，零售和商业市场使用相对较少，数字资产交易存在极高风险，其全天不间断交易，没有涨跌限制，价格容易受庄家、全球政府政策的影响而大幅波动；</p>
          <p>3 因各国法律、法规和规范性文件的制定或者修改，数字资产交易随时可能被暂停或被禁止。</p>
          <p>服務內容</p>
          <p>1.币汇运用自己的系统，通过互联网等方式为用户提供数字货币交易服务。</p>
          <p>2.用户提供的注册资料，用户同意：</p>
          <p>（1）提供合法、真实、准确的个人资料；</p>
          <p>（2）如有变动，及时更新用户资料。如果用户提供的注册资料不合法、不真实、不淮确的，用户需承担因此引起的相应责任及后果，并且币汇保留终止用户使用币汇各项服务的权利。</p>
          <p>服务的提供、修改及终止</p>
          <p>1.用户在接受币汇各项服务的同时，同意接受币汇提供的各类信息服务。用户在此授权币汇可以向其账户、电子邮件、手机等发送商业信息。用户可进入币汇相关页面更改联系方式。</p>
          <p>2.币汇保留随时修改或中断服务而不需通知用户的权利，币汇有权行使修改或中断服务的权利，不需对用户或任何无直接关系的第三方负责。</p>
          <p>3.法律允许范围内，无论在以下何种情况下：信息网络设备维护、信息网络连接故障、电脑、通讯或其他系统的故障、电力故障、罢工、劳动争议、暴乱、起义、骚乱、生产力或生产资料不足、火灾、
          洪水、风暴、爆炸、战争、政府行为、司法行政机关的命令、其他不可抗力或第三方的不作为而造成的服务终止或服务延迟以及用户因此而遭受的损失，币汇不承担责任。</p>
          <p>4.用户对本协议的修改有任何异议或对币汇的服务有任何不满，可以行使以下权利：</p>
          <p>（1）停止使用币汇的网络服务。</p>
          <p>（2）通过客服、支持等渠道告知币汇停止对其服务。结束服务后，用户使用币汇网络服务协议的权利立即终止。在此情况下，币汇没有义务传送任何未处理的消息或未完成的服务给用户或任何无直接关系的第三方。</p>
          <p>用户信息的保密</p>
          <p>1.本协议所称之币汇用户信息是指符合法律、法规及相关规定，并符合下述范围的信息：</p>
          <p>（1）用户注册币汇时，向币汇提供的个人信息；</p>
          <p>（2）用户在使用币汇服务、参加网站活动或访问网站网页时，币汇自动接收并记录的用户浏览器端数据，包括但不限于IP地址、网站Cookie中的资料及用户要求取用的网页记录；</p>
          <p>（3）币汇从商业伙伴处合法获取的用户个人信息；</p>
          <p>（4）其它币汇通过合法途径获取的用户个人信息。</p>
          <p>2.币汇承诺 未经法定原因或用户事先许可，币汇不会向任何第三方透露用户的密码、姓名、手机号码、证件号码等非公开信息。</p>
          <p>3.在下述法定情况下，用户的个人信息将会被部分或全部披露。</p>
          <p>（1）经用户同意向用户本人或其他第三方披露；</p>
          <p>（2）根据法律、法规等相关规定，或行政机构要求，向行政、司法机构或其他法律规定的第三方披露；</p>
          <p>（3）其他币汇根据法律、法规等相关规定进行的披露。</p>
          <p>用户权利</p>
          <p>1.用户的用户名、密码和安全性</p>
          <p>（1）用户名不可重複注册。用户名一旦注册成功，不可更改。</p>
          <p>（2）用户一旦注册成功，成为币汇的用户，将得到用户名（用户邮箱）和密码，并对以此组用户名和密码登入系统后所发生的所有活动和事件负责，自行承担一切使用该用户名发布的言语、
            行为等而直接或间接导致的法律责任。</p>
          <p>（3）用户有义务妥善保管币汇账号、用户名和密码、短信验证码、谷歌验证码，用户将对用户名和密码、和谷歌密钥安全负全部责任。因用户原因导致用户名或密码、
            谷歌密钥洩露而造成的任何法律后果由用户本人负责，由于用户自身原因洩露这些信息导致的财产损失，本站不负相关责任。由于币汇是交易网站，登录密码、防钓鱼码等不得使用相同密码，
            否则会有安全隐患，相关责任由用户自身承担。</p>
          <p>（4）用户密码遗失的，可以通过注册电子邮箱发送的链接重置密码。用户若发现任何非法使用用户名或存在其他安全漏洞的情况，应立即告知币汇。</p>
          <p>（5）币汇不会向任何用户索取密码，不会让用户往任何非本站交易中心里提供的帐户、BTC充值地址充值数字货币，请大家不要相信任何非币汇官方发布的诈骗信息，往非BTC交易中心提供的账户、
            地址里充值数字货币造成的损失本站不负责任。</p>
          <p>2.用户有权修改其账户个人中心、安全设置中各项可修改信息，自行选择录入介绍性文字，自行决定是否提供非必填项的内容；</p>
          <p>3.用户有权在币汇浏览数字货币的资讯详情以及交易信息并发表符合国家法律规定、币汇社区规则的文章及观点；</p>
          <p>4.用户有权根据网站相关规定，获得币汇给与的奖励（如手续费按比例返现等）；</p>
          <p>5.用户有权按照币汇发布的活动规则参与币汇组织的各项线上、线下活动（包括各官方平台社区发起的活动）。</p>
          <p>6.用户有权查看其币汇账号下的信息。 7.用户有权根据币汇网站规定，应用币汇提供的功能进行操作、享受币汇提供的其它各类服务。</p>
          <p>用户义务</p>
          <p>1.不得利用本站危害国家安全、洩露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站製作、複製和传播下列信息：</p>
          <p>（1）煽动抗拒、破坏宪法和法律、行政法规实施的；</p>
          <p>（2）煽动颠覆国家政权，推翻社会主义制度的；</p>
          <p>（3）煽动分裂国家、破坏国家统一的；</p>
          <p>（4）煽动民族仇恨、民族歧视，破坏民族团结的；</p>
          <p>（5）捏造或者歪曲事实，散佈谣言，扰乱社会秩序的；</p>
          <p>（6）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆</p>
          <button class="ruleBtn disagreeBtn" @click="closeBtn1">不同意</button>
          <button class="ruleBtn agreeBtn" @click="agreeBtn">同意</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FooterPublic from '../components/FooterPublic'
import HeaderPublic from '../components/HeaderPublic'
import ITelCode from '../assets/data/internationalTelephoneCode'

export default {
  name: 'Register',
  components: { HeaderPublic, FooterPublic },
  data () {
    return {
      // 国际电话区号数据
      iTelCodeOptions: ITelCode[this.$i18n.locale],
      // 手机号码格式校验正则
      telephoneRegExp: new RegExp(`^[0-9]{11}$`),
      // 邮箱号码格式校验正则
      emailRegExp: new RegExp(`^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.[a-zA-Z0-9]{2,6}$`),
      // 验证码格式校验正则
      captchaRegExp: new RegExp('^[a-zA-Z0-9]{4,6}$'),
      // 密码格式校验正则
      passwordsRegExp: new RegExp(`^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$`),
      // 国家名+国际电话区号
      iTelCodeValue: '86',
      // 处理之后的国际区号
      iTelCode: '',
      // 注册方式点击 0手机 1邮箱
      onClick: 0,
      // 网络服务协议
      ruleShow: false,
      // 验证码时间
      countTime: 60,
      countTime1: 60,
      // 获取验证码提示
      getCodeText: '获取验证码',
      getCodeText1: '获取验证码',
      // 获取验证码开关
      isGetCode: true,
      isGetCode1: true,
      // 立即注册开关
      isControll: true,
      // v-model绑定到的值
      telValue: '',
      telCodeValue: '',
      emailValue: '',
      emailCodeValue: '',
      passwordValue: '',
      confirmPassValue: '',
      ruleValue: false
    }
  },
  methods: {
    // 注册按钮切换
    reBtn (_index) {
      this.onClick = _index
      // 清空
      this.telValue = ''
      this.telCodeValue = ''
      this.emailValue = ''
      this.emailCodeValue = ''
      this.passwordValue = ''
      this.confirmPassValue = ''
      this.ruleValue = false
    },
    // 查看网络服务协议
    ruleShowBtn () {
      this.ruleShow = true
    },
    closeBtn () {
      this.ruleShow = false
    },
    closeBtn1 () {
      this.ruleValue = false
      this.ruleShow = false
    },
    agreeBtn () {
      this.ruleValue = true
      this.ruleShow = false
    },
    // 是否同意网络服务协议
    checkBtn () {
      this.ruleValue = !this.ruleValue
    },
    // 立即注册
    registerBtn () {
      // 手机
      if (this.onClick === 0) {
        this.getITel()

        // 校验手机格式是否正确
        if (this.telValue === '' || this.telValue.replace(/\s+/g, '').length === 0 || isNaN(this.telValue)) {
          this.$message.error('手机号码不能为空')
          return false
        }
        if (!this.telephoneRegExp.test(this.telValue)) {
          this.$message.error('手机号码不正确')
          return false
        }
        // 判断手机验证码是否为空,包含空格，非数字
        if (this.telCodeValue === '' || this.telCodeValue.replace(/\s+/g, '').length === 0 || isNaN(this.telCodeValue)) {
          this.$message.error('验证码不能为空')
          return false
        }
        if (!this.captchaRegExp.test(this.telCodeValue)) {
          this.$message.error('验证码格式错误')
          return false
        }
      } else {
        // 邮箱
        // 判断邮箱是否为空，校验是否正确
        if (this.emailValue === '' || this.emailValue.replace(/\s+/g, '').length === 0) {
          this.$message.error('邮箱不能为空')
          return false
        }
        if (!this.emailRegExp.test(this.emailValue)) {
          this.$message.error('邮箱不正确')
          return false
        }
        // 判断邮箱验证码是否为空,包含空格
        if (this.emailCodeValue === '' || this.emailCodeValue.replace(/\s+/g, '').length === 0) {
          this.$message.error('验证码不能为空')
          return false
        }
        if (!this.captchaRegExp.test(this.emailCodeValue)) {
          this.$message.error('验证码格式错误')
          return false
        }
      }
      // 公共判断
      // 判断密码是否为空,8-20
      if (this.passwordValue === '') {
        this.$message.error('密码不能为空')
        return false
      }
      if (this.passwordValue.length < 8 || !this.passwordsRegExp.test(this.passwordValue)) {
        this.$message.error('密码格式错误')
        return false
      }
      // 确认密码是否为空，是否和密码一样
      if (this.confirmPassValue === '') {
        this.$message.error('确认密码不能为空')
        return false
      }
      if (this.confirmPassValue !== this.passwordValue) {
        this.$message.error('两次密码不一致')
        return false
      }
      // 判断是否同意网络服务协议
      if (this.ruleValue === false) {
        this.$message.error('请阅读并同意《网络服务协议》')
        return false
      }
      if (this.isControll) {
        this.isControll = false
        // 加密接口
        this.$store.dispatch('encryptConnectionSSO', {
          url: '/api/sso/user/register',
          data: {
            uTelephone: this.telValue,
            uPassword: this.passwordValue, // 密码
            uInvCode: this.inviteCodeValue, // 邀请码
            source: 2, // 1 飞梭用户 2 币汇用户
            email: this.emailValue,
            countryCode: this.iTelCode, // 国家区号
            telephoneCode: this.telCodeValue, // 手机验证码
            emailCode: this.emailCodeValue, // 邮箱验证码
            type: 0 // 飞梭用户注册的话 1 第三方注册 0 正常手机号注册
          }
        }).then(response => {
          if (parseInt(response.body.code) === 200) {
            // 成功跳转
            this.$router.push({ name: 'regSuccess' })
            this.isControll = true
          } else if (parseInt(response.body.code) === 111) {
            this.$message.error('邮箱验证码超时')
            this.isControll = true
          } else {
            this.$message.error(response.body.msg)
            this.isControll = true
          }
        }, response => {
          this.$message.error('注册失败')
          this.isControll = true
        })
      }
    },
    // 国际区号
    getITel () {
      // 保证国际区号长度为四位
      this.iTelCode = this.iTelCodeValue
      if (this.iTelCode.length > 4) {
        this.iTelCode = this.iTelCode.toString().substr(this.iTelCode.length - 4, this.iTelCode.length)
      } else if (this.iTelCode.length === 3) {
        this.iTelCode = '0' + this.iTelCode
      } else if (this.iTelCode.length === 2) {
        this.iTelCode = '00' + this.iTelCode
      }
    },
    // 获取手机验证码
    getTelCode () {
      this.getITel()

      // 校验手机格式是否正确
      if (this.telValue === '' || this.telValue.replace(/\s+/g, '').length === 0 || isNaN(this.telValue)) {
        this.$message.error('手机号码不能为空')
        return false
      } else if (!this.telephoneRegExp.test(this.telValue)) {
        this.$message.error('手机号码不正确')
        return false
      } else {
        if (this.isGetCode) {
          this.isGetCode = false
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
                this.isGetCode = true
              } else {
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
                    this.getCountTime(this.countTime, 'tel')
                  } else if (response.body.code === 'E0807') {
                    this.$message.error('短信发送过于频繁')
                    this.isGetCode = true
                  } else {
                    this.$message.error(response.body.msg)
                    this.isGetCode = true
                  }
                }, response => {
                  this.$message.error('短信发送失败')
                  this.isGetCode = true
                })
              }
            } else {
              this.$message.error('账号已存在')
              this.isGetCode = true
            }
          }, response => {
            this.$message.error('获取失败')
            this.isGetCode = true
          })
        }
      }
    },
    // 获取邮箱验证码
    getEmailCode () {
      // 校验邮箱格式是否正确
      if (this.emailValue === '' || this.emailValue.replace(/\s+/g, '').length === 0) {
        this.$message.error('邮箱不能为空')
        return false
      } else if (!this.emailRegExp.test(this.emailValue)) {
        this.$message.error('邮箱不正确')
        return false
      } else {
        if (this.isGetCode1) {
          this.isGetCode1 = false
          // 判断邮箱号是否重复
          this.$store.dispatch('encryptConnection', {
            url: '/api/userinfo/findByEmailUI',
            data: {
              email: this.emailValue
            }
          }).then(response => {
            if (parseInt(response.body.code) === 200) {
              if (response.body.data.isExist) {
                this.$message.error('账号已存在')
                this.isGetCode1 = true
              } else {
                // 获取邮箱验证码接口
                this.$store.dispatch('encryptConnectionSSO', {
                  url: '/api/sso/email/send',
                  data: {
                    email: this.emailValue,
                    index: '0', // 0注册 1修改登录密码 2密码找回
                    source: '2' // 1 飞梭 2 币汇
                  }
                }).then(response => {
                  if (parseInt(response.body.code) === 200) {
                    this.getCountTime(this.countTime1, 'email')
                  } else if (response.body.code === 'E0807') {
                    this.$message.error('发送过于频繁')
                    this.isGetCode1 = true
                  } else {
                    this.$message.error(response.body.msg)
                    this.isGetCode1 = true
                  }
                }, response => {
                  this.$message.error('发送失败')
                  this.isGetCode1 = true
                })
              }
            } else {
              this.$message.error('账号已存在')
              this.isGetCode1 = true
            }
          }, response => {
            this.$message.error('获取失败')
            this.isGetCode1 = true
          })
        }
      }
    },
    // 计时
    getCountTime (_countTime, _name) {
      let time = ''
      if (_countTime > 0) {
        if (_name === 'tel') {
          this.getCodeText = '重新获取(' + _countTime + ')'
        } else {
          this.getCodeText1 = '重新获取(' + _countTime + ')'
        }
        _countTime--
        time = setTimeout(() => {
          this.getCountTime(_countTime, _name)
        }, 1000)
      } else {
        if (_name === 'tel') {
          this.getCodeText = '获取验证码'
          this.isGetCode = true
        } else {
          this.getCodeText1 = '获取验证码'
          this.isGetCode1 = true
        }
        clearTimeout(time)
      }
    }
  }
}
</script>

<style scoped>
  .register{position: relative;width: 100%;top: 0;left: 0;background-color: #18184C;height: 100%;}
  .content{width: 100%;background-color: #18184C;}
  .registerBox{position: relative;width: 85%;margin: 0 auto;background: url("../assets/images/register/img1.png") no-repeat;background-size: cover;padding: 6% 0;}
  /*切换模块*/
  .re_Btn button{font-size: 18px;}
  .color_w{color: #fff;}
  .color_b{color: #56ECFF;}
  .arrow{width: 24%;margin: 0 auto;padding-top: 10%;}
  .showImg{display: block;}
  .hideImg{visibility: hidden;}
  .ljzcBtn{position: relative;background: 0;border: 0;width: 74%;margin: 3% 0;display: block;left: 13%;padding: 0;}
  .ljdlBtn{position: relative;background: 0;border: 0;display: block;width: 100%;text-align: center;color: #7475B2;font-size: 12px;margin-top: 2%;}
  .registerBtn{position: absolute;color: #fff;top: 0;text-align: center;width: 100%;height: 100%;}
  .phoneRe{position: relative;width: 90%;left: 5%;}
  .line{border-bottom:1px solid #484980;padding: 3% 0;width: 100%;}
  .line1{border-bottom:1px solid #484980;padding: 1% 0;width: 100%;}
  .rule{padding: 3% 0;font-size: 12px;color: #7475B2;}
  .rule span{color: #56ECFF;}
  .getCode,.getCode1{float: right;width: 32%;color: #fff;font-size: 12px;}
  /*placeholder字体颜色*/
  input::-webkit-input-placeholder{color:#7475B2;}
  .register input{padding: 1% 0;}
  .register input,.register select{font-size: 16px;color: #fff;width: 100%;}
  .register #telCode{width: 60%;}
  /*多选按钮*/
  .checkBtn{width: 6%;margin-right: 2%;}
  #checkBtn{
    display: none;
  }
  #checkBtn + label img:first-child{
    display: inline-block;
  }
  #checkBtn:checked + label img:first-child{
    display: none;
  }
  #checkBtn + label img:last-child{
    display: none;
  }
  #checkBtn:checked + label img:last-child{
    display: inline-block;
  }

  /*遮罩*/
  .pupcon{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 111;}
  .black{position: absolute;width: 100%;height: 100%;top: 0;left: 0;z-index: 111;background-color: #000;opacity: 0.6;}
  .pup{position: relative;width: 80%;height: 85%;margin: 10% 0 0 10%;background-color: #fff;z-index: 111;color: #333;font-size: 12px;border-radius: 4px;}
  .pupTitle{font-size: 16px;text-align: center;width: 50%;top: 4%;position: absolute;left: 25%;}
  .fontBox{position: absolute;width: 90%;left: 5%;top: 10%;height: 84%;overflow-y: scroll;}
  .closeBtn{position: absolute;display: block;width: 7%;right: 4%;top: 2%;}
  .pup .checkBtn{width: 7%;}
  .ruleBtn{width: 40%;margin: 7% 4%;height: 7%;border-radius: 20px;}
  .disagreeBtn{background-color: #ccc;}
  .agreeBtn{
    background: -webkit-linear-gradient(left, #58EDFF, #19BEFF); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #58EDFF, #19BEFF); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #58EDFF, #19BEFF); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #58EDFF , #19BEFF); /* 标准的语法 */}
  .pup .fontBox p{margin-bottom: 4%;}
</style>
