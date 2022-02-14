<template>
  <div class="articleWrite">
    <van-nav-bar
      title="动态"
      left-arrow
      @click-left="$router.back()"
    >
      <template #right>
        <van-button :disabled="article.content === ''"
                    round
                    @click="uploadArticle"
                    class="send-btn upload-btn"
                    :class="{'send-btn-active': article.content !== ''}"
        >发送</van-button>
      </template>
    </van-nav-bar>
    <div style="background-color:white;">
      <van-field
        class="content_box"
        @blur="resetPos"
        v-model="article.content"
        rows="5"
        autosize
        type="textarea"
        placeholder="愿执笔为刃，乘风破浪..."
        show-word-limit
      />
      <van-uploader v-model="article.imageList" multiple :max-count="9" />
      <van-row class="toolbar">
        <van-col class="emojiBar" @click="showEmojiBox = !showEmojiBox">
          <van-icon name="smile"/>
        </van-col>
      </van-row>
    </div>
    <emoji-tool-bar :showEmojiBox="this.showEmojiBox"
                    @selectEmoji="selectEmoji"
                    @deleteEmoji="deleteEmoji"
                    :pos="inputPos"
                    :input="article.content"
    >
    </emoji-tool-bar>
  </div>
</template>

<script>
import { simuArticleList } from '@/data/ArticlesData'
import { userList } from '@/data/UsersData'
import EmojiToolBar from '@/components/EmojiToolBar'
export default {
  name: 'article-write',
  components: { EmojiToolBar },
  data () {
    return {
      showEmojiBox: false,
      inputPos: 0,
      article: {
        articleId: parseInt(Math.random() * 1000),
        content: '',
        userInfo: userList[0]
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
      this.article.content = input
      this.inputPos = pos
    },
    // 删除表情
    deleteEmoji (input, pos) {
      this.article.content = input
      this.inputPos = pos
    },
    uploadArticle () {
      this.article.gmtCreate = new Date()
      simuArticleList.unshift(this.article)
    }
  }
}
</script>

<style scoped lang="scss">
.content_box {
  font-size: 16px;
}
.toolbar {
  //background-color: #f8f6f6;
  padding: 5px 10px;
  .emojiBar {
    font-size: 24px;
    color: #eba60a;
  }
}
.upload-btn {
  height: 35px;
}
.van-uploader {
  padding: 0 10px 0 10px;
  ::v-deep .van-uploader__upload{
    width: 100px;
    height: 100px;
    .van-uploader__upload-icon {
      font-size: 30px;
    }
  }
}
::v-deep .van-button--small {
  padding: 0 16px;
}
::v-deep .van-uploader__preview {
  margin: 0 3px 3px 0;

}
::v-deep .van-uploader__preview-image {
  width: 100px;
  height: 100px;
}
.van-cell::after {
  border: none;
}
</style>
