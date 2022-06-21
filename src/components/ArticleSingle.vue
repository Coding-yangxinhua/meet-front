<template>
  <div v-if="article" class="article-single">
    <lazy-component>
      <!--  头部信息：头像、发布信息、姓名-->
      <van-row class="header" >
        <van-col span="4" class="user-head flex center" @click.stop="toOtherHome">
          <van-image round fit="cover" :src="article.user.avatar"/>
        </van-col>
        <van-col span="12" class="msg-info">
          <div class="user-name">{{ article.user.nickname }}</div>
          <div class="date" >{{ formatDate }}</div>
        </van-col>
        <van-col span="7" class="extra flex">
          <div v-if="!isFollow" class="not_like flex" >
            <van-button round class="like_btn" @click.stop="followThisUser(article.user.userId)">+ 关注</van-button>
          </div>
        </van-col>
        <van-col span="1" class="extra_btn">
          <van-icon v-if="!article.user.isLike" @click="dislikeArticle" name="cross" />
          <van-icon v-else name="arrow-down" @click.stop="morePopShowing = true" />
        </van-col>
      </van-row>
      <!--  内容主体：文章及配图  -->
      <van-row class="content" @click.prevent="toArticleDetail">
        <van-row class="text">{{ article.content }}</van-row>
        <van-row class="image" gutter="5">
          <van-col  v-for="(image, index) in article.picList" :key="index">
              <van-image
                @click.stop="onShowImagePreview(index)"
                width="110"
                height="110"
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
          <span class="iconfont icon-like" :class="{ 'active-color': isLike }"></span>
          <span class="text">
          <span class="number like-number" v-if="article.likeSum > 0">{{ article.likeSum }}</span>
          <span class="text" v-else>点赞</span>
        </span>
        </van-col>
        <van-col span="8" class="flex center" @click="toArticleDetail">
          <span class="iconfont icon-comment"></span>
          <span class="text">
          <span class="number comment-number" v-if="article.commentSum > 0">{{ article.commentSum }}</span>
          <span class="text" v-else>评论</span>
        </span>
        </van-col>
        <van-col span="8" class="flex center">
          <span class="iconfont icon-repost"></span>
          <span class="text">
          <span class="star-number number" v-if="article.repostSum > 0">{{ article.repostSum }}</span>
          <span v-else>转发</span>
        </span>
        </van-col>
      </van-row>
    </lazy-component>
    <van-popup v-model="morePopShowing" get-container="body" round position="bottom">
        <van-cell icon-prefix="iconfont icon" icon="star" value="收藏" @click="starArticle" />
        <van-cell icon-prefix="iconfont icon" icon="cancleLike" value="取消关注" @click="unlikeUser" />
    </van-popup>
    <van-popup v-model="commentWriteStatus.isShowingWrite"
               position="bottom"
               get-container="#app"
               @close="commentWriteStatus.isShowEmoji = false"
               :style="{ 'min-height': '30px' }">
      <comment-reply-box
        :toReply="article"
        @uploadComment="uploadComment"
        :show-emoji="commentWriteStatus.isShowEmoji">
      </comment-reply-box>
    </van-popup>
    <own-image-preview v-if="article.picList != null"
                       :showImagePreview.sync="showImagePreview"
                       :images="article.picList"
                       :pos.sync="pos">
    </own-image-preview>
  </div>
</template>

<script>
import Vue from 'vue'
import { articleDateStyle } from '@/utils/DateFormatUtil'
import { Lazyload, Toast } from 'vant'
import { changeStatus } from '@/api/userRelation'
import { Relations } from '@/data/UserRelation'
import { statusChange } from '@u/OwnUtil'
import { changeArticleStatus } from '@/api/article'
import { mapMutations } from 'vuex'
import CommentReplyBox from '@c/CommentReplyBox'
import OwnImagePreview from '@c/OwnImagePreview'

Vue.use(Lazyload, {
  lazyComponent: true
})
export default {
  name: 'article-single',
  components: {
    OwnImagePreview,
    CommentReplyBox
  },

  computed: {
    isLike () {
      const articleStatus = this.article.articleStatus
      if (articleStatus === null) {
        return false
      }
      return articleStatus.likeStatus !== null && articleStatus.likeStatus === 1
    },
    isFollow () {
      const user = this.article.user
      if (this.selfInfo === null) {
        return false
      }
      return user.relation > 0 || user.userId === this.selfInfo.userId
    },
    formatDate () {
      return articleDateStyle(this.article.gmtCreate)
    },
    selfInfo () {
      return this.$store.state.userInfo
    }
  },
  props: {
    showReplyPane: {
      require: false,
      default () {
        return false
      }
    },
    article: {
      require: true,
      type: Object
    },
    index: {
      require: true
    }
  },
  data () {
    return {
      showImagePreview: false,
      pos: 0,
      morePopShowing: false,
      commentWriteStatus: {
        isShowingWrite: false,
        isShowEmoji: false,
        content: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setArticleView',
      'setOtherView'
    ]),
    async toOtherHome () {
      this.setOtherView({
        userId: this.article.user.userId
      })
      this.$router.push('other')
    },
    // 点赞文章
    async changeLikeStatus () {
      let articleStatus = this.article.articleStatus
      if (articleStatus === null) {
        articleStatus = {
          articleId: this.article.articleId,
          likeStatus: 1
        }
        this.article.articleStatus = articleStatus
      } else {
        articleStatus.articleId = this.article.articleId
        articleStatus.likeStatus = statusChange(articleStatus.likeStatus)
      }
      const res = await changeArticleStatus(articleStatus)
      if (res.code === 200) {
        const count = articleStatus.likeStatus === 0 ? -1 : 1
        this.article.likeSum += count
        this.article.articleStatus.likeStatus = articleStatus.likeStatus
      }
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
    async followThisUser (userId) {
      const res = await changeStatus(userId, Relations.FOLLOW)
      if (res.code === 200) {
        console.log(res)
        this.article.user.relation = Relations.FOLLOW
        Toast({
          duration: 1000,
          message: res.message
        })
      }
    },
    uploadComment () {
      this.commentWriteStatus.isShowingWrite = false
      this.commentWriteStatus.content = ''
      this.$router.go(0)
    },
    // 前往文章详情页
    toArticleDetail () {
      if (this.showReplyPane) {
        this.commentWriteStatus.isShowingWrite = true
        return
      }
      this.$router.push('article/detail')
      this.setArticleView({
        ...this.article
      })
    },
    // 不感兴趣按钮
    dislikeArticle () {
      this.$emit('dislikeArticle', this.article.articleId)
    },
    // 展示预览图片
    onShowImagePreview (index) {
      this.showImagePreview = true
      this.pos = index
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
