<template>
  <div class="albumCreateContainer">
    <van-nav-bar left-text="取消" title="传相片" right-text="上传" @click-left="$router.back()" @click-right="uploadPhoto"></van-nav-bar>
    <van-field class="albumTitle" v-model="desc" type="text" placeholder="为你的照片加点描述吧..." />
    <van-cell-group>
      <van-cell title="上传到" :value="album.title" />
    </van-cell-group>
    <van-uploader v-model="photoList" multiple :max-count="9" />

  </div>
</template>

<script>
import { Toast } from 'vant'
import { uploadPhotoListByAlbumId } from '@/api/album'

export default {
  name: 'album-photo-upload',
  created () {
    this.album = this.$route.params.album
    if (this.album === null) {
      this.$router.back()
    }
    if (this.albumId === null) {
      this.$router.back()
    }
    const photoList = this.$route.params.photoList
    if (photoList instanceof Array) {
      this.photoList = photoList
    } else {
      this.photoList.push(photoList)
    }
  },
  data () {
    return {
      album: null,
      desc: null,
      photoList: []
    }
  },
  methods: {
    async uploadPhoto () {
      Toast.loading({
        duration: 0,
        message: '发布中...'
      })
      const res = await uploadPhotoListByAlbumId(this.album.albumId, this.photoList)
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
