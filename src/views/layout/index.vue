<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar
      v-model="active"
      route
    >
      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[0][active===0? 1:0]" to="/">首页</van-tabbar-item>
      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[1][active===1? 1:0]" to="/wish">许愿墙</van-tabbar-item>
      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[2][active===2? 1:0]" to="/me">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      active: 0,
      tabClass: [
        ['home-o', 'home'],
        ['heart-o', 'heart'],
        ['user-o', 'user']
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.layout-container{
  width: 100%;
  height: 100%;
  ::v-deep .van-tabbar {
    background-color: #F6F6F6;
    .tab-text{
      color: #333333;
      background-color: #F6F6F6;
      .van-tabbar-item__icon{
        .iconfont{
          font-size: 20px;
        }
      }
    }
  }
}
</style>
