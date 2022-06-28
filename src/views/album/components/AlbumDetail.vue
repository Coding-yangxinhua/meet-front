<template>
  <div>
    <own-image-preview :show-deleted-text="true"
                       :images="photos.map(photo => photo.url)"
                       :show-image-preview.sync="show"
                       @onDeleted="onDeleted"
                       :pos.sync="pos"></own-image-preview>
    <van-nav-bar fixed placeholder v-if="album != null" :title="album.title"  left-arrow @click-left="$router.back()"/>

    <van-list
      v-model="isLoading"
      :finished="isFinished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-row class="photos-row">
        <van-col class="photos-col">
          <van-image
            v-for="(photo, index) in getFirst" :key="photo.photoId" @click="showImage(index * 3)"
            class="photo-img"
            lazy-load
            :src="photo.url"/>
        </van-col>
        <van-col class="photos-col" >
          <van-image
            v-for="(photo, index) in getSec" :key="photo.photoId" @click="showImage(1 + index * 3)"
            class="photo-img"
            lazy-load
            :src="photo.url"/>
        </van-col>
        <van-col class="photos-col">
          <van-image
            v-for="(photo, index) in getThird" :key="photo.photoId" @click="showImage(2 + index * 3)"
            class="photo-img"
            lazy-load
            :src="photo.url"/>
        </van-col>
      </van-row>
    </van-list>
    <transition name="van-slide-up">
      <div v-show="showOption">
      </div>
    </transition>
    <van-uploader
      multiple
      v-if="album != null && album.self"
      class="upload-photo-pane"
      :after-read="toPhotoUpload">
      <div class="upload-photo-btn">
        +
      </div>
    </van-uploader>
  </div>
</template>

<script>

import { Lazyload } from 'vant'
import Vue from 'vue'
import OwnImagePreview from '@c/OwnImagePreview'
import { deleteAlbumBatch, getAlbumById, getPhotoListByAlbumId } from '@/api/album'
Vue.use(Lazyload)
export default {
  name: 'album-detail',
  components: { OwnImagePreview },
  created () {
    this.album = {
      albumId: this.$route.query.albumId
    }
    this.getAlbum(this.album.albumId)
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
      pageInfo: {
        page: 1,
        size: 10
      },
      showOption: true,
      show: false,
      photos: [],
      pos: 0,
      isLoading: false,
      isFinished: false
    }
  },
  methods: {
    showImage (pos) {
      console.log('点击')
      console.log(this.photos)
      this.pos = parseInt(pos)
      this.show = true
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
    async getAlbum (albumId) {
      const res = await getAlbumById(albumId)
      if (res.code === 200) {
        this.album = res.result
      }
    },
    async getPhotosByAlbum (albumId) {
      const length = this.photos.length
      const photoId = length > 0 ? this.photos[length - 1].albumPhotoId : null
      const res = await getPhotoListByAlbumId({
        albumId,
        photoId,
        ...this.pageInfo
      })
      if (res.code === 200) {
        this.photos.push(...res.result.records)
        this.isLoading = false
        this.pageInfo.page++
        if (res.result.records.length === 0) {
          this.isFinished = true
        }
      }
    },
    onLoad () {
      this.getPhotosByAlbum(this.album.albumId)
    },
    swipeDown (e) {
      console.log('down')
      console.log(e)
    },
    swipeUp (e) {
      console.log('up')
    },
    async onDeleted (pos) {
      const albumIds = [this.photos[pos].albumPhotoId]
      const res = await deleteAlbumBatch(albumIds)
      if (res.code === 200) {
        this.photos.splice(pos, 1)
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
.album-list-container {
  height: 766px;
  overflow: scroll;
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
.touch {
  height: 766px;
  touch-action: pan-y !important;
}
</style>
