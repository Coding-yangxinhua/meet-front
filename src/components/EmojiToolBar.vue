<template>
  <div class="emoji-container">
    <transition name="van-slide-up">
      <div class="emoji-popup"
           v-show="showEmojiBox">
        <van-swipe class="emoji-swipe">
          <van-swipe-item v-for="boxIndex in boxNum" :key="boxIndex">
            <van-row class="emoji-row" v-for="heightIndex in (prop.height - 1)" :key="heightIndex">
              <van-col @click="selectEmojiChild(boxIndex, heightIndex, widthIndex)" :span="24/prop.width" v-for="widthIndex in prop.width" :key="widthIndex">
                {{emoji(boxIndex, heightIndex, widthIndex)}}
              </van-col>
            </van-row>
            <van-row class="emoji-row" :key="prop.height">
              <van-col @click="selectEmojiChild(boxIndex, prop.height, widthIndex)" :span="24/prop.width" v-for="widthIndex in (prop.width - 1)" :key="widthIndex">
                {{emoji(boxIndex, prop.height, widthIndex)}}
              </van-col>
              <van-col class="deleteCol" :span="24/prop.width" @click="deleteEmojiChild">
                <van-button class="deleteBtn" icon="cross" />
              </van-col>
            </van-row>
            <div style="line-height: 20px;height: 20px;width: 100%"></div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </transition>
  </div>
</template>

<script>
import { emojiList, emojiProp } from '@/data/EmojiJson'

export default {
  name: 'emoji-tool-bar',
  props: {
    showEmojiBox: {
      default () {
        return false
      }
    },
    pos: {
      default () {
        return 0
      }
    },
    input: {
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      prop: emojiProp,
      emojis: emojiList
    }
  },
  computed: {
    // 计算卡片数
    boxNum () {
      const size = Math.ceil(this.prop.sum / this.prop.width / this.prop.height)
      return Math.ceil((this.prop.sum + size) / this.prop.width / this.prop.height)
    },
    // 获得表情
    emoji () {
      return (index, height, width) => {
        index = (index - 1) * this.prop.width * this.prop.height - 1
        index = index < 0 ? 0 : index
        height = (height - 1) * this.prop.width
        width = width - 1
        const pos = index + height + width
        if (pos > this.emojis.length) {
          return ''
        }
        return this.emojis[pos]
      }
    }
  },
  methods: {
    // 删除表情
    deleteEmojiChild () {
      let tempInput = this.input
      let tempPos = this.pos === 1 ? 2 : this.pos
      // 若位置为0，则不执行删除
      if (this.pos === 0) {
        return
      }
      // 避免切割时造成表情变成?
      const preElementLength = tempInput[tempPos - 2].codePointAt(0) === 55357 ? 2 : 1
      // 分割并拼接字符串
      tempInput = tempInput.slice(0, this.pos - preElementLength) + tempInput.slice(this.pos)
      // 改变指向位置
      tempPos -= preElementLength
      this.$emit('deleteEmoji', tempInput, tempPos)
    },
    // 添加表情
    selectEmojiChild (index, height, width) {
      const value = this.emoji(index, height, width)
      let tempInput = this.input
      let tempPos = this.pos !== null ? this.pos : 0
      tempInput = tempInput.slice(0, tempPos) + value + tempInput.slice(tempPos, tempInput.length)
      tempPos += value.length
      this.$emit('selectEmoji', tempInput, tempPos)
    }
  }
}
</script>

<style scoped lang="scss">
.emoji-popup {
  .emoji-swipe {
    // 表情样式配置
    color: #fff;
    line-height: 45px;
    font-size: 25px;
    text-align: center;
    background-color: #f7f7f7;
    .emoji-row {
      height: 45px;
      line-height: 45px;
    }
    // 轮播图点的样式配置
    ::v-deep .van-swipe__indicators {
      .van-swipe__indicator {
        width: 7px;
        height: 7px;
        background-color: orangered;
      }
      .van-swipe__indicator--active {
        background-color: deepskyblue;
      }
    }
    .deleteCol {
      ::v-deep .van-button--normal {
        font-size: 18px;
      }
      display: flex;
      align-items: center;
      justify-content: center;
      height: 45px;
      .deleteBtn {
        width: 35px;
        height: 35px;
      }
    }

  }
}
</style>
