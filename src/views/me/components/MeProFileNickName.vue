<template>
  <div>
    <normal-nav title="修改昵称" :finish="modifyNickName"></normal-nav>
    <van-field v-model="user.nickName" clearable/>
  </div>
</template>

<script>
import NormalNav from '@/components/NormalNav'
import { userList } from '@/data/UsersData'
export default {
  name: 'me-profile-nick-name',
  components: { NormalNav },
  created () {
    this.user = userList[0]
  },
  data () {
    return {
      user: null
    }
  },
  methods: {
    modifyNickName () {
      console.log('提交')
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
