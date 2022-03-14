import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'token'
const USER_INFO = 'userInfo'

export default new Vuex.Store({
  state: {
    position: 0,
    isLoading: false,
    userInfo: getItem(USER_INFO),
    tempAlbum: {
      albumTitle: '',
      privateInfo: {
        level: 0,
        name: '公开'
      }
    }
  },
  mutations: {
    setPosition (state, pos) {
      state.position = pos
    },
    setAlbum (state, album) {
      state.tempAlbum = album
    },
    resetAlbum (state) {
      state.tempAlbum = {
        albumTitle: '',
        privateInfo: {
          level: 0,
          name: '公开'
        }
      }
    },
    // 存储token
    setToken (state, token) {
      state.token = token
      setItem(TOKEN_KEY, token)
    },
    removeToken (state) {
      state.token = null
      removeItem(TOKEN_KEY)
    },
    // 存储user信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setItem(TOKEN_KEY, userInfo)
    },
    getUserInfo (state) {
      state.token = null
      removeItem(TOKEN_KEY)
    }
  },
  getters: {
    getTempAlbum (state) {
      return state.tempAlbum
    },
    getPosition (state) {
      return state.position
    }
  },
  actions: {
  },
  modules: {
  }
})
