<template>
  <div class="article-list">

    <van-list
      v-model="loadStatus.isLoading"
      :finished="loadStatus.finished"
      :finished-text="loadStatus.finishMsg"
      @load="onLoad"
    >
      <article-single v-for="(item, index) in articleList" :key="index" :article="item"></article-single>
    </van-list>
  </div>
</template>

<script>

import ArticleSingle from '@c/ArticleSingle'
import Vue from 'vue'
import { Popup } from 'vant'
import { getArticlesByHistory } from '@/api/article'
Vue.use(Popup)
export default {
  name: 'history-article-list',
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
      }
    }
  },
  methods: {

    // 下拉加载更多
    async onLoad () {
      const res = await getArticlesByHistory({
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
