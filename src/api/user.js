/**
 * 用户相关请求模块
 */

import request from '@/utils/request'

// 登录 、 注册

export const login = (code, user) => {
  return request({
    method: 'POST',
    url: '/user/login',
    params: {
      code
    },
    data: user
  })
}

export const register = (code, user) => {
  return request({
    method: 'POST',
    url: '/user/register',
    params: {
      code
    },
    data: user
  })
}

// 发送验证码
export const sendSms = (mobile, type) => {
  return request({
    method: 'GET',
    url: '/user/sendSms',
    params: {
      mobile,
      type
    }
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
export const updateProfile = (key, value) => {
  return request({
    method: 'POST',
    url: 'user/updateProfile'
  })
}
// 修改用户
export const updatePassword = (key, value) => {
  return request({
    method: 'POST',
    url: 'user/updatePassword'
  })
}
