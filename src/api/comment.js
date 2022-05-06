import request from '@/utils/request'

export const listCommentRoot = params => {
  return request({
    url: 'comment/listRoot',
    params
  })
}

export const listCommentSecond = data => {
  return request({
    url: 'comment/listSecond',
    params: {
      secondId: data.secondId,
      commentId: data.commentId,
      page: data.page,
      size: data.size
    }
  })
}

export const listCommentChildren = data => {
  return request({
    url: 'comment/listChildren',
    params: {
      firstId: data.firstId,
      commentId: data.commentId,
      page: data.page,
      size: data.size
    }
  })
}

export const createComment = comment => {
  return request({
    method: 'POST',
    url: 'comment/create',
    data: comment
  })
}

export const refreshComments = params => {
  return request({
    url: 'comment/refresh',
    params
  })
}
export const changeCommentStatus = (commentStatus) => {
  return request({
    method: 'POST',
    url: 'commentStatus/changeStatus',
    data: commentStatus
  })
}
