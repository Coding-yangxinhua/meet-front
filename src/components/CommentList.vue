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
import { orderList } from '../data/OrderTypeData'
import CommentSingle from './CommentSingle'
import { commentList } from '../data/CommentData'

export default {
  name: 'comment-list',
  components: { CommentSingle },
  props: {
  },
  computed: {
    getNowOrder () {
      return this.orders.filter(order => order.orderId === this.nowOrderId)
    }
  },
  data () {
    return {
      loadStatus: {
        isLoading: false,
        finished: false,
        finishMsg: '已经到底咯',
        immediateCheck: true
      },
      refreshStatus: {
        isRefreshing: false,
        successMsg: '刷新成功'
      },
      nowOrderId: 0,
      orders: orderList,
      comments: commentList
    }
  },
  methods: {
    // 上拉刷新
    async onRefresh () {
      // this.articleList.unshift(...simuRefreshArticleList)
      this.refreshStatus.isRefreshing = false
      this.refreshStatus.successMsg = '刷新成功'
    },
    // 下拉加载更多
    onLoad () {
      // this.articleList = this.articleList.concat(...simuLoadArticleList)
      this.loadStatus.isLoading = false
      if (this.comments.length > 15) {
        this.loadStatus.finished = true
        this.loadStatus.finishMsg = '已经到底了'
      }
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
