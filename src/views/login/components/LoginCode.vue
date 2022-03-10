<template>
  <div>
    <van-nav-bar
      class="tm-nav-bar"
      title="输入短信验证码"
      left-arrow
    >
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'loginCode',
  data () {
    return {
      user: {
        mobile: this.$route.params.mobile
      },
      type: this.$route.params.type
    }
  }
}
</script>

<style scoped>

</style>
