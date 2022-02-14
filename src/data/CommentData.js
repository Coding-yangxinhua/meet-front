import { userList } from './UsersData'
export const replyList = [
  {
    articleId: 1,
    commentId: 3,
    parentId: 1,
    content: '瞅你咋滴',
    gmtCreate: '2021-12-17',
    user: userList[3],
    replyHot: [],
    likeStatus: true,
    dislikeStatus: false,
    replyUser: {
      userId: userList[0].userId,
      nickname: userList[0].nickname
    }
  },
  {
    articleId: 1,
    commentId: 7,
    parentId: 1,
    content: '哈哈哈哈哈哈',
    gmtCreate: '2021-12-17',
    user: userList[2],
    replyHot: [],
    likeStatus: false,
    dislikeStatus: false,
    replyUser: {
      userId: userList[0].userId,
      nickname: userList[0].nickname
    }
  },
  {
    articleId: 1,
    commentId: 4,
    parentId: 3,
    content: '再瞅一个试试',
    gmtCreate: '2021-12-17',
    user: userList[0],
    replyHot: [],
    likeStatus: false,
    dislikeStatus: true,
    replyUser: {
      userId: userList[3].userId,
      nickname: userList[3].nickname
    }
  },
  {
    articleId: 1,
    commentId: 5,
    parentId: 4,
    content: '试试就试试',
    gmtCreate: '2021-12-17',
    user: userList[3],
    likeStatus: false,
    dislikeStatus: false,
    replyUser: {
      userId: userList[0].userId,
      nickname: userList[0].nickname
    }
  }
]
export const replyList2 = [
  {
    articleId: 1,
    commentId: 6,
    parentId: 2,
    content: '我爱你有几分',
    gmtCreate: '2021-12-17',
    likeStatus: true,
    dislikeStatus: false,
    user: userList[2]
  }
]
export const commentList = [
  {
    articleId: 1,
    commentId: 1,
    parentId: null,
    content: '你瞅啥',
    gmtCreate: '2021-12-17',
    likeStatus: false,
    dislikeStatus: false,
    user: userList[0],
    replyHot: [...replyList]
  },
  {
    articleId: 1,
    commentId: 2,
    parentId: null,
    content: '你问我爱你有多深,你问我爱你有多深,你问我爱你有多深你问我爱你有多深你问我爱你有多深你问我爱你有多深v,你问我爱你有多深,你问我爱你有多深,你问我爱你有多深' +
      ',你问我爱你有多深vv你问我爱你有多深你问我爱你有多深你问我爱你有多深v',
    gmtCreate: '2021-12-18',
    likeStatus: false,
    dislikeStatus: false,
    user: userList[1],
    replyHot: [replyList2[0]]
  }
]
