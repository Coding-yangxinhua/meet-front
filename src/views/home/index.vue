<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="tm-nav-bar">
      <template #title>
        <van-button class="search-btn flex" slot="title" round icon="search" />
      </template>
      <template #right>
        <van-badge content="99+">
          <van-icon class="nav-item" name="envelop-o" @click="$router.push('/letter/')" />
        </van-badge>
        <van-icon class="nav-item" name="edit" @click="$router.push('/article/write')"/>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs  swipeable>
      <van-tab v-for="item in channels" :title="item.channelName" :key="item.channelId">
        <article-list :channel="item"></article-list>
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>

import ArticleList from '../../components/ArticleList'
import { simuChannelList } from '@/data/ArticlesData'
export default {
  components: {
    ArticleList
  },
  data () {
    return {
      channels: {
        type: Array,
        require: true
      }
    }
  },
  created () {
    this.getArticleChannel()
  },
  methods: {
    async getArticleChannel () {
      this.channels = simuChannelList
    }
  }
}
</script>

<style scoped lang="scss">
  .home-container{
    ::v-deep .van-nav-bar__right {
      padding: 0;
      .van-icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .nav-item {
        font-size: 20px;
        width: 35px;
      }
    }
    .search-btn{
      max-width: 100%;
      width: 277px;
      height: 32px;
      background-color: #F4F4F4;
      justify-content: left;
      align-items: center;
      .van-button__text{
          color: #C0C0C0;
      }
      .van-icon{
        color: #C0C0C0;
      }
    }
    .van-popup {
      padding-top: 5px;
    }
  }
</style>
