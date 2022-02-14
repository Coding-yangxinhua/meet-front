<template>
  <div v-if="article" class="article-single">
    <lazy-component>
      <!--  头部信息：头像、发布信息、姓名-->
      <van-row class="header">
        <van-col span="4" class="user-head flex center">
          <van-image round fit="cover" :src="article.userInfo.avatar"/>
        </van-col>
        <van-col span="12" class="msg-info">
          <div class="user-name">{{ article.userInfo.nickname }}</div>
          <div class="date" >{{ formatDate }}</div>
        </van-col>
        <van-col span="7" class="extra flex">
          <div v-if="!article.userInfo.isLike" class="not_like flex" >
            <van-button round class="like_btn" @click="followThisUser">+ 关注</van-button>
          </div>
        </van-col>
        <van-col span="1" class="extra_btn">
          <van-icon v-if="!article.userInfo.isLike" @click="dislikeArticle" name="cross" />
          <van-icon v-else name="arrow-down" @click="morePopShowing = true" />
        </van-col>
      </van-row>
      <!--  内容主体：文章及配图  -->
      <van-row class="content" @click="toArticleDetail">
        <van-row class="text">{{ article.content }}</van-row>
        <van-row class="image" gutter="5">
          <van-col @click.stop="showImagePreview(article.imageList, index)" v-for="(image, index) in article.imageList" :key="index">
            <van-image
              width="115"
              height="115"
              fit="cover"
              lazy-load
              :src="image"
            />
          </van-col>

        </van-row>
      </van-row>
      <!--  尾部：点赞、评论、转发 -->
      <van-row class="footer">
        <van-col span="8" class="flex center" @click="changeLikeStatus">
          <span class="iconfont icon-like" :class="{ 'active-color': article.likeStatus }"></span>
          <span class="text">
          <span class="number like-number" v-if="article.likeNum > 0">{{ article.likeNum }}</span>
          <span class="text" v-else>点赞</span>
        </span>
        </van-col>
        <van-col span="8" class="flex center" @click="toArticleDetail">
          <span class="iconfont icon-comment"></span>
          <span class="text">
          <span class="number comment-number" v-if="article.commentNum > 0">{{ article.commentNum }}</span>
          <span class="text" v-else>评论</span>
        </span>
        </van-col>
        <van-col span="8" class="flex center">
          <span class="iconfont icon-repost"></span>
          <span class="text">
          <span class="star-number number" v-if="article.repostNum > 0">{{ article.repostNum }}</span>
          <span v-else>转发</span>
        </span>
        </van-col>
      </van-row>
    </lazy-component>
    <van-popup v-model="morePopShowing" get-container="body" round position="bottom">
        <van-cell icon-prefix="iconfont icon" icon="star" value="收藏" @click="starArticle" />
        <van-cell icon-prefix="iconfont icon" icon="cancleLike" value="取消关注" @click="unlikeUser" />
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { articleDateStyle } from '@/utils/DateFormatUtil'
import { ImagePreview, Lazyload } from 'vant'

Vue.use(Lazyload, {
  lazyComponent: true
})
export default {
  name: 'article-single',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  props: {
    article: {
      require: true,
      type: Object
    },
    index: {
      require: true
    }
  },
  computed: {
    formatDate () {
      return articleDateStyle(this.article.gmtCreate)
    }
  },
  data () {
    return {
      morePopShowing: false
    }
  },
  methods: {
    // 点赞文章
    changeLikeStatus () {
      this.article.likeStatus = !this.article.likeStatus
      if (this.article.likeStatus) {
        this.article.likeNum += 1
        return
      }
      this.article.likeNum -= 1
    },
    // 收藏文章
    starArticle () {
    },
    // 取消关注
    unlikeUser () {
      this.article.userInfo.isLike = false
      this.morePopShowing = false
    },
    // 关注
    followThisUser () {
      this.article.userInfo.isLike = true
      console.log(this.article.userInfo)
    },
    // 前往文章详情页
    toArticleDetail () {
      this.$router.push({ name: 'article-detail', params: { articleId: this.article.articleId } })
    },
    // 不感兴趣按钮
    dislikeArticle () {
      this.$emit('dislikeArticle', this.article.articleId)
    },
    // 展示文章图片
    showImagePreview (images, startPosition) {
      ImagePreview({
        images,
        startPosition
      })
    }
  }
}
</script>

<style scoped lang="scss">

.article-single {
  background-color: white;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  .header {
    height: 49px;
    .user-head {
      .van-image {
        box-sizing: border-box;
        border: 1px solid #ECECEC;
        width: 45px;
        height: 45px;
      }
    }
    .extra {
      height: 100%;
      padding-top: 5px;
      justify-content: center;
      display: flex;
      .not_like {
        .like_btn {
          border-color: lightsalmon;
          color: lightsalmon;
          font-size: 12px;
          height: 28px;
          width: 68px;
        }
      }
      .already_like {

      }
    }
    .extra_btn {
      ::v-deep .van-icon {
        color: #7D7D7D;
      }
    }
    .msg-info {
      padding: 5px;

      .user-name {
        font-size: 15px;
        color: #333333;
      }

      .date {
        font-size: 12px;
        line-height: 22px;
        color: #939393;
      }
    }

  }

  .content {
    padding-top: 3px;
    .text {
      line-height: 20px;
      color: #333333;
      font-size: 14px;
      margin-bottom: 5px;
      letter-spacing: 1px
    }
  }

  .footer {
    border-top: 1px solid #E6E6E6;
    height: 36px;
    text-align: center;
    margin-bottom: 10px;
    line-height: 36px;
    .van-col {
      color: #636363;
      height: 36px;
    }

    vertical-align: middle;

    .iconfont {
      color: #636363;
      font-size: 18px;
    }

    .text {
      font-size: 14px;
      margin-left: 3px;

      .number {
        font-size: 17px;
      }
    }
  }
}
</style>
