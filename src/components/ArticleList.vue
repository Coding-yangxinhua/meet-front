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
        <article-single @dislikeArticle="dislikeArticle" v-for="(item, index) in articleList" :key="index" :article="item"></article-single>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="dislike.dislikePopShowing" get-container="body" round position="bottom">
      <van-cell-group inset>
        <van-cell icon-prefix="iconfont icon" icon="dislike" value="不感兴趣" @click="dislikeAction" />
        <van-cell icon-prefix="iconfont icon" icon="dislikeUser" value="不看此人" @click="dislikeAction" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>

import { simuArticleList, simuLoadArticleList, simuRefreshArticleList } from '@/data/ArticlesData'
import ArticleSingle from '@/components/ArticleSingle'
import Vue from 'vue'
import { Popup } from 'vant'
Vue.use(Popup)
export default {
  name: 'article-list',
  components: {
    ArticleSingle
  },
  created () {
    this.initArticleList()
  },

  props: {
    channel: {
      required: true,
      default: 0
    }
  },
  data () {
    return {
      dislike: {
        dislikePopShowing: false,
        dislikeArticleId: null
      },
      articleList: [],
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
    // 不感兴趣
    dislikeArticle (articleId) {
      this.dislike.dislikePopShowing = true
      this.dislike.dislikeArticleId = articleId
    },
    // 点击不感兴趣
    dislikeAction () {
      this.articleList = this.articleList.filter(article => article.articleId !== this.dislike.dislikeArticleId)
      this.dislike.dislikePopShowing = false
      this.dislike.dislikeArticleId = null
    },
    // 初始化文章数据
    async initArticleList () {
      this.articleList = simuArticleList
    },
    // 上拉刷新
    async onRefresh () {
      this.articleList.unshift(...simuRefreshArticleList)
      console.log(this.articleList)
      this.refreshStatus.isRefreshing = false
      this.refreshStatus.successMsg = '刷新成功'
    },
    // 下拉加载更多
    onLoad () {
      this.articleList = this.articleList.concat(...simuLoadArticleList)
      this.loadStatus.isLoading = false
      if (this.articleList.length > 15) {
        this.loadStatus.finished = true
        this.loadStatus.finishMsg = '已经到底了'
      }
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
