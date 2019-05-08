import { host } from '../../config/config'
import HTTP from '../../libs/http'

export default class index extends HTTP {
  /**
   * 登录授权
   * @param data 临时 code
   */
  login(data) {
    return this.get(`${host.api_hstUrl}`, data)
  }
  /**
   * 接口功能描述
   * @param data 参数作用
   */
  // aaa(data, resolve, reject) {
  //   this.get(`${host.api_hstUrl}`, data).then(resolve).then(reject)
  // }
}
