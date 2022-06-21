<template>
  <div class="albumCreateContainer">
    <van-nav-bar left-text="返回" title="新建相册" right-text="完成" @click-left="$router.back()" @click-right="uploadAlbum"></van-nav-bar>
    <van-field class="albumTitle" v-model="album.title" type="text" placeholder="填写相册名称" />
    <van-row class="private" @click="$router.push('/limit')">
      <van-col class="privateText" span="4">权限</van-col>
      <van-col class="privateLevel" span="18">
        {{ selectedLimit.itemLabel }}
      </van-col>
      <van-col class="privateArrow" span="2">
        <van-icon class="arrow" name="arrow" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getItemsByType, ItemType } from '@/api/DictItem'
import { Toast } from 'vant'
import { createAlbum } from '@/api/album'
import { mapMutations } from 'vuex'

export default {
  name: 'album-create',
  created () {
    this.selectedLimit = this.$store.state.selectedLimit
  },
  data () {
    return {
      selectedLimit: null,
      album: {
        title: ''
      }
    }
  },
  methods: {
    ...mapMutations([
      'setLimits'
    ]),
    async getLimit () {
      const res = await getItemsByType(ItemType.LIMIT)
      if (res.code === 200) {
        this.limits = res.result
        this.setLimits(this.limits)
      }
    },
    async uploadAlbum () {
      Toast.loading({
        duration: 10000,
        message: '发布中...'
      })
      const res = await createAlbum(this.album)
      if (res.code === 200) {
        this.$router.go(-1)
      }
      Toast({
        message: res.message
      })
    }
  }
}
</script>

<style scoped lang="scss">
.albumTitle {
  font-size: 20px;
}
.private {
  background-color: #fff;
  border-bottom: 1px solid #ebedf0;
  height: 35px;
  display: flex;
  align-items: center;
  .privateText {
    font-size: 18px;
    display: flex;
    justify-content: center;
  }
  .privateLevel {
    color: #7c7a7a;
    font-size: 14px;
    display: flex;
    justify-content: right;
  }
  .privateArrow {
    display: flex;
    justify-content: center;
    .arrow {
      font-size: 17px;
    }
  }
}
.van-cell::after {
  border: none;
}
</style>
