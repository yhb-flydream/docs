# Unable to preventDefault inside passive event listener

- [https://segmentfault.com/a/1190000008512184](https://segmentfault.com/a/1190000008512184)
- [https://www.zhangxinxu.com/wordpress/2018/07/chrome-safari-touchmove-preventdefault-treated-as-passive/](https://www.zhangxinxu.com/wordpress/2018/07/chrome-safari-touchmove-preventdefault-treated-as-passive/)

## 描述

`chrome` 的控制台看到如下提示：

```html
Unable to preventDefault inside passive event listener due to target being treated as passive. See
https://www.chromestatus.com/features/5093566007214080
```

由于浏览器必须要在执行事件处理函数之后，才能知道有没有掉用过 `preventDefault()` ，这就导致了浏览器不能及时响应滚动，略有延迟。

所以为了让页面滚动的效果如丝般顺滑，从 `chrome56` 开始，在 `window、document 和 body` 上注册的 `touchstart` 和 `touchmove` 事件处理函数，会默认为是 `passive: true`。浏览器忽略 `preventDefault()` 就可以第一时间滚动了。

举例：

```js
wnidow.addEventListener('touchmove', func) 效果和下面一句一样
wnidow.addEventListener('touchmove', func, { passive: true })
```

这就导致了一个问题：

- 如果在以上这 3 个元素的 `touchstart` 和 `touchmove` 事件处理函数中调用 `e.preventDefault()` ，会被浏览器忽略掉，并不会阻止默认行为。

## 解决

- 1、注册处理函数时，用如下方式，明确声明为不是被动的

```js
window.addEventListener('touchmove', func, { passive: false })
```

- 2、应用 `CSS` 属性 `touch-action: none;` 这样任何触摸事件都不会产生默认行为，但是 touch 事件照样触发。

touch-action 还有很多选项，详细请参考 [touch-action](https://w3c.github.io/pointerevents/#the-touch-action-css-property)
