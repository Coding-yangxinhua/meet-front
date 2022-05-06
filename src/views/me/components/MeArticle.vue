<template>
  <div class="my-article">
    <single-article-list></single-article-list>
  </div>
</template>

<script>

import SingleArticleList from '@c/SingleArticleList'

export default {
  name: 'me-article',
  components: {
    SingleArticleList
  },
  methods: {
  }
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
