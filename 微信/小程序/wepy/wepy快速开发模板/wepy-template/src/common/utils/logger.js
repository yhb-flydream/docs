/*
 * 日志模块     （用于记录日志信息）
 * 单条记录以字符串格式存储
 * 日志以数组的形式记录在storage
 * 采用异步的方式
 */

const loggerModuleName = 'loggerName'

export default {

  // 写日志
  writeLogger: function (log) {
    wx.getStorage({
      key: loggerModuleName,
      success: function (res) {
        var loggerArr = []
        if (res.data && res.data.length && res.data.length >= 1) {
          loggerArr = loggerArr.concat(res.data)
        }
        loggerArr.push(log)
        wx.setStorage({
          key: loggerModuleName,
          data: loggerArr
        })
      }
    })
  },

  // 读日志
  getLogger: function () {
    wx.getStorage({
      key: loggerModuleName,
      success: function (res) {
        var loggerArr = []
        if (res.data && res.data.length && res.data.length >= 1) {
          loggerArr = loggerArr.concat(res.data)
        }
        return loggerArr
      }
    })
  },

  // 清空日志
  clearLogger: function () {
    wx.removeStorage({
      key: loggerModuleName,
      success: function (res) {
        console.log('日志已清空')
      }
    })
  }
}
