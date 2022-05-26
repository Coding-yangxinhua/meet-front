import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 首页 -- 包括主页、许愿墙、我的
    path: '/',
    component: () => import('@v/layout/'),
    children: [
      // 首页
      {
        path: '/',
        component: () => import('@v/home/')
      },
      // 首页
      {
        path: '/home',
        component: () => import('@v/home/')
      },
      // 许愿墙
      {
        path: '/wish',
        name: 'wish',
        component: () => import('@v/wish/')
      },
      // 我的 -- 包括我的主页、动态、浏览记录
      {
        path: '/me',
        name: 'me',
        component: () => import('@v/me/')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@v/login/')
  },
  {
    path: '/login/code',
    name: 'login-code',
    component: () => import('@v/login/components/LoginCode')
  },
  {
    path: '/register/code',
    name: 'register-code',
    component: () => import('@v/login/components/RegisterCode')
  },
  // 用户资料
  {
    path: '/me/profile',
    name: 'me-profile',
    component: () => import('@v/me/components/MeProfile')
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('@v/friend/index')
  },
  // 用户资料 -> 修改姓名
  {
    path: '/me/profile/nickname',
    name: 'me-profile-nickname',
    component: () => import('@v/me/components/MeProfileNickname')
  },
  // 其他用户界面
  {
    path: '/other',
    name: 'other',
    component: () => import('@v/other/index')
  },
  // 用户相册
  {
    path: '/album/',
    name: 'album',
    component: () => import('@v/album/')
  },
  {
    path: '/album/detail',
    name: 'album-detail',
    component: () => import('@v/album/components/AlbumDetail')
  },
  {
    path: '/album/create',
    name: 'album-create',
    component: () => import('@c/AlbumCreate')
  },
  {
    path: '/album/limit',
    name: 'album-limit',
    component: () => import('@c/AlbumLimitSelect')
  },
  {
    path: '/album/photo/upload',
    name: 'album-photo-upload',
    component: () => import('@v/album/components/AlbumPhotoUpload')
  },
  // 文章详情
  {
    path: '/article/detail',
    name: 'article-detail',
    component: () => import('@/components/ArticleDetail')
  },
  // 写文章
  {
    path: '/article/write',
    name: 'article-write',
    component: () => import('@/components/ArticleWrite')
  },
  // 文章权限
  {
    path: '/article/limit',
    name: 'article-limit',
    component: () => import('@c/ArticleLimitSelect')
  },
  // 私信页面
  {
    path: '/letter/',
    name: 'letter',
    component: () => import('@v/letter')
  },
  // 私信下聊天详情页面
  // 私信页面
  {
    path: '/letter/chat',
    name: 'letter-chat',
    component: () => import('@v/letter/components/LetterChat')
  }
]

const router = new VueRouter({
  routes
})

export default router
