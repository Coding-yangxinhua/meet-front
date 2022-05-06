<template>
  <div class="friend-container">
    <!-- 频道列表 -->
    <van-nav-bar class="tm-nav-bar"
                 left-arrow
                 :title="nickname"
                 @click-left="$router.back()"
    />
    <van-tabs  swipeable
               sticky
               v-model="type"
    >
      <van-tab v-for="item in relationTabs"
               :title="item.itemLabel"
               :key="item.dictId">
        <friend-user-list :query-id="queryId"
                          :type="type"
        ></friend-user-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { SimuRelationTabs } from '@/data/RelationTab'
import { getFriendByType } from '@/api/friend'
import FriendUserList from '@c/FriendUserList'

export default {
  name: 'friend',
  components: { FriendUserList },
  props: {

  },
  created () {
    this.relationTabs = SimuRelationTabs
    const tempType = this.$route.params.type
    this.type = tempType == null ? 0 : tempType
    this.queryId = this.$route.params.queryId
    this.nickname = this.$route.params.nickname
  },
  data () {
    return {
      relationTabs: null,
      type: 0,
      queryId: null,
      nickname: '',
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
    }
  }
}
</script>

<style scoped lang="scss">
.friend-container {
  background-color: #F8F8F8;
  .tab{
    background-color: #fff;
    .nav-back {
      height: 44px;
      line-height: 44px;
      text-align: center;
    }
  }
}
</style>
