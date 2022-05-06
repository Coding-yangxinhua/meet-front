<template>
  <div class="friend-user-single-container" >
    <van-row @click="toOtherHome">
      <van-col class="left-pain">
        <van-image fit="cover"
                   round
                   class="avatar-pane"
                   :src="user.avatar"
        />
      </van-col>
      <van-col class="main-pane">
        <van-row class="nickname-pane"> {{user.nickname}} </van-row>
        <van-row class="intro-pane" v-if="user.intro !== ''"> {{ user.intro }} </van-row>
      </van-col>
      <van-col class="right-pane">
        <van-button
          type="primary"
          @click.stop="showPop = true"
          v-if="user.isFollow"
                    class="btn-pane"
                    :text="getBtnText"
        ></van-button>
        <van-button
          type="primary"
          v-else
          class="follow-btn btn-pane"
          text="+ 关注"
          @click.stop="followUser"
        ></van-button>
      </van-col>
    </van-row>
    <van-action-sheet
      class="action-sheet-pane"
      v-model="showPop"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
    />
  </div>
</template>

<script>
import { changeBlock, changeStatus } from '@/api/userRelation'
import { Toast } from 'vant'
import { Relations } from '@/data/UserRelation'
import { mapMutations } from 'vuex'

export default {
  name: 'FriendUserSingle',
  computed: {
    getBtnText () {
      if (this.user.isFan && this.user.isFollow) {
        return '互相关注'
      }
      if (this.user.isFollow) {
        return '已关注'
      }
      return ''
    }
  },
  props: {
    user: {
      require: true
    }
  },
  data () {
    return {
      showPop: false,
      actions: [
        { name: '拉黑' },
        { name: '取消关注' }
      ]
    }
  },
  methods: {
    ...mapMutations([
      'setOtherView'
    ]),
    async toOtherHome () {
      this.setOtherView({
        userId: this.user.userId
      })
      this.$router.push('/other')
    },
    async followUser (status) {
      Toast({
        duration: 10000
      })
      const res = await changeStatus(this.user.userId, Relations.FOLLOW)
      if (res.code === 200) {
        this.user.isFollow = true
      }
      Toast({
        duration: 1000,
        message: res.message
      })
    },
    async onSelect (item, index) {
      Toast({
        duration: 10000
      })
      let res = null
      if (index === 0) {
        res = await changeBlock(this.user.userId, true)
      } else {
        res = await changeStatus(this.user.userId, Relations.NORMAL)
      }
      if (res.code === 200) {
        this.user.isFollow = false
      }
      Toast({
        duration: 1000,
        message: res.message
      })
    }
  }

}
</script>

<style scoped lang="scss">
.friend-user-single-container {
  padding: 0 15px;
  background-color: #fff;
  box-sizing: border-box;
  .left-pain {
    height: 60px;
    width: 60px;
    padding: 5px;
    .avatar-pane {
      width: 50px;
      height: 50px;
    }
  }
  .main-pane {
    padding: 0 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 197px;
    .nickname-pane {
      text-overflow:ellipsis;     // ⽤省略号
      overflow:hidden;    // 超出部分隐藏
      white-space:nowrap;    // ⽂本不换⾏，这样超出⼀⾏的部分被截取，显⽰
      width: 100%;
      height: fit-content;
      margin-bottom: 2px;
    }
    .intro-pane {
      text-overflow: ellipsis;     // ⽤省略号
      overflow: hidden;    // 超出部分隐藏
      white-space: nowrap;    // ⽂本不换⾏，这样超出⼀⾏的部分被截取，显⽰
      width: 100%;
      height: fit-content;
      font-size: 14px;
      color: #818181;
      margin-top: 2px;
    }
  }
  .right-pane {
    height: 60px;
    display: flex;
    align-items: center;
    .btn-pane {
      height: 25px;
      width: 80px;
      font-size: 12px;
      background-color: transparent;
      border-radius: 15px;
      text-align: center;
      color: #7c7c7c;
    }
    .follow-btn {
        border-color: lightsalmon;
        color: lightsalmon;
        font-size: 12px;
        height: 25px;
        width: 80px;
    }
    .van-button--primary{
      border: 1px solid #D8D8D8;
    }
  }
  .action-sheet-pane {
    .van-action-sheet__cancel {
      color: #ee0a24;
    }
  }
}
</style>
