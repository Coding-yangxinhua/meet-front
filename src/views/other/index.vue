<template>
  <div class="other-container">
    <van-nav-bar class="tm-nav-bar"
                 left-arrow
                 @click-left="$router.back()"
                 :title="user.nickname"
    />
    <div class="base">
      <!--  用户信息框  -->
      <van-row class="base-info">
        <!--  用户头像  -->
        <van-col span="8" class="flex j-center avatar">
          <van-image
            class="user-avatar"
            round
            fit="cover"
            :src="user.avatar"
          />
        </van-col>
        <!--  用户基础信息  -->
        <van-col span="16">
          <!--  用户粉丝、关注、获赞数、  -->
          <van-row class="text-center info">
            <van-col span="8" @click="toFriendView(1, userId, user.nickname)">
              <div class="user-info-num">{{ user.fanSum }}</div>
              <div class="user-info-label">粉丝</div>
            </van-col>

            <van-col span="8" class="border-row" @click="toFriendView(0, userId, user.nickname)">
              <div class="user-info-num">{{ user.followSum }}</div>
              <div class="user-info-label">关注</div>
            </van-col>

            <van-col span="8">
              <div class="user-info-num">{{ user.likeTotal }}</div>
              <div class="user-info-label">获赞</div>
            </van-col>
          </van-row>
          <van-row class="action-pane" v-if="!user.isSelf">
            <!--  关注按钮  -->
            <van-col class="right-pane" v-if="!user.isSelf">
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
            <van-col class="chat-pane">
              <van-button
                type="primary"
                class="btn-pane"
                text="聊天"
                @click.stop="toChat"
              ></van-button>
            </van-col>
          </van-row>

        </van-col>
      </van-row>
    </div>
    <div class="nav">
      <van-tabs background="#FAFAFA" v-model="active" sticky swipeable>
        <van-tab title="主页">
          <other-home></other-home>
        </van-tab>
        <van-tab title="动态">
          <other-article :query-id="userId"></other-article>
        </van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
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
import { getUserBase } from '@/api/user'
import OtherArticle from '@v/other/components/OtherArticle'
import OtherHome from '@v/other/components/OtherHome'
import { Toast } from 'vant'
import { changeBlock, changeStatus } from '@/api/userRelation'
import { Relations } from '@/data/UserRelation'
export default {
  name: 'other',
  created () {
    this.userId = this.$store.state.otherView.userId
    this.getUserInfo()
  },
  components: {
    OtherArticle,
    OtherHome
  },
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
  data () {
    return {
      active: 0,
      userId: null,
      selfInfo: this.$store.state.userInfo,
      user: {
        nickname: ''
      },
      showPop: false,
      actions: [
        { name: '拉黑' },
        { name: '取消关注' }
      ]
    }
  },
  methods: {
    toFriendView (type, queryId, nickname) {
      this.$router.push({
        name: 'friend',
        params: {
          type,
          queryId,
          nickname
        }
      })
    },
    async getUserInfo () {
      const res = await getUserBase(this.userId)
      if (res.code === 200) {
        this.user = res.result
      }
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
    },
    toChat () {
      this.$router.push({
        name: 'letter-chat',
        params: {
          destUser: this.user
        }
      })
    }
  }

}
</script>

<style scoped lang="scss">
.other-container {
  .base {
    box-sizing: border-box;
    justify-content: end;
    height: 260px;
    .action-pane {
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
      .chat-pane {
        margin-left: 30px;
        display: flex;
        align-items: center;
        height: 60px;
        width: 80px;
        .btn-pane {
          width: 80px;
          height: 25px;
          border-radius: 15px;
        }
      }
    }

    // 登录
    .base-info{
      box-sizing: border-box;
      padding-top: 150px;

    }
    // 头像部分
    .avatar{
      .user-avatar {
        width: 75px;
        height: 75px;
        border: 1px solid white;
      }
    }
    // 信息部分
    .info{
      .user-info-num {
        color: #303030;
        font-weight: bold;
        font-size: 18px;
      }

      .user-info-label {
        color: #7D7D7D;
        font-size: 13px;
      }
    }
    .van-row{
      background-color: #FAFAFA;
    }
    // 编辑部分
    .edit-pane{
      padding: 15px 10px;
      .edit-btn{
        height: 35px;
        background-color: #FAFAFA;
        border: 1px solid #E1E1E1;
      }
    }

  }
  .nav{
    margin-bottom: 10px;
  }
}
</style>
