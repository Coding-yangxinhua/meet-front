import request from '@/utils/request'

export const getArticlesByType = params => {
  return request({
    url: 'article/list',
    params
  })
}
export const getArticlesByUid = params => {
  return request({
    url: 'article/list/point/',
    params
  })
}

export const getArticlesByHistory = params => {
  return request({
    url: 'article/list/history/',
    params
  })
}

export const getArticleById = params => {
  return request({
    url: 'article/detail/',
    params
  })
}

export const refreshArticlesByUid = params => {
  return request({
    url: 'article/refresh/point/',
    params
  })
}
export const refreshArticles = params => {
  return request({
    url: 'article/refresh',
    params
  })
}
export const getChannels = () => {
  return request({
    url: 'article/channel'
  })
}

export const createArticle = (article, files) => {
  const formData = new FormData()
  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i].file)
  }
  formData.append('article', JSON.stringify(article))
  return request({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'article/create',
    data: formData
  })
}

export const changeArticleStatus = (articleStatus) => {
  return request({
    method: 'POST',
    url: 'articleStatus/changeStatus',
    data: articleStatus
  })
}
