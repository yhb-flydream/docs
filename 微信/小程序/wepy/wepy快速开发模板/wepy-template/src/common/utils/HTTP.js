/*
 * http请求服务
 */

/*
 * 设置请求头
 * 坑：微信小程序POST默认application/json
 * 坑：微信小程序POST请求中文乱码的解决方法
 */
import WXAPI from './WX-API'

function getHeader() { /* head = [] */
  let header = {}
  // header['content-type'] = 'application/json';
  header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  header['Authorization'] = 'Bearer access_token=' + WXAPI.getStorageSync('ACCESS_TOKEN')
  // head.forEach((item, index, array) => {
  //   for (let key in item) {
  //     header[key] = item[key]
  //   }
  // })
  return header
}

export default {

  /*
   * get请求
   */
  get: (url = '', data = {}, callback, fail) => { /*  head, */
    wx.request({
      url: url,
      data: data,
      method: 'GET',
      header: getHeader(), /* head */
      success: res => {
        console.log('请求日志：', res)
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            if (callback) callback(res.data)
          } else {
            if (fail) fail(res.data)
            console.log('错误信息：', res.message)
          }
        } else if (res.data === 'Unauthorized Access') {
          WXAPI.navigateTo('/pages/subPages/verification/wxAuthorize/wxAuthorize')
          // WXAPI.showToast('登录过期，需要从新验证')
          // setTimeout(WXAPI.navigateTo('/pages/subPages/verification/wxAuthorize/wxAuthorize'), 1500)
        } else {
          console.log('服务器错误：' + res.statusCode)
        }
      },
      fail: () => {
        console.log('链接服务器失败')
      }
    })
  },

  /*
   * post请求
   */
  post: (url = '', data = {}, callback, fail) => { /*  head, */
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: getHeader(), /* head */
      success: res => {
        console.log('请求日志：', res)
        if (res.statusCode === 200) {
          if (res.data.code === 200) {
            if (callback) callback(res.data)
          } else {
            if (fail) fail(res.data)
            console.log('错误信息：', res.message)
          }
        } else if (res.data === 'Unauthorized Access') {
          WXAPI.navigateTo('/pages/subPages/verification/wxAuthorize/wxAuthorize')
        } else {
          console.log('服务器错误：' + res.statusCode)
        }
      },
      fail: () => {
        console.log('链接服务器失败')
      }
    })
  }
}
