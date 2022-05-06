<template>
  <div class="chat-single-container">
    <van-swipe-cell class="swipe" :class="{'topStyle': chat.isTop != null && chat.isTop}">
      <van-row>
        <van-col span="4" class="chat-avatar">
          <van-image height="50"
                     width="50"
                     fit="cover"
                     :src="chat.user.avatar"></van-image>
        </van-col>
        <van-col class="main" span="20">
          <van-row>
            <van-col span="18" class="chat-body">
              <van-row class="chat-nickname">
                {{ chat.user.nickname }}
              </van-row>
              <van-row class="chat-message hidden-line1">
                {{ chat.content }}
              </van-row>
            </van-col>
            <van-col span="6">
              <van-row class="chat-date">
                {{ getFormatTime }}
              </van-row>
              <van-row v-if="chat.isMute" class="chat-mute flex center">
                <van-icon class="iconfont" class-prefix='icon' name="bell-mute" />
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
      <template #right>
        <div class="flex right-row">
          <div @click="setTopChatChild" class="btn top-btn flex center">
            <span v-show="chat.isTop" class="text">取消置顶</span>
            <span v-show="!chat.isTop" class="text">置顶</span>
          </div>
          <div @click="deleteChatChild" class="btn delete-btn flex center">
            <span class="text">删除</span>
          </div>
        </div>
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import { articleDateStyle } from '@u/DateFormatUtil'

export default {
  name: 'chat-single',
  props: {
    chat: {
      required: true
    }
  },
  computed: {
    getFormatTime () {
      return articleDateStyle(this.chat.gmtModified)
    }
  },
  methods: {
    deleteChatChild () {
      this.$emit('deleteChat', this.chat.chatId)
    },
    setTopChatChild () {
      this.$emit('setTopChat', this.chat.chatId, !this.chat.isTop)
    }
  }
}
</script>

<style scoped lang="scss">

.chat-single-container {
  .topStyle {
    background-color: #f7f8fa;
  }
  .swipe {
    .van-swipe-cell__right {
      background-color: white;
      .right-row {
        background-color: white;
        height: 100%;
      }
      .btn {
        display: flex;
        align-items: center;
        width: 70px;
        height: 100%;
      }
      .text {
        font-size: 15px;
        color: white;
      }
      .top-btn {
        background-color: #d7d6d6;
      }
      .delete-btn {
        background-color: orangered;
      }
    }
  }
  .chat-avatar {
    padding: 7px 5px;
    ::v-deep .van-image__img {
      border-radius: 50%;
    }
  }
  .main {
    border-bottom: 1px solid #ebedf0;
    padding: 15px 0;
    .chat-body {
      .chat-message {
        padding-top: 3px;
        font-size: 15px;
        color: #424040;
      }
    }
    .chat-date {
      text-align: center;
      font-size: 13px;
      color: #7c7979;
    }
    .chat-mute {
      padding-top: 10px;
      .iconfont {
        color: #7c7979;
      }

    }
  }
}

</style>
