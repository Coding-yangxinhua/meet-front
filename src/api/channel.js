import request from '@/utils/request'

export const getArticleChannel = () => {
  return request({
    url: 'dictItem/getItemsByType',
    params: {
      type: 3
    }
  })
}
