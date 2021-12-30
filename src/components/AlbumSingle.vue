<template>
  <div class="album-single-container">
    <div class="album flex-col">
      <div class="cover">
        <van-image
          class="cover-img"
          fit="cover"
          round
          lazy-load
          :src="photoAlbum.cover"/>
      </div>
      <div class="info flex-col">
        <div class="title">{{photoAlbum.albumTitle}}</div>
        <div class="basic flex">
          <div class="photo_sum">{{photoAlbum.photoSum}} 张</div>
          <div v-if="photoAlbum.privateInfo.level !== 0 " class="private">{{photoAlbum.privateInfo.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { albumList } from '../data/AlbumData'
import { Lazyload } from 'vant'
import Vue from 'vue'

Vue.use(Lazyload)
export default {
  name: 'album-single',
  props: {
    photoAlbum: {
      // required: true,
      default: () => {
        return albumList[0]
      }
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
 .album-single-container {
   .album{
     width: 100%;
     height: 100%;
     .cover{
       .cover-img {
         width: 170px;
         height: 170px;
       }
       .van-image--round {
         border-radius: 5px;
       }
     }
     .info {
       .title {
         font-size: 16px;
         line-height: 25px;
         font-weight: bolder;
       }
       .basic {
         font-size: 14px;
         line-height: 20px;
         color: #737373;
         .private {
           margin-left: 5px;
         }
       }
     }
   }
 }
</style>
