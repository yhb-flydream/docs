/*
 * 所有页面用到的接口请求
 * 统一放到这里
 * 方便mock及管理
 */

import {HOST} from '../config.js'
import HTTP from './HTTP.js'
// import WXAPI from './WX-API.js'

const host = HOST.pro

// api接口列表

export default {

  /**
   * 登录授权
   * @param data 临时 code
   * @param callback 成功回调
   * @param fail 失败回调
   */
  hot_login: (data, callback, fail) => {
    HTTP.get(`${host}/login/`, data, callback, fail)
  }
}
