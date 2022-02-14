<template>
  <div class="chat-container flex-col" v-if="user != null">
    <van-row>
      <van-nav-bar
        :left-text="user.nickname"
        left-arrow
        fixed
        @click-left="$router.back()">
        <template #right>
          <van-icon color="#646566" name="setting" size="20"/>
        </template>
      </van-nav-bar>
    </van-row>
    <div style="height: 58px"></div>
    <van-row class="not-like-box" v-if="!user.isLike">
      <van-col span="12" class="box-item flex center van-hairline--right">
        <van-row class="flex center">
          <van-col class="box-icon flex center">
            <van-icon class="iconfont" class-prefix='icon' name="bell-mute" />
          </van-col>
          <van-col class="flex-col center">
            <div class="content">不接受推送</div>
            <div class="label">通知正常接收</div>
          </van-col>
        </van-row>
      </van-col>
      <van-col span="12" class="box-item flex center">
        <div class="box-icon">
          <van-icon class="iconfont" class-prefix='icon' name="addLike"></van-icon>
        </div>
        <div class="">加关注</div>
      </van-col>
    </van-row>
    <van-row class="message-main" @click="showEmoji = false">
      <message-single v-for="message in messages"
                      :message="message"
                      :key="message.messageId"
                      :avatar="user.avatar"
                      :is-left="message.sendId !== user.userId"
      >
      </message-single>
    </van-row>
    <van-row class="flex-col">
      <div  class="message-box flex center">
        <van-col class="flex center" span="3">
          <van-icon name="photo" />
        </van-col>
        <van-col span="16">
          <van-field
            class="input-box"
            v-model="message.content"
            center
            :autosize="{maxHeight: 120}"
            maxlength="600"
            rows="1"
            type="textarea"
            placeholder="发个消息聊聊呗"
          >
            <template #button>
              <van-icon @click="showEmoji = !showEmoji" name="smile-o" />
            </template>
          </van-field>
        </van-col>
        <van-col span="5" class="flex center">
          <van-button :disabled="message.content === ''"
                      round
                      @click="sendMessage"
                      class="send-btn"
                      :class="{'send-btn-active': message.content !== ''}"
          >发送</van-button>
        </van-col>
      </div>
      <emoji-tool-bar
        :show-emoji-box="showEmoji"
        @selectEmoji="selectEmoji"
        @deleteEmoji="deleteEmoji"
        :pos="inputPos"
        :input="message.content"
      ></emoji-tool-bar>
    </van-row>
  </div>
</template>

<script>
import { userList } from '../../../data/UsersData'
import { messageList } from '../../../data/MessageJson'
import EmojiToolBar from '../../../components/EmojiToolBar'
import MessageSingle from '../../../components/MessageSingle'
import { mapMutations } from 'vuex'

export default {
  name: 'letter-chat',
  components: { MessageSingle, EmojiToolBar },
  created () {
    const userId = this.$route.params.userId
    this.user = userList.filter(user => user.userId === userId)[0]
    if (this.user === null || this.user === undefined) {
      this.$router.back()
    }
  },
  computed: {
    ...mapMutations(['getUserInfo'])
  },
  data () {
    return {
      own: null,
      user: null,
      inputPos: null,
      showEmoji: false,
      messages: messageList,
      message: {
        content: ''
      }
    }
  },
  methods: {
    // 当输入框失去焦点时，获取输入框光标位置
    resetPos (e) {
      this.inputPos = e.srcElement.selectionStart
    },
    // 选择表情
    selectEmoji (input, pos) {
      this.message.content = input
      this.inputPos = pos
    },
    // 删除表情
    deleteEmoji (input, pos) {
      this.message.content = input
      this.inputPos = pos
    },
    sendMessage () {
      this.message.content = ''
    }

  }
}
</script>

<style scoped lang="scss">
.chat-container {
  height: 100%;
}

.not-like-box {
  width: 100%;
  background-color: #ffffff;
  height: 55px;
  .box-item {
    height: 55px;
    .content {
      font-size: 15px;
      line-height: 20px;
    }
    .label {
      color: #939393;
      font-size: 13px;
      line-height: 20px;
    }
    .box-icon {
      ::v-deep .iconfont {
        font-size: 22px;
        color: #939393;
      }
      padding: 5px 8px;
    }
  }

}
.message-main {
  height: 100%;
  background-color: #f0f2f3;
}
.message-box {
  bottom: 0;
  left: 0;
  color: #AEB3B9;
  background-color: white;
  min-height: 54px;
  width: 100%;
  .van-col {
    height: 100%;
  }
  .van-icon-photo {
    font-size: 26px;
  }
  ::v-deep .van-field__button {
    display: flex;
    .van-icon-smile-o {
      font-size: 24px;
    }
  }
  .send-btn {
    height: 40px;
  }

}

</style>
