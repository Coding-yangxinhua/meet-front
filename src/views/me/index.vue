<template>
  <div class="me">
    <me-is-login v-if="token" :user="user" ></me-is-login>
    <me-not-login v-else></me-not-login>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MeNotLogin from '@/views/me/components/MeNotLogin'
import MeIsLogin from '@/views/me/components/MeIsLogin'
import { userList } from '@/data/UsersData'
export default {
  name: 'me',
  data () {
    return {
      user: {}
    }
  },
  components: {
    MeIsLogin,
    MeNotLogin
  },
  created () {
    this.getMyInfo()
  },
  computed: {
    ...mapState({
      token: 'token'
    })

  },
  methods: {
    getMyInfo () {
      this.user = userList[0]
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
