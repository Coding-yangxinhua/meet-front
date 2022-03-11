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
    <van-row class="row">短信验证码至 &nbsp; {{getMobile}}</van-row>
    <code-box></code-box>
    <van-row class="row">
      <van-count-down v-if="!this.showRendBtn" format="ss秒后重新发送" :time="1000 * 60" @finish="showRendBtn = true" />
      <div v-else @click="showRendBtn = false">重新发送</div>
    </van-row>
  </div>
</template>

<script>
import { toMobile } from '../../../utils/DateFormatUtil'
import CodeBox from '../../../components/CodeBox'

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
    }
  },
  data () {
    return {
      showRendBtn: false,
      code: '',
      user: this.$route.params.user,
      type: this.$route.params.type
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
    font-size: 18px;
  }

</style>
