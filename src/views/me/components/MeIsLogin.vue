<template>
  <div class="meIsLogin">
    <van-nav-bar class="tm-nav-bar"
                 :title="user.nickname"
    />
    <image-cropper :show.sync="showImageCropper" aspect-ratio="1.5" @crop="crop"></image-cropper>
    <div class="base" :style="backImage !== undefined? backImage: ''" @click.prevent="showImageCropper=true">
      <!--  用户信息框  -->
      <van-row class="base-info" @click.stop>
        <!--  用户头像  -->
        <van-col span="8" class="flex j-center avatar">
          <own-image
            class="user-avatar"
            :src="user.avatar"
            :round="true"
          ></own-image>
        </van-col>
        <!--  用户基础信息  -->
        <van-col span="16">
          <!--  用户粉丝、关注、获赞数、  -->
          <van-row class="text-center info">
            <van-col span="8" @click="toFriendView(1, null, user.nickname)">
              <div class="user-info-num">{{ user.fanSum }}</div>
              <div class="user-info-label">粉丝</div>
            </van-col>

            <van-col span="8" class="border-row" @click="toFriendView(0, null, user.nickname)">
              <div class="user-info-num">{{ user.followSum }}</div>
              <div class="user-info-label">关注</div>
            </van-col>

            <van-col span="8">
              <div class="user-info-num">{{ user.likeTotal }}</div>
              <div class="user-info-label">获赞</div>
            </van-col>
          </van-row>
          <!--  修改信息按钮  -->
          <van-row class="edit-pane">
            <van-button
              class="edit-btn"
              round
              to="/me/profile"
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
import ownImage from '@c/OwnImage'
import ImageCropper from '@c/ImageCropper'
import { base64ToFile, file2Base64, getBase64Type } from '@u/OwnUtil'
import { updateBackground } from '@/api/user'

export default {
  name: 'me-is-login',
  components: {
    ImageCropper,
    meHome,
    meArticle,
    meHistory,
    ownImage
  },
  created () {
    this.backImage.backgroundImage = `url(${this.user.background})`
    console.log(this.backImage)
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      showImageCropper: false,
      image: null,
      active: 0,
      backImage: {
        backgroundRepeat: 'no-repeat',
        backgroundImage: null,
        backgroundSize: 'cover'
      }
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
    async changeBackground (e) {
      const file = e.target.files[0]
      this.image = await file2Base64(file)
      this.showImageCropper = true
    },
    async crop (src) {
      this.showImageCropper = false
      const name = 'background' + getBase64Type(src, '.')
      // 上传图片
      const file = {
        file: base64ToFile(src, name)
      }
      const res = await updateBackground(file)
      console.log(res)
      if (res.code === 200) {
        this.backImage.backgroundImage = `url(${src})`
      }
    }
  }
}
</script>

<style scoped lang="scss">
.meIsLogin {
  .base {
    position: relative;
    box-sizing: border-box;
    justify-content: end;
    height: 260px;
    // 登录
    .base-info{
      padding: 5px 0;
      background-image: linear-gradient(rgba(255, 255, 255, 0.8), rgba(247, 247, 247, 1));
      bottom: 0;
      width: 100%;
      position: absolute;
      box-sizing: border-box;
    }
    // 头像部分
    .avatar{
      .user-avatar {
        width: 75px;
        height: 75px;
        border: 1px solid white;
        border-radius: 50%;
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
