<template>
  <div class="my-article">
    <van-pull-refresh
      v-model="isPullDownLoading"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
      :success-duration="1000"
      :animation-duration="600">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <article-single v-for="item in articles" :key="item.articleId" :article="item"></article-single>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesByUid, refreshArticlesByUid } from '@/api/article'
import ArticleSingle from '@/components/ArticleSingle'

export default {
  name: 'me-article',
  components: {
    ArticleSingle
  },
  props: {
    uid: {
      required: true
    }
  },
  data () {
    return {
      articles: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      isPullDownLoading: false,
      refreshSuccessText: ''
    }
  },
  methods: {
    // 上拉刷新
    async onRefresh () {
      console.log(this.articles)
      if (this.articles.length === 0) {
        this.refreshSuccessText = '暂无更新'
        this.isPullDownLoading = false
        return
      }
      const res = await refreshArticlesByUid({
        newTime: Date.now(),
        oldTime: new Date(this.articles[0].createDate).getTime(),
        uid: this.uid
      })
      const articles = res.data.articles
      switch (res.code) {
        case 200:
          this.articles.unshift(...articles)
          this.timestamp = res.data.timestamp
          this.refreshSuccessText = `更新了${articles.length}篇文章`
          break
        case 404:
          this.refreshSuccessText = '已是最新内容'
          break
      }
      this.isPullDownLoading = false
    },
    // 下拉加载更多
    async onLoad () {
      // 异步更新数据
      if (this.uid === undefined) {
        return
      }
      const res = await getArticlesByUid({
        timestamp: this.timestamp,
        uid: this.uid
      })
      console.log(res)
      switch (res.code) {
        case 200:
          this.articles.push(...res.data.articles)
          this.timestamp = res.data.timestamp
          this.loading = false
          break
        case 404:
          this.finished = true
          break
      }
    }
  }
}
</script>

<style scoped>
.article-list {
  background-color: #EEEEEE;
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: auto;
  bottom: 50px;
  top: 350px;
}
</style>
