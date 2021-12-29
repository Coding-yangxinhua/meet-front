import request from '@/utils/request'

export const getArticles = params => {
  return request({
    url: `article/${params.timestamp}/${params.channelId}`
  })
}
export const getArticlesByUid = params => {
  return request({
    url: `article/user/${params.timestamp}/${params.uid}`
  })
}
export const refreshArticles = params => {
  return request({
    url: `article/${params.newTime}/${params.oldTime}/${params.channelId}`
  })
}
export const refreshArticlesByUid = params => {
  return request({
    url: `article/user/${params.newTime}/${params.oldTime}/${params.uid}`
  })
}
export const getChannels = () => {
  return request({
    url: 'article/channel'
  })
}
