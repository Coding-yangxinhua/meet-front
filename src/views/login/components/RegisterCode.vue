<template>
  <div>
    <van-nav-bar
      class="tm-nav-bar"
      title="输入短信验证码"
      left-arrow
      @click-left="$router.back()"
    >
    </van-nav-bar>
    <van-row class="row title">输入手机验证码</van-row>
    <van-row class="row code-label">短信验证码至 &nbsp; {{getMobile}}</van-row>
    <code-box ref="codeBox" @checkCode = "checkCode" class="code-box"></code-box>
    <van-row class="row send-text">
      <van-count-down v-if="!this.showRendBtn" format="ss秒后重新发送" :time="1000 * 60" @finish="showRendBtn = true" />
      <div class="resend-text" v-else @click="showRendBtn = false">重新发送</div>
    </van-row>
  </div>
</template>

<script>
import { toMobile } from '@/utils/DateFormatUtil'
import CodeBox from '../../../components/CodeBox'
import { register, login, sendSms } from '@/api/user'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'

export default {
  name: 'loginCode',
  components: { CodeBox },
  computed: {
    getMobile () {
      if (this.user === undefined || this.user == null) {
        return ''
      }
      return toMobile(this.user.mobile)
    }
  },
  created () {
    if (this.user === null || this.type == null) {
      this.$router.back()
    } else {
      this.sendLoginSms()
    }
  },
  data () {
    return {
      showRendBtn: false,
      code: '',
      user: this.$route.params.user,
      type: this.$route.params.type
    }
  },
  methods: {
    ...mapMutations([
      'setUserInfo'
    ]),
    sendLoginSms () {
      sendSms(this.user.mobile, this.type)
    },
    async checkCode (code) {
      let res = null
      Toast.loading({
        message: '注册中...',
        duration: 5000,
        forbidClick: true
      })
      switch (this.type) {
        case 0:
          res = await register(code, this.user)
          break
        case 1:
          res = await login(code, this.user)
      }
      Toast.clear()
      Toast({
        message: res.message,
        duration: 1000
      })
      if (res.code === 200) {
        this.$router.push('/home')
        this.setUserInfo(res.result)
        return
      }
      this.$refs.codeBox.clear()
    }
  }
}
</script>

<style scoped lang="scss">

  ::v-deep .van-nav-bar__content {
    .van-nav-bar__title {
      font-size: 16px;
    }
  }
  .row {
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .title {
    margin-top: 30px;
    font-size: 20px;
    font-weight: bolder;
  }
  .code-label {
    font-size: 14px;
    color: gray;
  }
  .code-box {
    margin-top: 30px;
  }
  .send-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    margin-top: 30px;
    .resend-text {
      color: #9687f6;
    }
  }

</style>
