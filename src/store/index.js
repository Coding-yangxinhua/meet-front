import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem, getItemOrDefault } from '@/utils/storage'
import { getCookie, removeCookie } from '@u/CookieUtil'

Vue.use(Vuex)

const TOKEN_KEY = 'meet-token'
const USER_INFO = 'userInfo'
const ALBUM_VIEW = 'album-view'
const ARTICLE_VIEW = 'article-view'
const OTHER_VIEW = 'other-view'
const SELECTED_LIMIT = 'select-limit'
export default new Vuex.Store({
  state: {
    // 底部导航栏位置记录
    position: 0,
    // 当前请求状态
    result: null,
    // 成功后是否全局提示
    showSuccessToast: false,
    token: getCookie(TOKEN_KEY),
    userInfo: getItem(USER_INFO),
    albumView: getItem(ALBUM_VIEW),
    articleView: getItem(ARTICLE_VIEW),
    otherView: getItem(OTHER_VIEW),
    localArticle: {
      content: '',
      limitId: 0
    },
    limits: null,
    selectedLimit: getItemOrDefault(SELECTED_LIMIT, {
      dictId: 2,
      itemValue: 0,
      itemLabel: '公开'
    })
  },
  mutations: {
    setPosition (state, pos) {
      state.position = pos
    },
    setResult (state, result) {
      if (result == null) {
        return
      }
      state.result = {
        code: result.code,
        message: result.message
      }
    },
    setSuccessToast (state, show) {
      state.showSuccessToast = show
    },
    setLoadingToast (state, message) {
      state.result = {
        code: null,
        message: message
      }
    },
    setSelectedLimit (state, limit) {
      state.selectedLimit = limit
    },
    setLocalArticle (state, article) {
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
    // 移除cookies中token
    removeToken (state) {
      state.token = null
      removeCookie(TOKEN_KEY)
    },
    // 存储user信息
    setUserInfo (state, userInfo) {
      state.token = getCookie(TOKEN_KEY)
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
    isLogin (state) {
      return state.token != null && state.token !== ''
    },
    getPosition (state) {
      return state.position
    },
    getResult (state) {
      return state.result
    },
    getSuccessToast (state) {
      return state.showSuccessToast
    },
    getArticleView (state) {
      return state.articleView
    },
    getLocalAlbum (state) {
      return state.localAlbum
    },
    getLocalArticle (state) {
      return state.localArticle
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
