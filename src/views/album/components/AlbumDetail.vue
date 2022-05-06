<template>
  <div>
    <van-nav-bar :title="album.title" left-arrow @click-left="$router.back()"/>
    <van-row class="photos-row">
      <van-col class="photos-col">
        <van-image
          v-for="(photo, index) in getFirst" :key="photo.photoId" @click="showImage(index * 3)"
          class="photo-img"
          fit="cover"
          lazy-load
          :src="photo.url"/>
      </van-col>
      <van-col class="photos-col" >
        <van-image
          v-for="(photo, index) in getSec" :key="photo.photoId" @click="showImage(1 + index * 3)"
          class="photo-img"
          fit="cover"
          lazy-load
          :src="photo.url"/>
      </van-col>
      <van-col class="photos-col">
        <van-image
          v-for="(photo, index) in getThird" :key="photo.photoId" @click="showImage(2 + index * 3)"
          class="photo-img"
          fit="cover"
          lazy-load
          :src="photo.url"/>
      </van-col>
    </van-row>
    <van-uploader
      multiple
      v-if="selfId === album.userId || album.userId === null"
      class="upload-photo-pane"
      :after-read="toPhotoUpload">
      <div class="upload-photo-btn">
        +
      </div>
    </van-uploader>
  </div>
</template>

<script>

import { ImagePreview, Lazyload } from 'vant'
import Vue from 'vue'
import { getPhotoListByAlbumId } from '@/api/album'
Vue.use(Lazyload)
export default {
  name: 'album-detail',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  created () {
    this.album = this.$store.state.albumView
    if (this.album === null) {
      this.$router.back()
    }
    this.getPhotosByAlbum()
  },
  computed: {
    getFirst () {
      let i = 0
      return this.photos.filter(() => i++ % 3 === 0)
    },
    getSec () {
      let i = 0
      return this.photos.filter(() => i++ % 3 === 1)
    },
    getThird () {
      let i = 0
      return this.photos.filter(() => i++ % 3 === 2)
    },
    getPhotoUrls () {
      return this.photos.map(photo => photo.url)
    }
  },
  data () {
    return {
      album: null,
      selfId: this.$store.state.userInfo.userId,
      userId: null,
      pageInfo: {
        page: 1,
        size: 10
      },
      photos: []
    }
  },
  methods: {
    showImage (pos) {
      ImagePreview({
        images: this.getPhotoUrls,
        startPosition: parseInt(pos)
      })
    },
    toPhotoUpload (files) {
      this.$router.push({
        name: 'album-photo-upload',
        params: {
          album: this.album,
          photoList: files
        }
      })
    },
    async getPhotosByAlbum () {
      const photoId = this.photos.length > 0 ? this.photos[length - 1].photoId : null
      const res = await getPhotoListByAlbumId({
        albumId: this.album.albumId,
        photoId,
        userId: this.userId,
        ...this.pageInfo
      })
      if (res.code === 200) {
        this.photos = res.result.records
      }
    }
  }
}
</script>

<style scoped lang="scss">
.photos-row {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  .photos-col {
    padding: 0 3px;
    .photo-img {
      width: 115px;
    }
  }
}
.upload-photo-pane {
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  .upload-photo-btn {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: white;
    border: none;
    box-shadow: 0 12px 5px -10px rgba(0,0,0,0.1), 0 0 4px 0 rgba(0,0,0,0.1);
    font-size: 30px;
    border-radius: 50%;
    background-color: lightblue;
  }
}

</style>
