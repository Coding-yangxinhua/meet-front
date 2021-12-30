<template>
  <div>
    <van-nav-bar :title="album.albumTitle" left-arrow @click-left="$router.back()"/>
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
  </div>
</template>

<script>

import { photoList } from '../../../data/AlbumData'
import { ImagePreview, Lazyload } from 'vant'
import Vue from 'vue'
Vue.use(Lazyload)
export default {
  name: 'album-detail',
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component
  },
  created () {
    // this.album = albumList.filter(album => album.albumId === this.albumId)
    // console.log(albumList.filter(album => album.albumId === this.albumId))
    this.photos = photoList
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
      album: {
        albumId: this.$route.params.albumId,
        albumTitle: this.$route.params.albumTitle
      },
      photos: null
    }
  },
  methods: {
    showImage (pos) {
      ImagePreview({
        images: this.getPhotoUrls,
        startPosition: parseInt(pos)
      })
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
    .photo-img {
      width: 120px;
    }
  }
}

</style>
