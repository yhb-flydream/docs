# 小程序 setStorage 缓存

- [小程序缓存踩过的坑](https://blog.csdn.net/weixin_42133469/article/details/81875125)

## 设置、获取缓存

小程序的数据缓存，最大支持 10M，可以写入多种类型数据（number、boolean、array、string、object 等）

小程序设置、获取缓存有**同步、异步**接口

**官方建议[使用异步写入缓存的方法，少用同步方法](https://developers.weixin.qq.com/community/develop/doc/a352fb32bfc76cb6a6438925e4edf9b1)**

但是`setStorageSync`有一定失败概率，可以用`try catch`多试几次

```js
function setStorage(key, value) {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    setStorage(key, value)
  }
}

function getStorage(key) {
  try {
    return wx, getStorageSync(key)
  } catch (e) {
    return getStorage(key)
  }
}
```

## 清除小程序缓存

可以用`wx.removeStorage`，或者`wx.removeStorageSync`来清除小程序缓存，当然，你也可以从小程序列表中，把小程序删除，本地缓存就没有了

但是有时候也会遇到缓存清除不干净的问题

那是由于<b style="color: red;">同一个小程序的开发版、体验版、线上版的缓存是共用的，你需要同时删除这三个版本的小程序，缓存才会被删除。</b>

如果你使用了开发工具里面的远程调试，建议你清除缓存时，顺便把开发工具内的缓存也清除掉。
