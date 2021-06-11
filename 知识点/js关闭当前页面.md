# js 关闭当前页面

- 参考
  - [js 关闭当前页面](https://www.jianshu.com/p/6ab479f07ec6)

`window.cloce()` 方法看似可以关闭打开的窗口

**但是《高程三》已经明确指出这个方法仅适用于通过 `window.open()` 打开的窗口**

一般的做法是，通过 `userAgent` 检测浏览器类型，然而这三种情况都是打开了空页面

```js
var userAgent = navigator.userAgent
if (userAgent.indexOf('Firefox') != -1 || userAgent.indexOf('Chrome') != -1) {
  window.location.href = 'about:blank'
} else if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {
  window.opener = null
  window.open('about:blank', '_self', '').close()
} else {
  window.pener = null
  window.open('about:blank', '_self')
  window.close()
}
```

**由于在微信、支付宝、百度钱包中，他们对页面关闭进行了封装，传统的 `window.close()` 是无效的，必须要使用它们的 js 代码才能关闭**

下面是三种关闭的方法:

```js
WeixinJSBridge.call('closeWindow') //微信
AlipayJSBridge.call('closeWebview') //支付宝 关闭窗口（别名）
AlipayJSBridge.call('exitApp') // 支付宝 (退出当前H5应用)
AlipayJSBridge.call('popWindow', {
  // 关闭窗口，可传递参数
  data: {},
})
BLightApp.closeWindow() //百度钱包
```

- [阿里的文档](https://link.jianshu.com/?t=http://am-team.github.io/h5container/jsapi-doc.html)
- [阿里文档 2](https://link.jianshu.com/?t=https://am-team.github.io/nebula/jsapi/ui/toast.html)

有时支付宝的关闭在安卓上面不是很好用，原因是**当页面加载完后会创建 `AlipayJSBridge` 对象，同时会触发 `AlipayJSBridgeReady` 事件，当执行 `AlipayJSBridge.call('closeWebview')` 操作时，`AlipayJSBridge` 还没有创建，所以无法执行**。因此我们需要对 `AlipayJSBridgeReady` 事件进行监听。

```js
document.addEventListener('AlipayJSBridgeReady', function () {
  AlipayJSBridge.call('closeWebview')
})
```

通过浏览器的头判断是那种浏览器：

```js
var ua = navigator.userAgent.toLowerCase()
if (ua.match(/MicroMessenger/i) == 'micromessenger') {
  alert('微信客户端')
} else if (ua.indexOf('alipay') != -1) {
  alert('支付宝客户端')
} else if (ua.indexOf('baidu') != -1) {
  alert('百度客户端')
}
```

保存历史记录：

```js
window.addEventListener(
  'popstate',
  function (e) {
    var state = {
      title: 'title',
      url: '#',
    }
    window.history.pushState(state, 'title', '#')
  },
  false
)
```
