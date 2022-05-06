<template>
  <div class="flex-col">
    <van-row>
      <div class="flex center">
        <div style="flex: 20;">
          <van-field
            class="send-reply-field input-box"
            :border="true"
            @focusout="resetPos"
            :placeholder="getPlaceHolder"
            type="textarea"
            :autosize="{maxHeight: 120}"
            rows="1"
            maxlength="300"
            v-model="fromReply.content"
          />
        </div>
        <div :class="{'special-blue': '' !== fromReply.content}"
             style="flex: 4"
             class="send-reply-btn flex center"
             @click.stop="uploadCommentChild">
          发布
        </div>
      </div>
      <van-row class="toolbar-box">
        <van-icon class="smile" @click="toolbarStatus.showEmoji = !toolbarStatus.showEmoji" name="smile" />
      </van-row>
    </van-row>
    <van-row>
      <emoji-tool-bar :show-emoji-box="toolbarStatus.showEmoji"
                      @selectEmoji="selectEmoji"
                      @deleteEmoji="deleteEmoji"
                      :pos="inputPos"
                      :input="fromReply.content"
      ></emoji-tool-bar>
    </van-row>
  </div>
</template>

<script>
import EmojiToolBar from './EmojiToolBar'
import { createComment } from '@/api/comment'
import { Toast } from 'vant'
export default {
  name: 'comment-reply-box',
  components: { EmojiToolBar },
  props: {
    toReply: {
      required: true,
      type: Object
    },
    showEmoji: {
      default () {
        return false
      }
    }
  },
  computed: {
    getPlaceHolder () {
      let nickname = null
      if (this.toReply.user != null) {
        nickname = this.toReply.user.nickname
      }
      if (nickname == null) {
        return '发一条友善的评论'
      }
      return '回复@ ' + nickname + ':'
    }
  },
  created () {
    this.toolbarStatus.showEmoji = this.showEmoji
  },
  data () {
    return {
      inputPos: 0,
      toolbarStatus: {
        showEmoji: false
      },
      fromReply: {
        parentId: null,
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
      this.fromReply.content = input
      this.inputPos = pos
    },
    // 删除表情
    deleteEmoji (input, pos) {
      this.fromReply.content = input
      this.inputPos = pos
    },
    // 发布评论
    async uploadCommentChild () {
      const res = await createComment({
        content: this.fromReply.content,
        articleId: this.toReply.articleId,
        parentId: this.toReply.commentId
      })
      if (res.code === 200) {
        this.$emit('uploadComment')
      }
      Toast({
        message: res.message
      })
    }
  }
}
</script>

<style scoped lang="scss">
.smile {
  font-size: 24px;
  color: #eba60a;
}
.send-reply-field {
  padding-left: 10px;
  font-size: 16px;
}
.send-reply-btn {
  font-size: 16px;
  font-weight: bolder;
  height: 100%;
}
</style>
