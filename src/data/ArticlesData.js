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
    userInfo: userList[0],
    likeStatus: true
  },
  {
    articleId: 2,
    content: '是呀是呀',
    gmtCreate: 1641258374,
    likeNum: 1,
    commentNum: 1,
    repostNum: 1,
    userInfo: userList[1],
    likeStatus: false
  },
  {
    articleId: 3,
    content: '今天天气就一般呀',
    gmtCreate: 1604260000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[3],
    likeStatus: true
  },
  {
    articleId: 4,
    content: '哈哈哈哈哈哈哈',
    gmtCreate: 1604140000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[2],
    likeStatus: false
  }
]
export const simuRefreshArticleList = [
  {
    articleId: 5,
    content: '今天天气就一般呀',
    gmtCreate: 1604260000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[3],
    likeStatus: true
  }
]
export const simuLoadArticleList = [
  {
    articleId: 6,
    content: '哈哈哈哈哈哈哈',
    gmtCreate: 1604140000,
    likeNum: 2,
    commentNum: 2,
    repostNum: 1,
    userInfo: userList[2],
    likeStatus: false
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
