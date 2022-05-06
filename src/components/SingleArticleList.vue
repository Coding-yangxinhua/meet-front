<template>
  <div class="article-list">
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
        <article-single v-for="(item, index) in articleList" :key="index" :article="item"></article-single>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="dislike.dislikePopShowing" get-container="body" round position="bottom">
      <van-cell-group inset>
        <van-cell icon-prefix="iconfont icon" icon="dislike" value="不感兴趣" />
        <van-cell icon-prefix="iconfont icon" icon="dislikeUser" value="不看此人"/>
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>

import ArticleSingle from '@c/ArticleSingle'
import Vue from 'vue'
import { Popup } from 'vant'
import { getArticlesByUid, refreshArticlesByUid } from '@/api/article'
Vue.use(Popup)
export default {
  name: 'home-article-list',
  components: {
    ArticleSingle
  },

  props: {
    userId: {
      required: false,
      default: null
    }
  },
  data () {
    return {
      dislike: {
        dislikePopShowing: false,
        dislikeArticleId: null
      },
      articleList: [],
      pageInfo: {
        page: 1,
        size: 10
      },
      loadStatus: {
        isLoading: false,
        finished: false,
        finishMsg: '已经到底咯',
        immediateCheck: true
      },
      refreshStatus: {
        isRefreshing: false,
        successMsg: '刷新成功'
      }
    }
  },
  methods: {
    // 上拉刷新
    async onRefresh () {
      const length = this.articleList.length
      const id = length > 0 ? this.articleList[0].articleId : null
      const res = await refreshArticlesByUid({
        queryId: this.userId,
        articleId: id,
        ...this.pageInfo
      })
      this.articleList.unshift(...res.result.records)
      this.refreshStatus.isRefreshing = false
      this.refreshStatus.successMsg = res.message
    },
    // 下拉加载更多
    async onLoad () {
      const length = this.articleList.length
      const id = length > 0 ? this.articleList[length - 1].articleId : null
      const res = await getArticlesByUid({
        queryId: this.userId,
        articleId: id,
        ...this.pageInfo
      })
      if (res.code === 200) {
        const data = res.result.records
        if (data.length === 0) {
          this.loadStatus.finished = true
        }
        this.articleList.push(...res.result.records)
      }
      this.loadStatus.isLoading = false
      this.loadStatus.finished = true
      // this.loadStatus.finishMsg = res.message
    }
  }
}
</script>

<style scoped>

.van-pull-refresh {
  overflow-y: scroll;
  height: 100%;
}
.van-list {
  /*height: 100%;*/
  /*overflow-y: scroll;*/
}
.article-list {
  background-color: #EEEEEE;
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: auto;
  bottom: 50px;
  top: 90px;
}
</style>
