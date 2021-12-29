import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    // 首页 -- 包括主页、许愿墙、我的
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      // 首页
      {
        path: '',
        component: () => import('@/views/home/')
      },
      // 许愿墙
      {
        path: '/wish',
        name: 'wish',
        component: () => import('@/views/wish/')
      },
      // 我的 -- 包括我的主页、动态、浏览记录
      {
        path: '/me',
        name: 'me',
        component: () => import('@/views/me/')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  // 用户资料
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/me/components/MeProfile')
  },
  // 修改姓名
  {
    path: '/user/profile/nickName',
    name: 'user-profile-nickName',
    component: () => import('@/views/me/components/MeProFileNickName')
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
