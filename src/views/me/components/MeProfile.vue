<template>
  <div class="user-profile">
    <van-nav-bar class="tm-nav-bar" left-arrow @click-left="$router.back()" title="我的资料"/>
    <div>
      <van-cell-group>
        <van-cell title="头像">
          <template #right-icon>
            <div>
              <van-image
                width="55"
                height="55"
                round
                :src="user.avatar"/>
            </div>
          </template>
        </van-cell>
        <van-cell title="昵称" is-link :value="user.nickName" to="/user/profile/nickName"/>
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
        <van-cell title="生日" is-link @click="birthProp.showBirthPicker=true" :value="user.birth"/>
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
import { Popup } from 'vant'
import { userList } from '@/data/UsersData'
import { normalDate } from '@/utils/DateFormatUtil'

Vue.use(Popup)
export default {
  name: 'user-profile',
  computed: {
    gender () {
      return this.user.gender === 0 ? '男' : '女'
    }
  },
  created () {
    this.getMyInfo()
    if (this.user.birth != null) {
      this.birthProp.currentDate = this.user.birth
    }
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
    onCancel () {
      this.birthProp.showBirthPicker = false
      this.showGenderPicker = false
    },
    updateUserIntro () {
      console.log('update user intro')
    },
    async getMyInfo () {
      this.user = userList[0]
    },
    // 生日
    async onConfirmBirth () {
      this.birthProp.showBirthPicker = false
      this.user.birth = normalDate(this.birthProp.currentDate.getTime())
    },
    async onConfirmGender (value, index) {
      this.genderProp.showGenderPicker = false
      this.user.gender = index
    }
  }

}
</script>

<style scoped>

</style>
