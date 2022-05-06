import request from '@/utils/request'

export const getFriendByType = params => {
  return request({
    url: 'user/getFriend',
    params
  })
}
export const getArticlesByUid = params => {
  return request({
    url: 'article/list/point/',
    params
  })
}
