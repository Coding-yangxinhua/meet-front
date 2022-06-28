<template>
  <div id="demo">
    <div>
      <div style="margin-top:20px;">
        <input type="file" id="change" accept="image" @change="show" />

        <image-cropper :show.sync="showImageCropper" :src.sync="src"></image-cropper>
      </div>
    </div>
  </div>
</template>

<script>
import ImageCropper from '@c/ImageCropper'
import { file2Base64 } from '@u/OwnUtil'
export default {
  components: { ImageCropper },
  data () {
    return {
      showImageCropper: false,
      src: null
    }
  },
  methods: {
    async show (e) {
      const file = e.target.files[0]
      this.src = await file2Base64(file)
      this.showImageCropper = true
    }
  }

}
</script>

<style scoped>

</style>
