<template>
  <div>
    <van-row gutter="20" class="code-input-box flex j-center">
      <van-col
        v-for="(item, index) of size"
        :key="item">
        <van-field @keyup.native="keyUp($event, index)"
                   @keydown="keyUp($event, index)"
                   @focus.prevent="focusBox(index, true)"
                   @focusout="focusBox(index, false)"
                   ref="inputs"
                   class="code-input"
                   :class="{'code-input-full' : isFull(index)}"
                   :disabled="!isAble(index)"
                   :type="type"
                   maxlength="1"
                   v-model="code[index]"/>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { specialKeyCode } from '../data/SystemConstants'

export default {
  name: 'CodeBox',
  props: {
    size: {
      default () {
        return 4
      }
    },
    type: {
      default () {
        return 'text'
      }
    }
  },
  data () {
    return {
      code: [1, 2, 3, '']
    }
  },
  methods: {
    isFull (index) {
      return !this.isNull(this.code[index])
    },
    isAble (index) {
      if (index === 0) {
        return this.isNull(this.code[index])
      }
      if (this.isNull(this.code[index]) && !this.isNull(this.code[index - 1])) {
        return true
      }
      return false
    },
    keyUp (e, index) {
      const that = this
      const keyCode = e.keyCode
      if (keyCode === specialKeyCode.BACKSPACE) {
        index = index === 0 ? 0 : index - 1
        this.code.splice(index, 1, '')
      } else {
        console.log(that.$refs.inputs[index])
        index++
      }
      console.log(this.code)
      this.$nextTick(() => {
        that.$refs.inputs[index].focus()
      })
    },
    // 焦点事件
    focusBox (index, add = true) {
      console.log(index + '获得焦点')
      if (add) {
        this.$refs.inputs[index].$el.classList.add('code-input-focus')
      } else {
        this.$refs.inputs[index].$el.classList.remove('code-input-focus')
      }
    },
    // 检测验证码单元是否为空
    isNull (value, ...args) {
      for (const arg of args) {
        if (arg != null || arg !== '') {
          return false
        }
      }
      return value == null || value === ''
    }
  }
}
</script>

<style scoped lang="scss">
.code-input-box {
  .code-input {
    border-radius: 5px;
    width: 45px;
    height: 45px;
    background-color: #eeeaea;
    ::v-deep .van-field__control {
      background-color: transparent;
      font-size: 20px;
      text-align: center;
      color: white;
    }
    ::v-deep .van-field__control:disabled {
      -webkit-text-fill-color: white;
      color: white;
    }
  }

  .code-input-full {
    background-color: #fa8585;
    box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
  .code-input-focus {
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  }
}

</style>
