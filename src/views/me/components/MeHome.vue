<template>
  <div class="my-container">
    <van-grid class="nav-grid" :column-num="3" square :gutter="10">
      <van-grid-item @click="toAlbum" class="nav-grid-item" icon-prefix="iconfont icon" icon="picture" text="相册"/>
      <van-grid-item class="nav-grid-item" icon-prefix="iconfont icon" icon="memorial" text="备忘录"/>
      <van-grid-item class="nav-grid-item" icon-prefix="iconfont icon" icon="time" text="时间表"/>
    </van-grid>

    <div class="login-out-pane">
      <van-button size="large"  round class="login-out" @click="loginOutConfirm" >退出登录</van-button>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
import { Dialog } from 'vant'
export default {
  name: 'me-home',
  computed: {
    ...mapState({
      token: 'token'
    })
  },
  methods: {
    // 去相册
    toAlbum () {
      this.$router.push({
        name: 'album',
        params: {
          userId: null
        }
      })
    },
    // 退回登录
    loginOutConfirm () {
      Dialog.confirm({
        title: 'TO MEET',
        message: '确定退出当前账号吗？'
      }).then(() => {
        this.$store.commit('setUser', null)

        this.$router.go(0)
      })
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
