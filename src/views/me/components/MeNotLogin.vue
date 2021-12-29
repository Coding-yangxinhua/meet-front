<template>
  <div class="meNotLogin">
    <!-- 未登录 -->
    <div class="un-login-pane flex center" @click="$router.push('/login')">
      <div class="flex-col">
        <div class="un-login-pic flex center iconfont icon-default"></div>
        <div class="un-login-text">登录 / 注册</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'me-not-login'
}
</script>

<style scoped lang="scss">
.meNotLogin {
  width: 100%;
  height: 100%;
  // 未登录
  .un-login-pane{
    width: 100%;
    height: 100%;
    background: rgba(255, 160, 122, 0.42);
    .un-login-pic{
      font-size: 50px;
      color: rgba(35, 241, 172, 0.87);
    }
    .un-login-text{
      color: #7D7D7D;
    }
  }
}
</style>
