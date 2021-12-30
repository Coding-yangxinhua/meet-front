import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'token'

export default new Vuex.Store({
  state: {
    position: 0,
    token: getItem(TOKEN_KEY),
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
    setToken (state, token) {
      state.token = token
      setItem(TOKEN_KEY, token)
    },
    removeToken (state) {
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
