<template>
  <div class="chat-container flex-col" v-if="destUser != null">
    <van-row>
      <van-nav-bar
        :left-text="destUser.nickname"
        left-arrow
        fixed
        placeholder
        @click-left="$router.back()">
        <template #right>
          <van-icon color="#646566" name="setting" size="20"/>
        </template>
      </van-nav-bar>
    </van-row>
<!--    <van-row class="not-like-box" v-if="!destUser.isLike">-->
<!--      <van-col span="12" class="box-item flex center van-hairline&#45;&#45;right">-->
<!--        <van-row class="flex center">-->
<!--          <van-col class="box-icon flex center">-->
<!--            <van-icon class="iconfont" class-prefix='icon' name="bell-mute" />-->
<!--          </van-col>-->
<!--          <van-col class="flex-col center">-->
<!--            <div class="content">不接受推送</div>-->
<!--            <div class="label">通知正常接收</div>-->
<!--          </van-col>-->
<!--        </van-row>-->
<!--      </van-col>-->
<!--      <van-col span="12" class="box-item flex center">-->
<!--        <div class="box-icon">-->
<!--          <van-icon class="iconfont" class-prefix='icon' name="addLike"></van-icon>-->
<!--        </div>-->
<!--        <div class="">加关注</div>-->
<!--      </van-col>-->
<!--    </van-row>-->
    <van-row class="message-main" @click="showEmoji = false">
      <van-list
        direction="up"
        v-model="messageStatus.loading"
        :finished="messageStatus.finished"
        finished-text="没有更多了"
        @load="getMessages"
      >
        <message-single v-for="(message, index) in messages"
                        :class="{'latest-message': index === messages.length - 1}"
                        :message="message"
                        :key="message.messageId"
                        :avatar="message.srcId === srcUser.userId? srcUser.avatar:destUser.avatar"
                        :is-left="message.srcId === destUser.userId"
        >
        </message-single>
      </van-list>

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
            @blur="resetPos"
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
                      @click="onSendMessage"
                      class="send-btn"
                      :class="{'send-btn-active': message.content !== ''}"
          >发送</van-button>
        </van-col>
      </div>
      <emoji-tool-bar
        :show-emoji-box="showEmoji"
        :pos.sync="inputPos"
        :input.sync="message.content"
      ></emoji-tool-bar>
    </van-row>
  </div>
</template>

<script>
import EmojiToolBar from '../../../components/EmojiToolBar'
import MessageSingle from '../../../components/MessageSingle'
import { getMessageList, sendMessage } from '@/api/chat'

import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
export default {
  name: 'letter-chat',
  components: { MessageSingle, EmojiToolBar },
  created () {
    this.destUser = this.$route.params.destUser
    this.srcUser = this.$store.state.userInfo
    if (this.destUser === null || this.destUser === undefined) {
      this.$router.back()
    }
    this.initWebSocket()
  },
  data () {
    return {
      messageStatus: {
        loading: false,
        finished: false
      },
      destUser: null,
      srcUser: null,
      inputPos: null,
      showEmoji: false,
      messages: [],
      pageInfo: {
        page: 1,
        size: 10
      },
      message: {
        content: ''
      },
      enabled: true
    }
  },
  methods: {
    // WebSocket
    initWebSocket () {
      this.connection()
      const that = this
      // 断开重连机制,尝试发送消息,捕获异常发生时重连
      this.timer = setInterval(() => {
        try {
          that.stompClient.send('test')
        } catch (err) {
          console.log('断线了: ' + err)
          that.connection()
        }
      }, 5000)
    },

    /**
     * 连接后台ws
     */
    connection () {
      var _this = this
      const apiUrl = process.env.VUE_APP_BASE_URL
      // 建立连接对象
      const socket = new SockJS(`${apiUrl}/point`)
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket)
      this.stompClient.debug = null
      // 定义客户端的认证信息,按需求配置
      const headers = {
        Authorization: ''
      }
      // 向服务器发起websocket连接
      this.stompClient.connect(
        headers,
        function (res) {
          // 连接成功 订阅系统信息主题消息
          _this.stompClient.subscribe(`/user/${_this.srcUser.userId}:${_this.destUser.userId}/message`, function (msg) {
            _this.enabled = true
            _this.messages.push(JSON.parse(msg.body))
          })
        },
        function (error) {
          // 连接发生错误时的处理函数
          console.log(error)
        }
      )
    },

    /**
     * 发送消息
     */
    async onSendMessage () {
      const res = await sendMessage({
        srcId: this.srcUser.userId,
        destId: this.destUser.userId,
        content: this.message.content
      })
      if (res.code === 200) {
        this.enabled = true
        this.messages.push(res.result)
        this.message.content = ''
      }
    },

    async getMessages () {
      const res = await getMessageList({
        destId: this.destUser.userId,
        ...this.pageInfo
      })
      if (res.code === 200) {
        if (this.messages.length !== 0) {
          this.enabled = false
        }
        const records = res.result.records
        records.reverse()
        this.messages.unshift(...records)
        if (records.length < this.pageInfo.size) {
          this.messageStatus.finished = true
        }
        this.messageStatus.loading = false
        this.pageInfo.page = res.result.current + 1
      }
    },
    // 当输入框失去焦点时，获取输入框光标位置
    resetPos (e) {
      this.inputPos = e.srcElement.selectionStart
    },
    scrollToPosition () {
      if (document.getElementsByClassName('latest-message')[0] === undefined) {
        return
      }
      document.getElementsByClassName('latest-message')[0].scrollIntoView()
    }
  },
  watch: {
    messages () {
      this.$nextTick(function () {
        if (this.enabled) {
          this.scrollToPosition()
        }
      })
    }
  },
  beforeDestroy () {
    /**
     * 断开连接
     */
    if (this.stompClient) {
      this.stompClient.disconnect()
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
  height: 712px;
  background-color: #f0f2f3;
  .van-list{
    overflow: auto;
    height: 100%;
  }
}
.message-box {
  position: fixed;
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
