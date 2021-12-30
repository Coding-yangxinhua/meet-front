<template>
  <div class="album-container">
    <van-nav-bar title="相册" left-arrow @click-left="$router.back()" />
    <van-row class="albums-row" type="flex" justify="space-between">
      <van-col class="albums-col" @click="toCreateAlbum" v-if="user.userId == null">
        <div class="create-album flex">
          <van-icon name="photo-o" />
          <div>新建相册</div>
        </div>
      </van-col>
      <van-col class="albums-col" v-for="album in albums" :key="album.albumId" @click="toAlbumDetail(album.albumId, album.albumTitle)">
        <album-single :photo-album="album"></album-single>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import AlbumSingle from '../../components/AlbumSingle'
import { albumList } from '../../data/AlbumData'
import { mapMutations } from 'vuex'
export default {
  name: 'album-list',
  components: {
    AlbumSingle
  },
  created () {
  },
  data () {
    return {
      user: {
        userId: this.$route.params.userId
      },
      albums: albumList
    }
  },
  methods: {
    ...mapMutations([
      'resetAlbum'
    ]),
    // 创建相册
    toCreateAlbum () {
      this.resetAlbum()
      this.$router.push('/album/create')
    },
    // 去相册详情
    toAlbumDetail (albumId, albumTitle) {
      this.$router.push({
        name: 'album-detail',
        params: {
          albumId: albumId,
          albumTitle: albumTitle
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.albums-row {
  padding: 10px 10px;
  .albums-col {
    margin-bottom: 10px;
  }
  .create-album {
    color: #8f8c8c;
    .van-icon {
      font-size: 40px;
    }
    border-radius: 5px;
    background-color: #ededed;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 170px;
    height: 170px;
  }
}
</style>
