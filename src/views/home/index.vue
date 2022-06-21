<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="tm-nav-bar">
      <template #title>
        <van-button class="search-btn flex" slot="title" round icon="search" />
      </template>
      <template #right>
        <van-badge content="99+">
          <van-icon class="nav-item" name="envelop-o" @click="toLetterView" />
        </van-badge>
        <van-icon class="nav-item" name="edit" @click="toArticleWriteView"/>
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs  swipeable>
      <van-tab v-for="item in channels" :title="item.itemLabel" :key="item.itemValue">
        <home-article-list class="home-list" :channel="item"></home-article-list>
      </van-tab>
    </van-tabs>
    <!-- /频道列表 -->
  </div>
</template>

<script>

import HomeArticleList from '@v/home/components/HomeArticleList'
import { mapGetters } from 'vuex'
import * as RouterUtil from '@u/RouterUtil'
import { getArticleChannel } from '@/api/channel'
export default {
  components: {
    HomeArticleList
  },
  created () {
    this.getArticleChannel()
  },
  data () {
    return {
      channels: null
    }
  },

  methods: {
    ...mapGetters([
      'isLogin'
    ]),
    toLetterView () {
      RouterUtil.push('/letter/')
    },
    toArticleWriteView () {
      RouterUtil.push('/article/write')
    },
    async getArticleChannel () {
      const res = await getArticleChannel()
      this.channels = res.result
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
