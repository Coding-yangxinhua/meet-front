<template>
  <div>
    <teleport ref="teleport" to="#app" class="crop-container" v-show="src != null && !show">
      <input ref="backgroundInput" style="display:none" type="file" @change="changeBackground" accept="image/*">
      <div class="mask">
          <div class="image-pane">
            <img ref="img" class="preview-image" :src="src" alt="预览图片">
          </div>
        <div class="toolbar">
          <div class="cancel-btn" @click="back">
            <span>取消</span>
          </div>
          <div class="blank-btn">

          </div>
          <div class="cropper-btn" @click="crop">
            <span>确定</span>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import Teleport from '@c/Teleport'
import { file2Base64 } from '@u/OwnUtil'
export default {
  name: 'image-cropper',
  components: { Teleport },
  props: {
    show: {
      require: true,
      default () {
        return false
      }
    },
    aspectRatio: {
      require: false,
      default () {
        return 1
      }
    }
  },
  mounted () {
    this.initCropper()
  },
  data () {
    return {
      cropper: null,
      imageType: null,
      src: null
    }
  },
  methods: {
    async changeBackground (e) {
      const file = e.target.files[0]
      this.src = await file2Base64(file)
    },
    back () {
      this.src = null
    },
    crop () {
      const image = this.cropper.getCroppedCanvas({ imageSmoothingQuality: 'high' }).toDataURL(this.imageType)
      this.$emit('crop', image)
      this.back()
    },
    initCropper () {
      // 获得 image Dom元素
      const image = this.$refs.img
      if (this.cropper != null) {
        this.cropper.destroy()
      }
      // 初始化cropper
      this.cropper = new Cropper(image, {
        viewMode: 1, // 只能在裁剪的图片范围内移动
        dragMode: 'move', // 画布和图片都可以移动
        aspectRatio: this.aspectRatio, // 裁剪区默认正方形
        autoCropArea: 1, // 自动调整裁剪图片
        cropBoxMovable: false, // 禁止裁剪区移动
        cropBoxResizable: false, // 禁止裁剪区缩放
        background: false
      })
    }
  },
  watch: {
    src (value) {
      if (value != null) {
        this.imageType = value.split(';')[0].split(':')[1]
        this.$nextTick(() => {
          this.initCropper()
        })
      }
    },
    show (value) {
      if (value && this.src == null) {
        this.$refs.backgroundInput.click()
        this.$emit('update:show', false)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.image-pane{
  width: 100%;
}
.image{
  max-width: 100%;
  display: block;
}
.crop-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.mask {
  width: 100%;
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}
.preview-image {
  align-items: center;
  max-width: 100%;
  display: block;
}
.toolbar {
  width: 100%;
  position: fixed;
  bottom: 10px;
  left: 0;
  color: white;
  display: flex;
  .cancel-btn {
    height: 30px;
    line-height: 30px;
    text-align: center;
    flex: 1;
  }
  .blank-btn {
    flex: 3;
  }
  .cropper-btn{
    height: 30px;
    line-height: 30px;
    text-align: center;
    flex: 1;
  }
}
</style>
