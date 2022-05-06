import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'
import { getCookie, removeCookie } from '@u/CookieUtil'

Vue.use(Vuex)

const TOKEN_KEY = 'meet-token'
const USER_INFO = 'userInfo'
const ALBUM_VIEW = 'album-view'
const ARTICLE_VIEW = 'article-view'
const OTHER_VIEW = 'other-view'
export default new Vuex.Store({
  state: {
    position: 0,
    token: getCookie(TOKEN_KEY),
    userInfo: getItem(USER_INFO),
    albumView: getItem(ALBUM_VIEW),
    articleView: getItem(ARTICLE_VIEW),
    otherView: getItem(OTHER_VIEW),
    localAlbum: {
      title: '',
      limitId: 0
    },
    localArticle: {
      content: '',
      limitId: 0
    },
    limits: null
  },
  mutations: {
    setPosition (state, pos) {
      state.position = pos
    },
    setAlbum (state, album) {
      state.tempAlbum = album
    },

    setArticle (state, article) {
      state.localArticle = article
    },
    setLimits (state, limits) {
      state.limits = limits
    },
    setAlbumView (state, albumView) {
      state.albumView = albumView
      setItem(ALBUM_VIEW, albumView)
    },
    setArticleView (state, articleView) {
      state.articleView = articleView
      setItem(ARTICLE_VIEW, articleView)
    },
    setOtherView (state, otherView) {
      state.otherView = otherView
      setItem(OTHER_VIEW, otherView)
    },
    resetArticle (state) {
      state.localArticle = {
        content: '',
        limitId: 0
      }
    },
    resetAlbum (state) {
      state.localAlbum = {
        title: '',
        limitId: 0
      }
    },
    // 移除cookies中token
    removeToken (state) {
      state.token = null
      removeCookie(TOKEN_KEY)
    },
    // 存储user信息
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
      setItem(USER_INFO, userInfo)
    },
    removeUser (state) {
      state.userInfo = null
      setItem(USER_INFO, null)
      state.token = null
      removeCookie(TOKEN_KEY)
    }
  },
  getters: {
    getArticleView (state) {
      return state.articleView
    },
    getLocalAlbum (state) {
      return state.localAlbum
    },
    getLocalArticle (state) {
      return state.localArticle
    },
    getPosition (state) {
      return state.position
    },
    getUserInfo (state) {
      return state.userInfo
    },
    getToken (state) {
      return state.token
    }
  },
  actions: {
  },
  modules: {
  }
})
