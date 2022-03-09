<template>
  <div>
    <div class="title">登录体验更精彩</div>
      <van-form
        class="form flex-col a-center">
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
</template>

<script>
export default {
  name: 'login',
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
  }
}
</script>

<style scoped lang="scss">
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
</style>
