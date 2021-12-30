<template>
  <div class="comment-single-container">
    <van-row>
      <van-col span="4" class="avatarPane">
        <van-image :src="comment.user.avatar"/>
      </van-col>
      <van-col span="20" class="mainPane">
        <van-row class="header flex-col" >
          <div class="nickname">{{comment.user.nickname}}</div>
          <div class="date">{{comment.gmtCreate}}</div>
        </van-row>
        <van-row class="content">{{comment.content}}</van-row>
        <van-row class="function">
          <van-col span="4">
            <van-icon name="good-job-o" />
          </van-col>
          <van-col span="4">
            <van-icon name="good-job-o"  style=" transform:rotate(-180deg);"/>
          </van-col>
          <van-col span="4">
            <van-icon name="comment-o" />
          </van-col>
        </van-row>
        <van-row class="reply" v-if="comment.replyHot != null">
          <div class="flex reply-main" v-for="reply in comment.replyHot" :key="reply.commentId">
            <div class="reply-name">{{reply.user.nickname}}:&nbsp;</div>
            <div class="reply-content">{{reply.content}}</div>
          </div>
        </van-row>
      </van-col>
    </van-row>
    <van-divider />
  </div>
</template>

<script>
import { articleDateStyle } from '../utils/DateFormatUtil'

export default {
  name: 'comment-single',
  props: {
    comment: {
      required: true,
      type: Object
    }
  },
  computed: {
    formatDate () {
      return articleDateStyle(this.comment.gmtCreate)
    }
  }
}
</script>

<style scoped lang="scss">
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
  .content {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .function {
    margin-bottom: 5px;
  }
  .reply {
    max-height: 80px;
    padding: 10px 10px 0 10px;
    background-color: #e7e4e4;
    border-radius: 3px;
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
  }

}
</style>
