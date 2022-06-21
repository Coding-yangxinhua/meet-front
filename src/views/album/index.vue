<template>
  <div class="album-container">
    <van-nav-bar title="相册" left-arrow @click-left="saveBeforeBack()" />
    <van-row class="albums-row" type="flex" justify="space-between">
      <van-col class="albums-col" @click="toCreateAlbum" v-if="userId == null">
        <div class="create-album flex">
          <van-icon name="photo-o" />
          <div>新建相册</div>
        </div>
      </van-col>
      <van-col class="albums-col" v-for="album in albums"  :key="album.albumId" @click="toAlbumDetail(album.albumId, album.title)">
        <album-single :photo-album="album"></album-single>
      </van-col>
    </van-row>
  </div>
</template>

<script>

import AlbumSingle from '../../components/AlbumSingle'
import { mapMutations } from 'vuex'
import { getAlbumsByUid } from '@/api/album'
export default {
  name: 'album-list',
  components: {
    AlbumSingle
  },
  created () {
    this.userId = this.$store.state.otherView.userId
    this.getAlbumListByUid()
  },
  data () {
    return {
      userId: null,
      albums: null
    }
  },
  methods: {
    ...mapMutations([
      'setAlbum',
      'setAlbumView'
    ]),
    async getAlbumListByUid () {
      const res = await getAlbumsByUid(this.userId)
      if (res.code === 200) {
        this.albums = res.result
      }
    },
    // 创建相册
    toCreateAlbum () {
      this.$router.push('/album/create')
    },
    // 去相册详情
    toAlbumDetail (albumId, title) {
      this.setAlbumView({
        albumId,
        title,
        userId: this.userId
      })
      this.$router.push('album/detail')
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
