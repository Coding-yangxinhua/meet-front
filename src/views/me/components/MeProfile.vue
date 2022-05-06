<template>
  <div class="user-profile">
    <van-nav-bar class="tm-nav-bar" left-arrow @click-left="$router.back()" title="我的资料"/>
    <div>
      <van-cell-group>

        <van-cell class="avatar-cell"
                  title="头像"
        >
          <template #right-icon>
            <van-uploader
              max-count="1"
              :after-read="updateAvatar"
            >
              <div class="flex center">
                <van-image
                  width="55"
                  height="55"
                  round
                  fit="cover"
                  :src="user.avatar"/>
                <van-icon class="van-cell__right-icon"  name="arrow" />
              </div>
            </van-uploader>
          </template>
        </van-cell>
        <van-cell title="昵称" is-link :value="user.nickname" @click= "toNicknameModified"/>
        <van-cell title="性别" @click="genderProp.showGenderPicker=true" is-link :value="gender" />
        <van-popup v-model="genderProp.showGenderPicker" round position="bottom">
          <van-picker
            show-toolbar
            title="性别"
            v-model="user.gender"
            :columns="genderProp.genderList"
            @cancel="onCancel"
            @confirm="onConfirmGender"
          />
        </van-popup>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="生日" is-link @click="birthProp.showBirthPicker=true" :value="birth"/>
        <van-popup v-model="birthProp.showBirthPicker" round position="bottom">
          <van-datetime-picker
            v-model="birthProp.currentDate"
            type="date"
            :min-date="birthProp.minDate"
            :max-date="birthProp.maxDate"
            @cancel="onCancel"
            @confirm="onConfirmBirth"
            title="生日"
          />
        </van-popup>
        <van-cell title="简介" />
        <van-field
          v-model="user.intro"
          rows="2"
          @blur="updateUserIntro"
          type="textarea"
          maxlength="300"
          placeholder="请输入个人介绍..."
          show-word-limit
        />
      </van-cell-group>

    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { Popup, Toast } from 'vant'
import { normalDate } from '@/utils/DateFormatUtil'
import { getUserInfo, updateAvatar, updateProfile } from '@/api/user'

Vue.use(Popup)
export default {
  name: 'user-profile',
  computed: {
    gender () {
      return this.user.gender === 0 ? '男' : '女'
    },
    birth () {
      return normalDate(this.user.birth)
    }
  },
  created () {
    this.getMyInfo()
  },
  data () {
    return {
      user: {
        type: Object
      },
      genderProp: {
        genderList: ['男', '女'],
        gender: '',
        showGenderPicker: false
      },
      birthProp: {
        showBirthPicker: false,
        maxDate: new Date(),
        minDate: new Date('1900-1-1'),
        currentDate: new Date('1990-1-1')
      }
    }
  },
  methods: {
    // 跳转到名称修改页面
    toNicknameModified () {
      this.$router.push({
        name: 'me-profile-nickname',
        params: {
          nickname: this.user.nickname
        }
      })
    },
    onCancel () {
      this.birthProp.showBirthPicker = false
      this.showGenderPicker = false
    },
    async updateUserIntro () {
      Toast.loading({
        duration: 5000,
        message: '保存中...'
      })
      const res = await updateProfile({
        intro: this.user.intro
      })
      Toast({
        message: res.message,
        duration: 1000
      })
    },
    async getMyInfo () {
      const res = await getUserInfo()
      if (res.code === 200) {
        this.user = res.result
        const birth = normalDate(this.user.birth)
        this.birthProp.currentDate = new Date(birth)
      }
    },
    // 生日
    async onConfirmBirth () {
      Toast.loading({
        duration: 5000,
        message: '保存中...'
      })
      this.birthProp.showBirthPicker = false
      const res = await updateProfile({
        birth: this.birthProp.currentDate.getTime()
      })
      if (res.code === 200) {
        this.user.birth = this.birthProp.currentDate.getTime()
      }
      Toast({
        message: res.message,
        duration: 1000
      })
    },
    async onConfirmGender (value, index) {
      this.genderProp.showGenderPicker = false
      Toast.loading({
        duration: 5000,
        message: '保存中...'
      })
      this.birthProp.showBirthPicker = false
      const res = await updateProfile({
        gender: index
      })
      if (res.code === 200) {
        this.user.gender = index
      }
      Toast({
        message: res.message,
        duration: 1000
      })
    },
    async updateAvatar (file) {
      Toast.loading({
        duration: 5000,
        message: '保存中...'
      })
      const res = await updateAvatar(file)
      if (res.code === 200) {
        this.$router.go(0)
      }
      Toast({
        message: res.message,
        duration: 1000
      })
    }
  }

}
</script>

<style scoped lang="scss">
.avatar-cell {
  .van-cell__title {
    display: flex;
    align-items: center;
  }
}

</style>
