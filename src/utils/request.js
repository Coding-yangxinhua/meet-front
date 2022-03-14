import axios from 'axios'
import qs from 'qs'

const request = axios.create({
  // 根据环境变量区分接口的默认地址
  baseURL: 'http://localhost:9420/meet',
  // 设置超时时间和跨域是否允许携带凭证
  timeout: 10000,
  withCredentials: true

})

// 设置请求传递数据格式、格式化post数据
request.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
request.defaults.transformRequest = data => qs.stringify(data)

/**
 *  请求拦截器
 * TOKEN验证（JWT）接受服务器返回的token，存储到vuex/本地存储中
 * 每一次向服务器发请求，我们应该把token带上
 */
// request.interceptors.request.use((config) => {
//   const token = store.state.token
//   if (token) {
//     config.headers.token = '${token}'
//   }
//   return config
// })

/**
 * 响应拦截器
 */

request.interceptors.response.use(response => {
  return response.data
})
export default request
