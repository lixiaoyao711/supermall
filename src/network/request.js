import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8',
    timeout: 5000
  })
//拦截器
//1.请求拦截
// instance.interceptore.request.use(config => {
//   return config
// },err => {
//   return err
// })
// //1.响应式拦截
// instance.interceptore.response.use(res => {
//   return res
// },err => {
//   return err
// }) 
  return instance(config)
}