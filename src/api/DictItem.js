/**
 * 用户关系相关请求模块
 */

import request from '@/utils/request'

// 获得某一类字典
export const getItemsByType = (type) => {
  return request({
    method: 'GET',
    url: '/dictItem/getItemsByType',
    params: {
      type
    }
  })
}

export const ItemType = {
  LIMIT: 0,
  GENDER: 1,
  RELATION: 2
}
