<template>
  <div class="my-container">
    <van-grid class="nav-grid" :column-num="3" square :gutter="10">
      <van-grid-item @click="toAlbum" class="nav-grid-item" icon-prefix="iconfont icon" icon="picture" text="相册"/>
    </van-grid>
  </div>

</template>

<script>
export default {
  name: 'me-home',
  methods: {
    // 去相册
    toAlbum () {
      this.$router.push('album')
    }
  }
}
</script>

<style scoped lang="scss">
.my-container{
  ::v-deep .nav-grid{
    .nav-grid-item{
      .iconfont{
        font-size: 28px;
        color: #666666;
      }
      .van-grid-item__text{
        font-size: 14px;
      }
    }
  }
  // 退出登录
  .login-out-pane{
    padding: 0 10px;
    .login-out{
      text-align: center;
      color: #FF5655;
      font-size: 16px;
    }
  }

}
</style>
