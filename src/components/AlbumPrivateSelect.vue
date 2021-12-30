<template>
  <div class="albumPrivateContainer">
    <van-nav-bar left-arrow
                 class="normal-nav"
                 title="谁能看见"
                 right-text="完成"
                 @click-left="$router.back()"
                 @click-right="changePrivate"></van-nav-bar>
    <van-radio-group v-model="album.privateInfo.level">
      <van-cell-group>
        <van-cell class="private-cell" v-for="(privateInfo, index) in privates" :key="index"
                  :title="privateInfo.name"
                  clickable
                  @click="setPrivateLevel(privateInfo)">
          <template #right-icon>
            <van-icon class="private-select" name="success" v-show="privateInfo.level === album.privateInfo.level" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import { privateList } from '../data/privateData'
import { mapMutations } from 'vuex'

export default {
  name: 'album-private-select',
  data () {
    return {
      privates: privateList,
      album: {
        privateInfo: this.$store.getters.getTempAlbum.privateInfo
      }
    }
  },
  methods: {
    ...mapMutations([
      'setAlbum'
    ]),
    setPrivateLevel (privateInfo) {
      this.album.privateInfo = privateInfo
    },
    changePrivate () {
      this.setAlbum(this.album)
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.private-cell {
  height: 45px;
  font-size: 16px;
}
.private-select {
  font-size: 25px;
  color: deepskyblue;
}
</style>
