<template>
  <div class="comment-list-container">
    <van-row class="order" v-for="order in getNowOrder" :key="order.orderId" >
      <van-col class="order-content" span="12">{{ order.content }}</van-col>
      <van-col class="order-title" style="text-align: right" span="12" @click="nowOrderId = order.nextId">
        <van-icon name="wap-nav" />
        {{ order.title }}
      </van-col>
    </van-row>
    <van-pull-refresh
      v-model="refreshStatus.isRefreshing"
      @refresh="onRefresh"
      :success-text="refreshStatus.successMsg"
      :success-duration="300"
      :animation-duration="600">
      <van-list
        v-model="loadStatus.isLoading"
        :finished="loadStatus.finished"
        :finished-text="loadStatus.finishMsg"
        @load="onLoad"
      >
        <comment-single
          :comment="comment"
          v-for="comment in comments"
          :key="comment.commentId"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { orderList } from '@/data/OrderTypeData'
import CommentSingle from './CommentSingle'
import { listCommentRoot } from '@/api/comment'

export default {
  name: 'comment-list',
  components: { CommentSingle },
  computed: {
    getNowOrder () {
      return this.orders.filter(order => order.orderId === this.nowOrderId)
    }
  },
  created () {
    const articleView = this.$store.state.articleView
    if (articleView === null) {
      this.$router.back()
    }
    this.articleId = articleView.articleId
  },
  data () {
    return {
      articleId: null,
      pageInfo: {
        page: 1,
        size: 10
      },
      // 回复列表下拉加载
      replyLoadStatus: {
        isLoading: false,
        isFinished: false
      },
      // 评论列表上拉加载更多 list
      loadStatus: {
        isLoading: false,
        finished: false,
        finishMsg: '已经到底咯',
        immediateCheck: true
      },
      // 评论列表下拉刷新
      refreshStatus: {
        isRefreshing: false,
        successMsg: '刷新成功'
      },
      // 第一级状态栏
      replyStatus: {
        isShowingReply: false,
        replys: null,
        parentComment: null
      },
      nowOrderId: 0,
      orders: orderList,
      comments: []
    }
  },
  methods: {
    // 上拉刷新
    async onRefresh () {
      this.refreshStatus.isRefreshing = false
      this.refreshStatus.successMsg = '刷新成功'
    },
    // 下拉加载更多
    async onLoad () {
      const res = await listCommentRoot({
        articleId: this.articleId,
        order: this.nowOrderId,
        ...this.pageInfo
      })
      if (res.code === 200) {
        const data = res.result.records
        if (data.length === 0) {
          this.loadStatus.finished = true
        }
        this.comments.push(...data)
      }
      this.loadStatus.isLoading = false
      this.loadStatus.finished = true
      // this.loadStatus.finishMsg = res.message
    }
  }
}
</script>

<style scoped lang="scss">
.comment-list-container{
  background-color: #fff;
  .order {
    padding: 0 10px;
    height: 35px;
    line-height: 35px;
    .order-title {
      color: #7D7D7D;
    }
    .order-content {
      color: #212121;
    }
  }
}
</style>
