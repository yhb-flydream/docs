# 微信打开网页键盘弹起后页面上滑，导致弹框里的按钮响应区域错位

## 问题引用

- [微信开放社区问题](https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800)
- [vant Issues](https://github.com/youzan/vant/issues?utf8=%E2%9C%93&q=alert)

## 问题描述

开发微信公众号时，在微信中打开网页，微信 `IOS 6.7.4` 键盘弹起页面上滑，键盘收起页面不会回到原位置，导致弹框(css 设置 position 为 fixed 会有问题，absolute 不会有问题)后按钮响应区域错位，不能正常点击

## 问题根源（引自官方）

- 这是 Apple 在 iOS 的 bug
- 会出现在所有的 Xcode10 打包的 iOS12 的设备上
- 微信 `IOS 6.7.4` 版本 搭配 `IOS12` 版本

## 解决方法

在点击按钮那里加下面其中一个即可解决

```js
// 滚动到顶部
window.scrollTo(0, 0)
// 滚动到底部
window.scrollTo(0, document.documentElement.scrollTop || document.body.scrollTop)
```

```js
handleFocus(event) {
  clearTimeout(this.timer);
}
handleblur() {
  this.timer = setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
}
```
