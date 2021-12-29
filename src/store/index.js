import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'token'

export default new Vuex.Store({
  state: {
    token: getItem(TOKEN_KEY)
  },
  mutations: {
    setToken (state, token) {
      this.state.token = token
      setItem(TOKEN_KEY, token)
    },
    removeToken (state) {
      this.state.token = null
      removeItem(TOKEN_KEY)
    }
  },
  actions: {
  },
  modules: {
  }
})
