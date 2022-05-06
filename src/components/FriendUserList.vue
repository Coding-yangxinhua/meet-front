<template>
  <div class="friend-user-list-container">
    <van-list
      v-model="loadStatus.isLoading"
      :finished="loadStatus.finished"
      :finished-text="loadStatus.finishMsg"
      @load="onLoad"
    >
      <friend-user-single :key="friend.userId"
                          v-for="friend in friendList"
                          :user="friend"
      ></friend-user-single>
    </van-list>
  </div>
</template>

<script>
import { getFriendByType } from '@/api/friend'
import FriendUserSingle from '@c/FriendUserSingle'

export default {
  name: 'FriendUserList',
  components: { FriendUserSingle },
  props: {
    type: {
      require: false,
      default () {
        return 0
      }
    },
    queryId: {
      require: false,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      pageInfo: {
        page: 1,
        size: 10
      },
      friendList: [],
      loadStatus: {
        isLoading: false,
        finished: false,
        finishMsg: '',
        immediateCheck: true
      }
    }
  },
  methods: {
    // 下拉加载更多
    async onLoad () {
      const res = await getFriendByType({
        queryId: this.queryId,
        type: this.type,
        ...this.pageInfo
      })
      if (res.code === 200) {
        const data = res.result.records
        if (data.length === 0) {
          this.loadStatus.finished = true
        }
        this.friendList.push(...res.result.records)
      }
      this.loadStatus.isLoading = false
      this.loadStatus.finished = true
      // this.loadStatus.finishMsg = res.message
    }
  }
}
</script>

<style scoped>

</style>
