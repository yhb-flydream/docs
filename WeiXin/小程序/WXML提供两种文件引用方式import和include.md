# WXML 提供两种文件引用方式 import 和 include

## import

**import 可以在该文件中使用目标文件定义的 template**

如：

在 item.wxml 中定义了一个叫 item 的 template ：

```html
<!-- item.wxml -->
<template name="item">
  <text>{{text}}</text>
</template>
```

在 index.wxml 中引用了 item.wxml，就可以使用 item 模板：

```html
<import src="item.wxml" />

<template is="item" data="{{text: 'forbar'}}" />
```

**需要注意的是 import 有作用域的概念，即只会 import 目标文件中定义的 template，而不会 import 目标文件中 import 的 template，简言之就是 import 不具有递归的特性。**

> 例如：C 引用 B，B 引用 A，
> 在 C 中可以使用 B 定义的 template，
> 在 B 中可以使用 A 定义的 template ，
> 但是 C 不能使用 A 定义的 template。

## include

**include 可以将目标文件中除了 `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 include 位置**

如：

```html
<!-- header.wxml -->
<view> header </view>

<!-- footer.wxml -->
<view> footer </view>

<!-- index.wxml -->
<include src="header.wxml" />
<view> body </view>
<include src="footer.wxml" />
```
