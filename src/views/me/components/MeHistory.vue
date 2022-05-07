<template>
  <div class="history-article">
    <history-article-list></history-article-list>
  </div>
</template>

<script>
import HistoryArticleList from '@v/me/components/HistoryArticleList'
export default {
  name: 'my-history',
  components: { HistoryArticleList }
}
</script>

<style scoped>
.article-list {
  background-color: #EEEEEE;
  position: fixed;
  left: 0;
  right: 0;
  overflow-y: auto;
  bottom: 50px;
  top: 350px;
}
</style>
