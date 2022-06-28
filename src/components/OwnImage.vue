<template>
  <div @click="show = true">
    <van-image :round="round" :fit="fit" :src="src"/>
    <own-image-preview
      :showImagePreview.sync="show"
      :images="[src]"
      pos="0"
    ></own-image-preview>
  </div>
</template>

<script>
import OwnImagePreview from '@c/OwnImagePreview'
export default {
  name: 'own-image',
  components: { OwnImagePreview },
  props: {
    src: {
      require: true
    },
    round: {
      require: false,
      default () {
        return false
      }
    },
    fit: {
      require: false,
      default () {
        return 'cover'
      }
    }
  },
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

</style>
