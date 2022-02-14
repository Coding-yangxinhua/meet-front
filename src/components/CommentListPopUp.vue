<template>
  <div class="popUp-container">
    <van-popup v-model="isShowing"
               position="bottom"
               round
               closeable
               :style="{ 'height': '60%' }">
      <van-list
        v-model="listStatus.isLoading"
        :finished="listStatus.isFinished"
        finished-text="没有更多了"
        @load="onLoad">
        <comment-single :comment="parentComment"></comment-single>
        <comment-single
          v-for="reply in listStatus.replyList"
          @showCommentReply="showCommentReply"
          :comment="reply"
          :show-dialog-text="reply.parentId !== parentComment.commentId"
          :key="reply.commentId"
        />
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import { replyList } from '../data/CommentData'

export default {
  name: 'comment-list-pop-up',
  props: {
    // 是否展示弹出框
    isShowing: {
      default () {
        return false
      }
    },
    // 是否展示评论回复弹出框
    showCommentReply: {
      default () {
        return false
      }
    },
    // 父评论
    parentComment: {
      required: true
    }
  },
  data () {
    return {
      // 列表状态
      listStatus: {
        // 是否加载列表
        isLoading: true,
        // 是否列表加载完毕
        isFinished: false,
        replyList: null
      }
    }
  },
  methods: {
    onLoad () {
      this.listStatus.replyList = replyList
      this.listStatus.isFinished = true
      this.listStatus.isLoading = false
    }
  }
}
</script>

<style scoped>

</style>
