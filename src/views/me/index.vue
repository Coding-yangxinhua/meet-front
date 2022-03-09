<template>
  <div class="me">
    <me-is-login v-if="user != null" :user="user" ></me-is-login>
  </div>
</template>

<script>
import MeIsLogin from '@/views/me/components/MeIsLogin'
import { userList } from '@/data/UsersData'
import Cookies from 'js-cookie'
export default {
  name: 'me',
  data () {
    return {
      user: null
    }
  },
  components: {
    MeIsLogin
  },
  created () {
    this.checkToken()
  },
  methods: {
    getMyInfo () {
      this.user = userList[0]
    },
    checkToken () {
      const token = Cookies.get('meet-token')
      if (token != null) {
        this.getMyInfo()
      } else {
        this.$router.push('/login')
      }
    }

  }

}
</script>

<style scoped lang="scss">
.me {
  width: 100%;
  height: 100%;
}
</style>
