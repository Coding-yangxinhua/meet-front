<template>
  <div>
    <div class="login-reg-title">欢迎注册Meet账号</div>
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
        <div class="login-btn-warp">
          <van-button class="login-btn" :class="{'login-btn-disable': !checkPass}" size="large">下一步</van-button>
        </div>
      </div>
    </van-form>
  </div>
</template>

<script>
import { isMobile } from '@/utils/ValidateUtil'

export default {
  name: 'Register',
  data () {
    return {
      user: {
        mobile: null,
        password: null
      },
      code: null
    }
  },
  computed: {
    checkPass () {
      return isMobile(this.user.mobile)
    }
  }
}
</script>

<style scoped>

</style>
