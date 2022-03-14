<template>
  <div v-if="isLoading" class="loading">
    <van-loading size="36px" vertical>加载中...</van-loading>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'loading',
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>

<style scoped>

</style>
