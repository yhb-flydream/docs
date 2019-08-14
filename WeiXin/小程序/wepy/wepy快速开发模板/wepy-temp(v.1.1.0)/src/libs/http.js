/*
 * http请求服务
 */

/*
 * 设置请求头
 * 坑：微信小程序POST默认application/json
 * 坑：微信小程序POST请求中文乱码的解决方法
 */
import WXAPI from './wx-api'

function getHeader() {
  let header = {}
  // header['content-type'] = 'application/json';
  header['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
  header['Authorization'] = 'Bearer access_token=' + WXAPI.getStorageSync('ACCESS_TOKEN')
  return header
}

function request(url, method, data = {}, resolve, reject) {
  // url拼接公共参数
  // var app = getApp();
  // var globalData = app.globalData
  // var mid = WXAPI.getStorageSync("mId")
  // var commonParam = `c=${globalData.c}&m=${globalData.m}&v=${globalData.v}&net=${globalData.net}&tid=${globalData.tid}&mid=${mid}&screen=${globalData.screen}&appid=${globalData.appid}&cid=${globalData.cid}&scid=${globalData.scid}&from=${globalData.From}&os=${globalData.os}&marketid=${globalData.marketid}`

  // if (url.indexOf("?") > -1) {
  //   url = `${url}&${commonParam}`
  // } else {
  //   url = `${url}?${commonParam}`
  // }
  wx.request({ // eslint-disable-line
    url: url,
    method: method,
    data: data,
    header: getHeader(),
    success: res => {
      const code = res.statusCode.toString()
      if (code.startsWith('2')) {
        resolve(res.data)
      } else {
        // 接口400,500等进入这里
        reject('error')
        // const error_code = res.statusCode.toString()
        // console.log(error_code)
        // console.log("success")
        // this._show_error(2)
      }
    },
    fail: (res) => {
      // 没有网络走fail
      reject('fail')
      // console.log("走了fail")
      // this._show_error("1")
    }
  })
}

export default class HTTP {
  /*
  * get 请求
  */
  get({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      // this._request(url, 'GET', data, resolve, reject)
      request(url, 'GET', data, resolve, reject)
    })
  }
  /*
  * post 请求
  */
  post({ url, data = {} }) {
    return new Promise((resolve, reject) => {
      // this._request(url, 'POST', data, resolve, reject)
      request(url, 'POST', data, resolve, reject)
    })
  }
}
