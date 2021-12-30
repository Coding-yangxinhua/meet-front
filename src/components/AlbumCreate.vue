<template>
  <div class="albumCreateContainer">
    <van-nav-bar left-text="返回" title="新建相册" right-text="完成" @click-left="$router.back()" @click-right="addAlbum"></van-nav-bar>
    <van-field class="albumTitle" v-model="album.albumTitle" type="text" placeholder="填写相册名称" />
    <van-row class="private" @click="$router.push('/album/private')">
      <van-col class="privateText" span="4">权限</van-col>
      <van-col class="privateLevel" span="18">
        {{album.privateInfo.name}}
      </van-col>
      <van-col class="privateArrow" span="2">
        <van-icon class="arrow" name="arrow" />
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { albumList } from '../data/AlbumData'

export default {
  name: 'album-create',
  data () {
    return {
      album: this.$store.getters.getTempAlbum
    }
  },
  methods: {
    addAlbum () {
      albumList.push(this.album)
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="scss">
.albumTitle {
  font-size: 22px;
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
