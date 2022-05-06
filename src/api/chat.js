import request from '@/utils/request'

export const getChatList = params => {
  return request({
    url: 'chat/list',
    params
  })
}
export const getMessageList = params => {
  return request({
    url: 'chat/message/list',
    params
  })
}

export const sendMessage = data => {
  return request({
    method: 'POST',
    url: 'chat/message/user',
    data
  })
}
