<template>
  <div class="meIsLogin">
    <van-nav-bar class="tm-nav-bar"
                 :title="user.nickName"
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
            <van-col span="8">
              <div class="user-info-num">{{ user.fanNum }}</div>
              <div class="user-info-label">粉丝</div>
            </van-col>

            <van-col span="8" class="border-row">
              <div class="user-info-num">{{ user.interestNum }}</div>
              <div class="user-info-label">关注</div>
            </van-col>

            <van-col span="8">
              <div class="user-info-num">{{ user.likeNum }}</div>
              <div class="user-info-label">获赞</div>
            </van-col>
          </van-row>
          <!--  修改信息按钮  -->
          <van-row class="edit-pane">
            <van-button
              class="edit-btn"
              round
              to="/user/profile"
              block>
              编辑信息
            </van-button>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <div class="nav">
      <van-tabs background="#FAFAFA" v-model="active" sticky swipeable>
        <van-tab title="主页">
          <me-home></me-home>
        </van-tab>
        <van-tab title="动态">
          <me-article></me-article>
        </van-tab>
        <van-tab title="浏览">
          <me-history></me-history>
        </van-tab>
      </van-tabs>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import meHome from '@/views/me/components/MeHome'
import meArticle from '@/views/me/components/MeArticle'
import meHistory from '@/views/me/components/MeHistory'

export default {
  name: 'me-is-login',
  components: {
    meHome,
    meArticle,
    meHistory
  },
  mounted () {
    console.log(this.user)
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="scss">
.meIsLogin {
  .base {
    box-sizing: border-box;
    justify-content: end;
    height: 260px;
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
