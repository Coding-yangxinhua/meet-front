<template>
  <div class="articleWrite">
    <van-nav-bar
      title="动态"
      left-arrow
      @click-left="saveBeforeBack()"
    >
      <template #right>
        <van-button :disabled="isNone"
                    round
                    @click="uploadArticle"
                    class="send-btn upload-btn"
                    :class="{'send-btn-active': !isNone}"
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
      <van-uploader v-model="picList" multiple :max-count="9" />
      <van-row class="toolbar">
        <van-col span="4" class="emojiBar" @click="showEmojiBox = !showEmojiBox">
          <van-icon name="smile"/>
        </van-col>
        <van-col span="20" class="limit-pane" @click="$router.push('/limit')">
          <van-col class="limit-text">
            {{ selectedLimit.itemLabel }}
          </van-col>
          <van-col class="limit-arrow">
            <van-icon class="arrow" name="arrow" />
          </van-col>
        </van-col>
      </van-row>
    </div>
    <emoji-tool-bar :showEmojiBox="this.showEmojiBox"
                    :pos.sync="inputPos"
                    :input.sync="article.content"
    >
    </emoji-tool-bar>
    <van-action-sheet
      v-model="showSheet"
      :actions="actions"
      @select="selectSheet"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script>
import EmojiToolBar from '@/components/EmojiToolBar'
import { createArticle } from '@/api/article'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
export default {
  name: 'article-write',
  components: { EmojiToolBar },
  computed: {
    isNone () {
      return this.article.content === '' && this.picList.length === 0
    }
  },
  created () {
    this.selectedLimit = this.$store.state.selectedLimit
    const localArticle = this.$store.state.localArticle
    this.picList = localArticle.picList == null ? [] : localArticle.picList
    this.article = localArticle.article == null ? { content: '' } : localArticle.article
  },
  data () {
    return {
      showEmojiBox: false,
      inputPos: 0,
      article: {
        content: ''
      },
      selectedLimit: null,
      picList: [],
      showSheet: false,
      actions: [{ name: '保存', func: this.save }, { name: '不保存', color: '#ee0a24', func: this.back }]
    }
  },
  methods: {
    ...mapMutations([
      'setLimits',
      'setLocalArticle'
    ]),
    // 当输入框失去焦点时，获取输入框光标位置
    resetPos (e) {
      this.inputPos = e.srcElement.selectionStart
    },
    async uploadArticle () {
      Toast.loading({
        duration: 10000,
        message: '发布中...'
      })
      this.article.limitId = parseInt(this.article.limitId) + 1
      const res = await createArticle(this.article, this.picList)
      if (res.code === 200) {
        this.$router.go(-1)
        this.setLocalArticle(null)
      }
      Toast({
        message: res.message
      })
    },
    // 选择动作面板
    selectSheet (e) {
      e.func.apply()
    },
    // 保存
    save () {
      this.setLocalArticle({
        article: this.article,
        picList: this.picList
      })
      this.$router.go(-1)
    },
    back () {
      this.setLocalArticle({})
      this.$router.go(-1)
    },
    // 退出时弹出提示框
    saveBeforeBack () {
      console.log(this.article.content)
      this.showSheet = (this.article.content != null && this.article.content !== '') || this.picList.length !== 0
      if (!this.showSheet) {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.content_box {
  font-size: 16px;
}
.toolbar {
  padding: 5px 10px;
  .emojiBar {
    font-size: 24px;
    color: #eba60a;
  }
  .limit-pane {
    display: flex;
    align-items: center;
    justify-content: right;
    .limit-text {
      font-size: 14px;
      color: #7c7a7a;
      text-align: center;
    }
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
