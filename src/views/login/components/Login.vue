<template>
  <div>
    <div class="login-reg-title">登录体验更精彩</div>
      <van-form
        class="login-reg-form">
        <div class="field-box">
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
          <van-field
            v-show="status === 1"
            class="password-field"
            v-model="user.password"
            type="password"
            center
            clearable
            clickable
            placeholder="请输入密码"
          />
        </div>
        <div v-if="status === 1" class="forget-pass-text">忘记密码</div>
        <div class="login-btn-warp">
          <van-button class="login-btn" :class="{'login-btn-disable': !checkPass}" size="large" @click="disposeLogin">{{getNowStatus.btnText}}</van-button>
        </div>
        <div class="change_login_type_btn" @click="status = getNowStatus.toId">{{getNowStatus.toText}}</div>
      </van-form>
  </div>
</template>

<script>
import { isMobile } from '@/utils/ValidateUtil'

export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: 19950125726,
        password: null
      },
      code: null,
      status: 0,
      typeList: [
        {
          id: 0,
          toText: '短信验证码登录',
          btnText: '验证码登录',
          toId: 1
        },
        {
          id: 1,
          toText: '账号密码登录',
          btnText: '登录',
          toId: 0
        }
      ]
    }
  },
  computed: {
    getNowStatus () {
      return this.typeList.filter(type => type.id === this.status)[0]
    },
    checkPass () {
      return isMobile(this.user.mobile)
    }
  },

  methods: {
    disposeLogin () {
      if (this.checkPass) {
        // 验证码登录
        if (this.status === 0) {
          this.$router.push({
            name: 'login-code',
            params: {
              // 1为登录
              type: 1,
              user: {
                mobile: this.user.mobile
              }
            }
          })
        } else {
          // 验证密码是否正确
        }
      }
    }
  }
}
</script>

<style lang="scss">
.login-reg-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 19px;
  text-align: center;
}
.login-btn-warp {
  padding: 20px 0;
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
.login-reg-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  .change_login_type_btn {
    font-size: 13px;
  }
  .forget-pass-text {
    width: 288px;
    height: 50px;
    font-size: 13px;
    line-height: 50px;
    text-align: right;
  }
  .field-box {
    width: 288px;
    .van-cell {
      background-color: transparent;
    }
    .password-field {
      border-radius: 35px;
      background-color: #F6F6F6;
      margin-top: 20px;
      input {
        text-align: center;
        font-size: 18px;
        padding: 0 8px;
      }
      input::placeholder {
        font-size: 16px;
        color: #BDBDBD;
      }
    }
    .mobile-field {
      border-radius: 35px;
      background-color: #F6F6F6;
      .van-field__label {
        text-align: right;
        width: 30%;
        color: #545454;
        font-size: 18px;
      }
      input {
        font-size: 18px;
        padding: 0 8px;
      }
      input::placeholder {
        font-size: 16px;
        color: #BDBDBD;
      }
    }

  }

}
</style>
