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
                       @click="setActive(nav.navId, nav.needLogin)"
                       :icon="getPosition===nav.navId? nav.active:nav.inactive">
        {{ nav.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { navList } from '@/data/navData'
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
      navs: navList
    }
  },
  methods: {
    ...mapMutations([
      'setPosition'
    ]),
    ...mapGetters([
      'getToken'
    ]),
    setActive (pos, needLogin) {
      console.log(pos)
      if (needLogin) {
        const token = this.getToken()
        if (token != null) {
          this.setPosition(pos)
        }
      } else {
        this.setPosition(pos)
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
