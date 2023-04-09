import axios from 'axios'

const http = axios.create({
  // 通用请求的地址 => 前缀 例如：https://www.baudu.com
  baseURL: '/api',
  timeout: 10000 // 超时时间 10秒
})

// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  // 在发送请求前做些什么
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})

export default http
