/**
 * 格式化时间
 * type:1 return 2018/05/01 01:01:01
 * type:2 return 2018-05-01
 * type:3 return 刚刚 xx分钟前 昨天
 */
let formatTime = (date, type = 1) => {
  date = formatTimeZone(date, 0)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (type === 1) {
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  } else if (type === 2) {
    return [year, month, day].map(formatNumber).join('-')
  } else {
    let jm = new Date()
    let Fo = jm.getTime() - date // 当前时间转化成毫秒，与返回时间对比
    if (Fo <= 6e4) return '刚刚' // 小于一分钟，替换返回时间为 ‘刚刚’
    let Qq = jm.getHours() * 36e5 + jm.getMinutes() * 6e4 + jm.getSeconds() * 1e3 // 当前时间距离昨天0点的时间毫秒数
    if (day === jm.getDate()) { // 如果返回时间与当前时间在一天
      if (Fo < 36e5) { // 且小于一小时
        let bOh = Math.floor(Fo / 6e4)
        return bOh + '分钟前' // 返回 ‘距离当前时间几分钟前’
      } else if (hour < 12) {
        return '上午' + [hour, minute].map(formatNumber).join(':') // 返回今天的上午时间
      } else {
        return '下午' + [hour, minute].map(formatNumber).join(':') // 返回今天的下午时间
      }
    } else {
      if (Fo < Qq) { /* Fo < Qq + 864e5 */ // 如果当前时间差大于 当前时间距离昨天0点的时间毫秒数 则为昨天
        return '昨天' + [hour, minute].map(formatNumber).join(':')
      } else {
        let hq = jm.getFullYear() // 当前年份
        let bOg = new Date(hq, 0, 1) // 今年1月1号距离有计数年份的毫秒数
        let Qq = jm.getTime() - bOg.getTime() // 当前时间距离1月1号的时间差
        if (Fo < Qq) { // 当前时间与返回时间差值，小于 当前时间距离1月1号的时间差
          return year + '年' + month + '月' + day + '日' + [hour, minute].map(formatNumber).join(':') // 返回 具体时间
        }
        // return year + '年' + month + '月' + day + '日' // 否则返回， 只返回 年 月 日
        return year + '年' + month + '月' + day + '日' + [hour, minute].map(formatNumber).join(':')
      }
    }
  }
}

/**
 * 时区转换
 * @param date 原时区时间
 * @param offset 需要设置的时区
 * @returns {Date} 转换后的时区时间
 */
let formatTimeZone = (date, offset) => {
  let d = new Date(date) // 创建一个Date对象 time时间 offset 时区  中国为  8
  let localTime = d.getTime()
  let localOffset = d.getTimezoneOffset() * 60000 // 获得当地时间偏移的毫秒数
  let utc = localTime + localOffset // utc即GMT时间
  let wishTime = utc + (3600000 * offset)
  return new Date(wishTime)
}

/**
 * 补全 0
 * @param n
 * @returns {any}
 */
let formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 时间转换 00:00
 * @param duration
 * @returns {string}
 */
let formatduration = duration => {
  duration = new Date(duration)
  return formatNumber(duration.getMinutes()) + ':' + formatNumber(duration.getSeconds())
}

/**
 * 数字转分钟  70  => 01:10'
 * @param second
 * @returns {string}
 */
function numToTime(second) {
  let mm = Math.floor(second / 60)
  let ss = Math.ceil(second % 60)
  let minute = mm < 10 ? ('0' + mm.toString()) : mm.toString()
  let seconds = ss < 10 ? ('0' + ss.toString()) : ss.toString()
  return minute + ':' + seconds + ''
}

/**
 * 拓展对象
 * newconfig = extend({},defaultConfig,myconfig)
 */

function extend(target) {
  let sources = Array.prototype.slice.call(arguments, 1)

  for (let i = 0; i < sources.length; i += 1) {
    let source = sources[i]
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

/**
 * 地区转换
 * @param target
 * @param id
 * @param area
 */
function toggleArea(target, id = [], area) {
  id.forEach((item, index) => {
    for (let key in area) {
      if (target[item] === +key) {
        target[item] = area[key]
      }
    }
    // area.forEach((value, index) => {
    //   if (target[item] === +value.ID) {
    //     target[item] = value.name
    //   }
    // })
  })
}

export default {
  formatTime,
  formatduration,
  numToTime,
  extend,
  toggleArea
}
