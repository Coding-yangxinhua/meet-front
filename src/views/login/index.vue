<template>
  <div class="login">
    <van-nav-bar class="tm-nav-bar"
                 fixed
                 left-arrow
                 @click-left="$router.back()"
    />
   <div class="card-bg flex-col">
     <div class="card">
       <div class="title">登录体验更精彩</div>
       <van-form
         class="form flex-col a-center"
         :show-error="false"
         :show-error-message="false"
         :validate-first="true"
         ref="login-form"
         @submit="onLogin"
         @failed="onFailed">
         <div class="mobile-box">
           <van-field
             class="mobile-field"
             v-model="user.mobile"
             type="number"
             label="+86"
             center
             clearable
             clickable
             maxlength="11"
             placeholder="请输入手机号"
           />
         </div>
         <div class="login-btn-warp">
           <van-button class="login-btn" :class="{'login-btn-disable': !isMobile}" size="large" native-type="submit"></van-button>
         </div>
         <div class="change_login_type_btn">
<!--           {{ type.desc }}-->
         </div>
       </van-form>
     </div>
   </div>
    <div class="extra flex center">
      <div v-show="position!==1">换个账号</div><div class="split-pane">|</div>
      <div v-show="position!==2">注册</div><div class="split-pane">|</div>
      <div>帮助</div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'
import Vue from 'vue'

Vue.use(Toast)
export default {
  data () {
    return {
      historyUserList: [],
      user: {
        mobile: '',
        code: ''
      },
      position: 0,
      formRules: {
        mobile: [
          {
            pattern: /^1[3||7|8|9]\d{9}$/,
            message: '您输入的手机号格式有误，请重新输入'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码'
          },
          {
            pattern: /\d{6}/,
            message: '验证码格式不正确'
          }
        ]
      },
      // 倒计时的显示
      isCountDownShow: false,
      // 发送验证码防抖
      isSendLoading: false
    }
  },
  computed: {
    isMobile () {
      const reg = /^1[3||7|8|9]\d{9}$/
      return reg.test(this.user.mobile)
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

    // 表单项错误
    onFailed (error) {
      console.log(error)
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        this.isSendLoading = true
        // 验证手机号是否为空
        await this.$refs['login-form'].validate('mobile')
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
