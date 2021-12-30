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
        path: '',
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
  // 用户资料
  {
    path: '/me/profile',
    name: 'me-profile',
    component: () => import('@v/me/components/MeProfile')
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
    path: '/album/private',
    name: 'album-private',
    component: () => import('@c/AlbumPrivateSelect')
  },
  // 修改姓名
  {
    path: '/user/profile/nickName',
    name: 'user-profile-nickName',
    component: () => import('@v/me/components/MeProFileNickName')
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
  }
]

const router = new VueRouter({
  routes
})

export default router
