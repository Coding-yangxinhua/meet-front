<template>
  <div>
    <van-nav-bar
      title="修改昵称"
      left-arrow
      right-text="完成"
      @click-left="$router.back()"
      @click-right="modifyNickname"
    />
    <van-field v-model="user.nickname"
               placeholder="每个名字都有意义"
               clearable

    />
  </div>
</template>

<script>
import { updateProfile } from '@/api/user'
export default {
  name: 'me-profile-nickname',
  created () {
    this.user.nickname = this.$route.params.nickname
  },
  data () {
    return {
      user: {
        nickname: ''
      }
    }
  },
  methods: {
    async modifyNickname () {
      await updateProfile({
        nickname: this.user.nickname
      })
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .van-field__control {
  color: #333333;
  font-size: 16px;
}
</style>
