<template>
  <div class="articleDetail">
    <van-nav-bar
      title="正文"
      left-arrow
      left-text="首页"
      @click-left="$router.back()"
      fixed
      placeholder
    />
    <article-single :article="article"></article-single>
    <van-tabs
      sticky
      lazy-render
      offset-top="46"
      v-model="active">
      <van-tab title="转发"></van-tab>
      <van-tab title="评论">
        <comment-list></comment-list>
      </van-tab>
      <van-tab disabled title=""></van-tab>
      <van-tab title="点赞">

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { simuArticleList } from '@/data/ArticlesData'
import ArticleSingle from '@/components/ArticleSingle'
import CommentList from './CommentList'

export default {
  name: 'article-detail',
  components: { CommentList, ArticleSingle },
  created () {
    this.initArticle()
  },
  data () {
    return {
      active: 1,
      articleId: this.$route.params.articleId,
      article: null
    }
  },

  methods: {
    initArticle () {
      for (const article of simuArticleList) {
        if (article.articleId === this.articleId) {
          this.article = article
          console.log(this.article)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.articleDetail {
  height: 100%;

}
.van-tabs {
  height: 100%;
}
::v-deep .van-nav-bar__text {
  color: black;
  font-size: 16px;
}
::v-deep .van-nav-bar__arrow{
  color: black;
}
::v-deep .van-nav-bar__title {
  font-size: 18px;
}
</style>
