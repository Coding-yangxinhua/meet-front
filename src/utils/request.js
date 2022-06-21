import axios from 'axios'
import store from '../store/'

const request = axios.create({
  // 根据环境变量区分接口的默认地址
  // baseURL: 'http://localhost:9420/meet',
  baseURL: process.env.VUE_APP_BASE_URL,
  // 设置超时时间和跨域是否允许携带凭证
  timeout: 10000,
  withCredentials: true

})

// 设置请求传递数据格式、格式化post数据
request.defaults.headers['Content-Type'] = 'application/json'

request.interceptors.request.use(config => {
  return config
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(response => {
  if (store.state.showSuccessToast || response.data.code !== 200) {
    store.state.result = response.data
  }
  return response.data
})
export default request
