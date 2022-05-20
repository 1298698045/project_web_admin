import request from '@/utils/request.js'
const qs = require('qs');

function formatmessage(message){
  return qs.stringify({message:JSON.stringify(message)}) 
}
export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

//注册
export function register(query) {
  return request({
    url: '/user/register',
    method: 'post',
    data:formatmessage(query)
  })
}

//注册获取验证码
export function sendCode(query) {
  return request({
    url: '/user/sendCode',
    method: 'post',
    data:formatmessage(query)
  })
}

//登录
// export function userlogin(query) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data:formatmessage(query)
//   })
// }

export function userlogin(query) {
  return request({
    url: '',
    method: 'get',
    params:{
      cmd:'auth',
      ...query
    }
  })
}

//获取图片验证码
export function imageVerifyCode() {
  return request({
    url: '/user/imageVerifyCode',
    method: 'post',
  })
}

//修改密码
export function changePwd(query) {
  return request({
    url: '/user/changePwd',
    method: 'post',
    data:formatmessage(query)
  })
}

//注销登录
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post',
  })
}

//获取面板列表
export function getprojecttasklist(query) {
  query.cmd = 'project.tasklist.getlist'
  return request({
    url: '/apps/HrProcessor.ashx',
    method: 'get',
    params: query
  })
}
