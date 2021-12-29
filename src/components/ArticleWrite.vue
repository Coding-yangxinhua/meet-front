<template>
  <div class="articleWrite">
    <normal-nav  title="动态" :finish="uploadArticle">
      <van-button round type="info" size="small">发表</van-button>
    </normal-nav>
    <div style="background-color:white;">
      <van-field
        v-model="article.content"
        rows="4"
        autosize
        type="textarea"
        placeholder="愿执笔为刃，乘风破浪"
        show-word-limit
      />
      <van-uploader v-model="article.imageList" multiple :max-count="9" />
    </div>
  </div>
</template>

<script>
import NormalNav from '@/components/NormalNav'
import { simuArticleList } from '@/data/ArticlesData'
import { userList } from '@/data/UsersData'
export default {
  name: 'article-write',
  components: { NormalNav },
  data () {
    return {
      article: {
        articleId: parseInt(Math.random()),
        content: '',
        userInfo: userList[0]
      }
    }
  },
  methods: {
    uploadArticle () {
      simuArticleList.push(this.article)
    }
  }
}
</script>

<style scoped lang="scss">
.van-uploader {
  padding: 0 10px 0 10px;
  ::v-deep .van-uploader__upload{
    width: 100px;
    height: 100px;
    .van-uploader__upload-icon {
      font-size: 30px;
    }
  }
}
::v-deep .van-button--small {
  padding: 0 16px;
}
::v-deep .van-uploader__preview {
  margin: 0 3px 3px 0;

}
::v-deep .van-uploader__preview-image {
  width: 100px;
  height: 100px;
}
.van-cell::after {
  border: none;
}
</style>
