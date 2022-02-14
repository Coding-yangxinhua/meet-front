<template>
  <div class="comment-single-container">
    <van-row @click="showReplyBox">
      <van-col @click.stop="toUserDetail" span="4" class="avatarPane">
        <van-image :src="comment.user.avatar"/>
      </van-col>
      <van-col span="20" class="mainPane">
        <van-row class="header flex-col" >
          <div class="nickname">{{comment.user.nickname}}</div>
          <div class="date">{{comment.gmtCreate}}</div>
        </van-row>
        <van-row class="flex content-row">
          <div @click.stop="toUserDetail" class="flex" v-if="showAtText">
            回复<div class="special-blue">&nbsp;@{{comment.replyUser.nickname}}&nbsp;:</div>
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
            <van-icon name="good-job-o" :class="{'special-pink': comment.likeStatus}"/>
          </van-col>
          <van-col @click.stop="dislikeComment" span="4">
            <van-icon name="good-job-o" :class="{'special-pink': comment.dislikeStatus}"  style=" transform:rotate(-180deg);"/>
          </van-col>
          <van-col @click.stop="replyComment" span="4">
            <van-icon name="comment-o" />
          </van-col>
          <van-col
            @click.stop="showDialog"
            v-if="showDialogText"
            class="dialog-text"
            span="12">
            查看对话
          </van-col>
        </van-row>
        <van-row
          @click.stop="showCommentReply"
          class="reply"
          v-if="showReplyText">
          <van-row class="flex reply-main" v-for="reply in limitReplyHot" :key="reply.commentId">
            <div class="reply-name">{{reply.user.nickname}}:&nbsp;</div>
            <div class="reply-content" @click.stop="showCommentReply(reply.commentId)">{{reply.content}}</div>
          </van-row>
          <van-row class="more-reply" v-if="comment.replyHot.length > 3">
            <van-col class="count">共{{comment.replyHot.length}}条回复</van-col>
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
      <comment-single :comment="comment"></comment-single>
      <comment-single
        :comment="reply"
        :show-at-text="reply.parentId !== comment.commentId"
        :show-dialog-text="reply.parentId !== comment.commentId"
        v-for="reply in replyStatus.replyList"
        :key="reply.commentId"
      />
    </van-popup>
    <van-popup v-if="showDialogText" v-model="dialogStatus.isShowingDialog"
               position="bottom"
               round
               get-container="#app"
               duration="0.2"
               closeable
               :style="{ 'height': '60%' }">
      <comment-single :comment="dialogStatus.parentComment"></comment-single>
      <comment-single
        v-for="reply in dialogStatus.replyList"
        :show-at-text="true"
        :comment="reply"
        :key="reply.commentId"
      />
    </van-popup>
  </div>
</template>

<script>
import { articleDateStyle } from '../utils/DateFormatUtil'
import { replyList } from '../data/CommentData'
import CommentReplyBox from './CommentReplyBox'

export default {
  name: 'comment-single',
  components: { CommentReplyBox },
  props: {
    // 展示回复文本
    showReplyText: {
      default () {
        return false
      }
    },
    // 弹出对话文本
    showDialogText: {
      default () {
        return false
      }
    },
    // 展示@文本
    showAtText: {
      default () {
        return false
      }
    },
    comment: {
      required: true,
      type: Object
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
      }
    }
  },
  computed: {
    formatDate () {
      return articleDateStyle(this.comment.gmtCreate)
    },
    limitReplyHot () {
      return this.comment.replyHot.slice(0, 3)
    }
  },
  methods: {
    // 展示第一级弹窗
    showCommentReply (pos = 0) {
      this.replyStatus.isShowingReply = true
      this.replyStatus.replyList = replyList
    },
    // 展示对话
    showDialog () {
      this.dialogStatus.isShowingDialog = true
      this.dialogStatus.parentComment = replyList.filter(reply => reply.commentId === this.comment.parentId)[0]
      this.dialogStatus.replyList = replyList.filter(reply => reply.parentId === this.comment.parentId)
    },
    // 点赞评论
    likeComment () {
      this.comment.likeStatus = !this.comment.likeStatus
    },
    // 点踩评论
    dislikeComment () {
      this.comment.dislikeStatus = !this.comment.dislikeStatus
    },
    // 回复评论
    replyComment () {
    },
    // 去用户页面
    toUserDetail () {
    },
    // 显示消息回复框
    showReplyBox () {
      this.commentWriteStatus.isShowingWrite = true
    },
    //
    uploadComment () {
      this.commentWriteStatus.isShowingWrite = false
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
