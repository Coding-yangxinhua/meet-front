import { userList } from './UsersData'
export const replyList = [
  {
    articleId: 1,
    commentId: 2,
    parentId: 1,
    content: '瞅你咋滴',
    gmtCreate: '2021-12-17',
    user: userList[3]
  },
  {
    articleId: 1,
    commentId: 3,
    parentId: 1,
    content: '再瞅一个试试, 再瞅一个试试, 再瞅一个试试, 再瞅一个试试',
    gmtCreate: '2021-12-17',
    user: userList[0]
  },
  {
    articleId: 1,
    commentId: 4,
    parentId: 2,
    content: '试试就试试',
    gmtCreate: '2021-12-17',
    user: userList[1]
  }
]

export const commentList = [
  {
    articleId: 1,
    commentId: 1,
    parentId: null,
    content: '你瞅啥',
    gmtCreate: '2021-12-17',
    user: userList[0],
    replyHot: [replyList[0], replyList[1]]
  },
  {
    articleId: 1,
    commentId: 5,
    parentId: null,
    content: 'take a look at me now',
    gmtCreate: '2021-12-18',
    user: userList[1],
    replyHot: [replyList[0]]
  },
  {
    articleId: 1,
    commentId: 6,
    parentId: null,
    content: 'show something I\'m giving up on u, sorry that I couldn\'t getting to u',
    gmtCreate: '2021-12-18',
    user: userList[2],
    replyHot: null
  }
]
