<template>
  <div class="own-image-preview-container"
       >
    <teleport to="#app" v-show="showImagePreview">
      <v-touch @press="press">
        <van-image-preview
          v-model="show"
          :images="images"
          :start-position="pos"
        ></van-image-preview>
      </v-touch>
      <van-action-sheet
        v-model="showAction"
        closeable
        :actions="showActions"
        cancel-text="取消"
        @select="onSelect"
        close-on-click-action
      />
    </teleport>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { downloadImage } from '@u/DownLoadUtil'
import Teleport from '@c/Teleport'

export default {
  name: 'own-image-preview',
  components: {
    Teleport,
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  computed: {
    showActions () {
      const actions = []
      actions.push(this.actionSave)
      if (this.showDeletedText) {
        actions.push(this.actionDeleted)
      }
      return actions
    },
    show: {
      get () {
        return this.showImagePreview
      },
      set (v) {
        this.changeImagePreview(v)
      }
    }
  },
  props: {
    showImagePreview: {
      require: true,
      default () {
        return false
      }
    },
    images: {
      require: true
    },
    pos: {
      require: true
    },
    showDeletedText: {
      require: false,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      showAction: false,
      actionSave: { name: '保存', method: this.download },
      actionDeleted: { name: '删除', color: '#ee0a24', method: this.onDeleted }
    }
  },
  methods: {
    getContainer () {
      return document.querySelector('#app')
    },
    press () {
      this.showAction = true
    },
    download () {
      downloadImage(this.images[this.pos])
    },
    onSelect (e) {
      e.method.apply()
    },
    onDeleted () {
      this.$emit('onDeleted', this.pos)
      this.showImagePreview = false
    },
    changeImagePreview (v) {
      this.$emit('update:showImagePreview', v)
    }
  },
  watch: {
    show (value) {
      if (value) {
        this.showImagePreview = true
      }
      this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped>

</style>
