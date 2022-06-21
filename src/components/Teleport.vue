<script>
export default {
  name: 'teleport',
  props: {
    to: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    disabled () {
      if (this.disabled) { // 把当前的DOM元素 向目标元素传送过去
        document.querySelector(this.to).appendChild(this.$el)
      } else { // 调用父组件的方法， 再将当前的DOM元素还原的原来的位置
        this.parent.toSourceDom(this.$el)
      }
    }
  },
  mounted () {
    if (this.disabled) document.querySelector(this.to).appendChild(this.$el)
  },
  /**
   *  render方法中，如果有变量得使用{}
   *  this.$scopedSlots.default() 表示预留一个插槽
   */
  render () {
    return <div class="Teleport">{this.$scopedSlots.default()}</div>
  }
}
</script>
<style scoped>
.Teleport {
  width: 100%;
  height: 100%;
}
</style>
