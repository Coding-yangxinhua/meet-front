<template>
  <div>
    <van-cell v-model="article.content"></van-cell>
    <emoji-tool-bar :showEmojiBox="this.showEmojiBox"
                    :pos.sync="inputPos"
                    :input.sync="article.content"
    >
    </emoji-tool-bar>
  </div>
</template>

<script>
import EmojiToolBar from '@c/EmojiToolBar'

export default {
  name: 'test',
  components: { EmojiToolBar },
  data () {
    return {
      showEmojiBox: true,
      inputPos: 0,
      article: {}
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
