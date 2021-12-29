import { userList } from '@/data/UsersData'

export const simuArticleList = [
  {
    articleId: 1,
    content: '今天天气真不错呀',
    gmtCreate: 1604160000,
    likeNum: 1,
    commentNum: 1,
    repostNum: 0,
    imageList: ['https://p0.ssl.img.360kuai.com/t01d5cd176788991d10.jpg'],
    userInfo: userList[0]
  },
  {
    articleId: 2,
    content: '是呀是呀',
    gmtCreate: 1604160000,
    likeNum: 1,
    commentNum: 1,
    repostNum: 0,
    userInfo: userList[1]
  },
  {
    articleId: 3,
    content: '今天天气就一般呀',
    gmtCreate: 1604260000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[3]
  },
  {
    articleId: 4,
    content: '哈哈哈哈哈哈哈',
    gmtCreate: 1604140000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[2]
  }
]
export const simuRefreshArticleList = [
  {
    articleId: 2,
    content: '今天天气就一般呀',
    gmtCreate: 1604260000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[3]
  }
]
export const simuLoadArticleList = [
  {
    articleId: 2,
    content: '哈哈哈哈哈哈哈',
    gmtCreate: 1604140000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[2]
  }
]
export const simuChannelList = [
  {
    channelId: 0,
    channelName: '热门'
  }, {
    channelId: 1,
    channelName: '关注'
  }
]
