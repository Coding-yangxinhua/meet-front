<template>
  <div class="login">
    <van-nav-bar class="tm-nav-bar"
                 fixed
                 left-arrow
                 @click-left="goBack()"
    />
   <div class="card-bg flex-col">
     <div class="card">
       <login-history v-show="getPosition === 0" />
       <login v-show="getPosition === 1" />
       <register v-show="getPosition === 2" />
     </div>
   </div>
    <div class="extra flex center">
      <div class="flex" v-show="getPosition !== 1" @click="goAhead(1)">换个账号<div class="split-pane">|</div></div>
      <div class="flex" v-show="getPosition !== 2" @click="goAhead(2)">注册<div class="split-pane">|</div></div>
      <div>帮助</div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'
import Vue from 'vue'
import { getItem } from '../../utils/storage'
import Login from './components/Login'
import LoginHistory from './components/History'
import Register from './components/Register'

Vue.use(Toast)
export default {
  components: { Register, LoginHistory, Login },
  data () {
    return {
      historyUserList: [],
      user: {
        mobile: '',
        code: ''
      },
      // 0 账号选择界面， 1 账号登录界面， 2  注册界面
      position: [],
      // 倒计时的显示
      isCountDownShow: false,
      // 发送验证码防抖
      isSendLoading: false
    }
  },
  created () {
    this.historyUserList = getItem('history_user_list')
    if (this.historyUserList === null || this.historyUserList.length === 0) {
      this.position.push(1)
    } else {
      this.position.push(0)
    }
  },
  computed: {
    isMobile () {
      const reg = /^1[3||7|8|9]\d{9}$/
      return reg.test(this.user.mobile)
    },
    getPosition () {
      return this.position[this.position.length - 1]
    }
  },
  methods: {
    async onLogin () {
      // 登录
      Toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      const res = await login(this.user)
      // 处理返回值
      switch (res.code) {
        case 200:
          this.$store.commit('setToken', res.data.token)
          this.$router.back()
          Toast.success('登录成功')
          break
      }
    },
    async onRegister () {
      // 注册
      Toast.loading({
        message: '注册中...',
        forbidClick: true,
        duration: 0
      })
      const res = await login(this.user)
      // 处理返回值
      switch (res.code) {
        case 200:
          this.$router.back()
          Toast.success('注册成功')
          break
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        this.isSendLoading = true
        // 验证手机号是否为空
        this.isSendLoading = false
        // 倒计时
        this.isCountDownShow = true
      } catch (err) {
        Toast({
          message: err.message,
          position: 'top'
        })
      }
      this.isSendLoading = false
    },
    // 页面回退
    goBack () {
      this.position.pop()
      if (this.position.length <= 0) {
        this.$router.back()
      }
    },
    // 页面前进
    goAhead (pos) {
      this.position.push(pos)
    }
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
}
.login-btn-warp {
  padding: 26px 16px;
  .login-btn {
    width: 288px;
    height: 40px;
    background-color: #f56161;
    border-radius: 20px;
    color: white;
  }
  .login-btn-disable {
    background-color: #fab0b0;
  }
}
.tm-nav-bar {
  height: 200px;
  background: linear-gradient(to bottom, rgba(229, 89, 89, 0.9), rgba(255, 184, 140, 0.8), rgba(255,255,255, 0.6)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  ::v-deep .van-nav-bar__arrow {
    color: white;
  }
}
.card-bg {
  z-index: 1000;
  height: 84%;
  background-color: transparent;
  width: 100%;
  justify-content: end;
  align-items: center;

  .card {
    height: 550px;
    border-radius: 20px;
    background-color: #fff;
    z-index: 1001;
    width: 96%;
    .title {
      width: 100%;
      height: 80px;
      line-height: 80px;
      font-size: 19px;
      text-align: center;
    }
    .form {
      background-color: transparent;
      .mobile-box {
        border-radius: 35px;
        background-color: #F6F6F6;
        width: 80%;
        .van-cell {
          background-color: transparent;
        }
        .mobile-field {
          ::v-deep .van-field__label {
            text-align: right;
            width: 30%;
            color: #545454;
            font-size: 18px;
          }
          ::v-deep input {
            font-size: 18px;
            padding: 0 8px;
          }
          ::v-deep input::placeholder {
              font-size: 16px;
            color: #BDBDBD;
          }
        }
      }
    }
  }
}
.van-hairline--bottom::after {
  border-bottom-width: 0;
}
.extra {
  width: 100%;
  height: 150px;
  font-size: 12px;
  color: #787878;
  .split-pane {
    margin: 0 10px;
    font-size: 10px;
    font-weight: lighter;
  }
}
</style>
