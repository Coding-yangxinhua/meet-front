<template>
  <div class="articleWrite">
    <van-nav-bar
      title="动态"
      left-arrow
      @click-left="$router.back()"
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
        <van-col span="20" class="limit-pane" @click="$router.push('/article/limit')">
          <van-col class="limit-text">
            {{ getDictLabel }}
          </van-col>
          <van-col class="limit-arrow">
            <van-icon class="arrow" name="arrow" />
          </van-col>
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
import EmojiToolBar from '@/components/EmojiToolBar'
import { createArticle } from '@/api/article'
import { Toast } from 'vant'
import { getItemsByType, ItemType } from '@/api/DictItem'
import { mapMutations } from 'vuex'
import { getDictLabelById } from '@u/OwnUtil'
export default {
  name: 'article-write',
  components: { EmojiToolBar },
  computed: {
    isNone () {
      return this.article.content === '' && this.picList.length === 0
    },
    getDictLabel () {
      return getDictLabelById(this.article.limitId, this.limits)
    }
  },
  created () {
    this.limits = this.$store.state.limits
    if (this.limits === null) {
      this.getLimit()
    }
  },
  data () {
    return {
      showEmojiBox: false,
      inputPos: 0,
      article: this.$store.state.localArticle,
      limits: null,
      picList: []
    }
  },
  methods: {
    ...mapMutations([
      'setLimits',
      'resetArticle'
    ]),
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
    async getLimit () {
      const res = await getItemsByType(ItemType.LIMIT)
      if (res.code === 200) {
        this.limits = res.result
        this.setLimits(this.limits)
      }
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
        this.resetArticle()
      }
      console.log(res)
      Toast({
        message: res.message
      })
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
