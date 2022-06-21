<template>
  <div id="app">
    <van-dialog v-model="showLoginDialog" title="Meet" message="登录以获得更好的体验" @confirm="toLoginView" @cancel="cancel" show-cancel-button>
    </van-dialog>
    <van-notify v-model="notify.showNotify" :type="notify.type" >
      <van-icon v-if="notify.icon != null" :name="notify.icon" style="margin-right: 4px;" />
      <span> {{notify.text}} </span>
    </van-notify>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Notify, Toast } from 'vant'
import { getPosition } from '@u/OwnUtil'

export default {
  name: 'App',
  components: {
    [Notify.Component.name]: Notify.Component
  },
  created () {
    this.setPosition(getPosition())
  },
  computed: {
    ...mapGetters([
      'getResult'
    ]),
    result () {
      return this.getResult
    }
  },
  data () {
    return {
      showLoginDialog: false,
      notify: {
        type: 'success',
        showNotify: false,
        text: '',
        icon: ''
      }
    }
  },
  methods: {
    // 获得当前路径对应导航栏
    ...mapMutations([
      'setPosition'
    ]),
    // 获得隐私权限
    cancel () {
      this.showLoginDialog = false
    },
    toLoginView () {
      this.$router.push('/login')
      this.showLoginDialog = false
    }
  },
  watch: {
    result (newData, oldData) {
      const code = newData.code
      const message = newData.message
      // 加载文案
      switch (code) {
        case null:
          Toast.loading({
            message,
            duration: 10000,
            forbidClick: true
          })
          break
        case 403:
          this.showLoginDialog = true
          break
        case 200:
          Toast.success({
            message,
            forbidClick: true
          })
          break
        case 10000:
          this.notify.showNotify = true
          this.notify.type = 'danger'
          this.notify.icon = 'close'
          break
        default:
          this.notify.showNotify = true
          this.notify.type = 'warning'
          this.notify.icon = 'info-o'
      }
      if (this.notify.showNotify) {
        this.notify.text = message
      }
      setTimeout(() => {
        this.notify.showNotify = false
      }, 2000)
    }
  }
}
</script>
<style lang="scss">
body{

}
</style>
