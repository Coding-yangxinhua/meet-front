<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar
      route
    >
      <van-tabbar-item v-for="nav in navs"
                       :key="nav.navId"
                       class="tab-text"
                       :to="nav.path"
                       icon-prefix="iconfont icon"
                       @click="setActive(nav.navId)"
                       :icon="getPosition===nav.navId? nav.active:nav.inactive">
        {{ nav.title }}
      </van-tabbar-item>
<!--      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[0][active===0? 1:0]" to="/">首页</van-tabbar-item>-->
<!--      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[1][active===1? 1:0]" to="/wish">许愿墙</van-tabbar-item>-->
<!--      <van-tabbar-item class="tab-text" icon-prefix="iconfont icon" :icon="tabClass[2][active===2? 1:0]" to="/me">我</van-tabbar-item>-->
    </van-tabbar>
  </div>
</template>

<script>
import { navList } from '../../data/navData'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'index',
  computed: {
    ...mapGetters([
      'getPosition'
    ])
  },
  data () {
    return {
      active: 0,
      navs: navList,
      tabClass: [
        ['home-o', 'home'],
        ['heart-o', 'heart'],
        ['user-o', 'user']
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setPosition'
    ]),
    setActive (pos) {
      this.setPosition(pos)
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
