var host
var appid = ''
var env = ''

if (env === 'dev') {
  host = {
    api_hstUrl: 'https://kfapi.hopsontong.com:11013',
    api_goodUrl: 'https://kfmapi.hopsontong.com:11013'
  }
  appid = 'wx7cfae6c338021cdb'
} else if (env === 'test') {
  host = {
    api_hstUrl: 'https://tapi.hopsontong.com:11013',
    api_goodUrl: 'https://tmapi.hopsontong.com:11013'
  }
  appid = 'wx7cfae6c338021cdb'
} else {
  host = {
    api_hstUrl: 'https://api.hopsontong.com',
    api_goodUrl: 'https://mapi.hopsontong.com'
  }
  appid = 'wx2baa5d40475c6ef3'
}

export { host, appid }
