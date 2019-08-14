# 微信小程序wxml中保留小数点后2位的方法

- [微信小程序wxml中保留小数点后2位的方法](https://www.jianshu.com/p/04069a6598d0)

> 原理：wxml中不能直接使用较高级的js语法，如`.toFixed`，但可以通过引入`wxs`模块实现效果

- 1、新建 `filter.wxs`

```js
var filters = {
  toFix: (val, num = 2) => {
    return val.toFixed(num); // 此处2为保留两位小数，保留几位小数，num 写几
  }
}

module.exports = {
  toFix: filters.toFix
}
```

- 2、`WXML` 中引用 `WXS`

```js
<wxs module="filters" src="./utils/filters.wxs"></wxs>
```

- 3、在 `WXML` 中使用

```html
<wxml>{{ filters.toFix(price, num) }}</wxml>
```

其他如 `Numer()` 也是类似的用法