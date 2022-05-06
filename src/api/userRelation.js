/**
 * 用户关系相关请求模块
 */

import request from '@/utils/request'

// 改变用户间关系
export const changeStatus = (userId, status) => {
  return request({
    method: 'POST',
    url: '/userRelation/changeStatus',
    data: {
      destId: userId,
      status
    }
  })
}

// 改变用户间关系
export const changeBlock = (userId, block) => {
  return request({
    method: 'POST',
    url: '/userRelation/changeBlock',
    data: {
      destId: userId,
      block
    }
  })
}
