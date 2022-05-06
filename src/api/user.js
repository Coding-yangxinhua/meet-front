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
export const getUserInfo = (userId) => {
  return request({
    method: 'GET',
    url: 'user/getInfo',
    params: {
      userId
    }
  })
}

// 修改用户信息
export const updateProfile = (user) => {
  return request({
    method: 'POST',
    url: 'user/updateProfile',
    data: user
  })
}
// 修改用户
export const updatePassword = (key, value) => {
  return request({
    method: 'POST',
    url: 'user/updatePassword'
  })
}

// 获得用户关注信息
export const getUserBase = (userId) => {
  return request({
    method: 'GET',
    url: 'user/getUserBase',
    params: {
      userId
    }
  })
}

/// 更新用户头像
export const updateAvatar = (file) => {
  const formData = new FormData()
  formData.append('file', file.file)
  return request({
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: 'user/updateAvatar',
    data: formData
  })
}
