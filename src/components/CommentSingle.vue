<template>
  <div class="comment-single-container">
    <van-row @click="showReplyBox">
      <van-col @click.stop="toUserDetail(comment.user.userId)" span="4" class="avatarPane">
        <van-image fit="cover" :src="comment.user.avatar"/>
      </van-col>
      <van-col span="20" class="mainPane">
        <van-row class="header flex-col" >
          <div class="nickname">{{comment.user.nickname}}</div>
          <div class="date">{{formatDate}}</div>
        </van-row>
        <van-row class="flex content-row">
          <div @click.stop="toUserDetail" class="flex" v-if="showAtText">
            回复<div class="special-blue" @click.stop="toUserDetail(comment.replyUser.userId)">&nbsp;@{{comment.replyUser.nickname}}&nbsp;:</div>
          </div>
          <div ref="commentRef" class="content" :class="{'hidden-box': !status}">{{comment.content}}</div>
        </van-row>
        <van-row class="more"
                 v-if="status != null"
        >
          <div v-if="!status" @click.stop="status = true">展开</div>
          <div v-else @click.stop="status = false">收起</div>
        </van-row>
        <van-row class="function">
          <van-col @click.stop="likeComment" span="4">
            <van-icon name="good-job-o" :class="{'special-pink': isLike}"/>
            <span class="number comment-number" v-if="comment.likeSum > 0">{{ comment.likeSum }}</span>
          </van-col>
          <van-col @click.stop="dislikeComment" span="4">
            <van-icon name="good-job-o" :class="{'special-pink': isDislike}"  style=" transform:rotate(-180deg);"/>
            <span class="number comment-number" v-if="comment.dislikeSum > 0">{{ comment.dislikeSum }}</span>
          </van-col>
          <van-col @click.stop="replyComment" span="4">
            <van-icon name="comment-o" />
          </van-col>
          <van-col
            @click.stop="showDialog"
            v-if="showReply"
            class="dialog-text"
            span="12">
            查看对话
          </van-col>
        </van-row>
        <van-row
          @click.stop="showCommentReply"
          class="reply"
          v-if="showReplyText">
          <van-row class="flex reply-main" v-for="reply in comment.childrenComments" :key="reply.commentId">
            <div class="reply-name">{{reply.user.nickname}}:&nbsp;</div>
            <div class="reply-content" @click.stop="showCommentReply(reply.commentId)">{{reply.content}}</div>
          </van-row>
          <van-row class="more-reply" v-if="comment.commentSum > 3">
            <van-col class="count">共{{comment.commentSum}}条回复</van-col>
            <van-col class="right-arrow">&nbsp;></van-col>
          </van-row>
        </van-row>
      </van-col>
    </van-row>
    <van-divider />
    <van-popup v-model="commentWriteStatus.isShowingWrite"
               position="bottom"
               get-container="#app"
               @close="commentWriteStatus.isShowEmoji = false"
               :style="{ 'min-height': '30px' }">
      <comment-reply-box
        :toReply="comment"
        @uploadComment="uploadComment"
        :show-emoji="commentWriteStatus.isShowEmoji">
      </comment-reply-box>
    </van-popup>
    <van-popup v-if="showReplyText" v-model="replyStatus.isShowingReply"
               position="bottom"
               round
               get-container="#app"
               closeable
               :style="{ 'height': '60%' }">
      <comment-single :comment="comment" :is-root="false"></comment-single>
      <comment-single
        :comment="reply"
        v-for="reply in replyStatus.replyList"
        :key="reply.commentId"
      />
    </van-popup>
    <van-popup v-model="dialogStatus.isShowingDialog"
               position="bottom"
               round
               get-container="#app"
               duration="0.2"
               closeable
               :style="{ 'height': '60%' }">
      <comment-single :comment="dialogStatus.parentComment" :is-root="false"></comment-single>
      <comment-single
        v-for="reply in dialogStatus.replyList"
        :is-reply = false
        :comment="reply"
        :key="reply.commentId"
      />
    </van-popup>
  </div>
</template>

<script>
import { articleDateStyle } from '@u/DateFormatUtil'
import CommentReplyBox from './CommentReplyBox'
import { changeCommentStatus, listCommentChildren, listCommentSecond } from '@/api/comment'
import { statusChange } from '@u/OwnUtil'

export default {
  name: 'comment-single',
  components: { CommentReplyBox },
  props: {
    isRoot: {
      require: false
    },
    isReply: {
      require: false
    },
    comment: {
      required: true,
      type: Object
    }
  },
  computed: {
    formatDate () {
      return articleDateStyle(this.comment.gmtCreate)
    },
    // 展示@文本
    showAtText () {
      return this.comment.secondId !== null
    },
    // 展示 对话
    showReply () {
      if (this.isReply == null) {
        return this.comment.secondId !== null
      } else {
        return this.isReply
      }
    },
    // 是否点赞
    isLike () {
      const commentStatus = this.comment.commentStatus
      if (commentStatus === null) {
        return false
      }
      return commentStatus.likeStatus !== null && commentStatus.likeStatus === 1
    },
    // 是否点踩
    isDislike () {
      const commentStatus = this.comment.commentStatus
      if (commentStatus === null) {
        return false
      }
      return commentStatus.dislikeStatus !== null && commentStatus.dislikeStatus === 1
    },
    // 展示回复文本
    showReplyText () {
      if (this.isRoot == null) {
        return this.comment.firstId === null && this.comment.commentSum > 0
      } else {
        return this.isRoot
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      const commentHeight = this.$refs.commentRef.offsetHeight
      if (commentHeight > 75) {
        this.status = false
      }
    })
  },
  data () {
    return {
      status: null,
      dialogStatus: {
        isShowingDialog: false,
        replyList: null,
        parentComment: null
      },
      commentWriteStatus: {
        isShowingWrite: false,
        isShowEmoji: false,
        content: ''
      },
      replyStatus: {
        isShowingReply: false,
        replyList: null
      },
      pageInfo: {
        page: 1,
        size: 10
      }
    }
  },

  methods: {
    // 展示第一级弹窗
    async showCommentReply (pos = 0) {
      const res = await listCommentChildren({
        firstId: this.comment.commentId,
        page: this.pageInfo.page,
        size: this.pageInfo.size
      })
      if (res.code === 200) {
        this.replyStatus.replyList = res.result
        this.replyStatus.isShowingReply = true
      }
    },
    // 展示对话
    async showDialog () {
      console.log(this.comment)
      const res = await listCommentSecond({
        secondId: this.comment.secondId,
        ...this.pageInfo
      })
      if (res.code === 200) {
        const data = res.result
        this.dialogStatus.parentComment = data[0]
        this.dialogStatus.replyList = data.splice(1, data.length)
        this.dialogStatus.isShowingDialog = true
      }
    },
    // 点赞评论
    async likeComment () {
      let commentStatus = this.comment.commentStatus
      if (commentStatus === null) {
        commentStatus = {
          commentId: this.comment.commentId,
          likeStatus: 1
        }
        this.comment.commentStatus = commentStatus
      } else {
        commentStatus.commentId = this.comment.commentId
        commentStatus.likeStatus = statusChange(commentStatus.likeStatus)
      }
      const res = await changeCommentStatus(commentStatus)
      if (res.code === 200) {
        const count = commentStatus.likeStatus === 0 ? -1 : 1
        this.comment.commentStatus.likeStatus = commentStatus.likeStatus
        this.comment.likeSum += count
      }
    },
    // 点踩评论
    async dislikeComment () {
      let commentStatus = this.comment.commentStatus
      if (commentStatus === null) {
        commentStatus = {
          commentId: this.comment.commentId,
          dislikeStatus: 1
        }
        this.comment.commentStatus = commentStatus
      } else {
        commentStatus.commentId = this.comment.commentId
        commentStatus.dislikeStatus = statusChange(commentStatus.dislikeStatus)
      }
      const res = await changeCommentStatus(commentStatus)
      if (res.code === 200) {
        const count = commentStatus.dislikeStatus === 0 ? -1 : 1
        this.comment.commentStatus.dislikeStatus = commentStatus.dislikeStatus
        this.comment.dislikeSum += count
      }
    },
    // 回复评论
    replyComment () {
    },
    // 去用户页面
    toUserDetail (userId) {
      this.$router.push({
        name: 'other',
        params: {
          queryId: userId
        }
      })
    },
    // 显示消息回复框
    showReplyBox () {
      this.commentWriteStatus.isShowingWrite = true
    },
    //
    uploadComment () {
      this.commentWriteStatus.isShowingWrite = false
      this.$router.go(0)
    }
  }
}
</script>

<style scoped lang="scss">
.hidden-box{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;            /*设置p元素最大4行，父元素需填写宽度才明显*/
  text-overflow: ellipsis;
  overflow: hidden;
  /* autoprefixer: off */
  autoprefixer: on;
  /*因为代码环境的关系-webkit-box-orient被过滤掉了 autoprefixer 这个关键字可以免除被过滤的动作*/
  word-wrap:break-word;
  word-break:break-all;
}
.comment-single-container{
  .van-divider {
    border-color: #e1e2e3;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .avatarPane {
    padding: 8px;
    .van-image {
      width: 40px;
      height: 40px;
      ::v-deep img {
        border-radius: 50%;
      }
    }
    width: 56px;
  }
  .header {
    height: 50px;
    align-items: flex-start;
    justify-content: center;
    .nickname {
      font-size: 15px;
      color: #333333;
    }
    .date {
      font-size: 12px;
      line-height: 18px;
      color: #939393;
    }
  }
  .content-row {
    line-height: 30px;
    margin-bottom: 5px;
    .content {
      line-height: 30px;
      letter-spacing: 1px;
      font-size: 16px;

    }
  }
  .more {
    font-size: 15px;
    color: #438ca3;
  }
  .function {
    margin-bottom: 5px;
    line-height: 25px;
    .van-col {
      .van-icon {
        line-height: 25px;
        font-size: 18px;
      }
    }
    .dialog-text {
      font-size: 15px;
      color: darkgrey;
    }
  }
  .reply {
    //max-height: 100px;
    padding: 10px 10px 0 10px;
    background-color: #f5f1f1;
    border-radius: 3px;
    overflow: hidden;
    .reply-main {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 10px;
    }
    .reply-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .reply-name {
      color: #438ca3;
    }
    .more-reply {
      font-size: 15px;
      line-height: 15px;
      margin-bottom: 10px;
      .count {
        color: #438ca3;
      }
      .right-arrow {
        font-size: 12px;
        line-height: 15px;
        color: #939393;
      }
    }
  }

}
</style>
