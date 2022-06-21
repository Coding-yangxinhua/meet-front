<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar
      route
    >
      <van-tabbar-item v-for="nav in navs"
                       :key="nav.navId"
                       class="tab-text"
                       icon-prefix="iconfont icon"
                       @click="setActive(nav)"
                       :icon="getPosition===nav.navId? nav.active:nav.inactive">
        {{ nav.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { navList } from '@/data/navData'
import { mapGetters, mapMutations } from 'vuex'
import * as RouterUtil from '@u/RouterUtil'

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
      navs: navList
    }
  },
  methods: {
    ...mapMutations([
      'setPosition'
    ]),
    ...mapGetters([
      'isLogin'
    ]),
    setActive (nav) {
      const pos = nav.navId
      const needLogin = nav.needLogin
      if (needLogin) {
        const isLogin = this.isLogin()
        if (isLogin) {
          this.setPosition(pos)
        }
        RouterUtil.pushOrLogin(nav.path)
      } else {
        this.setPosition(pos)
        RouterUtil.pushOrLogin(nav.path, false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
body html{
  width: 375px;
  height: 812px;
}
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
