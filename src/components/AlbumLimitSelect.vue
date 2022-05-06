<template>
  <div class="albumPrivateContainer">
    <van-nav-bar left-arrow
                 class="normal-nav"
                 title="谁能看见"
                 right-text="完成"
                 @click-left="$router.back()"
                 @click-right="changePrivate"></van-nav-bar>
    <van-radio-group v-model="album.limitId">
      <van-cell-group>
        <van-cell class="private-cell" v-for="limit in limits" :key="limit.dictId"
                  :title="limit.itemLabel"
                  clickable
                  @click="setPrivateLevel(limit.itemValue)">
          <template #right-icon>
            <van-icon class="private-select" name="success" v-show="limit.itemValue === album.limitId" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getItemsByType, ItemType } from '@/api/DictItem'

export default {
  name: 'article-limit-select',
  created () {
    this.limits = this.$store.state.limits
    if (this.limits === null) {
      this.getLimit()
    }
  },
  data () {
    return {
      limits: null,
      album: this.$store.state.localAlbum
    }
  },
  methods: {
    ...mapMutations([
      'setAlbum',
      'setLimits'
    ]),
    async getLimit () {
      const res = await getItemsByType(ItemType.LIMIT)
      if (res.code === 200) {
        this.limits = res.result
        this.setLimits(this.limits)
      }
    },
    setPrivateLevel (limitId) {
      this.album.limitId = limitId
    },
    changePrivate () {
      this.setAlbum(this.album)
      this.$router.go(-1)
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
