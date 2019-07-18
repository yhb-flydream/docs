/* eslint-disable no-undef */
/*
 * 用到的微信 api
 * 集中管理
 */

// 向tabRel页面传参的key
const TabRelPageParmsKey = 'TabRelPageParmsKey'

export default {
  setTabRelPageParms: obj => {
    if (obj) {
      wx.setStorageSync(TabRelPageParmsKey, obj)
    }
  },

  // 获取用户信息
  getUserInfo: wx.getUserInfo,

  // tabRel页面取传参
  getTabRelPageParms: wx.getStorageSync(TabRelPageParmsKey),

  // 清除tabRel页面传参， （及时清理，避免污染）
  clearTabRelPageParms: wx.removeStorageSync(TabRelPageParmsKey),

  // 设置页面标题
  setNavigationBarTitle: title => wx.setNavigationBarTitle({
    title: title || ''
  }),

  // 显示当前页面的转发按钮
  showShareMenu: (withShareTicket = true, successFn = () => { }, failFn = () => { }) => wx.showShareMenu({
    withShareTicket: withShareTicket, // 转发详情
    success: successFn,
    fail: failFn
  }),

  // 隐藏转发按钮
  hideShareMenu: (successFn = () => { }, failFn = () => { }) => wx.hidehideShareMenu({
    success: successFn,
    fail: failFn
  }),

  canIUse: API => wx.canIUse(API),

  // 同步获取系统信息
  getSystemInfoSync: wx.getSystemInfoSync(),

  // 获取系统信息
  getSystemInfo: (successFn, failFn = () => { }) => wx.getSystemInfo({
    success: successFn,
    fail: failFn
  }),

  // 显示操作菜单
  showActionSheet: (itemList = [], successFn, failFn = () => { }) => wx.showActionSheet({
    itemList: itemList,
    success: successFn,
    fail: failFn
  }),

  // 显示 loading
  showLoading: (title = '加载中...', successFn = () => { }, failFn = () => { }) => wx.showLoading({
    title: title,
    mask: true,
    success: successFn,
    fail: failFn
  }),

  // 隐藏 loading
  hideLoading: (successFn = () => { }, failFn = () => { }) => wx.hideLoading({
    success: successFn,
    fail: failFn
  }),

  // 显示繁忙提示
  showBusy: (title = '加载中...') => wx.showToast({
    title: title,
    icon: 'loading',
    duration: 10000,
    mask: true
  }),

  // 显示成功提示
  showSuccess: (title = '成功') => wx.showToast({
    title: title,
    icon: 'success'
  }),

  // 短暂提示
  showShort: (text = '短暂提示') => wx.showToast({
    title: text,
    icon: 'none',
    duration: 2000
  }),

  // 提示弹窗
  alertModal: (title = '提示', content = '提示弹窗', successFn) => wx.showModal({
    title,
    content: content,
    showCancel: false,
    confirmText: '确定',
    success: function (res) {
      if (successFn) successFn(res)
    }
  }),

  // 询问提示
  confirmModal: (title = '提示', content = '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内', okFn, noFn) => wx.showModal({
    title: title,
    content: content,
    showCancel: true,
    cancelText: '取消',
    cancelColor: '#ff0000',
    confirmText: '确定',
    confirmColor: '#333',
    success: function (res) {
      console.log(res)
      if (res.confirm) {
        // console.log('用户点击主操作');
        if (okFn) { okFn() }
      } else if (res.cancel) {
        // console.log('用户点击辅助操作');
        if (noFn) { noFn() }
      }
    }
  }),

  // 获取地图信息
  getMapContext: (el, that) => wx.createMapContext(el, that),

  // 获取相机信息
  createCameraContext: wx.createCameraContext,

  // 获取授权信息
  getSetting: (successFn, failFn = () => { }) => wx.getSetting({
    success: successFn,
    fail: failFn
  }),

  // 发起授权请求
  authorize: (scope, successFn, failFn = () => { }) => wx.authorize({
    scope: scope,
    success: successFn,
    fail: failFn
  }),

  // 获取当前的地理位置、速度
  getLocation: (type = 'wgs84', successFn, failFn = () => { }, altitude = false) => wx.getLocation({
    type: type,
    altitude: altitude,
    success: successFn,
    fail: failFn
  }),

  // 选择位置
  chooseLocation: (successFn, failFn = () => { }) => wx.chooseLocation({
    success: successFn,
    fail: failFn
  }),

  // 打开内置地图
  openLocation: (latitude, longitude, successFn, scale = 18, name = '', address = '', failFn = () => { }) => wx.openLocation({
    latitude: latitude,
    longitude: longitude,
    scale: scale,
    name: name,
    address: address,
    success: successFn,
    fail: failFn
  }),

  // 拨打电话
  makePhoneCall: (tel, successFn, failFn = () => { }) => wx.makePhoneCall({
    phoneNumber: tel,
    success: successFn,
    fail: failFn
  }),

  // 获取剪切板内容
  getClipboardData: (successFun) => wx.getClipboardData({
    success: successFun
  }),

  // 设置系统剪贴板内容
  setClipboardData: (data, successFun) => wx.setClipboardData({
    data: data,
    success: successFun
  }),

  // 播放音频
  playVoice: voicePath => wx.playVoice({
    filePath: voicePath
  }),

  // 暂停音频
  pauseVoice: () => wx.pauseVoice(),

  // 音频组件控制
  innerAudioContext: wx.createInnerAudioContext(),

  // 开始录音
  startRecord: (successFn, failFn = () => { }) => wx.startRecord({
    success: successFn,
    fail: failFn
  }),

  // 录音管理
  recorderManager: wx.getRecorderManager(),

  // 跳转
  navigateTo: (url, successFn = () => { }, failFn = () => { }) => wx.navigateTo({
    url: url,
    success: successFn,
    fail: failFn
  }),

  // 关闭所有页面跳转
  reLaunch: (url, successFn = () => { }, failFn = () => { }) => wx.navigateTo({
    url: url,
    success: successFn,
    fail: failFn
  }),

  // 短震动
  vibrateShort: (successFn = () => { }, failFn = () => { }) => wx.vibrateShort({
    success: successFn,
    fail: failFn
  }),

  // 长震动
  vibrateLong: (successFn = () => { }, failFn = () => { }) => wx.vibrateLong({
    success: successFn,
    fail: failFn
  }),

  // 关闭当前页面，返回上一页面或多级页面。
  navigateBack: (delta = 1) => wx.navigateBack({
    delta: delta
  }),

  // 登录
  login: (successFn = () => { }, failFn = () => { }) => wx.login({
    success: successFn,
    fail: failFn
  }),

  // 获取当前页面栈实例
  getCurrentPages: wx.getCurrentPages,

  // 获取本地 storage 信息
  getStorageSync: KEY => wx.getStorageSync(KEY),

  // 设置本地 storage 信息
  setStorageSync: (KEY, VALUE) => wx.setStorageSync(KEY, VALUE),

  // 清除本地 storage 信息
  clearStorageSync: wx.clearStorageSync,

  // 下拉刷新
  startPullDownRefresh: (successFn = () => { }, failFn = () => { }) => wx.startPullDownRefresh({
    success: successFn,
    fail: failFn
  }),

  // 停止下拉刷新
  stopPullDownRefresh: (successFn = () => { }, failFn = () => { }) => wx.stopPullDownRefresh({
    success: successFn,
    fail: failFn
  }),

  // 上传文件
  uploadFile: (url, filePath, name = 'file', formData, successFn = () => { }, failFn = () => { }, complete = () => { }) => wx.uploadFile({
    url: url,
    filePath: filePath,
    name: name,
    // header: header,
    formData: formData,
    success: successFn,
    fail: failFn,
    complete: complete
  }),

  // http 请求
  http: (url, method = 'GET', data, header, successFn = () => { }, failFn = () => { }) => wx.request({
    url: url,
    method: method,
    data: data,
    header: header, /* head */
    success: res => {
      console.log('请求日志：', res)
      if (successFn) successFn(res.data)
    },
    fail: () => {
      console.log('链接服务器失败')
    }
  })
}
