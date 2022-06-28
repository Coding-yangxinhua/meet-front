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
    <article-single :show-reply-pane="true" :article="article"></article-single>
    <van-tabs
      sticky
      lazy-render
      offset-top="46"
      v-model="active">
      <van-tab title="转发"></van-tab>
      <van-tab title="评论">
        <comment-list :articleId="articleId"></comment-list>
      </van-tab>
      <van-tab disabled title=""></van-tab>
      <van-tab title="点赞">

      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import ArticleSingle from '@/components/ArticleSingle'
import CommentList from './CommentList'
import { getArticleById } from '@/api/article'

export default {
  name: 'article-detail',
  components: { CommentList, ArticleSingle },
  created () {
    this.articleId = this.$route.query.articleId
    this.getArticleDetail(this.articleId)
  },
  data () {
    return {
      articleId: null,
      active: 1,
      article: null
    }
  },

  methods: {
    async getArticleDetail (articleId) {
      const res = await getArticleById({
        articleId
      })
      if (res.code === 200) {
        this.article = res.result
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
