/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

// 登录 、 注册

export const login = data => {
  return request({
    method: 'POST',
    url: '/user/authorizations',
    data
  })
}

// 发送验证码
export const sendSms = mobile => {
  return request({
    method: 'POST',
    url: ''
  })
}

// 请求用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: 'user/currentUser'
  })
}

// 修改用户信息
export const updateUserInfo = (key, value) => {
  // const user = {
  //   gender: 0
  // }
  return request({
    method: 'POST',
    url: 'user/userInfo',
    data: {
      gender: 0n
    }
  })
}
