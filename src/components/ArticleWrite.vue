<template>
  <div class="articleWrite">
    <normal-nav  title="动态" :finish="uploadArticle">
      <van-button round type="info" size="small">发表</van-button>
    </normal-nav>
    <div style="background-color:white;">
      <van-field
        class="content_box"
        @blur="resetPos"
        v-model="article.content"
        rows="4"
        autosize="true"
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
                    @deleteEmoji="deleteEmoji">
    </emoji-tool-bar>
  </div>
</template>

<script>
import NormalNav from '@/components/NormalNav'
import { simuArticleList } from '@/data/ArticlesData'
import { userList } from '@/data/UsersData'
import EmojiToolBar from '@/components/EmojiToolBar'
export default {
  name: 'article-write',
  components: { NormalNav, EmojiToolBar },
  data () {
    return {
      showEmojiBox: false,
      article: {
        articleId: parseInt(Math.random()),
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
    selectEmoji (value) {
      const tempInput = this.article.content
      const tempPos = this.inputPos
      if (this.inputPos == null) {
        this.article.content += value
        return
      }
      this.article.content = tempInput.slice(0, tempPos) + value + tempInput.slice(tempPos, tempInput.length)
      this.inputPos += value.length
    },
    deleteEmoji () {
      const tempInput = this.article.content
      const tempPos = this.inputPos === 1 ? 2 : this.inputPos
      // 若位置为0，则不执行删除
      if (this.inputPos === 0) {
        return
      }
      // 避免切割时造成表情变成?
      const preElementLength = tempInput[tempPos - 2].codePointAt(0) === 55357 ? 2 : 1
      // 分割并拼接字符串
      this.article.content = tempInput.slice(0, this.inputPos - preElementLength) + tempInput.slice(this.inputPos)
      // 改变指向位置
      this.inputPos -= preElementLength
    },
    uploadArticle () {
      simuArticleList.push(this.article)
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
