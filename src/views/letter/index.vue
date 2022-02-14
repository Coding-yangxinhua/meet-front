<template>
  <div class="letter-container" style="height: 100%">
    <van-nav-bar
      title="消息"
      left-arrow
      @click-left="$router.back()">
      <template #right>
        <van-icon name="friends-o" size="24" />
      </template>
    </van-nav-bar>
    <van-grid
      :border="false"
      clickable>
      <van-grid-item style="color: #7ae10a" icon="smile-comment" text="回复我的" />
      <van-grid-item style="color: #ed4a1a" icon="fire" text="@我" />
      <van-grid-item style="color: #e85b6d" icon="good-job" text="收到的赞" />
      <van-grid-item style="color: #71b3f5" icon="volume" text="系统通知" />
    </van-grid>
    <van-cell style="font-size: 16px">聊天列表</van-cell>
    <van-list
      style="height: 100%"
      v-model="letterListStatus.loading"
      :finished="letterListStatus.isFinished"
      finished-text="没有更多了"
      @load="loadLetter"
    >
      <div v-for="chat in chats" :key="chat.chatId" @click="toChatDetail(chat.user.userId)">
        <chat-single
          @deleteChat="deleteChat"
          @setTopChat="setTopChat"
          :chat="chat"
        ></chat-single>
      </div>

    </van-list>
  </div>
</template>

<script>
import { chatList } from '../../data/LetterData'
import ChatSingle from '../../components/ChatSingle'

export default {
  name: 'letter',
  components: { ChatSingle },
  computed: {
    getChatList () {
      return this.chats
    }
  },
  data () {
    return {
      letterListStatus: {
        isLoading: false,
        isFinished: false
      },
      chats: chatList
    }
  },
  methods: {
    loadLetter () {
    },
    // 删除聊天
    deleteChat (chatId) {
      const pos = this.chats.findIndex(chat => chat.chatId === chatId)
      this.chats.splice(pos, 1)
    },
    // 置顶聊天
    setTopChat (chatId, isTop) {
      const tempChatList = this.chats
      const pos = tempChatList.findIndex(chat => chat.chatId === chatId)
      const chatFind = tempChatList.splice(pos, 1)[0]
      chatFind.isTop = isTop
      if (isTop) {
        tempChatList.unshift(chatFind)
      } else {
        const newPos = tempChatList.findIndex(chat => chat.upToDateMessage.gmtCreate <= chatFind.upToDateMessage.gmtCreate && !chat.isTop)
        tempChatList.splice(newPos, 0, chatFind)
      }
      this.chats = tempChatList
    },
    toChatDetail (userId) {
      this.$router.push({
        name: 'letter-chat',
        params: {
          userId: userId
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.letter-container {
  background-color: #fff;
}
::v-deep .van-grid-item__icon {
  font-size: 30px;
}
::v-deep .van-grid-item__text {
  font-size: 14px;
  color: #999797;
}
</style>
