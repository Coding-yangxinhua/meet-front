<template>
  <div>
    <van-nav-bar class="tm-nav-bar"
                 left-arrow
                 @click-left="$router.back()"
                 title="登录"
    />
    <van-form
    :show-error="false"
    :show-error-message="false"
    :validate-first="true"
    ref="login-form"
    @submit="onLogin"
    @failed="onFailed">
      <van-field
        v-model="user.mobile"
        center
        placeholder="请输入手机号"
        name="mobile"
        icon-prefix="iconfont icon"
        left-icon="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        placeholder="请输入验证码"
        center
        name="code"
        icon-prefix="iconfont icon"
        left-icon="secuirity"
        :rules="formRules.code"
      >
        <template #button>
          <van-button v-if="isCountDownShow" disabled class="send-btn" round size="mini">
              <van-count-down :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
          </van-button>
          <van-button
            v-else
            class="send-btn"
            round size="mini"
            :loading="isSendLoading"
            @click.prevent="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" size="large" native-type="submit"
                    color="linear-gradient(to right, #ff6034, #ee0a24)">登录
        </van-button>
      </div>
    </van-form>

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
      user: {
        mobile: '',
        code: ''
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号'
          },
          {
            pattern: /^1[3||7|8|9]\d{9}$/,
            message: '手机号格式不正确'
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
  methods: {
    async onLogin () {
      // 登录
      Toast.loading({
        message: '登录中',
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
        case 401:
          Toast.fail('手机号或验证码格式不正确')
          break
        case 1001:
          Toast.fail('验证码错误')
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
.login-btn-warp {
  padding: 26px 16px;
}

.send-btn {
  background-color: #ededed;
  width: 70px;
  height: 24px;
  .van-button__text {
    color: #666666;
  }
}
</style>
