<template>
  <div class="articleDetail">
    <van-nav-bar
      title="正文"
      left-arrow
      left-text="首页"
      @click-left="$router.back()"
    />
    <article-list-single :article="article"></article-list-single>
    <comment-list></comment-list>
  </div>
</template>

<script>
import { simuArticleList } from '@/data/ArticlesData'
import ArticleListSingle from '@/components/ArticleListSingle'
import CommentList from './CommentList'

export default {
  name: 'article-detail',
  components: { CommentList, ArticleListSingle },
  created () {
    this.initArticle()
  },
  data () {
    return {
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
